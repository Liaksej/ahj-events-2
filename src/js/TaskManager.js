export class TaskManager {
  constructor() {
    this.allTaskBox = document.querySelector(".all-tasks");
    this.pinned = document.querySelector(".pinned");
  }

  addTask() {
    const inputTask = document.querySelector(".input-task");
    const form = document.querySelector(".form");
    form.addEventListener("submit", (event) => {
      inputTask.value = inputTask.value.trim();
      if (inputTask.value) {
        const task = document.createElement("div");
        task.classList.add("task");
        task.innerHTML = `<div>${inputTask.value}</div><div class="circle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>`;
        this.allTaskBox.appendChild(task);
        inputTask.value = "";
      }
      event.preventDefault();
    });
  }

  pinnedTaskListIsEmpty() {
    const notification = document.createElement("div");
    notification.classList.add("notification_pinned");
    notification.textContent = "No pinned tasks";
    this.pinned.appendChild(notification);

    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          if (!this.pinned.querySelector(".task")) {
            if (!this.pinned.querySelector(".notification_pinned")) {
              this.pinned.appendChild(notification);
            }
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
          notification.remove();
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
        this.allTaskBox.appendChild(event.target.closest(".task"));
      }
    });
  }
}
