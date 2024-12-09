import React, { useState, useEffect } from "react";
import axios from "axios";
import AppointmentCard from "./Cards/AppointmentCard";
import "./Appointment.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorName: "",
    date: "",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5000/appointments";

  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => {
        console.log("API response: ", response.data);
        // Check if 'appointments' is in the response and is an array
        if (Array.isArray(response.data)) {
          setAppointments(response.data); // Set appointments from the response
        } else {
          console.error(
            "appointments data is not in expected format",
            response.data
          );
          setAppointments([]); // Set to empty array if data is not in the expected format
        }
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setAppointments([]); // Set to empty array if error occurs
      })
      .finally(() => {
        setLoading(false); // Always set loading to false after the fetch attempt
      });
  }, []);

  // useEffect(() => {
  //   console.log("Appointments state updated: ", appointments);
  // }, [appointments]); // Log when appointments state is updated

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (
      !newAppointment.patientName ||
      !newAppointment.doctorName ||
      !newAppointment.date
    ) {
      alert("Please fill all fields.");
      return;
    }
    axios
      .post(`${API_BASE_URL}/add`, newAppointment)
      .then((response) => {
        // Update state with the new appointment
        setAppointments((prevAppointments) => [
          ...prevAppointments,
          response.data,
        ]);
        setNewAppointment({ patientName: "", doctorName: "", date: "" });
      })
      .catch((error) => console.error("Error adding appointment:", error));
  };

  const handleUpdateAppointment = (id, e) => {
    e.preventDefault();
    if (!selectedAppointment) {
      alert("No appointment selected for editing.");
      return;
    }
    axios
      .put(
        `${API_BASE_URL}/update/${selectedAppointment._id}`,
        selectedAppointment
      )
      .then(() => {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === id
              ? { ...selectedAppointment, _id: selectedAppointment._id }
              : appointment
          )
        );
        setSelectedAppointment(null);
        setIsEditMode(false);
      })
      .catch((error) => console.error("Error updating appointment:", error));
  };

  const handleDeleteAppointment = (id) => {
    axios
      .delete(`${API_BASE_URL}/delete/${id}`)
      .then(() => {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditMode(true);
  };

  const handleInputChange = (field, value) => {
    if (isEditMode) {
      setSelectedAppointment({ ...selectedAppointment, [field]: value });
    } else {
      setNewAppointment({ ...newAppointment, [field]: value });
    }
  };

  const formatDateForInput = (date) => {
    return date ? date.slice(0, 10) : ""; // Extracts the 'yyyy-MM-dd' part from the ISO date string
  };

  return (
    <div className="flex-row" style={{ width: "100%" }}>
      <div className="flex-column">
        <div className="add-form">
          <form
            className="appointment-form"
            onSubmit={(e) =>
              isEditMode
                ? handleUpdateAppointment(selectedAppointment._id, e)
                : handleAddAppointment(e)
            }
          >
            <h4>{isEditMode ? "Edit Appointment" : "Add New Appointment"}</h4>
            <label>Patient Name:</label>
            <input
              type="text"
              value={
                isEditMode
                  ? selectedAppointment?.patientName || ""
                  : newAppointment?.patientName || ""
              }
              onChange={(e) => handleInputChange("patientName", e.target.value)}
            />
            <label>Doctor Name:</label>
            <input
              type="text"
              value={
                isEditMode
                  ? selectedAppointment?.doctorName || ""
                  : newAppointment?.doctorName || ""
              }
              onChange={(e) => handleInputChange("doctorName", e.target.value)}
            />
            <label>Date:</label>
            <input
              type="date"
              value={
                isEditMode
                  ? formatDateForInput(selectedAppointment.date)
                  : formatDateForInput(newAppointment.date)
              }
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
            <button type="submit">
              {isEditMode ? "Update Appointment" : "Add Appointment"}
            </button>
          </form>
        </div>
      </div>

      <div className="appointments">
        <h3>Appointments ({appointments.length})</h3>
        {loading ? (
          <p>Loading Appointments...</p>
        ) : (
          <div className="appointment-list">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id} // Use unique _id as key
                appointment={appointment}
                onEdit={() => handleEditAppointment(appointment)}
                onDelete={() => handleDeleteAppointment(appointment._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
