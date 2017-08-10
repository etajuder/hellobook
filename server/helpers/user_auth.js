const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ status: 'Unauthorized' });
};

const notLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    res.status(401).json({ status: 'Unauthorized' });
};

export {
    isLoggedIn,
    notLoggedIn
};
