let container = document.getElementById("content");

async function infoserv() {
    let url = "https://disqt.com/servers",
        response = await fetch(url),
        json;

    console.log(response)
    if (response.ok) {
        json = await response.json();
        console.log(json);
    } else {
        console.log("HTTP-Error: " + response.status);
    }
    display(json);
}

function display(json) {
    let html = "";

    for (var i = 0, keys = Object.keys(json), ii = keys.length; i < ii; i++) {
        console.log('key : ' + keys[i] + ' val : ' + json[keys[i]].Running);
        let color, status,
            url = json[keys[i]].Url;

        if (json[keys[i]].Running == true) {
            color = "green";
            status = "ON";
        } else {
            color = "pink";
            status = "OFF";
        }

        html += `
                <tr>
                    <td class="servers lit-pink">${keys[i]}</td>
                    <td class="lit-${color} status">${status}<br><a class="server-url" href="${url}">${url}</td>
                </tr>
                `
    }
    container.innerHTML = html;
    addCopyEvents();
}

// exécution de la fonction
infoserv();

function addCopyEvents(){
    let links = Array.from(document.getElementsByTagName("a"));

    links.forEach(link =>{
        link.addEventListener("click", function(e){
            e.preventDefault();
            // méthode de copie dépreciée
            // link.setSelectionRange(0, link.value.length);
            // document.execCommand("copy");
            // console.log("copié!");
            copyHttps(link.innerText);
        })
    })
}


function copyHttps(text) {
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}