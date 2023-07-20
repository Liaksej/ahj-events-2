import { mainWindowStructore } from "./mainWindowStructore";
import { TaskManager } from "./TaskManager";

function app() {
  mainWindowStructore();
  const taskManager = new TaskManager();
  taskManager.addTask();
  taskManager.pinnedTaskListIsEmpty();
  taskManager.addPinedTask();
  taskManager.removePinedTask();
}

app();
