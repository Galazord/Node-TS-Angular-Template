import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/express-mongo-ts';

mongoose.connect(mongoUrl, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected to database');
    }
});

export default mongoose.connection;