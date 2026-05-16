let add_project_btn = document.querySelector(".add-project-button")
let project_tmpl = document.querySelector("#project-template")

/*getting saved projects*/
let projects_list = JSON.parse(localStorage.getItem("projects") || "[]")

/*updating page appearance based on existing projects*/
const page_update = (p) =>{
    let last_index = Number(localStorage.getItem("last_index"))
    let ptmpl_clone = project_tmpl.content.cloneNode(true)
    let project = ptmpl_clone.querySelector(".task")
    project.querySelector("textarea").value = p.name
    project.querySelector("h4").textContent = p.status

    /*dynamic project name change*/
    project.querySelector("textarea").addEventListener("input", () =>{
        p.name = project.querySelector("textarea").value
        /*saving projects*/
        localStorage.setItem("projects", JSON.stringify(projects_list))
    })

    /*delete functionality*/
    project.querySelector("button").addEventListener("click", () =>{
        let last_index = Number(localStorage.getItem("last_index"))
        project.remove()
        projects_list.forEach(project =>{
            if(project.id > p.id){
                project.id -= 1
            }
        })
        projects_list.splice(p.id, 1)
        localStorage.setItem("last_index", String(last_index - 1))
        /*saving projects*/
        localStorage.setItem("projects", JSON.stringify(projects_list))
    })

    /*page switch*/
    project.querySelector("a").href = `project.html?id=${p.id}&name=${encodeURIComponent(p.name)}`

    document.body.appendChild(project)
}

projects_list.forEach(p =>{
    page_update(p)
})

/*creating the Project class*/
class Project {
    constructor(name, status, id){
        this.name = name
        this.status = status
        this.id = id
    }
}

/*project creation*/
add_project_btn.addEventListener("click", ()=>{
    let last_index 
    if(localStorage.getItem("last_index")){
        last_index = Number(localStorage.getItem("last_index"))
    }else{
        last_index = 0
    }
    let ptmpl_clone = project_tmpl.content.cloneNode(true)
    let project = ptmpl_clone.querySelector(".task")

    let new_project = new Project (
        project.querySelector("textarea").value,
        project.querySelector("h4").textContent,
        last_index
    )

    localStorage.setItem("last_index", String(new_project.id + 1))

    /*dynamic project name change*/
    project.querySelector("textarea").addEventListener("input", () =>{
        new_project.name = project.querySelector("textarea").value
        /*saving projects*/
        localStorage.setItem("projects", JSON.stringify(projects_list))
    })

    /*saving projects*/
    projects_list.push(new_project)
    localStorage.setItem("projects", JSON.stringify(projects_list))

    /*delete functionality*/
    project.querySelector("button").addEventListener("click", () =>{
        project.remove()
        projects_list.forEach(project =>{
            if(project.id > new_project.id){
                project.id -= 1
            }
        })
        projects_list.splice(new_project.id, 1)
        localStorage.setItem("last_index", String(new_project.id))
        /*saving projects*/
        localStorage.setItem("projects", JSON.stringify(projects_list))
    })

    /*page switch*/
    project.querySelector("a").href = `project.html?id=${new_project.id}&name=${encodeURIComponent(new_project.name)}`

    document.body.appendChild(project)
})    