import React, { useState } from 'react'
import { Form, FormLabel, InputGroup } from 'react-bootstrap'
import { updateEmployee } from '../apiRequests';


const EmployeeForm = ({ preFillData, handleClose, employeeData, setEmployeeData }) => {

    const [oldDataOfEmployee, setOldDataOfEmployee] = useState({
        name: preFillData?.name,
        department: preFillData?.department,
        salary: preFillData?.salary

    })

    //update api call
    const callUpdateApi =
        (id, data) => {
            updateEmployee(id, data)
                .then((res) => {
                    const temp = [...employeeData]
                    const index = temp.findIndex((item => item._id === res?.data?.updateData?._id))
                    if (index !== -1) {
                        temp[index] = res?.data?.updateData
                        setEmployeeData(temp)
                    }
                    handleClose()
                })
                .catch((err) => {
                    console.log(err);
                    alert(err.response.data.error)
                });
        };


    //input change
    const handleChange = (e) => {
        setOldDataOfEmployee({
            ...oldDataOfEmployee,
            [e.target.name]: e.target.value,
        });
    };

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        callUpdateApi(preFillData?._id, oldDataOfEmployee)
    }


    return (

        <div className='d-flex justify-content-center'>

            <Form className='d-flex flex-column justify-content-center algin-item-center w-75' onSubmit={handleSubmit}>
                <div className='d-flex flex-column mt-3 mb-3'>
                    <label htmlFor='updateName' className='fs-5 mb-1' >Employee Name</label>
                    <input type='text' name='name' id='updateName' onChange={handleChange} value={oldDataOfEmployee.name} className='pt-1 pb-1' required ></input>
                </div >
                <div className='d-flex flex-column mt-3 mb-3' >
                    <label htmlFor="updateDepartment" className='fs-5 mb-1' >Department</label>
                    <input type='text' name="department" id='updateDepartment' onChange={handleChange} value={oldDataOfEmployee.department} className='pt-1 pb-1' required></input>
                </div>
                <div className='d-flex flex-column mt-3 mb-3'>
                    <label htmlFor="updateSalary" className='fs-5 mb-2' >Salary</label>
                    <input type='number' name='salary' id='updateSalary' onChange={handleChange} value={oldDataOfEmployee.salary} className='pt-1 pb-1' required></input>
                </div>

                <button className='btn btn-success mt-4 mb-4 fs-5 pt-1 pb-1'>Update</button>
            </Form>
        </div>
    )
}

export default EmployeeForm