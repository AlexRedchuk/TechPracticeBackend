const { Router } = require('express');
const Hotel = require('../models/Hotel');
const router = Router();

// api/hotel/add
router.post(
    '/add',
    async (req, res, next) => {
    try {
        await Hotel.create(req.body, (error, data)=> {
            if (error) {
               return next(error)
            }
            else {
                res.status(201).json("Отель создан");
            }
        })
       

    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
    });


    // api/hotel/get
router.get('/get', async (req, res) => {
    try {
        Hotel.find((error, data) => {
            if(error) {
                return next(error);
            }
            else  {
                res.json(data);
            }
        }).populate('country');
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

// api/hotel/get/:id
router.get('/get/:id', async (req, res, next) => {
    try {
        Hotel.findById(req.params.id, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }).populate('country');
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

// api/country/update/:id

router.put('/update/:id', async (req, res, next) => {
    try {
        Hotel.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
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

 // api/hotel/delete/:id

router.delete('/delete/:id', async (req, res, next) => {
    try {
        Hotel.findByIdAndDelete(req.params.id, (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.status(200).json({ message: "Отель удален"});
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

router.get('/findByName', async (req, res, next) => {
    try {
        Hotel.find( { "name" : {$regex :".*" + req.query.name + ".*", $options: 'i'} } , (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            }
            else {
                res.status(200).json(data);
            }
        } ).populate('country');
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});


    module.exports = router;