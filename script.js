// Add a todo to the list
// Display in UI
// Local storage class

// Class to add Todo
// Delete
const remainingItemsText = document.querySelector("#remainingItems");

const todoList = document.querySelector("#todo-list");
const wrapper = document.querySelector(".wrapper");
const todoItems = document.querySelectorAll("#todo-list div");
const todoInput = document.querySelector("#todoInput");
const checkMarks = document.querySelectorAll(".checkmark");
class Todo {
  constructor(title, completed = false, timestamp) {
    this.title = title;
    this.completed = completed;
    this.timestamp = timestamp;
  }
}

let dragSrcEl;

class UI {
  static addTodoItem(todo) {
    const todoItem = document.createElement("div");
    todoItem.className = `todoItem cursor-pointer w-full  flex items-center space-x-4 py-5 px-4 border-b border-DarkGrayishBlue bg-white dark:bg-VeryDarkDesaturatedBlue md:w-full md:space-x-5 md:px-6 xl:w-full`;
    todoItem.setAttribute("draggable", "true");
    const checkmarkBtn = document.createElement("button");
    checkmarkBtn.className =
      "checkmark w-4 h-4 ring-1 rounded-full ring-VeryLightGrayishBlue ring-VeryDarkGrayishBlue flex items-center justify-center";
    checkmarkBtn.addEventListener("click", () => {
      UI.updateCompletionStatus(todoText, todo);
      UI.displayRemainingItems();
    });

    const todoText = document.createElement("p");
    todoText.id = "todo-text";
    todoText.className =
      "text-VeryDarkGrayishBlue dark:text-VeryLightGrayishBlue font-JosefinSans font-medium text-sm md:text-base";
    todoText.textContent = `${todo.title}`;

    const crossIcon = document.createElement("img");
    crossIcon.src = "images/icon-cross.svg";
    crossIcon.alt = "";
    crossIcon.className = "hidden w-4 ml-2";

    const checkIcon = document.createElement("img");
    checkIcon.src = "images/icon-check.svg";

    // Append child elements to todoItem
    todoItem.appendChild(checkmarkBtn);
    todoItem.appendChild(todoText);
    todoItem.appendChild(crossIcon);
    if (todo.completed) {
      todoText.classList.add("line-through");
      todoText.previousElementSibling.classList.add("bg-gradient-to-tl");
      todoText.previousElementSibling.classList.add("from-purple-800");
      todoText.previousElementSibling.classList.add("to-pink-400");
      todoText.previousElementSibling.append(checkIcon);
    }
    todoItem.addEventListener("mouseover", () => {
      todoItem.children[2].classList.remove("hidden");
      todoItem.children[2].addEventListener("click", () => {
        UI.removeTodoItem(todoItem.children[0]);
        UI.displayRemainingItems();
        StoreTodos.deleteTodo(todo.timestamp);
      });
    });

    todoItem.addEventListener("mouseout", () => {
      todoItem.children[2].classList.add("hidden");
    });

    // Drag and drop functionality
    todoItem.addEventListener("dragstart", (e) => {
      dragSrcEl = e.target;
      e.dataTransfer.effectAllowed = "move";

      e.dataTransfer.setData("text/html", e.target.innerText);
    });

    todoItem.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    todoItem.addEventListener("dragend", (e) => {
      e.target.classList.add("opacity-100");
    });
    todoItem.addEventListener(
      "drop",
      (e) => {
        e.stopPropagation();

        if (dragSrcEl !== e.target) {
          dragSrcEl.querySelector("p").innerText = e.target
            .closest(".todoItem")
            .querySelector("p").innerText;
          e.target.closest(".todoItem").querySelector("p").innerText =
            e.dataTransfer.getData("text/html");
          e.target.classList.add("opacity-100");
        }
      },
      false
    );

    wrapper.appendChild(todoItem);
  }

  static displayRemainingItems() {
    const todos = StoreTodos.getTodos();
    let incompletedItems = todos.filter((todo) => {
      return todo.completed === false;
    });

    todos.length !== 0
      ? (remainingItemsText.textContent = `${todos.length} item(s) left`)
      : (remainingItemsText.textContent = `No items left`);

    incompletedItems.length !== 0
      ? (remainingItemsText.textContent = `${incompletedItems.length} item(s) left`)
      : (remainingItemsText.textContent = `No items left`);
  }
  static updateUI() {
    const todos = StoreTodos.getTodos();
    todos.forEach((todoItem) => {
      UI.addTodoItem(todoItem);
    });
  }

