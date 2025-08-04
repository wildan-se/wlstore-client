// utils/constants.js

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  CART: '/orders/cart',
  AUTH: '/auth',
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
}

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
}

export const PRODUCT_SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'price', label: 'Price' },
  { value: 'averageRating', label: 'Rating' },
  { value: 'createdAt', label: 'Newest' },
]

export const PAGE_SIZES = [10, 20, 30, 50]
