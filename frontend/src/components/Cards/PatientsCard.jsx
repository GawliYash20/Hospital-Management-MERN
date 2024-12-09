import React from 'react'
import './PatientCard.css'

function PatientsCard({patient, onEdit, onDelete}) {
  return (
    <>
    <div className='patient-card'>
      <p>
        <span>Name: </span>{patient.name}
      </p>
      <p>
        <span>Age: </span>{patient.age}
      </p>
      <p>
        <span>Gender: </span>{patient.gender}
      </p>
      <div className='btn-container'>
        <button onClick={() => onEdit(patient)}>Edit</button>
        <button onClick={() => onDelete(patient._id)}>Delete</button>
      </div>
    </div>
    </>
  )
}

export default PatientsCard;