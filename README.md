# Task Management Server

This is the backend for the **Task Management App**, built with **Express.js, MongoDB, and Node.js**. It provides a REST API to manage tasks.

## Features
✅ Fetch all tasks  
✅ Fetch only incomplete tasks  
✅ Add a new task  
✅ Update a task  
✅ Delete a task  
✅ Uses **Express**, **MongoDB**, and **Cors**  

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB
- **Middleware**: Cors, Express.json

## Installation & Setup
1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/task-management-server.git
   cd task-management-server
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up environment variables**:  
   Create a `.env` file in the root directory and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run the server**:
   ```sh
   npm start
   ```

## API Routes

### Fetch All Tasks
```http
GET /api/tasks
```
- Returns all tasks from the database.

### Fetch Incomplete Tasks
```http
GET /api/tasks?status=incomplete
```
- Returns only incomplete tasks.

### Add a New Task
```http
POST /api/tasks
```
#### Request Body (JSON):
```json
{
  "title": "New Task",
  "description": "Task description here",
  "time": "10:00 AM",
  "status": "incomplete"
}
```

### Update a Task
```http
PATCH /api/tasks/:id
```
#### Request Body (JSON):
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "time": "11:00 AM",
  "status": "complete"
}
```

### Delete a Task
```http
DELETE /api/tasks/:id
```

## Dependencies
- **Express** - For creating the server
- **MongoDB & Mongoose** - For database connection
- **Cors** - To handle cross-origin requests
- **Dotenv** - For environment variables

## License
This project is open-source and free to use under the MIT license.

---
