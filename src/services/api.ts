// src/services/apiService.ts
import { toast } from 'react-toastify';
import { getIdToken, User } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebase';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// ---------- Helper Functions ----------
const getAuthToken = async (forceRefresh = false): Promise<string> => {
  const user: User | null = auth.currentUser;

  if (user) {
    const token = await user.getIdToken(forceRefresh);
    localStorage.setItem('accessToken', token);
    return token;
  }

  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('User not authenticated');
  return token;
};

const request = async (endpoint: string, options: RequestInit = {}, retry = true) => {
  try {
    const token = await getAuthToken();
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...(options.headers || {}),
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error: any) {
    // Retry once if admin access error
    if (retry && error.message.toLowerCase().includes('admin access required')) {
      await getAuthToken(true); // Force refresh
      return request(endpoint, options, false);
    }

    console.error('API Error:', error);

    if (error.message.toLowerCase().includes('admin access required')) {
      toast.error('Admin access required. Please login as admin.');
    } else if (error.message.toLowerCase().includes('authentication required')) {
      toast.error('Please login to continue.');
    } else {
      toast.error(error.message);
    }

    throw error;
  }
};

// ---------- API Functions ----------
export const ApiService = {
  // ---------- Auth ----------
  loginWithEmail: async (email: string, password: string) => {
    const data = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Force refresh token after login to get latest claims
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken(true);
      localStorage.setItem('accessToken', token);
    }

    return data;
  },

  getCurrentUser: () => request('/api/auth/me'),

  // ---------- Applications ----------
  submitApplication: (applicationData: any) =>
    request('/api/applications', { method: 'POST', body: JSON.stringify(applicationData) }),

  getMyApplication: () => request('/api/applications/my-application'),
  getAllApplications: () => request('/api/applications'),

  updateApplicationStatus: (uid: string, status: string) =>
    request(`/api/applications/${uid}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // ---------- Students ----------
  getAllStudents: () => request('/api/students'),
  getMyProfile: () => request('/api/students/profile'),

  updateMyProfile: (profileData: any) =>
    request('/api/students/profile', { method: 'PUT', body: JSON.stringify(profileData) }),

  getStudent: (uid: string) => request(`/api/students/${uid}`),

  updateStudent: (uid: string, updateData: any) =>
    request(`/api/students/${uid}`, { method: 'PUT', body: JSON.stringify(updateData) }),

  updateStudentStatus: (uid: string, status: string) =>
    request(`/api/students/${uid}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  updatePaymentStatus: (uid: string, paymentStatus: string) =>
    request(`/api/students/${uid}/payment-status`, { method: 'PUT', body: JSON.stringify({ paymentStatus }) }),

  updateProgress: (uid: string, progressPercentage: number) =>
    request(`/api/students/${uid}/progress`, { method: 'PUT', body: JSON.stringify({ progressPercentage }) }),

  updateProgressStep: (uid: string, step: string, completed: boolean) =>
    request(`/api/students/${uid}/progress-step`, { method: 'PUT', body: JSON.stringify({ step, completed }) }),

  // ---------- Payments ----------
  applyCoupon: (couponCode: string) =>
    request('/api/payments/apply-coupon', { method: 'POST', body: JSON.stringify({ couponCode }) }),

  createPaymentOrder: (couponCode: string) =>
    request('/api/payments/create-order', { method: 'POST', body: JSON.stringify({ couponCode }) }),

  verifyPayment: (paymentData: any) =>
    request('/api/payments/verify', { method: 'POST', body: JSON.stringify(paymentData) }),

  getPaymentHistory: () => request('/api/payments/history'),

  // ---------- Documents ----------
  getMyDocuments: () => request('/api/documents/my-documents'),
  getStudentDocuments: (studentUid: string) => request(`/api/documents/student/${studentUid}`),

  uploadDocument: async (studentUid: string, file: File, documentType: string) => {
    const token = await getAuthToken();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    const response = await fetch(`${API_BASE_URL}/api/documents/upload/${studentUid}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Upload failed');
    return data;
  },

  updateDocumentStatus: (documentId: string, enabled: boolean) =>
    request(`/api/documents/${documentId}/status`, { method: 'PUT', body: JSON.stringify({ enabled }) }),

  deleteDocument: (documentId: string) =>
    request(`/api/documents/${documentId}`, { method: 'DELETE' }),

  // ---------- Admin ----------
  setAdminClaim: (uid: string) => request(`/api/admin/set-admin/${uid}`, { method: 'POST' }),
  removeAdminClaim: (uid: string) => request(`/api/admin/remove-admin/${uid}`, { method: 'POST' }),
  getUserClaims: (uid: string) => request(`/api/admin/user-claims/${uid}`),

  // ---------- Firebase Upload ----------
  uploadToFirebase: async (file: File, path: string) => {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  },
};
