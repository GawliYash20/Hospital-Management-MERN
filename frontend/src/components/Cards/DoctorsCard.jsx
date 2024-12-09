import React from "react";
import './DoctorCard.css';

function DoctorsCard({ doctor, onEdit, onDelete }) {
  return (
    <>
      
      <div className="doctor-card">
        <p>
          {doctor.name} - {doctor.speciality}
        </p>
        <div className="btn-container">
          <button onClick={() => onEdit(doctor)}>Edit</button>
          <button onClick={() => onDelete(doctor._id)}>Delete</button>
        </div>
      </div>
    </>
  );
}

export default DoctorsCard;
