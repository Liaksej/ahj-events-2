export class TaskManager {
  constructor() {
    this.allTaskBox = document.querySelector(".all-tasks");
    this.pinned = document.querySelector(".pinned");
    this.inputTask = document.querySelector(".input-task");
  }

  addTask() {
    const form = document.querySelector(".form");
    form.addEventListener("submit", (event) => {
      this.inputTask.value = this.inputTask.value.trim();
      if (this.inputTask.value) {
        const task = document.createElement("div");
        task.classList.add("task");
        task.innerHTML = `<div>${this.inputTask.value}</div><div class="circle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>`;
        this.allTaskBox.appendChild(task);
        this.inputTask.value = "";
        if (this.allTaskBox.querySelector(".task.hidden")) {
          Array.from(document.querySelectorAll(".task.hidden")).forEach(
            (hidden) => {
              hidden.classList.remove("hidden");
            },
          );
          this.allTaskBox
            .querySelector(".notification_empty")
            .classList.add("hidden");
        }
      }
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
          if (!this.pinned.querySelector(".task")) {
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
        event.target.innerHTML = "&nbsp;V&nbsp;";
        this.pinned.appendChild(event.target.closest(".task"));
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
        event.target.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        if (
          this.inputTask.value !== "" &&
          !event.target
            .closest(".task")
            .textContent.toLowerCase()
            .startsWith(this.inputTask.value.toLowerCase())
        ) {
          event.target.closest(".task").classList.add("hidden");
        }
        this.allTaskBox.appendChild(event.target.closest(".task"));
      }
    });
  }

  filterTasks() {
    const notification = document.createElement("div");
    notification.classList.add("notification_empty", "hidden");
    notification.textContent = "No tasks found";
    this.allTaskBox.appendChild(notification);

    this.inputTask.addEventListener("input", (event) => {
      const input = event.target.value.toLowerCase();
      Array.from(this.allTaskBox.querySelectorAll(".task")).forEach((task) => {
        if (!task.textContent.toLowerCase().startsWith(input)) {
          task.classList.add("hidden");
        } else {
          task.classList.remove("hidden");
        }
      });
      const findNotification = this.allTaskBox.querySelector(
        ".notification_empty",
      );
      if (this.allTaskBox.querySelector(".task")) {
        if (
          this.allTaskBox.querySelectorAll(".task.hidden").length ===
          this.allTaskBox.querySelectorAll(".task").length
        ) {
          findNotification.classList.remove("hidden");
        } else {
          findNotification.classList.add("hidden");
        }
      }
    });
  }
}
