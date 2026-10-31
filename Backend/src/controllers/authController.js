const authService = require("../services/authService");

const {
    accessCookieOptions,
    refreshCookieOptions,
} = require("../config/cookies");

const activateAccount = async (req, res, next) => {
    try {
        const result = await authService.activateAccount({
            token: req.body.token,
            name: req.body.name,
            password: req.body.password,
        });

        return res.status(200).json({
            success: true,
            message: "Account activated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await authService.login({
            email: req.body.email,
            password: req.body.password,
            userAgent: req.get("user-agent"),
            ipAddress: req.ip,
        });

        res.cookie(
            "accessToken",
            result.accessToken,
            accessCookieOptions
        );

        res.cookie(
            "refreshToken",
            result.refreshToken,
            refreshCookieOptions
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: result.user,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getMe = async (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                organizationId: req.user.organizationId,
                permissions: req.user.permissions || [],
            },
        },
    });
};

module.exports = {
    getMe,
    activateAccount,
    login,
};