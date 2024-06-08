import React, { useState, useEffect } from 'react';
import axios from 'axios';


function DepartmentApp() {
  // State tanımlamaları
  const [departments, setDepartments] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [departmentIdToUpdate, setDepartmentIdToUpdate] = useState('');
  const [updatedDepartmentName, setUpdatedDepartmentName] = useState('');
  const [departmentIdToDelete, setDepartmentIdToDelete] = useState('');

  // Tüm departmanları getirme işlemi
  const getAllDepartments = () => {
    axios.get(`http://localhost:8080/departmant`)
      .then(response => {
        console.log('Tüm departmanlar getirildi:', response.data);
        // Tüm departmanları güncelleme
        setDepartments(response.data);
      })
      .catch(error => {
        console.error('Tüm departmanları getirme hatası:', error);
      });
  };

  // Yeni departman eklemek için post işlemi
  const addDepartment = () => {
    axios.post(`http://localhost:8080/departmant`, null, { params: { name: newDepartmentName } })
      .then(response => {
        console.log('Yeni departman eklendi:', response.data);
        // Yeni departmanı listeye ekleme
        setDepartments([...departments, response.data]);
        // Yeni departman adını temizleme
        setNewDepartmentName('');
      })
      .catch(error => {
        console.error('Departman ekleme hatası:', error.response.data);
      });
  };

  // Departman güncelleme işlemi
  const updateDepartment = (id, newName) => {
    axios.put(`http://localhost:8080/departmant`, null, { params: { id: id, name: newName } })
      .then(response => {
        console.log(`Departman ${id} güncellendi:`, response.data);
        // Güncellenmiş departman bilgilerini listeye ekler
        const updatedDepartments = departments.map(department => {
          if (department.id === id) {
            return { ...department, name: newName };
          }
          return department;
        });
        setDepartments(updatedDepartments);
      })
      .catch(error => {
        console.error(`Departman ${id} güncelleme hatası:`, error.response.data);
      });
  };

  // Departman silme işlemi
  const deleteDepartment = (id) => {
    axios.delete(`http://localhost:8080/departmant`, { params: { id: id } })
      .then(response => {
        console.log(`Departman ${id} silindi:`, response.data);
        // Silinen departmanı listeden kaldırma
        const updatedDepartments = departments.filter(department => department.id !== id);
        setDepartments(updatedDepartments);
      })
      .catch(error => {
        console.error(`Departman ${id} silme hatası:`, error.response.data);
      });
  };

  // Input değişiklikleri
  const handleNewDepartmentNameChange = (e) => {
    setNewDepartmentName(e.target.value);
  };

  const handleDepartmentIdToUpdateChange = (e) => {
    setDepartmentIdToUpdate(e.target.value);
  };

  const handleUpdatedDepartmentNameChange = (e) => {
    setUpdatedDepartmentName(e.target.value);
  };

  const handleDepartmentIdToDeleteChange = (e) => {
    setDepartmentIdToDelete(e.target.value);
  };

  return (
    <div className="container">
      <div className="section">
        <h1>Tüm Departmanları Getir</h1>
        <div className="input-section">
          <button onClick={getAllDepartments}>Tümünü Getir</button>
        </div>
        {/* Departman bilgisi */}
        {departments.length > 0 && (
          <div className="department-info">
            <h2>Tüm Departmanlar</h2>
            {departments.map(department => (
              <div key={department.id}>
                <p>ID: {department.id}</p>
                <p>İsim: {department.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section">
        <h1>Yeni Departman Ekle</h1>
        <div className="input-section">
          <input type="text" placeholder="Departman Adı" value={newDepartmentName} onChange={handleNewDepartmentNameChange} />
          <button onClick={addDepartment}>Ekle</button>
        </div>
      </div>

      <div className="section">
        <h1>Departman Güncelle</h1>
        <div className="input-section">
          <input type="text" placeholder="Güncellenecek Departman ID" value={departmentIdToUpdate} onChange={handleDepartmentIdToUpdateChange} />
          <input type="text" placeholder="Yeni Departman Adı" value={updatedDepartmentName} onChange={handleUpdatedDepartmentNameChange} />
          <button onClick={() => updateDepartment(departmentIdToUpdate, updatedDepartmentName)}>Güncelle</button>
        </div>
      </div>

      <div className="section">
        <h1>Departman Sil</h1>
        <div className="input-section">
          <input type="text" placeholder="Silinecek Departman ID" value={departmentIdToDelete} onChange={handleDepartmentIdToDeleteChange} />
          <button onClick={() => deleteDepartment(departmentIdToDelete)}>Sil</button>
        </div>
      </div>
    </div>
  );
}

export default DepartmentApp;
