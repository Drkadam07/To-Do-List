let todo_add = document.querySelector('.todo_add');
const todo_input = document.querySelector('.todo_input');
let textitem = document.querySelector('.textitem');
let todo_date = document.querySelector('.todo_date');

// Load to-do list from local storage
let todolist = JSON.parse(localStorage.getItem('todolist')) || [];

// Function to save to-do list to local storage
function saveToLocalStorage() {
    localStorage.setItem('todolist', JSON.stringify(todolist));
}

function renderTodoList() {
    let totolisthtml = '';
    for (let index = 0; index < todolist.length; index++) {
        const todoobject = todolist[index];
        const todoname = todoobject.name;
        const tododate = todoobject.datetodo;
        const html = `<div class="textitem">${todoname}</div> <div class="textitem">${tododate}</div><button class='deletebtn' data-index='${index}'>Delete</button>`;
        totolisthtml += html;
    }
    textitem.innerHTML = totolisthtml;

    // Attach event listeners to all delete buttons
    const deleteButtons = document.querySelectorAll('.deletebtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            todolist.splice(index, 1);
            saveToLocalStorage();
            renderTodoList();
        });
    });
}

// Initial rendering of the to-do list
renderTodoList();

todo_add.addEventListener('click', () => {
    let item = todo_input.value;
    let date = todo_date.value;
    if (item !== "" && date !== '') {
        todolist.push({ name: item, datetodo: date });
        todo_input.value = "";
        todo_date.value = "";
        saveToLocalStorage();
        renderTodoList();
    }
});
