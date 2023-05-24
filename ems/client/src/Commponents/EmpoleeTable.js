import React, { useState } from 'react';
import { addEmployee } from '../apiRequests';

const EmpoleeTable = ({ updateData }) => {
    const initialState = {
        name: '',
        department: '',
        salary: '',
    };
    const [employeeData, setEmployeeData] = useState(initialState);
    const [warning, setWarning] = useState('');


    //send data to server
    const addEmployeeData = async () => {
        await addEmployee(employeeData)
            .then((res) => {
                console.log(res?.data?.message)
                updateData()
            })
            .catch((err) => console.log(err));
    };

    //input change
    const handleChange = (e) => {
        setEmployeeData({
            ...employeeData,
            [e.target.name]: e.target.value,
        });
        setWarning('');
    };

    //add button fun.
    const handleOnSubmit = (e) => {
        e.preventDefault()
        employeeData.name = employeeData?.name.trimStart().trimEnd();
        employeeData.department = employeeData?.department
            .trimStart()
            .trimEnd();
        employeeData.salary = employeeData?.salary.trimStart().trimEnd();
        if (
            employeeData?.name?.length > 0 &&
            employeeData?.department?.length > 0 &&
            employeeData?.salary?.length > 0
        ) {
            addEmployeeData();
            setEmployeeData(initialState);
        } else {
            setWarning('All fields are Requried');
        }
    };




    return (
        <div className="mt-3 mb-5 d-flex flex-column justify-content-center align-items-center">
            <h2> Add New Employee </h2>
            <form onSubmit={handleOnSubmit} className='w-75 d-flex flex-column justify-content-center align-items-center' >
                <table className="table table-bordered w-75 mt-3">
                    <thead>
                        <tr>
                            <th scope="col" className="th-lg">
                                <label htmlFor="name">Employee Name</label>
                            </th>
                            <th scope="col" className="th-lg">
                                <label htmlFor="department">Department</label>
                            </th>
                            <th scope="col" className="th-lg">
                                <label htmlFor="salary">Salary  </label>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name={'name'}
                                    id="name"
                                    value={employeeData.name}
                                    required
                                />{' '}
                            </td>
                            <td>
                                <textarea
                                    type="text"
                                    onChange={handleChange}
                                    name={'department'}
                                    value={employeeData.department}
                                    id="department"
                                    rows="1"
                                    required
                                >

                                </textarea>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    onChange={handleChange}
                                    name={'salary'}
                                    value={employeeData.salary}
                                    id="salary"
                                    required
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                >
                                    Add
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

        </div>
    );
};

export default EmpoleeTable;
