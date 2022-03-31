import { request, response } from "express";
import bcrypt from 'bcryptjs';

import User from "../models/user.js";
import { generateJWT } from "../utils/jwt.js";

export async function Renew(req = request, res = response) {
    const token = await generateJWT(req.body);

    return res.status(200).json({ ok: true, token, ...req.body });
}

export async function Login(req = request, res = response) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario invalido'
            })
        }

        const valid = bcrypt.compareSync(password, user.password);

        if (!valid) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario invalido'
            })
        }

        const token = await generateJWT({ email, name: user.name, uid: user.id });

        return res.status(201).json({
            ok: true,
            email,
            name: user.name,
            uid: user.id,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error! Ha ocurrido un error en el servidor'
        })
    }
}

export async function Register(req = request, res = response) {
    const { email, name, password } = req.body;

    try {
        // Check Email
    
        const user = await User.findOne({ email });
        
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo no valido'
            })
        }

        // User Model
        const dbUser = new User(req.body);

        // Hash password
        const salt = bcrypt.genSaltSync(12);
        dbUser.password = bcrypt.hashSync(password, salt);

        // Generate JWT
        const token = await generateJWT({ email, name, uid: dbUser.id });

        // Create user
        await dbUser.save();
    
        // Generate response
        return res.status(201).json({
            ok: true,
            email,
            name,
            uid: dbUser.id,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error! Ha ocurrido un error en el servidor'
        })
    }
}