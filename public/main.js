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
  const btnContainer = document.createElement("div");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");

  deleteButton.textContent = "Delete";
  editButton.textContent = "Edit";

  li.style.display = "flex";
  li.style.justifyContent = "space-between"
  li.style.fontSize = "1.3em";
  li.style.borderBottom = "0.8px solid black"

  const list_title = document.createElement("div")
  const list_date = document.createElement("div")
  const list_content = document.createElement("div")

  let title_content = document.createElement("p");
  let description_content = document.createElement("p");
  let status_content = document.createElement("p");
  let dueDate_content = document.createElement("p");
  let createdAt_content = document.createElement("p");

  title_content.textContent = title
  description_content.textContent = description || "notes"
  status_content.textContent = status
  dueDate_content.textContent = `Due: ${dueDate.slice(0, 10).replaceAll('-', '/')}`
  createdAt_content.textContent = createdAt


  list_title.style.display = 'flex'
  list_title.style.alignContent = 'center'
  list_title.style.gap = '10px'
  status_content.style.fontSize = '0.9em'
  status_content.style.border = '0.5px solid black'
  status_content.style.borderRadius = '9px'
  status_content.style.padding = '2px'
  status_content.style.fontWeight = 'bold'

  list_date.style.marginTop = "7px"
  description_content.style.fontSize = '0.8em'
  description_content.style.color = 'grey'

  dueDate_content.style.fontSize = '0.8em'

  btnContainer.style.display = 'flex'
  btnContainer.style.flexDirection = 'column'
  btnContainer.style.gap = '4px'

  deleteButton.style.padding = '3px'
  editButton.style.padding = '3px'

  list_title.appendChild(title_content)
  list_title.appendChild(status_content)

  list_date.append(description_content)
  list_date.append(dueDate_content)

  list_content.appendChild(list_title)
  list_content.appendChild(list_date)


  btnContainer.appendChild(deleteButton);
  btnContainer.appendChild(editButton);
  li.append(list_content)
  li.append(btnContainer);
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
