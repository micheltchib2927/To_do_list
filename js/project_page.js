const params = new URLSearchParams (window.location.search)
localStorage.setItem("last_project_name", params.get("name"))
localStorage.setItem("last_project_id", params.get("id"))

let pname = localStorage.getItem("last_project_name")
let pid = Number(localStorage.getItem("last_project_id"))

let title = document.querySelector(".title")
title.querySelector("h1").textContent = pname

let add_task_button = document.querySelector(".add-task-button")
let task_tmpl = document.querySelector("#task-template")
let list_of_projects = JSON.parse(localStorage.getItem("projects") || "[]")
 
class Task{
    constructor(name, status, id){
        this.name = name
        this.status = status
        this.id = id
    }
}

const load_saved_tasks = (t) =>{
    let last_id = Number(localStorage.getItem("last_id")) ? Number(localStorage.getItem("last_id")) : 0
    let task_tmpl_clone = task_tmpl.content.cloneNode(true)
    let task = task_tmpl_clone.querySelector(".task")

    task.querySelector("textarea").value = t.name
    task.querySelector("input").checked = t.status === "checked" ? true : false
    
    task.querySelector("textarea").addEventListener("input", () =>{
        t.name = task.querySelector("textarea").value
        localStorage.setItem("projects", JSON.stringify(list_of_projects))
    })

    task.querySelector("button").addEventListener("click", () =>{
        let last_id = Number(localStorage.getItem("last_id")) ? Number(localStorage.getItem("last_id")) : 0
        task.remove()
        list_of_projects[pid].tasks_list.forEach(task =>{
            if(task.id > t.id){
                task.id -= 1
            }
        })
        list_of_projects[pid].tasks_list.splice(t.id, 1)
        localStorage.setItem("projects", JSON.stringify(list_of_projects))
        localStorage.setItem("last_id", String(last_id - 1))
        /*saving projects*/
    })

    task.querySelector("input").addEventListener("change", ()=>{
        t.status = t.status === "checked" ? "unchecked" : "checked"
        localStorage.setItem("projects", JSON.stringify(list_of_projects))
        update_project_status(list_of_projects[pid])
    })

    document.body.append(task)
}

list_of_projects[pid].tasks_list.forEach(task =>{
    load_saved_tasks(task)
})

add_task_button.addEventListener("click", () =>{
    let last_id = Number(localStorage.getItem("last_id")) ? Number(localStorage.getItem("last_id")) : 0
    let task_tmpl_clone = task_tmpl.content.cloneNode(true)
    let task = task_tmpl_clone.querySelector(".task")

    let new_task = new Task(
        task.querySelector("textarea").value,
        task.querySelector("input").checked === true ? "checked" : "unchecked",
        last_id
    )

    localStorage.setItem("last_id", String(new_task.id + 1))

    list_of_projects[pid].tasks_list.push(new_task)
    localStorage.setItem("projects", JSON.stringify(list_of_projects))

    task.querySelector("textarea").addEventListener("input", () =>{
        new_task.name = task.querySelector("textarea").value
        localStorage.setItem("projects", JSON.stringify(list_of_projects))
    })

    task.querySelector("button").addEventListener("click", () =>{
        let last_id = Number(localStorage.getItem("last_id")) ? Number(localStorage.getItem("last_id")) : 0
        task.remove()
        list_of_projects[pid].tasks_list.forEach(task =>{
            if(task.id > new_task.id){
                task.id -= 1
            }
        })
        list_of_projects[pid].tasks_list.splice(new_task.id, 1)
        localStorage.setItem("projects", JSON.stringify(list_of_projects))
        localStorage.setItem("last_id", String(last_id - 1))
        /*saving projects*/
    })

    task.querySelector("input").addEventListener("change", ()=>{
        new_task.status = new_task.status === "checked" ? "unchecked" : "checked"
        localStorage.setItem("projects", JSON.stringify(list_of_projects))
        update_project_status(list_of_projects[pid])
    })

    document.body.appendChild(task)
})

const update_project_status = (p) =>{
    let tasks_completed = 0
    p.tasks_list.forEach(task =>{
        if(task.status === "checked"){
            tasks_completed += 1
        }
    })
    if(tasks_completed === p.tasks_list.length){
        p.status = "Statut : Terminé"
        localStorage.setItem("projects", JSON.stringify(list_of_projects))
    }else{
        p.status = "Statut : En cours"
        localStorage.setItem("projects", JSON.stringify(list_of_projects))
    }
}