  // Mark as completed
  static updateCompletionStatus(todoElement, todo) {
    const checkImg = document.createElement("img");
    checkImg.src = "./images/icon-check.svg";
    todoElement.classList.toggle("line-through");
    todoElement.previousElementSibling.classList.toggle("bg-gradient-to-tl");
    todoElement.previousElementSibling.classList.toggle("from-purple-800");
    todoElement.previousElementSibling.classList.toggle("to-pink-400");
    let todos = StoreTodos.getTodos();
    const index = todos.findIndex(
      (todoItem) => todoItem.timestamp === todo.timestamp
    );

    if (todoElement.classList.contains("line-through")) {
      todo.completed = true;
      todoElement.classList.add("text-VeryLightGrayishBlue");
      todoElement.classList.add("active");
      todoElement.previousElementSibling.append(checkImg);
      todoElement.classList.add("text-LightGrayishBlue");
    } else {
      todo.completed = false;
      todoElement.classList.remove("active");
      todoElement.classList.remove("text-VeryLightGrayishBlue");
      todoElement.classList.remove("text-LightGrayishBlue");

      todoElement.previousElementSibling.children[0].remove();
    }
    // Delete the todo item from it's index and replace it when it has a new completed state
    todos.splice(index, 1, todo);

    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Delete Todo Item from list

  static removeTodoItem(todoElement) {
    todoElement.parentElement.remove();
  }

  static clearField() {
    todoInput.value = "";
  }
  static displayCompletedItems() {
    const todoText = document.querySelectorAll("#todo-text");
    todoText.forEach((text) => {
      if (!text.classList.contains("line-through")) {
        text.parentElement.classList.add("hidden");
      } else {
        text.parentElement.classList.add("flex");
        text.parentElement.classList.remove("hidden");
      }
    });
  }

  static displayActiveItems() {
    const todoText = document.querySelectorAll("#todo-text");
    todoText.forEach((text) => {
      if (text.classList.contains("line-through")) {
        text.parentElement.classList.add("hidden");
      } else {
        text.parentElement.classList.add("flex");
        text.parentElement.classList.remove("hidden");
      }
    });
  }

  static displayAllItems() {
    const todoText = document.querySelectorAll("#todo-text");
    console.log(todoText);
    todoText.forEach((text) => {
      if (
        text.classList.contains("line-through") ||
        !text.classList.contains("line-through")
      ) {
        text.parentElement.classList.add("flex");
        text.parentElement.classList.remove("hidden");
      }
    });
  }

  static clearCompletedTodos() {
    let todos = StoreTodos.getTodos();
    todos = todos.filter((todo) => {
      return todo.completed !== true;
    });

    localStorage.removeItem("todos");
    localStorage.setItem("todos", JSON.stringify(todos));
    const todoText = document.querySelectorAll("#todo-text");
    todoText.forEach((text) => {
      const todoItem = text.closest(".todoItem");

      if (text.classList.contains("line-through")) {
        todoItem.remove(); // Remove the todo item from the DOM
      }
    });
  }

  static toggleTheme() {
    const themeToggler = document.querySelector("[data-theme-toggler]");
  }
}

class StoreTodos {
  static addTodo(todo) {
    const todos = StoreTodos.getTodos();
    todo.timestamp = new Date().getTime();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  static getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
  }

  static deleteTodo(timestamp) {
    let todos = StoreTodos.getTodos();

    // Filter out the todo with the matching timestamp
    todos = todos.filter((todo) => todo.timestamp !== timestamp);

    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

const addToListBtn = document.querySelector("#addToList");
// Instantiate todo when the addcheck is clicked

// Event Listeners
addToListBtn.addEventListener("click", () => {
  if (todoInput.value === "") {
    return;
  } else {
    const timeCreated = new Date().getTime();
    const myTodo = new Todo(todoInput.value, false, timeCreated);
    UI.addTodoItem(myTodo);

    UI.clearField();
    StoreTodos.addTodo(myTodo);
    UI.displayRemainingItems();
  }
});

const completedItemsToggleBtn = document.querySelectorAll("#completedItems");
const activeItemsToggleBtn = document.querySelectorAll("#activeItems");
const allItemsToggleBtn = document.querySelectorAll("#allItems");

completedItemsToggleBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    UI.displayCompletedItems();
  });
});

activeItemsToggleBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    UI.displayActiveItems();
  });
});

allItemsToggleBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    UI.displayAllItems();
  });
});

const filterBtns = document.querySelectorAll(".filter-btns");
filterBtns.forEach((item) => {
  let filterBtnsChildren = item.children;
  [...filterBtnsChildren].forEach((btn) => {
    btn.addEventListener("click", (e) => {
      [...filterBtnsChildren].forEach((btn) => {
        btn.classList.remove("text-blue-600");
        btn.classList.add("text-DarkGrayishBlue1");
      });
      btn.classList.remove("text-DarkGrayishBlue1");
      btn.classList.add("text-blue-600");
    });
  });
});

const clearCompletedBtn = document.querySelector("#clearCompletedItems");

clearCompletedBtn.addEventListener("click", (e) => {
  UI.clearCompletedTodos();
});

document.addEventListener("DOMContentLoaded", () => {
  UI.updateUI();
  UI.displayRemainingItems();
});

const body = document.body;
const themeToggler = document.querySelectorAll(".theme-toggler");
themeToggler.forEach((btn) => {
  console.log(btn);
  btn.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      console.log(true);
      body.classList.remove("dark", "bg-VeryDarkBlue");
    } else {
      body.classList.add("bg-VeryDarkBlue", "dark");
    }
  });
});
