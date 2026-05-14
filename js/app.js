let add_project_btn = document.querySelector(".add-project-button")
let project_tmpl = document.querySelector("#project-template")
let i = 0

/*getting saved projects*/
let projects_list = JSON.parse(localStorage.getItem("projects") || "[]")

/*updating page appearance nased on existing projects*/
const page_update = (p) =>{

    let ptmpl_clone = project_tmpl.content.cloneNode(true)
    let project = ptmpl_clone.querySelector(".task")
    project.querySelector("textarea").value = p.name
    project.querySelector("h4").textContent = p.status
    project.querySelector("a").href = p.link

    /*dynamic project name change*/
    project.querySelector("textarea").addEventListener("input", () =>{
        p.name = project.querySelector("textarea").value
        /*saving projects*/
        localStorage.setItem("projects", JSON.stringify(projects_list))
    })

    document.body.appendChild(project)

    /*delete functionality*/
    project.querySelector("button").addEventListener("click", () =>{
        project.remove()
        projects_list.splice(project.id, 1)
        /*saving projects*/
        localStorage.setItem("projects", JSON.stringify(projects_list))
    })
}

projects_list.forEach(p =>{
    page_update(p)
})

/*creating the Project class*/
class Project {
    constructor(name, status, link, id){
        this.name = name
        this.status = status
        this.link = link
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
        project.querySelector("a").href,
        i
    )

    /*dynamic project name change*/
    project.querySelector("textarea").addEventListener("input", () =>{
        new_project.name = project.querySelector("textarea").value
        /*saving projects*/
        localStorage.setItem("projects", JSON.stringify(projects_list))
    })

    projects_list.push(new_project)

    document.body.appendChild(project)

    /*delete functionality*/
    project.querySelector("button").addEventListener("click", () =>{
        project.remove()
        projects_list.splice(project.id, 1)
        /*saving projects*/
        localStorage.setItem("projects", JSON.stringify(projects_list))
    })

    /*saving projects*/
    localStorage.setItem("projects", JSON.stringify(projects_list))
    i++
})