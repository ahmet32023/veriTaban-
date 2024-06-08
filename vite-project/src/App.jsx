import React from 'react'
import Position from './components/Position.jsx'
import Departmant from './components/Departmant.jsx'
import Manager from './components/Manager.jsx'
import Human from './components/Human.jsx'

const App = () => {
  return (
    <div>
      <Position />
      <div style={{ marginBottom: '20px' }}></div> {/* Boşluk */}
      <Departmant />
      <div style={{ marginBottom: '20px' }}></div> {/* Boşluk */}
      <Manager />
      <div style={{ marginBottom: '20px' }}></div> {/* Boşluk */}
      <Human />
    </div>
  )
}

export default App
