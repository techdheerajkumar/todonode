const adminAuth = (req, res, next) => {
    let tokenKey = 'ABC';
    let isAdminAuthorized = tokenKey === 'ABC';
    if (isAdminAuthorized) {
        next()
    } else {
        res.status(401).send('Admin not authorized')
    }
    ;
}
const userAuth = (req, res, next) => {
    let tokenKey = 'XYZ';
    let isUserAuthorized = tokenKey === 'XYZ';
    if (isUserAuthorized) {
        next()
    } else {
        res.status(401).send('User not authorized')
    }
    ;
}

module.exports = {
    adminAuth,
    userAuth
}