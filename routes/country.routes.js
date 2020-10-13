const { Router } = require('express');
const Country = require('../models/Country')
const router = Router();

// api/country/add
router.post(
    '/add',
    async (req, res, next) => {
    try {
        await Country.create(req.body, (error, data)=> {
            if (error) {
               return next(error)
            }
            else {
                res.status(201).json("Страна создана");
            }
        })
       

    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
    });


// api/country/get
router.get('/get', async (req, res) => {
    try {
        Country.find((error, data) => {
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

// api/country/get/:id
router.get('/get/:id', async (req, res, next) => {
    try {
        Country.findById(req.params.id, (error, data) => {
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

// api/country/update/:id

router.put('/update/:id', async (req, res, next) => {
   try {
       Country.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
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

// api/country/delete/:id

router.delete('/delete/:id', async (req, res, next) => {
    try {
        Country.findByIdAndDelete(req.params.id, (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.status(200).json({ message: "Страна удалена"});
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
