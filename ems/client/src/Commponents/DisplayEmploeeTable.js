import React from 'react';
import { useEffect, useState } from 'react';
import { deleteEmployee, getAllEmployeeData } from '../apiRequests';
import ModalForUpdate from './ModalForUpdate';
import TableHeadColumn from './TableHeadColumn';

const DisplayEmploeeTable = ({ employeeData, setEmployeeData, updateData }) => {
    const columns = [{
        key: 'name',
        label: 'Employees name'
    },
    {
        key: 'department',
        label: 'Departments'
    },
    {
        key: 'salary',
        label: 'Salary'
    }
    ]
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalData, setModalData] = useState({})
    const [sortBy, setSortBy] = useState('name')
    const [sortOrder, setSortOrder] = useState('asc')




    //delete api call
    const callDeleteApi = async (id) => {
        await deleteEmployee(id)
            .then((res) => {
                console.log(res?.data?.message)
                updateData()
            })
            .catch((err) => console.log(err));
    };

    const handleUpdateBtn = (data) => {
        setIsModalOpen(true)
        setModalData(data)

    };

    //delete Btn
    const deleteBtn = (id) => {
        callDeleteApi(id);
    };

    //handle close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const sortStringValues = (a, b) => {
        if (a[sortBy] < b[sortBy]) {
            return -1;
        }
        if (a[sortBy] > b[sortBy]) {
            return 1;
        }
        return 0;
    }

    const sortNumberValues = (a, b) => {
        if (sortOrder === 'asc') {
            return Number(a[sortBy]) - Number(b[sortBy])
        }
        return Number(b[sortBy]) - Number(a[sortBy])
    }

    const handleSort = (key) => {
        if (key !== sortBy) {
            setSortBy(key)
            setSortOrder('asc')
        } else {
            sortOrder === 'asc' ? setSortOrder('dsc') : setSortOrder('asc')
        }
    }

    useEffect(() => {
        let sorted = []
        if (sortBy === 'salary') {
            sorted = employeeData.sort(sortNumberValues)
        }
        else {
            sorted = employeeData.sort((a, b) => sortOrder === 'asc' ? sortStringValues(a, b) : sortStringValues(b, a))
        }
        setEmployeeData([...sorted])
    }, [sortBy, sortOrder])

    return (
        <>
            <hr ></hr>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className='mb-3'>Employee Details </h2>
                <table className="table table-bordered w-75">
                    <thead>
                        <tr>
                            {columns.map(ele => (
                                <TableHeadColumn
                                    key={ele.key}
                                    id={ele.key}
                                    label={ele.label}
                                    sortBy={sortBy}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                />))}
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {employeeData?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item?.name} </td>
                                    <td>{item?.department} </td>
                                    <td>{item?.salary}  </td>
                                    <td className='w-25'>
                                        <div className="d-flex justify-content-center gap-3">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    handleUpdateBtn(item)
                                                }
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deleteBtn(item?._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table >
            </div >
            <div>
                <ModalForUpdate
                    isOpen={isModalOpen}
                    data={modalData}
                    handleClose={handleCloseModal}
                    employeeData={employeeData}
                    setEmployeeData={setEmployeeData}
                />
            </div>
        </>


    );
};

export default DisplayEmploeeTable;
