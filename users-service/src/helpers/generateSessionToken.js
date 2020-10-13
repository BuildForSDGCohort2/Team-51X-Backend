import jwt from 'jsonwebtoken';

const JWT_SIGN_SECRET = 'dc76e9f0c0006e8f919e0c515c66dbba3982f785'; //root

const generateSessionToken = user => jwt.sign({
    id: user.id, email: user.email,
    role: user.roleId
}, JWT_SIGN_SECRET, { expiresIn: '24h' });

export default generateSessionToken;