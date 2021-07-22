export default class Views {
    constructor() {
        this.model = null;
        this.ajax = null;
        this.urls = null;
        this.content = document.querySelector("#content");
        this.docsContainer = document.querySelector("#docsContainer");
        this.addDocModal = document.querySelector("#addDocModal"); // this modal displays for add an element

        this.docData = null;

        //This function try to add an element in local storage, after the element will be added on the view
        document
            .querySelector("#addDocConfirmation")
            .addEventListener("click", () => {
                const values = this.getValues();
                if (values == null || !values) {
                    console.error("Invalid values");
                } else {
                    const addedDoc = this.model.updateElement(
                        ["documents", "value"],
                        values,
                        "push"
                    );

                    // model.updateElement() return null when errors doesnt happen
                    if (addedDoc == null) {
                        this.addElement(values);
                    }
                }
            });

        document
            .querySelector("#downloadElementsContainer span a i")
            .addEventListener("click", () => {
                const csrf_token = document.querySelector(
                    "#downloadElementsContainer span a input[name=csrfmiddlewaretoken]"
                ).value;
                this.downloadElements(["documents"], csrf_token);
            });

        document
            .querySelector("#uploadElementsContainer span a i")
            .addEventListener("click", () => {
                const csrf_token = document.querySelector(
                    "#uploadElementsContainer span a input[name=csrfmiddlewaretoken]"
                ).value;
                const dir = ["documents"];
                this.uploadElements(
                    dir,
                    { value: this.model.getElement(dir) },
                    csrf_token
                );
            });

        //-> --- Open and close a add doc modal
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
        //-> ---
    }

    setModel(model) {
        this.model = model;
    }

    setUrls(urls) {
        this.urls = urls;
    }

    setAjax(ajax) {
        this.ajax = ajax;
    }

    downloadElements(dir, csrf_token) {
        console.log("Download", csrf_token);

        const downloadPromise = this.ajax.download(dir, csrf_token);
        //Wait for promise response
        downloadPromise.then((response) => {
            this.model.updateElement(["documents"], response.data, "assign");

            this.render();
        });
    }

    uploadElements(dir, data, csrf_token) {
        console.log("Upload", csrf_token);
        console.group(dir, data);
        const uploadPromise = this.ajax.upload(dir, data, csrf_token);
        //Wait for promise response
        uploadPromise.then((response) => {
            console.log(response.data);
        });
    }

    // This function only add an element on the view
    addElement(values) {
        const title = Object.keys(values)[0];
        const docUrlSearch = this.urls.createSearch("view", {
            docName: title,
        });
        const element = document.createElement("div");
        element.innerHTML = `
        <div class="element">
            <span class="element__option">
                <a href="docs/${docUrlSearch}">
                    <i class="fas fa-file"></i>
                </a>
            </span>
            <div class="element__title">${title}</div>
        </div>`;

        this.docsContainer.appendChild(element);
    }

    getValues() {
        const input = this.addDocModal.querySelector("#addDocTitle");
        let values = {};
        values[input.value] = { value: "" };

        return values;
    }

    openModal(modal) {
        modal.classList.remove("d-none");
    }

    closeModal(modal) {
        modal.classList.add("d-none");
    }

    render() {
        this.docsContainer.innerHTML = "";
        const docs = this.model.getElement(["documents", "value"]);
        for (let values in docs) {
            let element = {};
            element[values] = docs[values];
            this.addElement(element);
        }
    }
}
