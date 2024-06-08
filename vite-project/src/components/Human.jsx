import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HumanApp() {
  const [humans, setHumans] = useState([]);
  const [newHuman, setNewHuman] = useState({
    employee_name: '',
    married: true,
    maritalStatus: 'BEKAR',
    gender: true,
    employeeStatusId: 0,
    departmantId: 1,
    performanceScore: 'KOTU',
    salary: 0,
    term: true,
    positionId: 2,
    dob: '',
    hispanicLatino: true,
    dateOfHire: '',
    termReason: '',
    managerId: 1,
    recruitmentSource: '',
    engagementSurvival: 0,
    employeeSatisfaction: 'ONE',
    specialProject: 0,
    daysLateLast30: 0,
    absences: 0,
    lastPerformanceScore: '',
    fromDiversityJobFair: true
  });

  useEffect(() => {
    getAllHumans();
  }, []);

  const getAllHumans = () => {
    axios.get(`http://localhost:8080/human`)
      .then(response => {
        console.log('Tüm insanlar getirildi:', response.data);
        setHumans(response.data);
      })
      .catch(error => {
        console.error('Tüm insanları getirme hatası:', error);
      });
  };

  const addHuman = () => {
    axios.post(`http://localhost:8080/human`, JSON.stringify(newHuman), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Yeni insan eklendi:', response.data);
        setHumans([...humans, response.data]);
        setNewHuman({
           employee_name: '',
          married: true,
          maritalStatus: 'BEKAR',
          gender: true,
          employeeStatusId: 0,
          departmantId: 1,
          performanceScore: 'KOTU',
          salary: 0,
          term: true,
          positionId: 2,
          dob: '',
          hispanicLatino: true,
          dateOfHire: '',
          termReason: '',
          managerId: 1,
          recruitmentSource: '',
          engagementSurvival: 0,
          employeeSatisfaction: 'ONE',
          specialProject: 0,
          daysLateLast30: 0,
          absences: 0,
          lastPerformanceScore: '',
          fromDiversityJobFair: true
        });
      })
      .catch(error => {
        console.error('İnsan ekleme hatası:', error.response.data);
      });
  };
  
  const deleteHuman = (id) => {
    axios.delete(`http://localhost:8080/human?id=${id}`)
      .then(response => {
        console.log('İnsan başarıyla silindi:', id);
        setHumans(humans.filter(human => human.id !== id));
      })
      .catch(error => {
        console.error('İnsan silme hatası:', error);
      });
  };
  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let inputValue = value;
  
    // Checkboklar için özel işlem
    if (type === 'checkbox') {
      inputValue = checked;
    }
  
    // Diğer durumlarda değeri doğrudan al
    setNewHuman({ ...newHuman, [name]: inputValue });
  };
  
  


  return (
    <div className="container">
      <div className="section">
        <h1>Tüm İnsanları Getir</h1>
        <div className="input-section">
          <button onClick={getAllHumans}>Tümünü Getir</button>
        </div>
        {/* İnsan bilgisi */}
        {humans.length > 0 && (
          <div className="human-info">
            <h2>Tüm İnsanlar</h2>
            {humans.map(human => (
              <div key={human.id} className="human">
                <p>ID: {human.id}</p>
                <p>İsim: {human.employee_name}</p>
                {/* Diğer özellikler buraya eklenebilir */}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section">
  <h1>Yeni İnsan Ekle</h1>
  <div className="input-section">
    <label>İsim:</label>
    <input type="text" name="employee_name" value={newHuman.employee_name} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Evli mi?</label>
    <input type="checkbox" name="married" checked={newHuman.married} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Medeni Durum:</label>
    <select name="maritalStatus" value={newHuman.maritalStatus} onChange={handleInputChange}>
      <option type="text" value="1">Bekar</option>
      <option type="text" value="2">Evli</option>
      <option type="text" value="3">Dul</option>
      <option type="text" value="4">Boşanmış</option>
      <option type="text" value="5">Ayrı yaşayan</option>
    </select>
  </div>
  <div className="input-section">
    <label>Cinsiyet:</label>
    <select name="gender" value={newHuman.gender} onChange={handleInputChange}>
      <option value={true}>Erkek</option>
      <option value={false}>Kadın</option>
    </select>
  </div>
  <div className="input-section">
    <label>Çalışan Durumu ID:</label>
    <input type="number" name="employeeStatusId" value={newHuman.employeeStatusId} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Departman ID:</label>
    <input type="number" name="departmantId" value={newHuman.departmantId} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Performans Skoru:</label>
    <input type="text" name="performanceScore" value={newHuman.performanceScore} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Maaş:</label>
    <input type="number" name="salary" value={newHuman.salary} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Çalışma Süresi:</label>
    <input type="checkbox" name="term" checked={newHuman.term} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Pozisyon ID:</label>
    <input type="number" name="positionId" value={newHuman.positionId} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Doğum Tarihi:</label>
    <input type="text" name="dob" placeholder="GG-AA-YYYY" value={newHuman.dob} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Hispanic/Latino:</label>
    <input type="checkbox" name="hispanicLatino" checked={newHuman.hispanicLatino} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>İşe Giriş Tarihi:</label>
    <input type="text" name="dateOfHire" placeholder="GG-AA-YYYY" value={newHuman.dateOfHire} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>İşten Ayrılma Nedeni:</label>
    <input type="text" name="termReason" value={newHuman.termReason} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Yönetici ID:</label>
    <input type="number" name="managerId" value={newHuman.managerId} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>İşe Alım Kaynağı:</label>
    <input type="text" name="recruitmentSource" value={newHuman.recruitmentSource} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>İşte Kalma Süresi:</label>
    <input type="number" name="engagementSurvival" value={newHuman.engagementSurvival} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Çalışan Memnuniyeti:</label>
    <input type="text" name="employeeSatisfaction" value={newHuman.employeeSatisfaction} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Özel Proje:</label>
    <input type="number" name="specialProject" value={newHuman.specialProject} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Son 30 Günde Gecikme Sayısı:</label>
    <input type="number" name="daysLateLast30" value={newHuman.daysLateLast30} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Devamsızlık Sayısı:</label>
    <input type="number" name="absences" value={newHuman.absences} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Son Performans Skoru Tarihi:</label>
    <input type="text" name="lastPerformanceScore" placeholder="GG-AA-YYYY" value={newHuman.lastPerformanceScore} onChange={handleInputChange} />
  </div>
  <div className="input-section">
    <label>Çeşitlilik İş Fuarından Mı Geldi?</label>
    <input type="checkbox" name="fromDiversityJobFair" checked={newHuman.fromDiversityJobFair} onChange={handleInputChange} />
  </div>
  <button onClick={addHuman}>Ekle</button>
</div>
        <div className="section">
                <h1>İnsan Sil</h1>
                <div className="input-section">
                <label>Silinecek İnsan ID:</label>
                <input type="text" value={newHuman.id} onChange={(e) => setNewHuman({ ...newHuman, id: e.target.value })} />
                <button onClick={() => deleteHuman(newHuman.id)}>Sil</button>
                </div>
            </div>

    </div>
  );
}

export default HumanApp;
