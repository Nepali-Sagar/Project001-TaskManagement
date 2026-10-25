const list = document.querySelector("#task-list");
const t_title = document.getElementById("title");
const t_description = document.getElementById("description");
const t_status = document.getElementById("status");
const t_dueDate = document.getElementById("dueDate");
const t_createdAt = document.getElementById("createdAt");
const taskForm = document.getElementById("task-form");
let formBtn = document.querySelector(".addBtn");
const searchForm = document.getElementById("search-form");
const searchField = document.getElementById("search-field");

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

  const body = [
    ["title", title],
    ["description", description],
    ["status", status],
    ["dueDate", dueDate],
    ["createdAt", createdAt],
  ];

  body.forEach(([ label, value ]) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = `${label}: ${value || ""}`;
    li.append(paragraph);
  });

  li.appendChild(deleteButton);
  li.appendChild(editButton);
  list.append(li);

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
  ((t_title.value = title),
    (t_description.value = description),
    (t_status.value = status),
    (t_dueDate.value = dueDate ? dueDate.slice(0, 10) : ""),
    (t_createdAt.value = createdAt ? createdAt.slice(0, 10) : ""));

  formBtn.textContent = "Edit";
}

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const editingId = taskId !== null;

  const url = editingId
    ? `/user/api/tasks/json-data/${encodeURIComponent(taskId)}`
    : `/user/api/tasks/`;

  const method = editingId ? "PUT" : "POST";

  const body = {
    title: t_title.value,
    description: t_description.value,
    status: t_status.value,
    dueDate: t_dueDate.value,
    createdAt: t_createdAt.value,
  };

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error("Can't fetch data");

    formBtn.textContent = "Add";
    taskId = null;
    event.target.reset();

    await loadAllData();
  } catch (error) {
    console.log(error);
  }
});

searchForm.addEventListener("click", async (event) => {
  event.preventDefault();

  const searchValue = searchField.value;
  if (!searchValue) {
    console.log("Enter to search task");
    return;
  }

  try {
    const response = await fetch(
      `/user/api/tasks/json-data/${encodeURIComponent(searchValue)}`,
      {
        method: "POST",
      },
    );

    if (!response.ok) throw new Error("Can't fetch data");
    const result = await response.json();

    list.innerHTML = "";

    result.taskSearch.forEach(
      ({ _id, title, description, status, dueDate, createdAt }) => {
        readData(_id, title, description, status, dueDate, createdAt);
      },
    );
  } catch (error) {
    console.error(error);
  }
});

loadAllData();
