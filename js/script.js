let container = document.getElementById("content");

async function infoserv() {
    let url = "https://disqt.com/servers",
        response = await fetch(url),
        json;

    if (response.ok) {
        json = await response.json();
    } else {
        console.log("HTTP-Error: " + response.status);
    }
    display(json);
}

// exécution de la fonction principale
infoserv();


// fonction de construction du HTML à injecter
function display(json) {
    let html = "";

    const keys = Object.keys(json)
    
    for (let i = 0; i < keys.length; i++) {
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
    
    // une fois que le texte est injecté, les évènements pour copier au clique sont ajoutés
    addCopyEvents();
}


// fonction d'ajout d'évènements sur les liens injectés
function addCopyEvents() {
    let links = Array.from(document.getElementsByClassName("server-url"));

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            flickering(link);
            copyHttps(link.innerText);
        })
    })
}

// fonction de stockage d'une string dans le presse papier
function copyHttps(text) {
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function flickering(element){
    if(element.classList.contains("flicker")){
        element.classList.remove("flicker");
    } else {
        element.classList.add("flicker");
    }
}
