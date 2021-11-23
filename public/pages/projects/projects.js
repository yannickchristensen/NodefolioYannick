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