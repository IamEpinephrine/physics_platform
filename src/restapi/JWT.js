const {sign, verify} = require('jsonwebtoken');

const createTokens = (user) => {
    const accessToken = sign({username: user.login, id: user.id, role: user.role}, "physics-secret-k{Tp5/2SU`N?C<q$kEh");
    return accessToken;
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]
    
    if (!accessToken) return res.status(400).json({error: "User not authenticated!"});
    try {
        const validToken = verify(accessToken, "physics-secret-k{Tp5/2SU`N?C<q$kEh");
        if (validToken){
            req.authenticated = true;
            req.userId = validToken.id;
            req.userName = validToken.username;
            req.role = validToken.role;
            return next();
        }
    } catch (e) {
        res.status(400).json({error: "User not authenticated!"});
    }
}

module.exports = {
    createTokens,
    validateToken,
}