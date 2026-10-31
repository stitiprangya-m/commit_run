const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: process.env.COOKIE_SAME_SITE || "lax",
    path: "/",
};

const accessCookieOptions = {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
};

const refreshCookieOptions = {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

const clearCookieOptions = {
    ...cookieOptions,
};

module.exports = {
    accessCookieOptions,
    refreshCookieOptions,
    clearCookieOptions,
};