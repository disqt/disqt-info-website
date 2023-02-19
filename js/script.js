let container = document.getElementById("content");

async function infoserv() {
    let url = "http://disqt.com/servers",
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
            color = "blue";
            status = "ON";
        } else {
            color = "pink";
            status = "OFF";
        }

        html += `
                <tr>
                    <td class="servers lit-pink">${keys[i]}</td>
                    <td class="lit-${color} status">${status}<br><a class="server-url lit-blue" href="${url}">${url}</a></td>
                </tr>
                `
    }


    container.innerHTML = html;
}

infoserv();