// SELECTING DOM ELEMENTS 
const ul = document.querySelector(".todo__lists");
const submitButton = document.querySelector(".fields__container__button");
const input = document.querySelector(".fields__container__field");
const errorMessage = document.querySelector(".fields__container__error");
const dateDOM = document.querySelector(".date__container");
const clearAll = document.querySelector(".todo__lists__clearer span");
// Creating Functions
function appendChild(parent,child){
return parent.appendChild(child);
}
function create(inp){
    // Create Necessary Elements
    const lists = document.createElement("li");
    lists.textContent = inp;
    const dltButton = document.createElement("span");
    // Give Elements Classes
    lists.classList.add("todos");
    dltButton.classList.add("todos__dlt-btn");
    // Append Elements to view in DOM
    appendChild(ul,lists);
    appendChild(lists,dltButton);
    // Dlt Button Function
    dltButton.addEventListener("click", e=>{
        ul.removeChild(e.target.parentElement);
        dltItems(e.target.parentElement);

    });
    clearAll.style.opacity = 1;
    clearAll.style.pointerEvents = "all";
}
function dltItems(item){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
tasks.forEach((elem,index)=>{
    if(elem.indexOf(item.innerText) > -1 ){
tasks.splice(index,1);
    }
})
localStorage.setItem("tasks",JSON.stringify(tasks));

}
function createElements(inp){
    if(inp !== ""){
    create(inp);
    storeItems(inp);
}else{
errorMessage.style.opacity = 1;
}
}
function storeItems(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
 
}

function getItems(){
    if(localStorage.getItem(`tasks`) !== null){
        const listsArr = JSON.parse(localStorage.getItem(`tasks`));
        listsArr.forEach(elem=>{
            create(elem);
        });
    }else console.log("None");
}
getItems()

const li =  document.querySelectorAll("li");
// Event Listeners
submitButton.addEventListener("click",()=>{
    createElements(input.value);
});
input.oninput = ()=>errorMessage.style.opacity = 0;
clearAll.onclick = ()=>{
    const allLists =  document.querySelectorAll(".todos");
    if(allLists.length > 0){
        allLists.forEach(elem=>ul.removeChild(elem));
        localStorage.removeItem("tasks");
    }
    clearAll.style.opacity = 0;
        clearAll.style.pointerEvents = "none";
};


