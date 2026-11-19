# Task Management Application

A simple full-stack task management web application built with Node.js, Express, MongoDB, and EJS.

Users can add tasks, view their task list, search tasks by title, edit task details, and delete completed or unwanted tasks.

## Features

- Create tasks with a title, description, status, and due date
- View all saved tasks
- Search tasks by title
- Edit existing tasks
- Delete tasks
- Store task data in MongoDB
- Simple and responsive browser interface

## Tech Stack

| Category | Technology |
| --- | --- |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Frontend | HTML, CSS, JavaScript |
| Template Engine | EJS |
| Environment Variables | dotenv |

## Project Structure

```text
Project001-TaskManagement/
├── app.js                  # Express application setup
├── config/
│   └── db.js               # MongoDB connection
├── controller/
│   ├── control.controller.js
│   └── user.controller.js
├── models/
│   └── schema.js           # Task Mongoose schema
├── public/
│   ├── main.js             # Frontend interactions
│   └── style.css           # Application styling
├── routes/
│   └── user.routes.js      # Application routes
└── views/
    └── index.ejs           # Main task management page
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MongoDB](https://www.mongodb.com/) or a MongoDB Atlas account
- npm, which is included with Node.js

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Nepali-Sagar/Project001-TaskManagement.git
cd Project001-TaskManagement
```

2. Install the project dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root.

```env
PORT=5000
MONGOOSE_CONNECT=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with a MongoDB Atlas connection string or a local MongoDB connection string.

Example for a local MongoDB database:

```env
MONGOOSE_CONNECT=mongodb://127.0.0.1:27017/task-management
```

4. Start the application:

```bash
node app.js
```

5. Open `http://localhost:5000/user/api/tasks/` in your browser.

## Available Task Data

Each task contains:

| Field | Description |
| --- | --- |
| `title` | Name of the task |
| `description` | Optional task notes |
| `status` | Task status: `todo`, `in-progres`, or `done` |
| `dueDate` | Date when the task is due |
| `createdAt` | Date and time when the task was created |

## API Routes

All routes use the `/user` base path.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/user/api/tasks/` | Render the task management page |
| `POST` | `/user/api/tasks/` | Create a task |
| `GET` | `/user/api/tasks/json-data` | Get all tasks |
| `PUT` | `/user/api/tasks/json-data/:id` | Update a task |
| `DELETE` | `/user/api/tasks/json-data/:id` | Delete a task |
| `POST` | `/user/api/tasks/json-data/:search` | Search tasks by title |

## Usage

1. Enter a task title and optional description.
2. Select a task status and due date.
3. Click **Add** to save the task.
4. Use **Edit** to update task details.
5. Use **Delete** to remove a task.
6. Use the search field to find tasks by title.

## Running Tests

This project does not currently include an automated test suite. The npm test script is a placeholder.

## Troubleshooting

- Confirm that MongoDB is running and `MONGOOSE_CONNECT` is valid.
- Keep the value of `PORT` consistent with the URL used in the browser.
- Restart the server after changing `.env`.
- Make sure dependencies are installed with `npm install`.

## Author

**Sagar Nepali**

- GitHub: [Nepali-Sagar](https://github.com/Nepali-Sagar)
- Repository: [Project001-TaskManagement](https://github.com/Nepali-Sagar/Project001-TaskManagement)

## License

This project is licensed under the ISC License.
