export const ORDER_STATUSES = ['pending', 'received', 'in transit', 'out for delivery', 'delivered'];

export const STATUS_LABEL = {
  pending: 'Pending',
  received: 'Received',
  'in transit': 'In transit',
  'out for delivery': 'Out for delivery',
  delivered: 'Delivered',
  completed: 'Paid',
  failed: 'Failed',
};

export const PAYMENT_METHODS = [
  { value: 'credit_card', label: 'Card' },
  { value: 'bank_transfer', label: 'Bank transfer' },
  { value: 'paypal', label: 'PayPal' },
];

export const VEHICLE_TYPES = ['bike', 'car', 'van', 'truck'];

export const NOTIFICATION_TYPES = ['info', 'success', 'warning', 'error'];

export const CONTACT = {
  email: 'cristephinternationallogistics@gmail.com',
  phones: ['+86 134 6651 7884', '+234 707 187 1127'],
};

export const OFFICES = [
  { country: 'Nigeria', city: 'Lagos', address: 'Alaba International Market, Lagos' },
  { country: 'Nigeria', city: 'Kano', address: 'France Road, Kano' },
  { country: 'Nigeria', city: 'Onitsha', address: 'Niger Street Junction, Main Market, Onitsha' },
  { country: 'Nigeria', city: 'Port Harcourt', address: '10 Omoku Street, D-Line, Port Harcourt' },
  { country: 'Nigeria', city: 'Abuja', address: 'Dakala Street, off Parakou Street, Wuse 2, Abuja' },
  { country: 'China', city: 'Shenzhen', address: 'Yiwu Sunshine Avenue, Shenzhen International Logistics Port' },
  { country: 'China', city: 'Guangzhou', address: 'Hongyi Ceramic City, Wugang Road' },
  { country: 'China', city: 'Guangzhou', address: 'No. 13 Huan Shi Jui Road' },
  { country: 'China', city: 'Foshan', address: 'Chancheng District, Foshan' },
];
