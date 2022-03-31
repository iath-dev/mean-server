import jwt from 'jsonwebtoken';

export function generateJWT(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: '24h' }, (err, token) => {
            if (err) {
                reject(err)
            }
            resolve(token);
        });
    })
}


