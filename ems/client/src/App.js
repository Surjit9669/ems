import './App.css';
import EmpoleeTable from './Commponents/EmpoleeTable';
import DisplayEmploeeTable from './Commponents/DisplayEmploeeTable';
import { useEffect, useState } from 'react';
import { getAllEmployeeData } from './apiRequests';


function App() {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    restApiToGetAllEmployee()
  }, []);

  const restApiToGetAllEmployee = () => {
    getAllEmployeeData()
      .then((res) => {
        setEmployeeData(res?.data);
      })
      .catch((err) => console.log(err));
  }


  return (
    <div className="App">
      <EmpoleeTable updateData={restApiToGetAllEmployee} />
      <DisplayEmploeeTable
        employeeData={employeeData}
        setEmployeeData={setEmployeeData}
        updateData={restApiToGetAllEmployee}
      />
    </div>
  );
}

export default App;
