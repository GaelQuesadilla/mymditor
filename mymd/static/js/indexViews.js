export default class Views {
    constructor() {
        this.model = null;
        this.urls = null;

        this.content = document.querySelector("#content");
        this.docsContainer = document.querySelector("#docsContainer");
        this.addDocModal = document.querySelector("#addDocModal");

        document
            .querySelector("#addDocConfirmation")
            .addEventListener("click", () => {
                const values = this.getValues();
                if (values == null || !values) {
                    console.error("Invalid values");
                }
            });

        document
            .querySelector("#closeDocModal")
            .addEventListener("click", () => {
                this.closeModal(this.addDocModal);
            });

        document
            .querySelector("#addElementContainer span a i")
            .addEventListener("click", () => {
                this.openModal(this.addDocModal);
            });
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

    getValues() {
        return null;
    }

    openModal(modal) {
        modal.classList.remove("d-none");
    }

    closeModal(modal) {
        modal.classList.add("d-none");
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
