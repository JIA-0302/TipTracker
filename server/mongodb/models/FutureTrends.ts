import mongoose from 'mongoose';
const { Schema } = mongoose;

const futureTrendsSchema = new Schema({
    user_id: {type: Number, required: true},
    employer_id: {type: Number, required: true},
    shift_date: {type: Date, required: true},
    start_time: {type: Date, required: true},
    end_time: {type: Date, required: true},
    predicted_earnings: {type: Number, required: true}
});


export const futureTrendsModel = mongoose.model('future_trends', futureTrendsSchema);

//insert mock data
futureTrendsModel.create({
    user_id: '-1',
    employer_id: '-1',
    shift_date: '2016-05-18T16:00:00Z',
    start_time: '2016-05-18T16:00:00Z',
    end_time: '2016-05-18T16:00:00Z',
    predicted_earnings: '-1'
}, function (err) {
    if (err) console.log(err);
});

//default connection for local server for mongodb
//mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
