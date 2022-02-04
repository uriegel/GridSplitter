import '../src/index.js'
import { GridSplitter, HORIZONTAL, VERTICAL } from '../src/index.js'

const themeChooser = document.getElementById("themeChooser")! as HTMLSelectElement
const gridChooser = document.getElementById("gridChooser")! as HTMLSelectElement
const secondInvisible = document.getElementById("secondInvisible")! as HTMLInputElement
const splitter = document.querySelector('grid-splitter')! as GridSplitter

themeChooser.onchange = () => {
    const changeTheme = (theme: string) => {
        ["themeBlue", "themeAdwaita", "themeAdwaitaDark"].forEach(n => {
            document.body.classList.remove(n)    
        })
        document.body.classList.add(theme)    
    }

    switch (themeChooser.selectedIndex) {
        case 0: 
            changeTheme("themeBlue")
            break
        case 1: 
            changeTheme("themeAdwaita")
            break
        case 2: 
            changeTheme("themeAdwaitaDark")
            break
    }
}

gridChooser.onchange = () => {
    switch (gridChooser.selectedIndex) {
        case 0: 
            splitter.setAttribute("orientation", HORIZONTAL)
            break
        case 1: 
            splitter.setAttribute("orientation", VERTICAL)
            break
    }
}

secondInvisible.onchange = () => splitter.setAttribute("secondInvisible", secondInvisible.checked.toString())

// TODO: set vertical attribute