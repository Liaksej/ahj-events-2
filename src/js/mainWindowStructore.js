export function mainWindowStructore() {
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
