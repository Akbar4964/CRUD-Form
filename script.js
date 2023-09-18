const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
let closeEl = document.getElementById("close");

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

function setTodos() {
  console.log(todos);
  localStorage.setItem("list", JSON.stringify(todos));
}

function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = null;
  }, 1000);
}

formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["input-create"].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todos.push({ name: todoText, time: getTime(), completed: false });
    setTodos();
    showTodos();
  } else {
    alert("Please enter text!");
  }
});

function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = null;
  todos.forEach((item, index) => {
    listGroupTodo.innerHTML += `
    <li class="information">
    ${item.name}
    <div class="todo-icons">
      <span class="time">${item.time}</span>
      <img onclick=editTodo(${index}) src="./edit.svg" alt="" />
      <img onclick=deleteTodo(${index}) src="./delete.svg" alt="" />
    </div>
  </li>
    `;
  });
}
console.log(todos);
if (todos.length) showTodos();

function getTime() {
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + (now.getDate() + 1) : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();
  const minutes =
    now.getMinutes() < 10 ? "0" + (now.getMinutes() + 1) : now.getMinutes();
  const hour =
    now.getHours() < 10 ? "0" + (now.getHours() + 1) : now.getHours();
  const seconds =
    now.getSeconds() < 10 ? "0" + (now.getSeconds() + 1) : now.getSeconds();
  return `${hour}:${minutes}:${seconds} ${date}.${month}.${year}`;
}
// getTime();

function deleteTodo(id) {
  const deletedTodos = todos.filter((item, i) => {
    return i !== id;
  });
  todos = deletedTodos;
  setTodos();
  showTodos();
}

let editItemid;

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formEdit["input-edit"].value.trim();
  formEdit.reset();
  if (todoText.length) {
    todos.splice(editItemid, 1, {
      name: todoText,
      time: getTime(),
      completed: false,
    });
    setTodos();
    showTodos();
    close();
  } else {
    showMessage("message-edit", "Please enter text!");
  }
});

function editTodo(id) {
  open();
  editItemid = id;
}

function open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

overlay.addEventListener("click", close);
closeEl.addEventListener("click", close);
document.addEventListener("keydown", (e) => {
  if (e.which == 27) {
    close();
  }
});

// /////////////////////////////////////////////////////////

// const formCreate = document.getElementById("form-create");
// const formEdit = document.getElementById("form-edit");
// const listGroupTodo = document.getElementById("list-group-todo");
// const time = document.getElementById("time");
// const modal = document.getElementById("modal");
// const overlay = document.getElementById("overlay");
// let closeEl = document.getElementById("close");

// let todos = JSON.parse(localStorage.getItem("list"))
//   ? JSON.parse(localStorage.getItem("list"))
//   : [];

// function setTodos() {
//   localStorage.setItem("list", JSON.stringify(todos));
// }

// function showMessage(where, message) {
//   document.getElementById(`${where}`).textContent = message;
//   setTimeout(() => {
//     document.getElementById(`${where}`).textContent = null;
//   }, 1000);
// }

// formCreate.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const todoText = formCreate["input-create"].value.trim();
//   formCreate.reset();
//   if (todoText.length) {
//     todos.push({ name: todoText, time: getTime(), completed: false });
//     setTodos();
//     showTodos();
//   } else {
//     showMessage("message-create", "Please enter text!");
//   }
// });

// function showTodos() {
//   const todos = JSON.parse(localStorage.getItem("list"));
//   listGroupTodo.innerHTML = null;
//   todos.forEach((item, index) => {
//     listGroupTodo.innerHTML += `
//     <li class="list-group-item d-flex justify-content-between">
//     ${item.name}
//     <div class="todo-icons">
//       <span class="opacity-50 me-2">${item.time}</span>
//       <img onclick=editTodo(${index}) src="./edit.svg" alt="" />
//       <img onclick=deleteTodo(${index}) src="./delete.svg" alt="" />
//     </div>
//   </li>
//     `;
//   });
// }

// if (todos.length) showTodos();

// function getTime() {
//   const now = new Date();
//   const date = now.getDate() < 10 ? "0" + (now.getDate() + 1) : now.getDate();
//   const month =
//     now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
//   const year = now.getFullYear();
//   const minutes =
//     now.getMinutes() < 10 ? "0" + (now.getMinutes() + 1) : now.getMinutes();
//   const hour =
//     now.getHours() < 10 ? "0" + (now.getHours() + 1) : now.getHours();
//   const seconds =
//     now.getSeconds() < 10 ? "0" + (now.getSeconds() + 1) : now.getSeconds();
//   return `${hour}:${minutes}:${seconds} ${date}.${month}.${year}`;
// }
// getTime();

