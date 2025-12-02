# Final Project Magsanay

## Instructions for Running the App

### Prerequisites
- Node.js installed
- XAMPP installed

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Final-Project-Magsanay
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Install frontend dependencies (in a new terminal):
   ```bash
   cd frontend
   npm install
   ```

### Running the App
1. Start XAMPP and enable Apache and MySQL for the database
2. In the backend directory terminal, run:
   ```bash
   cd backend
   npm run dev
   ```
3. In the frontend directory terminal, run:
   ```bash
   cd frontend
   npm run dev
   ```
4. Open your browser and navigate to the application URL (typically `http://localhost:5173` for frontend)

### Features
- **Create**: Add new vehicles to the system
- **Read**: List all vehicles added and view pending rentals
- **Update**: Edit vehicle details
- **Delete**: Remove vehicles from the system

### Database Setup
1. Open phpMyAdmin (`http://localhost/phpmyadmin`)
2. Create a new database (or import the existing one)
3. Import the database file from `database/` folder:
   - Click "Import" tab
   - Select the `.sql` file from the `database/` folder
   - Click "Go"
