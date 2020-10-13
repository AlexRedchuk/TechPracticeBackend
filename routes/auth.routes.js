const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/default')
const jwt_decode = require('jwt-decode');
const { check, validationResult} = require('express-validator');
const User = require('../models/User');


const router = Router();


// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength( { min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            console.log(req.value);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }
            
        
            const { name, surname, city, phone, email, password } = req.body;
            
            const candidate = await  User.findOne({ email })

        if (candidate) {
            return res.status(400).json({ message: 'Email вже використовується'})
        }


        const hashedPassword = await bcrypt.hash(password, 12);
        const user  = new User({name, surname, city, phone, email, password: hashedPassword})
        await user.save();

        res.status(201).json("Пользователь создан");
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);


        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректні дані при вході'
            })
        }

        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Неправильний email або пароль'})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({ message: 'Неправильний email або пароль'})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.jwtSecret,
            {expiresIn: '3600s'}
        );

        res.json({
            token, userId: user.id, expiresIn: '3600'
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

router.get('/userid/:token', async (req, res) => {
    try {
        let decoded = await jwt_decode(req.params.token, config.jwtSecret);
        res.status(200).json(decoded.userId);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
})

module.exports = router;
