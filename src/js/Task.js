export class Task {
  constructor(taskText) {
    this.taskText = taskText;
    this.taskPinned = false;
    this.id = Date.now();
  }
}
