let input=document.querySelector(".input");
let submit=document.querySelector(".submit");
let tasks=document.querySelector(".tasks");
let task=document.querySelector(".task");
let arrayOfTask=[];
getDataFromLocal();



if(localStorage.getItem("tasks")){
    arrayOfTask=JSON.parse(localStorage.getItem("tasks"));
}



submit.onclick=function(){
    if(input.value!==""){
        addTask(input.value);
        input.value="";
    }
}



tasks.addEventListener("click",(e)=>{
    if(e.target.classList.contains("del")){
        e.target.parentElement.remove();
        deleteTask(e.target.parentElement.getAttribute("data-id"));
    }
    if(e.target.classList.contains("task")){
        e.target.classList.toggle("done"); 
        changeStatus(e.target.getAttribute("data-id"));

    }
})




function changeStatus(taskid){
    for(let i=0;i<arrayOfTask.length;i++){
        if(arrayOfTask[i].id==taskid){
            arrayOfTask[i].completed == false ?(arrayOfTask[i].completed=true):(arrayOfTask[i].completed=false);
        }
    }
    addDataToLoca(arrayOfTask);
}


function deleteTask(id){
    arrayOfTask=arrayOfTask.filter((task)=>task.id !=id);
    addDataToLoca(arrayOfTask);
}




function addTask(taskText){
    const task ={
        id:Date.now(),
        title:taskText,
        completed:false,
    };
    arrayOfTask.push(task);
    addEleToPage(arrayOfTask);
    addDataToLoca(arrayOfTask);
}




function addDataToLoca(arrayOfTask){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTask));
}







function getDataFromLocal(){
    let data =localStorage.getItem("tasks");
    if(data){
        let tasks=JSON.parse(data);
        addEleToPage(tasks);
    }
}



function addEleToPage(arrayOfTask){
    tasks.innerHTML="";
    arrayOfTask.forEach(task => {
        let div =document.createElement("div");
        div.className="task";
        if(task.completed){
            div.className="task done"
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        let span=document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span)
        tasks.appendChild(div)
        
        
    });
}