// function deleteTodo(id) {
//   const deletedTodos = todos.filter((item, i) => {
//     return i !== id;
//   });
//   todos = deletedTodos;
//   setTodos();
//   showTodos();
// }

// let editItemid;

// formEdit.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const todoText = formEdit["input-edit"].value.trim();
//   formEdit.reset();
//   if (todoText.length) {
//     todos.splice(editItemid, 1, {
//       name: todoText,
//       time: getTime(),
//       completed: false,
//     });
//     setTodos();
//     showTodos();
//     close();
//   } else {
//     showMessage("message-edit", "Please enter text!");
//   }
// });

// function editTodo(id) {
//   open();
//   editItemid = id;
// }

// function open() {
//   modal.classList.remove("hidden");
//   overlay.classList.remove("hidden");
// }
// function close() {
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// }

// overlay.addEventListener("click", close);
// closeEl.addEventListener("click", close);
// document.addEventListener("keydown", (e) => {
//   if (e.which == 27) {
//     close();
//   }
// });

// /////////////////////////////////////////////////////

// const formCreate = document.getElementById("form-create");
// const formEdit = document.getElementById("form-edit");
// const listGroupTodo = document.getElementById("list-group-todo");
// const time = document.getElementById("time");
// const modal = document.getElementById("modal");
// const overlay = document.getElementById("overlay");
// let closeEl = document.getElementById("close");

// let todos = JSON.parse(localStorage.getItem("list"))
//   ? JSON.parse(localStorage.getItem("list"))
//   : [];

// function setTodos() {
//   localStorage.setItem("list", JSON.stringify(todos));
// }

// function showMessage(where, message) {
//   document.getElementById(`${where}`).textContent = message;
//   setTimeout(() => {
//     document.getElementById(`${where}`).textContent = null;
//   }, 1000);
// }

// formCreate.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const todoText = formCreate["input-create"].value.trim();
//   formCreate.reset();
//   if (todoText.length) {
//     todos.push({ name: todoText, time: getTime(), completed: false });
//     setTodos();
//     showTodos();
//   } else {
//     showMessage("message-create", "Please enter text!");
//   }
// });

// function showTodos() {
//   const todos = JSON.parse(localStorage.getItem("list"));
//   listGroupTodo.innerHTML = null;
//   todos.forEach((item, index) => {
//     listGroupTodo.innerHTML += `
//     <li class="list-group-item d-flex justify-content-between">
//     ${item.name}
//     <div class="todo-icons">
//       <span class="opacity-50 me-2">${item.time}</span>
//       <img onclick=editTodo(${index}) src="./edit.svg" alt="" />
//       <img onclick=deleteTodo(${index}) src="./delete.svg" alt="" />
//     </div>
//   </li>
//     `;
//   });
// }

// if (todos.length) showTodos();

// function getTime() {
//   const now = new Date();
//   const date = now.getDate() < 10 ? "0" + (now.getDate() + 1) : now.getDate();
//   const month =
//     now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
//   const year = now.getFullYear();
//   const minutes =
//     now.getMinutes() < 10 ? "0" + (now.getMinutes() + 1) : now.getMinutes();
//   const hour =
//     now.getHours() < 10 ? "0" + (now.getHours() + 1) : now.getHours();
//   const seconds =
//     now.getSeconds() < 10 ? "0" + (now.getSeconds() + 1) : now.getSeconds();
//   return `${hour}:${minutes}:${seconds} ${date}.${month}.${year}`;
// }
// getTime();

// function deleteTodo(id) {
//   const deletedTodos = todos.filter((item, i) => {
//     return i !== id;
//   });
//   todos = deletedTodos;
//   setTodos();
//   showTodos();
// }

// let editItemid;

// formEdit.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const todoText = formEdit["input-edit"].value.trim();
//   formEdit.reset();
//   if (todoText.length) {
//     todos.splice(editItemid, 1, {
//       name: todoText,
//       time: getTime(),
//       completed: false,
//     });
//     setTodos();
//     showTodos();
//     close();
//   } else {
//     showMessage("message-edit", "Please enter text!");
//   }
// });

// function editTodo(id) {
//   open();
//   editItemid = id;
// }

// function open() {
//   modal.classList.remove("hidden");
//   overlay.classList.remove("hidden");
// }
// function close() {
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// }

// overlay.addEventListener("click", close);
// closeEl.addEventListener("click", close);
// document.addEventListener("keydown", (e) => {
//   if (e.which == 27) {
//     close();
//   }
// });

    for (let i = 0; i < 10; i++) {
    if (i === 6) {
        break;
    }
    console.log(i);
    }
