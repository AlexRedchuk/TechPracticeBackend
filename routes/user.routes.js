const { Router } = require('express');
const User = require('../models/User')
const router = Router();

// api/user/add
router.post(
    '/add',
    async (req, res, next) => {
    try {
        await User.create(req.body, (error, data) => {
            if (error) {
               return next(error)
            }
            else {
                res.status(201).json("Пользователь создан");
            }
        })
       

    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
    });


// api/user/get
router.get('/get', async (req, res) => {
    try {
        User.find((error, data) => {
            if(error) {
                return next(error);
            }
            else  {
                res.json(data);
            }
        })
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

// api/user/get/:id
router.get('/get/:id', async (req, res, next) => {
    try {
        User.findById(req.params.id, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        })
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

// api/user/update/:id

router.put('/update/:id', async (req, res, next) => {
   try {
       User.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
           if (error) {
               console.log(error);
               return next(error);
           } else {
               res.json(data);
           }
       })
   } catch (e) {
       console.log(e);
       res.status(500).json({
           message: "Что-то пошло не так, попробуйте позже"
       })
   }
});

// api/user/delete/:id

router.delete('/delete/:id', async (req, res, next) => {
    try {
        User.findByIdAndDelete(req.params.id, (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.status(200).json({ message: "Пользователь удален"});
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});
module.exports = router;
