const params = new URLSearchParams (window.location.search)
localStorage.setItem("last_project_name", params.get("name"))
localStorage.setItem("last_project_id", params.get("id"))

let pname = localStorage.getItem("last_project_name")
let pid = localStorage.getItem("last_project_id")
 
const load_project_page = (project_name, project_id) =>{
    const titre = (document.querySelector(".title")).querySelector("h1").textContent
    const add_task_button = document.querySelector(".add-task-button")
    const task_tmpl = document.querySelector("#task-template")
    const tasks_list = JSON.parse(localStorage.getItem("tasks") || "[]")  
    const list_of_tasks_lists = JSON.parse(localStorage.getItem("tasks_lists") || "[]")
    let i = 0

    class Task {
        constructor(name, status, id){
            this.name = name
            this.status = status
            this.id = id
        }
    }

    add_task_button.addEventListener("click", () =>{
        const task_tmpl_clone = task_tmpl.content.cloneNode(true)
        const task = task_tmpl_clone.querySelector(".task")

        const new_task = new Task(
            task.querySelector("textarea").value,
            is_checked(task),
            i
        )

        task.querySelector("textarea").addEventListener("input", () =>{
            new_task.name = task.querySelector("textarea").value
            list_of_tasks_lists[project_id] = tasks_list
            localStorage.setItem("tasks", JSON.stringify(tasks_list))
            localStorage.setItem("tasks_lists", JSON.stringify(list_of_tasks_lists))
        })

        task.querySelector("button").addEventListener("click", () =>{
            let index = tasks_list.findIndex(task => task.id === new_task.id)
            tasks_list.splice(index, 1)
            task.remove()
            list_of_tasks_lists[project_id] = tasks_list
            localStorage.setItem("tasks", JSON.stringify(tasks_list))
            localStorage.setItem("tasks_lists", JSON.stringify(list_of_tasks_lists))
        })

        tasks_list.push(new_task)
        list_of_tasks_lists[project_id] = tasks_list
        localStorage.setItem("tasks", JSON.stringify(tasks_list))
        localStorage.setItem("tasks_lists", JSON.stringify(list_of_tasks_lists))

        document.body.appendChild(task)
        i++
    })

    const is_checked = (t) =>{
        if(t.querySelector("input").checked === true){
            return "checked"
        }else{
            return "unchecked"
        }
    }

    const load_saved_tasks = (t) =>{
        const task_tmpl_clone = task_tmpl.content.cloneNode(true)
        const task = task_tmpl_clone.querySelector(".task")

        task.querySelector("textarea").value = t.name
        if(t.status === "checked"){
            task.querySelector("input").checked = true
        }else{
            task.querySelector("input").checked = false
        }
        
        task.querySelector("textarea").addEventListener("input", () =>{
            t.name = task.querySelector("textarea").value
            list_of_tasks_lists[project_id] = tasks_list
            localStorage.setItem("tasks", JSON.stringify(tasks_list))
            localStorage.setItem("tasks_lists", JSON.stringify(list_of_tasks_lists))
        })

        task.querySelector("button").addEventListener("click", () =>{
            let index = tasks_list.findIndex(task => task.id === t.id)
            tasks_list.splice(index, 1)
            task.remove()
            list_of_tasks_lists[project_id] = tasks_list
            localStorage.setItem("tasks", JSON.stringify(tasks_list))
            localStorage.setItem("tasks_lists", JSON.stringify(list_of_tasks_lists))
        })

        if(t.status === "checked"){
            task.querySelector("input").checked = true
        }else{
            task.querySelector("input").checked = false
        }

        list_of_tasks_lists[project_id] = tasks_list
        localStorage.setItem("tasks", JSON.stringify(tasks_list))
        localStorage.setItem("tasks_lists", JSON.stringify(list_of_tasks_lists))

        document.body.appendChild(task)
    }

    list_of_tasks_lists[pid].forEach(task =>{
            load_saved_tasks(task)
        })
}

load_project_page(pname, pid)