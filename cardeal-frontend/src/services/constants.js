export const baseUrl = process.env.REACT_APP_API_BASE;

export const apiUrls={
    ADMIN_LOGIN: 'api/admin/validate',
    UPDATE_ADMIN: 'api/admin',

    CUSTOMER_LOGIN: 'api/customers/validate',
    CUSTOMERS_LIST: 'api/customers',
    ADD_CUSTOMER: 'api/customers',
    CUSTOMER_DETAILS: 'api/customers/',
    CUSTOMER_UPDATE: 'api/customers/',

    CARS_LIST: 'api/cars',
    DELETE_CAR: 'api/cars/',
    CAR_DETAILS: 'api/cars/',
    ADD_CAR: 'api/cars',
    UPDATE_CAR: 'api/cars/',
    AVAILABLE_CARS: 'api/cars/available',
    CATEGORY_CARS: 'api/cars/cats',

    CATEGORIES_LIST: 'api/categories',
    ADD_CATEGORY: 'api/categories',
    DELETE_CATEGORY: 'api/categories/',
    UPDATE_CATEGORY: 'api/categories/',
    
    PLACE_ORDER: 'api/orders',
    ORDERS_LIST: 'api/orders',
    ORDER_DETAILS: 'api/orders/'
}