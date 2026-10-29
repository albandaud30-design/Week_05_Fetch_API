const greet = (name) => `Hello, ${name}! Welcome to Week 5.`;

document.getElementById("message").textContent = greet("Alban");

const fetchButton = document.getElementById("fetchButton");
const statusMessage = document.getElementById("status");
const taskList = document.getElementById("taskList");

fetchButton.addEventListener("click", async () => {
  statusMessage.textContent = "Loading tasks...";
  taskList.innerHTML = "";
  fetchButton.disabled = true;

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );

    if (!response.ok) {
      throw new Error("Could not fetch tasks");
    }

    const tasks = await response.json();

    tasks.forEach((task) => {
      const listItem = document.createElement("li");

      listItem.textContent =
        `${task.completed ? "✅" : "⬜"} ${task.title}`;

      listItem.style.cursor = "pointer";

      listItem.addEventListener("click", () => {
        task.completed = !task.completed;

        listItem.textContent =
          `${task.completed ? "✅" : "⬜"} ${task.title}`;
      });

      taskList.appendChild(listItem);
    });

    statusMessage.textContent = `Loaded ${tasks.length} tasks successfully. Click a task to change its status.`;
  } catch (error) {
    statusMessage.textContent =
      "Could not load tasks. Check your internet and try again.";

    console.error(error);
  } finally {
    fetchButton.disabled = false;
  }
});