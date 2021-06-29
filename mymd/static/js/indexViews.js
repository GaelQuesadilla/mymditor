export default class Views {
    constructor() {
        this.model = null;

        this.content = document.querySelector("#content");
        this.docsContainer = document.querySelector("#docsContainer");
    }

    setModel(model) {
        this.model = model;
        this.render();
    }

    addElement(values) {
        const element = document.createElement("div");
        element.innerHTML = `
        <div class="element">
            <span class="element__option">
                <a href="docs/${values.title}">
                    <i class="fas fa-file"></i>
                </a>
            </span>
            <div class="element__title">${values.title}</div>
        </div>`;

        this.docsContainer.appendChild(element);
    }

    render() {
        const index = this.model.findElement("documents");
        const docs = this.model.getElement(index);
        for (let values of docs.value) {
            console.log(values);
            this.addElement(values);
        }
    }
}
