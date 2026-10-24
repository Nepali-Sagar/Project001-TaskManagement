const list = document.querySelector("#task-list");
let t_title = document.querySelector("#title");
let t_description = document.querySelector("#description");
let t_status = document.querySelector("#status");
let t_dueDate = document.querySelector("#dueDate");
let t_createdAt = document.querySelector("#createdAt");
let submitBtn = document.querySelector("button[type='submit']");
const taskForm = document.querySelector("#task-form");

async function loadAllData() {
  try {
    const response = await fetch(
      "http://localhost:5000/user/api/tasks/json-data",
    );
    if (!response.ok) throw new Error("Can't fetch data");
    list.innerHTML = "";

    const tasks = await response.json();
    tasks.forEach(({ _id, title, description, status, dueDate, createdAt }) => {
      readData(_id, title, description, status, dueDate, createdAt);
    });
  } catch (error) {
    console.error(error);
  }
}

function readData(id, title, description, status, dueDate, createdAt) {
  const li = document.createElement("li");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");

  deleteButton.textContent = "Delete";
  editButton.textContent = "Edit";

  li.textContent = `Title ${title}`;

  list.append(li);

  li.appendChild(deleteButton);
  li.appendChild(editButton);

  deleteButton.addEventListener("click", async () => {
    const response = await fetch(
      `http://localhost:5000/user/api/tasks/json-data/${id}`,
      {
        method: "DELETE",
      },
    );
    if (!response) throw new Error("Can't find");

    await loadAllData();
  });

  editButton.addEventListener("click", () => {
    editTask(id, title, description, status, dueDate, createdAt);
  });
}

let taskId = null;
function editTask(id, title, description, status, dueDate, createdAt) {
  taskId = id;
  t_title.value = title;
  t_description.value = description;
  t_status.value = status,
  t_dueDate.value = dueDate ? dueDate.slice(0, 10) : "",
  t_createdAt.value = createdAt ? createdAt.slice(0, 10) : "";

  submitBtn.textContent = "Edit";
}

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const isEditing = taskId !== null;

  const url = isEditing
    ? `/user/api/tasks/json-data/${encodeURIComponent(taskId)}`
    : `/user/api/tasks/`;

  const method = isEditing ? "PUT" : "POST";

  const body = {
    title: t_title.value,
    description: t_description.value,
    status: t_status.value,
    dueDate: t_dueDate.value,
    createdAt: t_createdAt.value,
  };

  try {
    const response = await fetch(url,{
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error("Failed to update");

    taskId = null;

    event.target.reset();
    submitBtn.textContent = "Add";
    await loadAllData();
  } catch (error) {
    console.error(error);
  }
});

loadAllData();
