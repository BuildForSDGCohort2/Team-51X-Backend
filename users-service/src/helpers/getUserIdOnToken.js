import jwt from 'jsonwebtoken';


const JWT_SIGN_SECRET = 'dc76e9f0c0006e8f919e0c515c66dbba3982f785'; //root

const getUserIdOnToken = token => {
    let userId = -1;
    if (token != null) {
        try {
            let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            if (jwtToken != null)
                userId = jwtToken.id;
        } catch (err) {
        }
    }
    return userId;
}

export default getUserIdOnToken;