const { Router } = require('express');
const Tour = require('../models/Tour');
const Country = require('../models/Country');
const router = Router();

// api/tour/add
router.post(
    '/add',
    async (req, res, next) => {
        try {
            await Tour.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                }
                else {
                    res.status(201).json("Тур создан");
                }
            })


        } catch (e) {
            res.status(500).json({
                message: "Что-то пошло не так, попробуйте позже"
            })
        }
    });

// api/tour/get
router.get('/get', async (req, res, next) => {
    try {
        Tour.find((error, data) => {
            if (error) {
                return next(error);
            }
            else {
                res.json(data);
            }
        }).populate('country').populate('hotel');
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

// api/tour/get/:id
router.get('/get/:id', async (req, res, next) => {
    try {
        Tour.findById(req.params.id, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }).populate('country').populate('hotel');
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

// api/tour/update/:id

router.put('/update/:id', async (req, res, next) => {
    try {
        Tour.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
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

// api/tour/delete/:id

router.delete('/delete/:id', async (req, res, next) => {
    try {
        Tour.findByIdAndDelete(req.params.id, (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.status(200).json({ message: "Страна удалена" });
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

router.get('/hotTours', async (req, res, next) => {
    try {
        Tour.find({
            discount: { $ne: 0 }
        }, (error, data) => {
            if (error) {
                return next(error);
            }
            else {
                res.json(data);
            }
        }).populate('country').populate('hotel');
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});


router.get('/get/country/:id', async (req, res, next) => {
    try {
        Tour.find({
            'country': req.params.id
        }, (error, data) => {
            if (error) {
                return next(error);
            }
            else {
                res.json(data);
            }
        }).populate('country').populate('hotel');
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

router.get('/get/hotel/:id', async (req, res, next) => {
    try {
        Tour.find({
            'hotel': req.params.id
        }, (error, data) => {
            if (error) {
                return next(error);
            }
            else {
                res.json(data);
            }
        }).populate('hotel').populate('country');
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

router.get('/country/group', async (req, res, next) => {
    try {
        Tour.aggregate([
            {
                "$lookup": {
                    "from": Country.collection.name,
                    "localField": "country",
                    "foreignField": "_id",
                    "as": "country"
                }
            },
            { "$unwind": "$country" },

            {
                $group:
                {
                    _id: "$country",
                    minDuration: {
                        $min: "$duration"
                    },
                    minPrice: {
                        $min: {
                            $multiply:
                                ["$price", {$divide: [
                                    {
                                        $subtract: [100, "$discount"]
                                    },
                                    100
                                ]} 
                                ]
                        }
                    }
                }
            }
        ], (error, data) => {
            if (error) {
                return next(error);
            }
            else {
                res.json(data);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
})

router.post('/filter', async (req, res, next) => {
    try {
        Tour.find({
            // $and: [
            //     {
            //         $or: [
            //             { $or: [
            //                  { country: req.body.country },
            //                  { date: { $gte: req.body.date_min, $lte: req.body.date_max } }] },
            //            { country: req.body.country },
            //            { date: { $gte: req.body.date_min, $lte: req.body.date_max } }
            //         ]
            //     },
            //     {
            //         duration: req.body.nights,
            //         adults: req.body.adults,
            //         children: req.body.children,
            //     }
            // ]
            
            $and: [
            {$or: [ {"": req.body.country}, {country: req.body.country}]},
            {$or: [ {"": req.body.minDate}, { date: { $gte: req.body.minDate } }]},
            {$or: [ {"": req.body.maxDate}, { date: { $lte: req.body.maxDate } }]},
            {$or: [ {"": req.body.duration}, {duration: req.body.duration}]},
            {$or: [ {"": req.body.adults}, {adults: req.body.adults}]},
            {$or: [ {"": req.body.children}, {children: req.body.children}]},
            ]
        }, (error, data) => {
            if (error) {
                return next(error);
            }
            else {
                console.log(req.body)
                res.json(data);
            }
        }).populate('country').populate('hotel');
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

module.exports = router;
