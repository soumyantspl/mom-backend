const mongoose = require('mongoose')


const organisationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
})

const Organisation = mongoose.model('Organisation', organisationSchema)

module.exports = Organisation;