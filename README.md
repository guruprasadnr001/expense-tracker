### Prerequisites

Make sure the following are installed:

-Node.js (v16+)
-npm (v8+)
-MySQL 8+

## Mysql setup

(Linux)

```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

(Windows)

> Download it through official mysql site.
> https://dev.mysql.com/downloads/installer/

> Setup path in environmental variables.

```bash
 mysql -u root -p
```

Enter password and login to mysql and create a table.

CREATE DATABASE db_name;

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/expense-tracker-demo.git
cd expense-tracker-demo
```

### 2. Backend Setup

```bash
cd server
npm install
```

### 2.2 create .env file

PORT=5000
DB_HOST=localhost
DB_USER=username
DB_PASS=password
DB_NAME=db_name
JWT_SECRET=secretKey

### 2.3 Start server

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm start
```

Application will be open in your browser at: http://localhost:3000
