export declare const HORIZONTAL = "horizontal";
export declare const VERTICAL = "vertical";
export declare class GridSplitter extends HTMLElement {
    private splitterGrid;
    private splitter;
    private first;
    private second;
    constructor();
    connectedCallback(): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(attributeName: string, _: any, newValue: any): void;
}
