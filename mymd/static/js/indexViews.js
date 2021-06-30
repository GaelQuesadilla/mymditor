export default class Views {
    constructor() {
        this.model = null;
        this.urls = null;

        this.content = document.querySelector("#content");
        this.docsContainer = document.querySelector("#docsContainer");
    }

    setModel(model) {
        this.model = model;
    }

    setUrls(urls) {
        this.urls = urls;
    }

    addElement(values) {
        const docUrlSearch = this.urls.createSearch("view", {
            docName: values.title,
        });
        const element = document.createElement("div");
        element.innerHTML = `
        <div class="element">
            <span class="element__option">
                <a href="docs/${docUrlSearch}">
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
