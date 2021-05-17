'use strict'

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', function(e) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[0];
            chrome.tabs.update(tab.id, {url: e.target.href});
        });
    }, false)

    const config_path = chrome.runtime.getURL('config.json');

    fetch(config_path)
        .then((response) => response.json()) //assuming file contains json
        .then((json) => load_users(json));
});

const load_users = (config) => {
    const users = config["users"]
    const root_uri = config["root_uri"]
    const group_name = config["group_name"]
    const project = config["project"]
    const board_id = config["board_id"]
    const ul = document.querySelector("#users ul")
    const title_p = document.querySelector("#title")
    title_p.innerHTML = `${config["company_name"]} GitLab Filters`
    for (let i = 0; i < users.length; i++) {
        const user = users[i]
        const username = user["username"]
        const name = user["name"]
        let item_uri = `<a href="${root_uri}/groups/${group_name}/${project}/-/boards/${board_id}?scope=all&utf8=%E2%9C%93&assignee_username=${username}">${name}</a>`
        let li = document.createElement("li")
        li.innerHTML = `${item_uri}`
        ul.appendChild(li)
    }
}