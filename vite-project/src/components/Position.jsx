import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Position.css'

function Position() {
  // State tanımlamaları
  const [positions, setPositions] = useState([]);
  const [newPositionName, setNewPositionName] = useState('');
  const [positionIdToUpdate, setPositionIdToUpdate] = useState('');
  const [updatedPositionName, setUpdatedPositionName] = useState('');
  const [positionIdToDelete, setPositionIdToDelete] = useState('');

  // Tüm pozisyonları getirme işlemi
  const getAllPositions = () => {
    axios.get(`http://localhost:8080/position`)
      .then(response => {
        console.log('Tüm pozisyonlar getirildi:', response.data);
        // Tüm pozisyonları güncelleme
        setPositions(response.data);
      })
      .catch(error => {
        console.error('Tüm pozisyonları getirme hatası:', error);
      });
  };

  // Yeni pozisyon eklemek için post işlemi
  const addPosition = () => {
    axios.post(`http://localhost:8080/position`, null, { params: { name: newPositionName } })
      .then(response => {
        console.log('Yeni pozisyon eklendi:', response.data);
        // Yeni pozisyonu listeye ekleme
        setPositions([...positions, response.data]);
        // Yeni pozisyon adını temizleme
        setNewPositionName('');
      })
      .catch(error => {
        console.error('Pozisyon ekleme hatası:', error.response.data);
      });
  };

  // Pozisyon güncelleme işlemi
  const updatePosition = (id, newName) => {
    axios.put(`http://localhost:8080/position`, null, { params: { id: id, name: newName } })
      .then(response => {
        console.log(`Pozisyon ${id} güncellendi:`, response.data);
        // Güncellenmiş pozisyon bilgilerini listeye ekler
        const updatedPositions = positions.map(position => {
          if (position.id === id) {
            return { ...position, name: newName };
          }
          return position;
        });
        setPositions(updatedPositions);
      })
      .catch(error => {
        console.error(`Pozisyon ${id} güncelleme hatası:`, error.response.data);
      });
  };

  // Pozisyon silme işlemi
  const deletePosition = (id) => {
    axios.delete(`http://localhost:8080/position`, { params: { id: id } })
      .then(response => {
        console.log(`Pozisyon ${id} silindi:`, response.data);
        // Silinen pozisyonu listeden kaldırma
        const updatedPositions = positions.filter(position => position.id !== id);
        setPositions(updatedPositions);
      })
      .catch(error => {
        console.error(`Pozisyon ${id} silme hatası:`, error.response.data);
      });
  };

  // Input değişiklikleri
  const handleNewPositionNameChange = (e) => {
    setNewPositionName(e.target.value);
  };

  const handlePositionIdToUpdateChange = (e) => {
    setPositionIdToUpdate(e.target.value);
  };

  const handleUpdatedPositionNameChange = (e) => {
    setUpdatedPositionName(e.target.value);
  };

  const handlePositionIdToDeleteChange = (e) => {
    setPositionIdToDelete(e.target.value);
  };

  return (
    <div className="container">
      <div className="section">
        <h1>Tüm Pozisyonları Getir</h1>
        <div className="input-section">
          <button onClick={getAllPositions}>Tümünü Getir</button>
        </div>
        {/* Pozisyon bilgisi */}
        {positions.length > 0 && (
          <div className="position-info">
            <h2>Tüm Pozisyonlar</h2>
            {positions.map(position => (
              <div key={position.id}>
                <p>ID: {position.id}</p>
                <p>İsim: {position.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section">
        <h1>Yeni Pozisyon Ekle</h1>
        <div className="input-section">
          <input type="text" placeholder="Pozisyon Adı" value={newPositionName} onChange={handleNewPositionNameChange} />
          <button onClick={addPosition}>Ekle</button>
        </div>
      </div>

      <div className="section">
        <h1>Pozisyon Güncelle</h1>
        <div className="input-section">
          <input type="text" placeholder="Güncellenecek Pozisyon ID" value={positionIdToUpdate} onChange={handlePositionIdToUpdateChange} />
          <input type="text" placeholder="Yeni Pozisyon Adı" value={updatedPositionName} onChange={handleUpdatedPositionNameChange} />
          <button onClick={() => updatePosition(positionIdToUpdate, updatedPositionName)}>Güncelle</button>
        </div>
      </div>

      <div className="section">
        <h1>Pozisyon Sil</h1>
        <div className="input-section">
          <input type="text" placeholder="Silinecek Pozisyon ID" value={positionIdToDelete} onChange={handlePositionIdToDeleteChange} />
          <button onClick={() => deletePosition(positionIdToDelete)}>Sil</button>
        </div>
      </div>
    </div>
  );
}

export default Position;