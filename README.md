# holidays-calendar

## Installation and Setup Guide

### 1. Clone the Repository
Clone the repository to your local machine using Git:
```sh
git clone https://github.com/RomeoLeyn/holidays-calendar.git
```

### 2. Open the Project
Open the project in your favorite code editor, such as VS Code:
```sh
code .
```

### 3. Install Dependencies
Install the required dependencies using npm or yarn:
```sh
npm install
```

### 4. Set Up Environment Variables (.env)
Fill it with the appropriate environment variables, for example:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=holidays_db
DB_USER=postgres
DB_PASSWORD=yourpassword
```

### 5. Create the Database in pgAdmin
1. Open **pgAdmin**.
2. Create a new database named `holidays_db`.

### 6. Build the Project
```sh
npm run build
```

### 7. Run the Project
Start the server in development mode:
```sh
npm start
```

### 8. Test the API
Once the server is running, the API will be available at:
```
http://localhost:3000
```

