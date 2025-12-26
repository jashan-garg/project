# Doctor Appointment Booking System

A full-stack MERN application for booking doctor appointments with an admin panel, built with Next.js and Tailwind CSS.

## Features

- User authentication (Patients, Doctors, Admins)
- Patient appointment booking
- Doctor profiles and management
- Admin dashboard with statistics
- Admin panel for managing users, doctors, and appointments
- Appointment status management (pending, confirmed, cancelled, completed)
- Modern UI with Tailwind CSS
- Responsive design

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/doctor-appointments
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:5001

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on http://localhost:3000

## Usage

### Creating an Admin User

To create an admin user, you can either:

1. Register a new user and then update the role in the admin panel (if you already have an admin)
2. Use MongoDB directly to update a user's role:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### User Roles

- **Patient**: Can book appointments and view their own appointments
- **Doctor**: Can view their appointments and update status (requires doctor profile creation)
- **Admin**: Full access to dashboard, user management, doctor management, and appointment management

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Appointments
- `GET /api/appointments` - Get all appointments (filtered by user role)
- `GET /api/appointments/:id` - Get single appointment
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id/status` - Update appointment status
- `DELETE /api/appointments/:id` - Delete appointment

### Doctors
- `GET /api/doctors` - Get all active doctors
- `GET /api/doctors/:id` - Get single doctor
- `POST /api/doctors` - Create doctor profile (doctor role only)
- `PUT /api/doctors/:id` - Update doctor profile

### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user
- `PUT /api/admin/doctors/:id/status` - Update doctor status

## Project Structure

```
project/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── appointments.js
│   │   ├── doctors.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── doctors/
│   │   │   ├── book-appointment/
│   │   │   ├── my-appointments/
│   │   │   └── admin/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   └── PrivateRoute.tsx
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   └── globals.css
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Development

### Frontend Development

The frontend uses Next.js 14 with App Router and Tailwind CSS for styling.

- Pages are located in `src/app/`
- Components are in `src/components/`
- Global styles and Tailwind config are in the root

### Backend Development

The backend uses Express.js with MongoDB via Mongoose.

- Models are in `backend/models/`
- Routes are in `backend/routes/`
- Authentication middleware is in `backend/middleware/`

## License

MIT
