const PERMISSIONS = {
    DASHBOARD_VIEW: "dashboard:view",

    STAFF_VIEW: "staff:view",
    STAFF_CREATE: "staff:create",
    STAFF_UPDATE: "staff:update",
    STAFF_DEACTIVATE: "staff:deactivate",

    CUSTOMER_VIEW: "customers:view",
    CUSTOMER_CREATE: "customers:create",
    CUSTOMER_UPDATE: "customers:update",
    CUSTOMER_DEACTIVATE: "customers:deactivate",

    PRODUCT_VIEW: "products:view",
    PRODUCT_CREATE: "products:create",
    PRODUCT_UPDATE: "products:update",
    PRODUCT_DELETE: "products:delete",

    PLAN_VIEW: "plans:view",
    PLAN_CREATE: "plans:create",
    PLAN_UPDATE: "plans:update",
    PLAN_DELETE: "plans:delete",

    SUBSCRIPTION_VIEW: "subscriptions:view",
    SUBSCRIPTION_CREATE: "subscriptions:create",
    SUBSCRIPTION_UPDATE: "subscriptions:update",
    SUBSCRIPTION_CANCEL: "subscriptions:cancel",

    INVOICE_VIEW: "invoices:view",
    INVOICE_CREATE: "invoices:create",
    INVOICE_UPDATE: "invoices:update",

    PAYMENT_VIEW: "payments:view",
    PAYMENT_CREATE: "payments:create",
    PAYMENT_VOID: "payments:void",

    REPORT_VIEW: "reports:view",
    SETTINGS_VIEW: "settings:view",
    SETTINGS_UPDATE: "settings:update",
};

const ALL_PERMISSIONS = Object.values(PERMISSIONS);

module.exports = {
    PERMISSIONS,
    ALL_PERMISSIONS,
};