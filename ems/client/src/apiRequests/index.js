import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:4000" });

//get all employee data
export const getAllEmployeeData = () => {
    return API.get(`/employee`)
}

//add Employee data
export const addEmployee = (data) => {
    return API.post(`/employee`, data)
}

//update Employee data
export const updateEmployee = (id, data) => {
    return API.put(`/employee/${id}`, data)
}

//delete employee
export const deleteEmployee = (id) => {
    return API.delete(`employee/${id}`)
}

