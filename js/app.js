let add_project_btn = document.querySelector(".add-project-button")
let project_tmpl = document.querySelector("#project-template")
let i = localStorage.getItem("index")

/*getting saved projects*/
let projects_list = JSON.parse(localStorage.getItem("projects") || "[]")

/*updating page appearance based on existing projects*/
const page_update = (p) =>{

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
        project.remove()
        let index = projects_list.findIndex(proj => proj.id == p.id)
        projects_list.splice(index, 1)
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
    let ptmpl_clone = project_tmpl.content.cloneNode(true)
    let project = ptmpl_clone.querySelector(".task")

    let new_project = new Project (
        project.querySelector("textarea").value,
        project.querySelector("h4").textContent,
        i
    )

    /*dynamic project name change*/
    project.querySelector("textarea").addEventListener("input", () =>{
        new_project.name = project.querySelector("textarea").value
        /*saving projects*/
        localStorage.setItem("projects", JSON.stringify(projects_list))
    })

    /*delete functionality*/
    project.querySelector("button").addEventListener("click", () =>{
        project.remove()
        let index = projects_list.findIndex(proj => proj.id == new_project.id)
        projects_list.splice(index, 1)
        /*saving projects*/
        localStorage.setItem("projects", JSON.stringify(projects_list))
    })

    /*page switch*/
    project.querySelector("a").href = `project.html?id=${new_project.id}&name=${encodeURIComponent(new_project.name)}`

    document.body.appendChild(project)
    /*saving projects*/
    projects_list.push(new_project)
    localStorage.setItem("projects", JSON.stringify(projects_list))
    i++
})    