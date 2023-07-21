/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/mainWindowStructore.js
function mainWindowStructore() {
  const mainWindow = document.createElement("div");
  mainWindow.classList.add("main-window");
  mainWindow.innerHTML = `<div class="form">
                            <div class="top-tasks">
                              <form class="inner-block form">
                                <label for="task-input"><h1>TOP Tasks</h1></label>
                                <input class="input-task" type="text" id="task-input" required>
                              </form>
                            </div>
                            <div class="inner-block pinned">
                              <div>
                                <h2>Pinned:</h2>
                              </div>
                            </div>
                            <div class="inner-block all-tasks">
                              <div>
                                <h2>All tasks:</h2>                                
                              </div>
                            </div>
                          </div>`;
  document.body.appendChild(mainWindow);
}
;// CONCATENATED MODULE: ./src/js/Task.js
class Task {
  constructor(taskText) {
    this.taskText = taskText;
    this.taskPinned = false;
    this.id = Date.now();
  }
}
;// CONCATENATED MODULE: ./src/js/taskVault.js
const taskVault = [];
;// CONCATENATED MODULE: ./src/js/TaskManager.js


class TaskManager {
  constructor() {
    this.allTaskBox = document.querySelector(".all-tasks");
    this.pinned = document.querySelector(".pinned");
    this.inputTask = document.querySelector(".input-task");
  }
  _printTasks() {
    let filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    this.allTaskBox.querySelectorAll(".task").forEach(task => {
      task.remove();
    });
    taskVault.forEach(task => {
      if (!task.taskPinned && (filter === null || filter === "" || task.taskText.toLowerCase().startsWith(filter.toLowerCase()))) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.dataset.id = task.id;
        taskElement.innerHTML = `<div>${task.taskText}</div><div class="circle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>`;
        this.allTaskBox.appendChild(taskElement);
      }
    });
  }
  _printPinned() {
    this.pinned.querySelectorAll(".task").forEach(task => {
      task.remove();
    });
    taskVault.forEach(task => {
      if (task.taskPinned) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.dataset.id = task.id;
        taskElement.innerHTML = `<div>${task.taskText}</div><div class="circle">&nbsp;V&nbsp;</div>`;
        this.pinned.appendChild(taskElement);
      }
    });
  }
  _checkNotificationEmpty() {
    const findNotification = this.allTaskBox.querySelector(".notification_empty");
    if (this.allTaskBox.querySelector(".task")) {
      findNotification.classList.add("hidden");
    } else {
      findNotification.classList.remove("hidden");
    }
  }
  addTask() {
    const form = document.querySelector(".form");
    form.addEventListener("submit", event => {
      this.inputTask.value = this.inputTask.value.trim();
      if (this.inputTask.value) {
        taskVault.push(new Task(this.inputTask.value));
        this._printTasks();
        this.inputTask.value = "";
      }
      this.allTaskBox.querySelector(".notification_empty").classList.add("hidden");
      event.preventDefault();
    });
  }
  pinnedTaskListIsEmpty() {
    const notification = document.createElement("div");
    notification.classList.add("notification_pinned");
    notification.textContent = "No pinned tasks";
    this.pinned.appendChild(notification);
    const findNotification = this.pinned.querySelector(".notification_pinned");
    const config = {
      attributes: true,
      childList: true,
      subtree: true
    };
    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          if (!taskVault.find(task => task.taskPinned)) {
            findNotification.classList.remove("hidden");
          }
        }
      }
    });
    observer.observe(this.pinned, config);
  }
  addPinedTask() {
    this.allTaskBox.addEventListener("click", event => {
      if (Array.from(document.querySelectorAll(".circle")).includes(event.target)) {
        const elementToPin = taskVault.find(target => target.id.toString() === event.target.closest(".task").dataset.id);
        elementToPin.taskPinned = true;
        this._printPinned();
        this._printTasks(this.inputTask.value);
        this._checkNotificationEmpty();
        const notification = this.pinned.querySelector(".notification_pinned");
        if (notification) {
          notification.classList.add("hidden");
        }
      }
    });
  }
  removePinedTask() {
    this.pinned.addEventListener("click", event => {
      if (Array.from(document.querySelectorAll(".circle")).includes(event.target)) {
        const elementToPin = taskVault.find(target => target.id.toString() === event.target.closest(".task").dataset.id);
        elementToPin.taskPinned = false;
        this._printPinned();
        this._printTasks(this.inputTask.value);
        this._checkNotificationEmpty();
      }
    });
  }
  filterTasks() {
    const notification = document.createElement("div");
    notification.classList.add("notification_empty", "hidden");
    notification.textContent = "No tasks found";
    this.allTaskBox.appendChild(notification);
    this.inputTask.addEventListener("input", event => {
      this._printTasks(event.target.value);
      this._checkNotificationEmpty();
    });
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


function app() {
  mainWindowStructore();
  const taskManager = new TaskManager();
  taskManager.addTask();
  taskManager.pinnedTaskListIsEmpty();
  taskManager.addPinedTask();
  taskManager.removePinedTask();
  taskManager.filterTasks();
}
app();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;
//# sourceMappingURL=main.js.map