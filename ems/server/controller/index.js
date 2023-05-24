const { employeModal } = require("../modal");

//get all employee data
const getAllEmployee = async (req, res) => {
    try {
        const employees = await employeModal.find()
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: err })

    }
}


//add an employee
const addEmployee = async (req, res) => {
    const { name, department, salary } = req.body;
    try {
        if (!name || !department || !salary) {
            return res.status(400).json({ error: 'All fields are require.' });
        }

        //send data to employeeModal
        const newEmployee = new employeModal(req.body);

        //save data into empolyee modal
        const addEmployee = await newEmployee.save()
        if (addEmployee) {
            return res.status(200).json({ message: 'employee added successfully.' })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

//update an employee
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, department, salary } = req.body;

    try {
        if (!name || !department || !salary) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        //update employee details
        const updateData = await employeModal.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        res.status(200).json({ updateData, message: 'employee updated successfully.' })

    } catch (error) {
        res.status(500).json({ error: error })
    }
}

//delete an employe
const deleteEmpolyee = async (req, res) => {
    const { id } = req.params;
    try {
        await employeModal.findByIdAndDelete(id)
        res.status(200).json({ message: 'employee deleted successfully.' });

    } catch (error) {
        res.status(500).json({ error: err })
    }

}
module.exports = { addEmployee, updateEmployee, deleteEmpolyee, getAllEmployee }