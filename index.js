import {schemeModes} from "./data.js"

const schemeModesSelect = document.querySelector('.scheme-modes-select')
const myForm = document.querySelector("form")


function addSchemeModes(schemeModes){
    schemeModes.forEach((mode) => {
        schemeModesSelect.innerHTML += `<option value="${mode.toLowerCase()}">${mode}</option>`
    })
}

myForm.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const formData = new FormData(event.target)

    const schemeFormData = {
        "hex": formData.get("scheme-color"),
        "mode": formData.get("scheme-mode"),
    }

    const requestURL = getRequestURL(schemeFormData.hex, schemeFormData.mode)

    loadColors(requestURL)
})

function getRequestURL(hex, mode){
    const baseURL = "https://www.thecolorapi.com"
    const endPoint = "/scheme"
    const queryString = `?hex=${hex.slice(1)}&mode=${mode}`

    return `${baseURL}${endPoint}${queryString}`
}

function loadColors(requestURL){

    return fetch(requestURL)
        .then(response => response.json())
        .then(data => {
            const colors = data.colors.map(({ hex: { clean } }) => clean)
            
            displayColors(colors)

            displayHexes(colors)
        })
}

function displayColors(colors){
    for (let i = 0; i < 5; i++){
        document.getElementById(`color${i + 1}`).style.backgroundColor = colors[i]
    }
}

function displayHexes(colors){
    for (let i = 0; i < 5; i++){
        document.getElementById(`hex${i + 1}`).innerText = `#${colors[i]}`
    }
}


addSchemeModes(schemeModes)