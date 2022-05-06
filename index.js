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

filterTodo.addEventListener('click', filterTodos);

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
        todoList.appendChild(todoDiv); // add todo to DOM
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




