const template = document.createElement('template')
template.innerHTML = `  
    <style>
        #splitterGrid {
            display:flex;
            flex-grow: 1;
            flex-direction: row;        
            width: 100%;
            height: 100%;
        }   
        .slot {
            flex-grow: 1;
            display: flex;
        }     
        #splitter {
            flex: 0 0 6px;
            cursor: ew-resize;
            transition: background-color 0.4s;
            background-color: var(--gridsplitter-grip-color);
        }
        #splitter:hover {
            background-color: var(--gridsplitter-grip-hover-color);
        }
        #splitter:active {
            background-color: var(--gridsplitter-grip-active-color);
        }        
        #splitterGrid.vertical {
            flex-direction: column;
        }
        .secondInvisible #second, .secondInvisible #splitter {
            display: none;
        }
        .vertical #splitter {
            cursor: ns-resize;
        }
    </style>
    <div id="splitterGrid">
        <div class="slot" id="first">
            <slot name="first"></slot>
        </div>
        <div id="splitter"></div>
        <div class="slot" id="second">
            <slot name="second"></slot>
        </div>
    </div>
` 
export const HORIZONTAL = "horizontal"
export const VERTICAL = "vertical"

export class GridSplitter extends HTMLElement {
    private splitterGrid: HTMLElement
    private splitter: HTMLElement
    private first: HTMLElement
    private second: HTMLElement

    constructor() {
        super()

        const style = document.createElement("style")
        document.head.appendChild(style)
        style.sheet?.insertRule(`:root {
            --gridsplitter-grip-color : gray;
            --gridsplitter-grip-hover-color : rgb(94, 94, 94);
            --gridsplitter-grip-active-color : rgb(61, 61, 61);
        }`)
    
        this.attachShadow({ mode: 'open' })
        this.shadowRoot?.appendChild(template.content.cloneNode(true))
        this.splitterGrid = this.shadowRoot!.getElementById("splitterGrid")!
        this.splitter = this.shadowRoot!.getElementById("splitter")!
        this.first = this.shadowRoot!.getElementById("first")!
        this.second = this.shadowRoot!.getElementById("second")!
        if (this.getAttribute("orientation") == VERTICAL)
            this.splitterGrid.classList.add("vertical") 
    }

    connectedCallback() {
        this.splitter.addEventListener("mousedown", evt => {
            if (evt.which != 1) 
    			return
            const isVertical = this.getAttribute("orientation") == VERTICAL
		    const size1 = isVertical ? this.first.offsetHeight : this.first.offsetWidth
		    const size2 = isVertical ? this.second.offsetHeight : this.second.offsetWidth
		    const initialPosition = isVertical ? evt.pageY : evt.pageX		

            let timestap = performance.now()

            const onmousemove = (evt: MouseEvent) => {

                const newTime = performance.now()
                const diff = newTime - timestap
                if (diff > 20) {
                    timestap = newTime

                    let delta = (isVertical ? evt.pageY : evt.pageX) - initialPosition
                    if (delta < 10 - size1)
                        delta = 10 - size1
                    if (delta > (isVertical ? this.first.parentElement!.offsetHeight : this.first.parentElement!.offsetWidth) - 10 - size1 - 6)
                        delta = (isVertical ? this.first.parentElement!.offsetHeight : this.first.parentElement!.offsetWidth) - 10 - size1 - 6

                    const newSize1 = size1 + delta
                    const newSize2 = size2 - delta

                    const procent2 = newSize2 / (newSize2 + newSize1 + 
                        (isVertical ? this.splitter.offsetHeight : this.splitter.offsetWidth)) * 100

                    const size = `0 0 ${procent2}%` 
                    this.second.style.flex = size
                    this.dispatchEvent(new CustomEvent('position-changed'))

                    // if (positionChanged)
                    // positionChanged()
                }
                evt.stopPropagation()
                evt.preventDefault()
            }

            const onmouseup = (evt: MouseEvent) => {
                window.removeEventListener('mousemove', onmousemove, true)
                window.removeEventListener('mouseup', onmouseup, true)

                evt.stopPropagation()
                evt.preventDefault()
            }

            window.addEventListener('mousemove', onmousemove, true)
            window.addEventListener('mouseup', onmouseup, true)

            evt.stopPropagation()
            evt.preventDefault()        		
        })
    }

    static get observedAttributes() {
        return ['orientation', 'secondinvisible']
    }

    attributeChangedCallback(attributeName: string, _: any, newValue: any) {
        switch (attributeName) {
            case "orientation":
                if (newValue == VERTICAL) 
                    this.splitterGrid.classList.add("vertical") 
                else 
                    this.splitterGrid.classList.remove("vertical") 
                break
            case "secondinvisible":
                if (newValue == "true") 
                    this.splitterGrid.classList.add("secondInvisible")
                else
                    this.splitterGrid.classList.remove("secondInvisible")
                break
        }
    }
}

customElements.define('grid-splitter', GridSplitter)