const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    organisationId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    status: {
        type: Boolean,
        require: true,
        default: true
    },
},
    {
        timestamps: true
    })


const Organisation = mongoose.model('Organisation', roomSchema)

module.exports = Organisation;