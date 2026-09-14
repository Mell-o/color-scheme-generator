import {schemeModes} from "./data.js"

const schemeModesSelect = document.querySelector('.scheme-modes-select')

function addSchemeModes(schemeModes){
    schemeModes.forEach((mode) => {
        schemeModesSelect.innerHTML += `<option value="${mode.toLowerCase()}">${mode}</option>`
    })
}

addSchemeModes(schemeModes)