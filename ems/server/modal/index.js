const { mongoose } = require('mongoose')

//create employeSchema
const employeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    }

})
const employeModal = mongoose.model("employee", employeSchema);

module.exports = { employeModal }