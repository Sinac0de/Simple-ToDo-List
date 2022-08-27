/*----------
  VARIABLES
-----------*/
const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');
const todoAddBtn = document.querySelector('.todo-add');
const filterTodo = document.querySelector('.select');

/*----------
  Event Listeners
-----------*/
todoAddBtn.addEventListener('click', addTodo);

todoList.addEventListener('click', checkRemove);

filterTodo.addEventListener('change', filterTodos);

document.addEventListener("DOMContentLoaded", getLocalTodos);

/*----------
  Functions
-----------*/

/* adding todo to DOM */
function addTodo(e) {
    e.preventDefault();//prevent refresh and submit after pressing the button
    /*check if the input value is empty*/
    if (todoInput.value !== "") {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = `
        <li>${todoInput.value}</li>
        <span><i class="check-todo fa-solid fa-circle-check"></i></span>
        <span><i class="delete-todo fa-solid fa-trash-can"></i></span>`;
        todoDiv.innerHTML = newTodo;
        todoList.prepend(todoDiv);
        saveLocalTodos(todoInput.value);//save the value in Local storage
        todoInput.value = ""; //reset the input value
    } else {
        alert("Please Enter a text first! / !لطفا ابتدا یک مقدار وارد کنید");
    }
}

/* Remove or check Todo*/
function checkRemove(e) {
    const item = e.target; //the element that is clicked on
    const classList = [...item.classList]; //gather all the class names of that element
    if (classList[0] === "check-todo") { //if the element is checkTodo
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed");

    } else if (classList[0] == "delete-todo") {//if the element is deleteTodo
        const todo = item.parentElement.parentElement;
        removeLocalTodos(todo);
        todo.remove(); //remove Todo from DOM
    }
}

function filterTodos(e) {
    const todos = [...todoList.childNodes];//gather all the children of todolist in an array
    todos.forEach(todo => {
        switch (e.target.value) {
            case "All":
                todo.style.display = 'flex';
                break;
            case "Completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "Uncompleted":
                if (!(todo.classList.contains('completed'))) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}


function saveLocalTodos(todo) {
    let savedTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}

//show local todos on DOM
function getLocalTodos() {
    let savedTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    savedTodos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo"); //add class to the new todo
        const newTodo = `<li>${todo}</li>
        <span><i class="check-todo fa-solid fa-circle-check"></i></span>
        <span><i class="delete-todo fa-solid fa-trash-can"></i></span>`; //dynamically create tags using backtick
        todoDiv.innerHTML = newTodo; //add html tags inside the new todo div
        todoList.prepend(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let savedTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    const filteredLocalTodos = savedTodos.filter(t => {
        return t != todo.children[0].innerText;
    });
    localStorage.setItem("todos", JSON.stringify(filteredLocalTodos));
}

