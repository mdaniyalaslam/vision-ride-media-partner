export default endPoints = {
  register: '/register',
  login: '/login',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  changePassword: '/profile/change-password',
  verifyOtp: '/verify-otp',
  profile: '/profile',
  // DASHBOARD APIS
  bidsStats: '/bids/stats',
  bids: '/bids',
  bidPlace: '/bids/place',
  // AUCTION APIS
  categories: '/categories',
  auctions: '/auctions',
  invoices: '/invoices',
  // ORDER APIS
  downloadInvoice: invoiceId => `/invoices/${invoiceId}/download`,
  processPayment: invoiceId => `/invoices/${invoiceId}/process-payment`,
  orders: '/orders',
  // CHAT APIS
  messages: '/messages',
  sendMessage: '/messages/send',
  // CARD APIS
  cards: '/cards',
  addCard: '/cards/add',
  setDefaultCard: '/cards/set-default',
  deleteCard: cardId => `/cards/${cardId}`,
  deleteAccount: '/profile/delete-account',
  // COUNTRY APIS
  countries: '/countries',
  unreadNotifications: '/messages/unread-count',
  markMessagesRead: '/messages/mark-as-read',
};
