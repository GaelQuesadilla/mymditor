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
                if (values.title == null || !values.title) {
                    console.error("Invalid values");
                }

                this.addElement(values);
                this.updateModal;
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

    // ? This function only add an element on the view
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
        const input = document.querySelector("#addDocTitle");
        const values = { title: input.value, value: "" };
        return values;
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
