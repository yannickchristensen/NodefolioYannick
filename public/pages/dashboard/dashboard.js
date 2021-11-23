fetch('/api/projects')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
    

function appendData(data) {
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
            div.innerHTML = 'ID: ' + data[i].id +' Name: ' + data[i].name + ' Technologies: ' + data[i].technologies;
                mainContainer.appendChild(div);
            }
        }
        
function createProject() {
    fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            title: document.getElementById("title").value,
            category: document.getElementById("category").value,
            technologies: document.getElementById("technologies").value,
        })
    }).then(res => {
        if (res.status == 200) {
            setTimeout(() => location.href= "/dashboard", 1500);
        }
        else {
            console.log("Error:", res.status)
        }
    }) 
}

function deleteProject(projectId, rowToDeleteIndex) {
    fetch("/api/projects/" + projectId, {
        method: "DELETE"
    }).then(res => {
        if (res.status == 200) {
            const tableRows = document.getElementsByTagName("tr")
            const rowToDelete = Array.from(tableRows).find(row => row.rowIndex == rowToDeleteIndex)
            rowToDelete.remove()
        } else {
            console.log(res.status)
        }
    })
}

function updateProject(row) {
    project = {
        id: row.cells[0].innerHTML,
        title: row.cells[1].children[0].value,
        category: row.cells[2].children[0].value,
        technologies: row.cells[3].children[0].value,
    }

    fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify( project )
    }).then(res => {
        console.log(res.status)
    })
}

document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("create-project").addEventListener("click", createProject)
})