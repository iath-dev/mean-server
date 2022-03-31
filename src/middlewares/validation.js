import { request, response } from "express";
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

export function errorsValidation(req = request, res = response, next) {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ ok: false, msg: errors.mapped() })
    }

    next();
}

export function checkToken(req = request, res = response, next) {
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(400).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    try {

        const { email, name, uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.body = { email, name, uid }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next()
}