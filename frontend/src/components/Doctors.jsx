import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Doctors.css";
import DoctorsCard from "./Cards/DoctorsCard";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    speciality: "",
  });

  const [selectedDoctor, setSelectedDoctor] = useState({
    name: "",
    speciality: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5000/doctors";

  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDoctors(response.data);
        } else {
          console.error(
            "Doctor data is not in expected format: ",
            response.data
          );
          setDoctors([]);
        }
      })
      .catch((error) => {
        console.log("Error fetching doctors: ", error);
        setDoctors([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddDoctors = (e) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.speciality) {
      alert("Please fill all fields");
      return;
    }
    axios
      .post(`${API_BASE_URL}/add`, newDoctor)
      .then((response) => {
        setDoctors([...doctors, response.data]);
        setNewDoctor({ name: "", speciality: "" });
      })
      .catch((error) => console.error("Error adding doctor: ", error));
  };

  const handleUpdateDoctors = (id, e) => {
    e.preventDefault();
    if (!selectedDoctor) {
      alert("No Doctor selected!");
      return;
    }
    axios
      .put(`${API_BASE_URL}/update/${id}`, selectedDoctor)
      .then(() => {
        setDoctors((prevDoctors) =>
          prevDoctors.map((doctor) =>
            doctor._id === id
              ? { ...selectedDoctor, _id: selectedDoctor._id }
              : doctor
          )
        );
        setSelectedDoctor({ name: "", speciality: "" });
        setIsEditMode(false);
      })
      .catch((error) => console.error("Error updating Doctor: ", error));
  };

  const handleDeleteDoctor = (id) => {
    axios
      .delete(`${API_BASE_URL}/delete/${id}`)
      .then(() => {
        setDoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting doctor"));
  };

  const handleInputChange = (field, value) => {
    if (isEditMode) {
      setSelectedDoctor({ ...selectedDoctor, [field]: value });
    } else {
      setNewDoctor({ ...newDoctor, [field]: value });
    }
  };

  const handleEditDoctors = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditMode(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "100%" }}>
      <div className=" flex-row ">
        <div className="add-form">
          <form
            className="doctor-form"
            onSubmit={(e) =>
              isEditMode
                ? handleUpdateDoctors(selectedDoctor._id, e)
                : handleAddDoctors(e)
            }
          >
            <h4>{isEditMode ? "Edit Doctor" : "Add Doctor"}</h4>
            <label>Doctor's name:</label>
            <input
              type="text"
              value={
                isEditMode ? selectedDoctor?.name || "" : newDoctor?.name || ""
              }
              onChange={(e) => handleInputChange("name", e.target.value)}
            />

            <label>Speciality:</label>
            <input
              type="text"
              value={
                isEditMode
                  ? selectedDoctor?.speciality || ""
                  : newDoctor.speciality || ""
              }
              onChange={(e) => handleInputChange("speciality", e.target.value)}
            />

            <button type="submit">
              {isEditMode ? "Update Doctor" : "Add Doctor"}
            </button>
          </form>
        </div>

        
        <div className="doctors">
          <h4>Doctors ({doctors.length})</h4>
          {loading ? (
            <p>Loading Doctors.....</p>
          ) : (
            <div className="doctors-list">
              {doctors.map((doctor) => (
                <DoctorsCard
                  key={doctor._id}
                  doctor={doctor}
                  onEdit={() => handleEditDoctors(doctor)}
                  onDelete={() => handleDeleteDoctor(doctor._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
