import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import EmployeeForm from './EmployeeForm'



const ModalForUpdate = ({ isOpen, data, handleClose, employeeData, setEmployeeData }) => {
    return (
        <div>
            <Modal show={isOpen} className='modal' >
                <ModalHeader className='modal-header'>
                    <h3>Update Employee</h3>
                    <button className='btn' onClick={handleClose} ><span >&times;</span></button>
                </ModalHeader>
                <ModalBody>
                    <EmployeeForm preFillData={data} handleClose={handleClose} setEmployeeData={setEmployeeData} employeeData={employeeData} />
                </ModalBody>
            </Modal>

        </div>
    )
}

export default ModalForUpdate

