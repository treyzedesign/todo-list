let todo = []
let list = document.getElementById("task-item")
let parent = document.getElementById("task")
let butt = document.getElementById("button")
butt.addEventListener("click", function add (){
    let todoInput = document.getElementById("text").value 
    console.log(todoInput);
let error = document.getElementById("error")
if(todoInput.length == 0){
   error.append("nothing to add")
}else{
   let input = {
        todo_list : todoInput,
        id: Date.now()
    }
    todo.push(input)
    let storing = localStorage.setItem("todolist", JSON.stringify(todo))

    let all_list = JSON.parse(localStorage.getItem("todolist"))

    list.innerHTML = ''
    
      all_list.forEach(function (item, index){
        const li = document.createElement('li');
        li.setAttribute("id", "listItem")
        li.setAttribute("data-key", item.id)
        li.innerHTML = `${item.todo_list}
                        <button class="delete" onClick=" del(${item.id})">delete</button>`
        list.append(li)
        li.classList.add("li")
    })
    error.innerHTML =''

}
})
window.onload = function(){
    let checker = JSON.parse(localStorage.getItem("todolist"))
    if(checker != null){
          // Yes there is data then set the new local storage 
          localStorage.setItem("reLoad", JSON.stringify(checker));

          // Then get the data back and push it to our users global array
          let todolists = JSON.parse(localStorage.getItem("reLoad"));
          console.log(todolists);
          
          todolists.forEach(function (item, index) {
            todo.push(item)
          });
    }
          // terminate the localStorage
          localStorage.removeItem("reLoad")
    

}
function render(){
    let all_list = JSON.parse(localStorage.getItem("todolist"))
    list.innerHTML = ''
      all_list.forEach(function (item, index){
        const li = document.createElement('li');
        li.setAttribute("id", "listItem")
        li.setAttribute("data-key", item.id)
        li.innerHTML = `<span id="itemize">${item.todo_list}</span>
                        <button class="delete " id= "delete" onClick="del(${item.id})">delete</button>`
        list.append(li)
        li.classList.add("li")
       
    })
}
render()

function del(id){
  todo = todo.filter((item)=>{
    console.log('Hello');
    return item.id != id
  })
  localStorage.setItem("todolist", JSON.stringify(todo))
  render()
  location.reload()

}