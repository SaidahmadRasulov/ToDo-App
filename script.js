const input = document.querySelector('.input');
let todos = JSON.parse(localStorage.getItem('data')) || [];
let boolean = JSON.parse(localStorage.getItem('boolean')) || false;
const wrapp = document.querySelector('.content__wrapp');

function handleAdd() {
    if (input.value !== '') {
        const newTask = {
            id: Date.now(),
            task: input.value,
            completed: false
        };
        todos.push(newTask);
        localStorage.setItem('data', JSON.stringify(todos));
        input.value = '';
        renderTasks();
    }
}

function renderTasks() {
    wrapp.innerHTML = '';
    todos.forEach((item, index) => {
        const checkboxClass = item.completed ? 'bx bx-check-circle checked' : 'circle_div';
        const taskClass = item.completed ? 'completed' : 'title';

        const taskHTML = `
            <div class='flex'>
                <div class='title_box'>
                <i class='${checkboxClass}' onclick='changeBoolean(${index})'></i>
                <h1 class='${taskClass}' onclick='changeBoolean(${index})'>${item.task}</h1>
                </div>
                <i class='bx bx-trash' onclick='handleDelete(${item.id})'></i>
            </div>
        `;

        wrapp.innerHTML += taskHTML;
    });
}

function changeBoolean(index) {
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('data', JSON.stringify(todos));
    renderTasks();
}

function handleDelete(id) {
    todos = todos.filter((item) => item.id !== id);
    localStorage.setItem('data', JSON.stringify(todos));
    renderTasks()
}

renderTasks();
