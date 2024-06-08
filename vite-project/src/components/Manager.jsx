import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManagerApp() {
  const [managers, setManagers] = useState([]);
  const [newManagerName, setNewManagerName] = useState('');
  const [managerIdToUpdate, setManagerIdToUpdate] = useState('');
  const [updatedManagerName, setUpdatedManagerName] = useState('');
  const [managerIdToDelete, setManagerIdToDelete] = useState('');

  const getAllManagers = () => {
    axios.get(`http://localhost:8080/manager`)
      .then(response => {
        setManagers(response.data);
      })
      .catch(error => {
        console.error('Error getting managers:', error);
      });
  };

  const addManager = () => {
    axios.post(`http://localhost:8080/manager`, null, { params: { name: newManagerName } })
      .then(response => {
        setManagers([...managers, response.data]);
        setNewManagerName('');
      })
      .catch(error => {
        console.error('Error adding manager:', error.response.data);
      });
  };

  const updateManager = (id, newName) => {
    axios.put(`http://localhost:8080/manager`, null, { params: { id: id, name: newName } })
      .then(response => {
        console.log(`Manager ${id} updated:`, response.data);
        const updatedManagers = managers.map(manager => {
          if (manager.id === id) {
            return { ...manager, name: newName };
          }
          return manager;
        });
        setManagers(updatedManagers);
      })
      .catch(error => {
        console.error(`Error updating manager ${id}:`, error.response.data);
      });
  };

  const deleteManager = (id) => {
    axios.delete(`http://localhost:8080/manager`, { params: { id } })
      .then(response => {
        const updatedManagers = managers.filter(manager => manager.id !== id);
        setManagers(updatedManagers);
      })
      .catch(error => {
        console.error(`Error deleting manager ${id}:`, error.response.data);
      });
  };

  const handleNewManagerNameChange = (e) => {
    setNewManagerName(e.target.value);
  };

  const handleManagerIdToUpdateChange = (e) => {
    setManagerIdToUpdate(e.target.value);
  };

  const handleUpdatedManagerNameChange = (e) => {
    setUpdatedManagerName(e.target.value);
  };

  const handleManagerIdToDeleteChange = (e) => {
    setManagerIdToDelete(e.target.value);
  };

  return (
    <div className="container">
      <div className="section">
        <h1>All Managers</h1>
        <div className="input-section">
          <button onClick={getAllManagers}>Get All</button>
        </div>
        {managers.length > 0 && (
          <div className="manager-info">
            <h2>All Managers</h2>
            {managers.map(manager => (
              <div key={manager.id}>
                <p>ID: {manager.id}</p>
                <p>Name: {manager.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section">
        <h1>Add Manager</h1>
        <div className="input-section">
          <input type="text" placeholder="Manager Name" value={newManagerName} onChange={handleNewManagerNameChange} />
          <button onClick={addManager}>Add</button>
        </div>
      </div>

      <div className="section">
        <h1>Update Manager</h1>
        <div className="input-section">
          <input type="text" placeholder="Manager ID to Update" value={managerIdToUpdate} onChange={handleManagerIdToUpdateChange} />
          <input type="text" placeholder="New Manager Name" value={updatedManagerName} onChange={handleUpdatedManagerNameChange} />
          <button onClick={() => updateManager(managerIdToUpdate, updatedManagerName)}>Update</button>
        </div>
      </div>

      <div className="section">
        <h1>Delete Manager</h1>
        <div className="input-section">
          <input type="text" placeholder="Manager ID to Delete" value={managerIdToDelete} onChange={handleManagerIdToDeleteChange} />
          <button onClick={() => deleteManager(managerIdToDelete)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ManagerApp;
