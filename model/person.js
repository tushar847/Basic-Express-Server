const monggose = require('mongoose');
const personSchema = new monggose.Schema({
    name: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: false
    },
    cellNo: {
        type: Number,
        required: true,
        default: 1111122222
    }
})

module.exports = monggose.model('person', personSchema);