// Address
export * from './address/delete-user-address';
export * from './address/get-user-address';
export * from './address/set-user-address';

// Base de datos
export * from './product/create-update-product';
export * from './product/delete-product-image';
export * from './countries/get-countries';
export * from './product/get-product-by-slug';
export * from './product/get-stock-by-slug';
export * from './product/product-pagination';

// Category
export * from './category/get-categories';

// Login
export * from './auth/login';
export * from './auth/logout';
export * from './auth/register';

// Order
export * from './order/get-order-by-id';
export * from './order/get-order-by-user';
export * from './order/get-paginated-orders';
export * from './order/place-order';

// Payments
export * from './payments/paypal-check-payment';
export * from './payments/set-transaction-id';

// Users
export * from './user/change-user-role';
export * from './user/get-paginated-users';
