const addBtn = document.getElementById("add");
const clearBtn = document.getElementById("clearAll");
const input = document.querySelector("input");
const container = document.querySelector(".container");

input.addEventListener("keypress", e => {
  if (e.key === "Enter") addBtn.click();
});

addBtn.addEventListener("click", () => {
  const val = input.value.trim();
  if (!val) return;

  const task = document.createElement("div");
  task.className = "task";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "done-checkbox";

  const text = document.createElement("span");
  text.textContent = val;

  const edit = document.createElement("button");
  edit.innerHTML = '<span class="material-symbols-outlined">edit</span>';
  edit.className = "edit";

  const del = document.createElement("button");
  del.innerHTML = '<span class="material-symbols-outlined">delete</span>';
  del.className = "del";

  task.append(checkbox, text, edit, del);
  container.appendChild(task);

  input.value = "";
  toggleClear();
});

container.addEventListener("click", e => {
  const btn = e.target.closest("button");
  const task = e.target.closest(".task");
  if (!task) return;

  if (btn?.classList.contains("del")) {
    task.remove();
    toggleClear();
  }

  if (btn?.classList.contains("edit")) {
    const span = task.querySelector("span");
    const editInput = document.createElement("input");
    editInput.className = "edit-input";
    editInput.value = span.textContent;
    span.replaceWith(editInput);
    btn.innerHTML = '<span class="material-symbols-outlined">save</span>';
    btn.className = "save";
  } else if (btn?.classList.contains("save")) {
    const editInput = task.querySelector(".edit-input");
    const span = document.createElement("span");
    span.textContent = editInput.value.trim();
    if (!span.textContent) task.remove();
    editInput.replaceWith(span);
    btn.innerHTML = '<span class="material-symbols-outlined">edit</span>';
    btn.className = "edit";
    toggleClear();
  }
});

clearBtn.addEventListener("click", () => {
  container.innerHTML = "";
  toggleClear();
});

function toggleClear() {
  clearBtn.style.display = container.children.length ? "inline-flex" : "none";
}

toggleClear();
