const { Router } = require('express');
const OrderLog = require('../models/OrderLog');
const Tour = require('../models/Tour');
const User = require('../models/User')
const router = Router();

// api/orderLog/add
router.post(
    '/add',
    async (req, res, next) => {
    try {
        await OrderLog.create(req.body, (error, data)=> {
            if (error) {
               return next(error)
            }
            else {
                res.status(201).json("Журнал створено");
            }
        })
       

    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так"
        })
    }
    });


// api/orderLog/get
router.get('/get', async (req, res) => {
    try {
        OrderLog.find((error, data) => {
            if(error) {
                return next(error);
            }
            else  {
                res.json(data);
            }
        })
    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так"
        })
    }
});

// api/orderLog/get/:id
router.get('/get/:id', async (req, res, next) => {
    try {
        OrderLog.findById(req.params.id, (error, data) => {
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

// api/orderLog/update/:id

router.put('/update/:id', async (req, res, next) => {
   try {
       OrderLog.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
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

// api/orderLog/delete/:id

router.delete('/delete/:id', async (req, res, next) => {
    try {
        OrderLog.findByIdAndDelete(req.params.id, (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.status(200).json({ message: "Журнал видалено"});
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Щось пішло не так"
        })
    }
});

router.get('/findByUser/:id', async (req, res) => {
    try {
        OrderLog.find({
            user: req.params.id
        },(error, data) => {
            if(error) {
                return next(error);
            }
            else  {
                res.json(data);
            }
        }).populate({
            path: 'tour',
            populate: {path: 'hotel' }
            })
    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так"
        })
    }
});

router.post('/isOrdered', async (req, res, next) => {
    try {
        OrderLog.find({
            user: req.body.user,
            tour: req.body.tour
        }, (error, data) => {
            if(error) {
                return next(error);
            }
            else  {
                res.json(data);
            }
        }).populate('user').populate('tour');
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

// router.post('/checkDate', async (req, res, next) => {
//     try {
//         OrderLog.aggregate([
//             // {
//                 { "$unwind": "$user" },
//             //     "$lookup": {
//             //         "from": Tour.collection.name,
//             //         "localField": "tour",
//             //         "foreignField": "_id",
//             //         "as": "tour"
//             //     }
//             // },
//             {
//                 "$lookup": {
//                     "from": User.collection.name,
//                     "localField": "user",
//                     "foreignField": "_id",
//                     "as": "user"
//                 }
//             },
//             // { "$unwind": "$tour" },
//             {

                
//             }
            
//             // {
//             //     $match: {
//             //         $gte: [ checkDate, req.body.minDate]
//             //     }
//             // }
            
//             // {
//             //    { $project: {
//             //         tour: {
//             //             $filter: {
//             //                 input: "$tour",
//             //                 as: "tours",
//             //                 cond: { $gte: ["$$tours.date", req.body.minDate] }
//             //             }
//             //         }
//             //     }  }  

//                     // $and: [
//                         // { "tour.date": {"$gte": req.body.minDate} },
//                         // { "tour.date": {"$lte": req.body.maxDate} },
//                         // user: req.body.user
//                     // ]

//             // }
            
            
//         ],(error, data) => {
//             if(error) {
//                 return next(error);
//             }
//             else  {
//                 console.log(req.body)
//                 res.json(data);
//             }
//         })
//     } catch (e) {
//         res.status(500).json({
//             message: "Щось пішло не так"
//         })
//     }
// });
module.exports = router;
