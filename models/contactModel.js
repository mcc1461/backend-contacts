const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    surname: {
        type: String,
        required: [true, 'Please provide a surname'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
    },
    country: {
        type: String,
        required: [true, 'Please provide a city'],
    },
    city: {
        type: String,
        required: [true, 'Please provide a city'],
    },
    }, 
    {
        timestamps: true,
    }   
    );

module.exports = mongoose.model('Contact', contactSchema);

