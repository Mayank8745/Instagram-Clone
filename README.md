# Instagram Clone

Instagram Clone (Both frontend and backend) created with MySQL, Express.js, React.js, Node.js.

# Note

This repository is still under development and I will continue to add more features to it

# Prerequisites

MySQL installed on your Local Computer
Node.js installed on your Local Computer

## Installation

### Clone the project

```bash
  $ git clone https://github.com/Mayank8745/Instagram-Clone.git
```

### For Backend

```bash
  $ cd backend
  $ npm install
```

### For Frontend

```bash
  $ cd frontend
  $ npm install
  $ npm install -D tailwindcss postcss autoprefixer
  $ npm install react-icons axios
```

## Run Locally

Before Starting the project,
Please run databaseSQL.sql file in MySQL Workbench

### Open the project directory in IDE

```bash
  $ cd my-project
```

### Server-Side Usage(PORT: 8000)

```bash
  $ cd backend      //Go to the Server Folder
  npm run start     //Start the Server

  // deployment for client app
  $ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
  $ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

### Client-Side Usage(PORT: 5173)

```bash
  $ cd frontend
  $ npm run dev
```
