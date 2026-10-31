const { ALL_PERMISSIONS } = require("../constants/permissions");

const requirePermission = (...requiredPermissions) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        // Owners have full access within their own organization.
        if (req.user.role === "org_owner") {
            return next();
        }

        // Super Admin permissions are controlled through role-specific routes.
        if (req.user.role === "super_admin") {
            return next();
        }

        if (req.user.role !== "staff") {
            return res.status(403).json({
                success: false,
                message: "This role cannot perform this action",
            });
        }

        const assignedPermissions = req.user.permissions || [];

        const hasValidPermission = requiredPermissions.every(
            (permission) => ALL_PERMISSIONS.includes(permission)
        );

        if (!hasValidPermission) {
            return res.status(500).json({
                success: false,
                message: "Invalid permission configured on this route",
            });
        }

        const hasAllPermissions = requiredPermissions.every(
            (permission) => assignedPermissions.includes(permission)
        );

        if (!hasAllPermissions) {
            return res.status(403).json({
                success: false,
                message: "You do not have the required permission",
            });
        }

        next();
    };
};

module.exports = requirePermission;