const express = require('express');
const { addEmployee, updateEmployee, deleteEmpolyee, getAllEmployee } = require('../controller');

const router = express.Router();

//routes for employee
router.post("/", addEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmpolyee)
router.get('/', getAllEmployee)

module.exports = { router }