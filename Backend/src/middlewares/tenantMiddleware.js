const requireTenant = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentication required",
        });
    }

    if (req.user.role === "super_admin") {
        return res.status(403).json({
            success: false,
            message: "This route requires an organization account",
        });
    }

    if (!req.user.organizationId) {
        return res.status(403).json({
            success: false,
            message: "Organization context is missing",
        });
    }

    // Always derive the tenant from the authenticated user.
    // Never trust organizationId supplied in request body or query.
    req.organizationId = req.user.organizationId;

    next();
};

module.exports = requireTenant;