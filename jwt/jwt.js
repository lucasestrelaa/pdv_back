import jwt from 'jsonwebtoken'

function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

export default generateAccessToken