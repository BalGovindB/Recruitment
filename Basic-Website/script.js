let tasks = [
  { id: 1, text: "Complete the Git Mastery beginner track", completed: true },
  { id: 2, text: "Build the PERN management app", completed: false },
  { id: 3, text: "Take screenshots for the README", completed: false },
];
let nextId = 4;
let filter = "all";

const form = document.getElementById("add-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const countLabel = document.getElementById("task-count");
const card = document.querySelector(".card");
const filterButtons = document.querySelectorAll(".filter");

function addTask(text) {
  text = text.trim();
  if (!text) return;
  tasks.push({ id: nextId++, text, completed: false });
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  task.completed = !task.completed;
  render();
}

function editTask(id, newText) {
  newText = newText.trim();
  if (!newText) return deleteTask(id);
  tasks.find((t) => t.id === id).text = newText;
  render();
}

function deleteTask(id) {
  const el = list.querySelector(`[data-id="${id}"]`);
  if (!el) return;
  el.classList.add("is-leaving");
  el.addEventListener(
    "animationend",
    () => {
      tasks = tasks.filter((t) => t.id !== id);
      render();
    },
    { once: true }
  );
}

function visibleTasks() {
  if (filter === "active") return tasks.filter((t) => !t.completed);
  if (filter === "completed") return tasks.filter((t) => t.completed);
  return tasks;
}

function render() {
  list.innerHTML = "";

  for (const task of visibleTasks()) {
    const item = document.createElement("li");
    item.className = "task" + (task.completed ? " is-completed" : "");
    item.dataset.id = task.id;
    item.innerHTML = `
      <button class="task__checkbox" aria-label="Toggle complete">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </button>
      <span class="task__text" tabindex="0">${escapeHtml(task.text)}</span>
      <button class="task__delete" aria-label="Delete task">&times;</button>
    `;
    item.querySelector(".task__checkbox").onclick = () => toggleTask(task.id);
    item.querySelector(".task__delete").onclick = () => deleteTask(task.id);

    const textEl = item.querySelector(".task__text");
    textEl.ondblclick = () => startEditing(textEl, task);

    list.appendChild(item);
  }

  countLabel.textContent = `${tasks.filter((t) => !t.completed).length} remaining`;
  card.classList.toggle("is-empty", tasks.length === 0);
}

function startEditing(textEl, task) {
  textEl.contentEditable = "true";
  textEl.focus();
  textEl.onblur = () => {
    textEl.contentEditable = "false";
    editTask(task.id, textEl.textContent);
  };
  textEl.onkeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      textEl.blur();
    }
  };
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

form.onsubmit = (e) => {
  e.preventDefault();
  addTask(input.value);
  input.value = "";
  input.focus();
};

filterButtons.forEach((btn) => {
  btn.onclick = () => {
    filter = btn.dataset.filter;
    filterButtons.forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-selected", b === btn ? "true" : "false");
    });
    render();
  };
});

render();
