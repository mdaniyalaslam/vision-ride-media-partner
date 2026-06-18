export default endPoints = {
  // Auth
  register: '/register',
  login: '/login',
  logout: '/logout',
  forgotPassword: '/forgot-password',
  verifyOtp: '/verify-otp',
  resetPassword: '/reset-password',
  profile: '/profile',
  deleteAccount: '/delete-account',

  // Settings
  getSettings: '/settings',
  updateProfile: '/settings/profile',
  updatePassword: '/settings/password',
  updateBank: '/settings/bank',

  // Vehicles
  vehicles: '/vehicles',
  vehicleById: id => `/vehicles/${id}`,
  vehicleImages: id => `/vehicles/${id}/images`,
  vehicleImageById: (vehicleId, imageId) =>
    `/vehicles/${vehicleId}/images/${imageId}`,

  // Messages
  messages: '/messages',
  messagesUnreadCount: '/messages/unread-count',
  messagesPoll: '/messages/poll',
  messagesMarkAsRead: '/messages/mark-as-read',
  messageAttachmentDownload: id => `/messages/attachments/${id}/download`,
  deleteMessage: id => `/messages/${id}`,

  // Monthly Reports
  monthlyReports: '/monthly-reports',
  monthlyReportsByOrder: orderId => `/monthly-reports/${orderId}`,

  // Orders
  orders: '/orders',

  // Payments
  payments: '/payments',
};
