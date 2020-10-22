let $input = document.querySelector('.todo-input');
let $todos = document.querySelector('.todos');
let $colors = document.querySelector('.colors');

let _colors = ['blue', '#ffa400', 'green', 'red', '#00d669', '#530cff'];
let _color = null;
let _completedColor = '#888';
let _todos = [];


// create random number for choice color
function getRandomInt (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//create new todo element
function getNewTodoHTML (id, color, text){
    return `
        <div class="todo" data-id="${id}">
            <p style="background-color: ${color}" class="checkbox">
                <input data-type="todo-checkbox" type="checkbox" id="checkbox-${id}">
                <label for="checkbox-${id}"></label>
            </p>
            <p style="background-color: ${color}" class="text">${text}</p>
        </div>
    `
}
//create color element
function getNewColorHTML (id, color){
    return `
    <input type="radio" value="${color}" name="color" id="${id}">
    <label style="background-color: ${color}" data-type="color" for="${id}"></label>
`
}
//insert color element
function insertColors(){
    for (let i = 0; i < _colors.length; i ++) {
        $colors.insertAdjacentHTML('beforeend', getNewColorHTML(i, _colors[i]));
    }
}

//choice color for todo
function chooseColor(target){
    _color = document.getElementById(target.htmlFor).value;
}
//choice random color for todo
function chooseRandomColor(){
    let newColorId = getRandomInt(0, _colors.length - 1);
    _color = _colors[newColorId];
    $colors.querySelectorAll('input')[newColorId].checked = true;
}

//insert todo 
function addTodo(){
    if (!$input.value.trim()) {
        alert('Set todo text');
        return;
    }

    let todos = document.querySelectorAll('.todos > .todo');
    let id = _todos.length === 0 ? 1 : +todos[todos.length - 1].dataset.id + 1;

    _todos.push({id, checked: false, color: _color, text: $input.value});    
    $todos.insertAdjacentHTML('beforeend', getNewTodoHTML(id, _color, $input.value));

    $input.value = '';

    chooseRandomColor();
}

//event handler checked todo 
function toggleTodo(target){
    let todo = _todos.find((item, index, array) => item.id === +target.parentElement.parentElement.dataset.id);
    todo.checked = !todo.checked;
    markTodo(todo);
}

// if todo checked or not checked
function markTodo(todo){
    let $todo = Array.from($todos.children).find((item, index, array) => item.dataset.id == todo.id);

    if (todo.checked) {
        for (let p of $todo.children) {
            p.style.textDecoration = 'line-through';
            p.style.backgroundColor = _completedColor;            
        }
        
    } else {
        for (let p of $todo.children) {
            p.style.textDecoration = 'none';
            p.style.backgroundColor = todo.color;
        }
    }
}
//event handler
function fclick (event) {
    switch (event.target.dataset.type) {
        case 'color':
            chooseColor(event.target);//choice color
            break;
        case 'todo-button':
            addTodo(); //add todo
            break;
        case 'todo-checkbox':
            toggleTodo(event.target);//complete todo
            break;
        default:
            break;
    }
}

insertColors();
chooseRandomColor();

window.addEventListener('click', fclick);
