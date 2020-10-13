const { Router } = require('express');
const Review = require('../models/Review')
const router = Router();

// api/review/add
router.post(
    '/add',
    async (req, res, next) => {
    try {
        await Review.create(req.body, (error, data)=> {
            if (error) {
               return next(error)
            }
            else {
                res.status(201).json("Відгук створено");
            }
        })
       

    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так"
        })
    }
    });


// api/review/get
router.get('/get', async (req, res) => {
    try {
        Review.find((error, data) => {
            if(error) {
                return next(error);
            }
            else  {
                res.json(data);
            }
        }).sort({date: -1}).populate('user');
    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так"
        })
    }
});

// api/review/get/:id
router.get('/get/:id', async (req, res, next) => {
    try {
        Review.findById(req.params.id, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        })
    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так"
        })
    }
});

// api/review/update/:id

router.put('/update/:id', async (req, res, next) => {
   try {
       Review.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
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
           message: "Щось пішло не так"
       })
   }
});

// api/review/delete/:id

router.delete('/delete/:id', async (req, res, next) => {
    try {
        Review.findByIdAndDelete(req.params.id, (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.status(200).json({ message: "Відгук видалено"});
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Щось пішло не так"
        })
    }
});
module.exports = router;
