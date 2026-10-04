const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const remainingCount = document.getElementById('remainingCount');

let todos = [];

// Add a new todo
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  todos.push({ id: Date.now(), text, completed: false });
  todoInput.value = '';
  renderTodos();
}

// Render the list based on the todos array
function renderTodos() {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.dataset.id = todo.id;

    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''}>
      <span>${todo.text}</span>
      <button class="delete-btn">✕</button>
    `;

    todoList.appendChild(li);
  });

  updateCount();
}

// Event delegation: one listener on the parent handles all checkboxes/delete buttons
todoList.addEventListener('click', (e) => {
  const li = e.target.closest('.todo-item');
  if (!li) return;

  const id = Number(li.dataset.id);

  if (e.target.matches('input[type="checkbox"]')) {
    toggleComplete(id);
  } else if (e.target.matches('.delete-btn')) {
    deleteTodo(id);
  }
});

function toggleComplete(id) {
  todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  renderTodos();
}

function updateCount() {
  const remaining = todos.filter(t => !t.completed).length;
  remainingCount.textContent = remaining;
}