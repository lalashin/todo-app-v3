const todoInput = document.querySelector('#todoInput'); 
const addBtn = document.querySelector('#addBtn');

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));
console.log("localStorage",savedTodoList);

if(savedTodoList){
    for(let i=0;i<savedTodoList.length;i++){
        createTodo(savedTodoList[i]);
    }
}


function keyCodeCheck() {
   // console.log(event)
    if(event.keyCode === 13 && todoInput.value !==''){
        createTodo();
    }
};

addBtn.addEventListener('click', ()=>{
    if(todoInput.value !==''){
        createTodo();
    }else{
        alert("할일을 입력하세요!");
    }

});

function createTodo(storageData) {

    let todoContents = todoInput.value;

    if(storageData) {
        todoContents = storageData.contents;
    }

    const todoList = document.querySelector('#todoList');    
    const newLi = document.createElement('li');
    const newBtn = document.createElement('button');    
    const newSpan = document.createElement('span');    
   
    newLi.appendChild(newBtn);
    newLi.appendChild(newSpan);

    newSpan.textContent = todoContents;

    todoList.appendChild(newLi);
    //console.log(todoList.children[0].querySelector('span').textContent)
    todoInput.value='';

    newBtn.addEventListener('click',()=>{
        newLi.classList.toggle('complete');
        saveItemsFn();
    });

    newLi.addEventListener('dblclick',()=>{
        newLi.remove();
        saveItemsFn();
    });

    if(storageData && storageData.complete === true) {
        newLi.classList.add('complete');
    }

    saveItemsFn();
}

function deleteAll(){
    const liList = document.querySelectorAll('#todoList li');
    for(let i=0;i < liList.length; i++){
        liList[i].remove();
    }
    saveItemsFn();  
};

function saveItemsFn(){
    const saveItems = [];
    for(let i=0; i < todoList.children.length;i++){
        const todoObj = {
            contents: todoList.children[i].querySelector('span').textContent,
            complete: todoList.children[i].classList.contains('complete')
        };
        saveItems.push(todoObj);
    }
    if(saveItems.length === 0){
        localStorage.removeItem('saved-items')
    }else{
        // console.log(JSON.stringify(saveItems));//문자열로 변환
        localStorage.setItem('saved-items',JSON.stringify(saveItems))
    }
  
}

