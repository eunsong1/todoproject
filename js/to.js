const todoinput = document.querySelector("#input_todo");
const todoForm = document.querySelector("#todo")
const todolist = document.querySelector("#todo-list")
const baseurl = `http://localhost:8080`;
let todoArray = [];

function removeAllTodos(){
    while(todolist.hasChildNodes()){
        todolist.removeChild(todolist.firstChild);
    }
}

function getClickedTodoid(e){
    const clicked = e.target.parentNode;
    const todoId = clicked.id;
    return todoId
}

function handleCompleteTodo(e){
    console.log(todoArray)
    const todoId = getClickedTodoid(e);

    const todo = todoArray.find(todo =>todo.id==todoId);
    console.log(todo);

    const url =`${baseurl}/todos/${todoId}`;
    const body={
        contents : todo.contents,
        isDone : !todo.is_done,
        userName : todo.userName
    }

    fetch(url,{
        method : 'PUT',
        body : JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
        },
    }).then(()=>{
        getAllTodos();
    });
}
    function handleDeleteTodo(e){
        const todoId = getClickedTodoid(e);
        const url =`${baseurl}/todos/${todoId}`;
        fetch(url,{
            method : 'DELETE'
        }).then(()=>{
            getAllTodos();
        });
    }

    function paintingalltodo(){

        removeAllTodos();

        todoArray.forEach(todo => {
            const li = document.createElement("li");
            const span = todo.is_done===true ? document.createElement("del") : document.createElement("span");
            const completeBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");

            li.id=todo.id;
            span.innerText = todo.contents;
            completeBtn.innerText ="✔";
            deleteBtn.innerText="❌";
            completeBtn.addEventListener("click",handleCompleteTodo)
            deleteBtn.addEventListener("click",handleDeleteTodo)

            li.appendChild(span);
            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);
            todolist.appendChild(li);

        });
    }



    function getAllTodos(){
        const userName =localStorage.getItem("userName");
        const url =`${baseurl}/todos/users?userName=${userName}`;
        fetch(url)
            .then((response) => response.json())
            .then((data)=>{
                console.log(data)
                todoArray = data;
                paintingalltodo();

            })
    }



    function postNewTodo(newTodo){
        const url = `${baseurl}/todos`;
        const body = {
            contents : newTodo,
            userName : localStorage.getItem("userName")
        }
        fetch(url,{
            method : 'POST',
            body : JSON.stringify(body),
            headers:{
                'Content-Type': 'application/json'
            },
        }).then(()=>{
            getAllTodos();
        });
    }




    function onTodoSubmit(e){
        e.preventDefault();

        const newTodo =todoinput.value;
        todoinput.value="";

        if(localStorage.getItem("userName")!==null){
            postNewTodo(newTodo)
        }else{
            alert('사용자 이름을 입력 하세요')
        }
        
    }

    if(localStorage.getItem("userName")!==null)
        getAllTodos()

    todoForm.addEventListener("submit",onTodoSubmit);


    // export{paintingalltodo};
    