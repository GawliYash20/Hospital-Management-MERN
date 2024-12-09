import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Patients.css";
import PatientsCard from "./Cards/PatientsCard";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5000/patients";

  // Fetch patients from the API
  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPatients(response.data); // Ensure the response is an array before updating state
        } else {
          console.error(
            "Patient data is not in the expected format: ",
            response.data
          );
          setPatients([]); // Reset patients if the response format is incorrect
        }
      })
      .catch((error) => {
        console.log("Error fetching patients: ", error);
        setPatients([]); // Handle fetch error
      })
      .finally(() => {
        setLoading(false); // Stop loading once the fetch is complete
      });
  }, []);

  // Add new patient
  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.age || !newPatient.gender) {
      alert("Please fill all fields"); // Alert if required fields are missing
      return;
    }

    axios
      .post(`${API_BASE_URL}/add`, newPatient) // Pass the new patient data in the POST request
      .then((response) => {
        setPatients([...patients, response.data]); // Add the new patient to the state
        setNewPatient({ name: "", age: "", gender: "" }); // Reset the form fields
      })
      .catch((error) => console.error("Error adding patient", error));
  };

  // Update existing patient
  const handleUpdatePatient = (id, e) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("No Patient Selected"); // Alert if no patient is selected for editing
      return;
    }
    axios
      .put(`${API_BASE_URL}/update/${id}`, selectedPatient) // Pass the updated patient data in the PUT request
      .then(() => {
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient._id === id ? { ...selectedPatient } : patient
          )
        ); // Update the patient in the state
        setSelectedPatient(null); // Clear the selected patient
        setIsEditMode(false); // Exit edit mode
      })
      .catch((error) => console.error("Error updating patient: ", error));
  };

  // Delete patient
  const handleDeletePatient = (id) => {
    axios.delete(`${API_BASE_URL}/delete/${id}`).then(() => {
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient._id !== id)
      ); // Remove the deleted patient from the state
    });
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    if (isEditMode) {
      setSelectedPatient({ ...selectedPatient, [field]: value }); // Update the selected patient in edit mode
    } else {
      setNewPatient({ ...newPatient, [field]: value }); // Update the new patient in add mode
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <div className="flex-row" style={{ width: "100%" }}>
      {/* Add/Edit Patient Form */}
      <div className="flex-column">
        <div className="add-form">
          <form
            className="patient-form"
            onSubmit={
              (e) =>
                isEditMode
                  ? handleUpdatePatient(selectedPatient._id, e) // Submit for updating
                  : handleAddPatient(e) // Submit for adding
            }
          >
            <h4>{isEditMode ? "Edit Patient" : "Add Patient"}</h4>
            <label>Name:</label>
            <input
              type="text"
              value={
                isEditMode
                  ? selectedPatient?.name || "" // Show selected patient's name in edit mode
                  : newPatient?.name || "" // Show new patient's name in add mode
              }
              onChange={(e) => handleInputChange("name", e.target.value)} // Handle name input change
            />

            <label>Age:</label>
            <input
              type="number"
              value={
                isEditMode
                  ? selectedPatient?.age || "" // Show selected patient's age in edit mode
                  : newPatient?.age || "" // Show new patient's age in add mode
              }
              onChange={(e) => handleInputChange("age", e.target.value)} // Handle age input change
            />

            <label>Gender:</label>
            <input
              type="text"
              value={
                isEditMode
                  ? selectedPatient?.gender || "" // Show selected patient's gender in edit mode
                  : newPatient?.gender || "" // Show new patient's gender in add mode
              }
              onChange={(e) => handleInputChange("gender", e.target.value)} // Handle gender input change
            />

            <button type="submit">
              {isEditMode ? "Update Patient" : "Add Patient"}{" "}
              {/* Update button text dynamically */}
            </button>
          </form>
        </div>
      </div>

      {/* Patients List */}
      <div className="patients">
        <h3>Patients ({patients.length})</h3>{" "}
        {/* Display the count of patients */}
        <div className="patient-list">
          {patients.map((patient) => (
            <PatientsCard
              key={patient._id} // Assign a unique key to each patient card
              patient={patient}
              onEdit={() => {
                setSelectedPatient(patient); // Set the patient to be edited
                setIsEditMode(true); // Enter edit mode
              }}
              onDelete={() => handleDeletePatient(patient._id)} // Handle patient deletion
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Patients;
