let add_project_btn = document.querySelector(".add-project-button")
let project_tmpl = document.querySelector("#project-template")
let projects = JSON.parse(localStorage.getItem("projects") || "[]")


const add_project = () =>{
    let project = project_tmpl.content.cloneNode(true)
    let project_clone = project.querySelector(".task")

    let project_data = {
        name: project_clone.querySelector("textarea").value,
        status: project_clone.querySelector("h4").textContent,
        link: project_clone.querySelector("a").href,
        id: "id_" + Math.round(Math.random()*1000)
    }

    document.body.appendChild(project)

    project_clone.querySelector("textarea").addEventListener("input", () =>{
        projects.forEach(p => {
            if(p.id === project_data.id){
                p.name = project_clone.querySelector("textarea").value
                localStorage.setItem("projects", JSON.stringify(projects))
            }
        })
        project_data.name = project_clone.querySelector("textarea").value
    })

    save_pj(project_data)
}

add_project_btn.addEventListener("click", () => {
    add_project()
})

const save_pj = (p) =>{
    let i = 0
    projects.forEach(project => {
        if(project.id !== p.id){
            i++
        }
    })
    if(i === projects.length){
        projects.push(p)
    }
    localStorage.setItem("projects", JSON.stringify(projects))
}

const get_pjs = () =>{
        projects.forEach(project => {
        let pj_clone = project_tmpl.content.cloneNode(true)

        pj_clone.querySelector("textarea").value = project.name 
        pj_clone.querySelector("h4").textContent = project.status
        pj_clone.querySelector("a").href = project.link 

        document.body.appendChild(pj_clone)
    });
}

get_pjs();