import { Task } from "./Task";
import { taskVault } from "./taskVault";

export class TaskManager {
  constructor() {
    this.allTaskBox = document.querySelector(".all-tasks");
    this.pinned = document.querySelector(".pinned");
    this.inputTask = document.querySelector(".input-task");
  }

  _printTasks(filter = null) {
    this.allTaskBox.querySelectorAll(".task").forEach((task) => {
      task.remove();
    });
    taskVault.forEach((task) => {
      if (
        !task.taskPinned &&
        (filter === null ||
          filter === "" ||
          task.taskText.toLowerCase().startsWith(filter.toLowerCase()))
      ) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.dataset.id = task.id;
        taskElement.innerHTML = `<div>${task.taskText}</div><div class="circle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>`;
        this.allTaskBox.appendChild(taskElement);
      }
    });
  }

  _printPinned() {
    this.pinned.querySelectorAll(".task").forEach((task) => {
      task.remove();
    });
    taskVault.forEach((task) => {
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
    const findNotification = this.allTaskBox.querySelector(
      ".notification_empty",
    );

    if (this.allTaskBox.querySelector(".task")) {
      findNotification.classList.add("hidden");
    } else {
      findNotification.classList.remove("hidden");
    }
  }

  addTask() {
    const form = document.querySelector(".form");
    form.addEventListener("submit", (event) => {
      this.inputTask.value = this.inputTask.value.trim();
      if (this.inputTask.value) {
        taskVault.push(new Task(this.inputTask.value));
        this._printTasks();
        this.inputTask.value = "";
      }
      this.allTaskBox
        .querySelector(".notification_empty")
        .classList.add("hidden");
      event.preventDefault();
    });
  }

  pinnedTaskListIsEmpty() {
    const notification = document.createElement("div");
    notification.classList.add("notification_pinned");
    notification.textContent = "No pinned tasks";
    this.pinned.appendChild(notification);
    const findNotification = this.pinned.querySelector(".notification_pinned");

    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          if (!taskVault.find((task) => task.taskPinned)) {
            findNotification.classList.remove("hidden");
          }
        }
      }
    });
    observer.observe(this.pinned, config);
  }

  addPinedTask() {
    this.allTaskBox.addEventListener("click", (event) => {
      if (
        Array.from(document.querySelectorAll(".circle")).includes(event.target)
      ) {
        const elementToPin = taskVault.find(
          (target) =>
            target.id.toString() === event.target.closest(".task").dataset.id,
        );
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
    this.pinned.addEventListener("click", (event) => {
      if (
        Array.from(document.querySelectorAll(".circle")).includes(event.target)
      ) {
        const elementToPin = taskVault.find(
          (target) =>
            target.id.toString() === event.target.closest(".task").dataset.id,
        );
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

    this.inputTask.addEventListener("input", (event) => {
      this._printTasks(event.target.value);

      this._checkNotificationEmpty();
    });
  }
}
