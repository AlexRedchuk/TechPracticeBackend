const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/country', require('./routes/country.routes'));
app.use('/api/hotel', require('./routes/hotel.routes'));
app.use('/api/tour', require('./routes/tour.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/review', require('./routes/review.routes'))
app.use('/api/orderLog', require('./routes/orderLog.routes'))

const PORT = config.get('port') || 8080;

async function start() {
    try {
        mongoose.Promise = global.Promise;
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log(`App has been started on PORT: ${PORT}`);
        });

    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();

