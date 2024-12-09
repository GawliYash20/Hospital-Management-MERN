# Hospital-Management-MERN
Hospital Managment App created using MERN

# Hospital Management System (MERN Stack)

A learning project for creating a hospital management system using the MERN stack (MongoDB, Express, React, Node.js). This project serves as a foundation to understand full-stack development with an emphasis on CRUD operations and RESTful APIs.

## Features
- **Patient Management:** Add, update, view, and delete patient records.
- **Doctor Management:** Manage doctor profiles and specializations.
- **Responsive Design:** User-friendly interface with responsive layouts.
- **RESTful APIs:** Backend powered by Express and MongoDB.

## Project Structure
```plaintext
├── backend
│   ├── server.js          # Entry point for the backend
│   ├── models             # Mongoose schemas for database
│   ├── routes             # API route definitions
│   └── controllers        # Request handlers
├── frontend
│   ├── src
│   │   ├── components     # React components
│   │   ├── pages          # Page-level components
│   │   └── App.js         # Main React application entry
├── package.json           # Project metadata and dependencies
├── README.md              # Project documentation
└── .gitignore             # Ignored files in version control
```

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Git](https://git-scm.com/)

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/GawliYash20/Hospital-Management-MERN.git
cd Hospital-Management-MERN
```

### Install Dependencies
#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### Run the Application
#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm start
```

### Build for Production
To build the frontend for production:
```bash
npm run build
```

## API Endpoints
### Patients
- `GET /patients`: Retrieve all patients
- `POST /patients/add`: Add a new patient
- `PUT /patients/update/:id`: Update patient details
- `DELETE /patients/delete/:id`: Remove a patient

### Doctors
- `GET /doctors`: Retrieve all doctors
- `POST /doctors/add`: Add a new doctor
- `PUT /doctors/update/:id`: Update doctor details
- `DELETE /doctors/delete/:id`: Remove a doctor

## License
This project is **UNLICENSED** and is created for learning purposes only.

## Author
[Yash Gawli](https://github.com/GawliYash20)

## Contributions
Contributions are welcome! Feel free to fork this repository and create a pull request with your changes.

## Acknowledgments
Special thanks to the open-source community for providing valuable resources and tools to make this project possible.
