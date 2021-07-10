export default class Views {
    constructor() {
        this.model = null;
        this.urls = null;

        this.content = document.querySelector("#content");
        this.docsContainer = document.querySelector("#docsContainer");
        this.addDocModal = document.querySelector("#addDocModal");

        this.docData = null;

        document
            .querySelector("#addDocConfirmation")
            .addEventListener("click", () => {
                const values = this.getValues();
                if (values.title == null || !values.title) {
                    console.error("Invalid values");
                } else {
                    this.addElement(values);

                    this.model.updateElement([this.docData.index, "value"], {
                        title: values.title,
                        value: values.value,
                    });
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

        this.docData = {
            index: this.model.findElement("documents"),
        };
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
        const docs = this.model.getElement(this.docData.index);
        for (let values of docs.value) {
            console.log(values);
            this.addElement(values);
        }
    }
}
