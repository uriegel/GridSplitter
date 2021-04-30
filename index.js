import './GridSplitter.js'

const themeChooser = document.getElementById("themeChooser")
const gridChooser = document.getElementById("gridChooser")
const table = document.querySelector('virtual-table-component')

themeChooser.onchange = () => {
    const changeTheme = theme => {
        ["themeBlue", "themeAdwaita", "themeAdwaitaDark"].forEach(n => {
            document.body.classList.remove(n)    
            table.classList.remove(n)    
        })
        document.body.classList.add(theme)    
        const style = getComputedStyle(document.body)
        exifColor = style.getPropertyValue('--exif-color') 
        selectedExifColor = style.getPropertyValue('--selected-exif-color') 
        table.classList.add(theme)    
        table.themeChanged()
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
            break
        case 1: 
            break
    }
}

// TODO: set vertical attribute