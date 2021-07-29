export default class Views {
    constructor() {
        this.model = null;
        this.ajax = null;
        this.urls = null;
        this.content = document.querySelector("#content");
        this.docsContainer = document.querySelector("#docsContainer");
        // this modal displays for add an element
        this.addDocModal = document.querySelector("#addDocModal"); 

        this.docData = null;

        //  This function try to add an element in local storage, after the element will be added on the view
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


        // This function will get csrf_token and use "downloadElements()" method
        document
            .querySelector("#downloadElementsContainer span a i")
            .addEventListener("click", () => {
                const csrf_token = document.querySelector(
                    "#downloadElementsContainer span a input[name=csrfmiddlewaretoken]"
                ).value;
                this.downloadElements(["documents"], csrf_token);
            });

        // This function will get csrf_token and values, then use "uploadElements()" method
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
        
        //  This function will close the add doc modal 
        document
            .querySelector("#closeDocModal")
            .addEventListener("click", () => {
                this.closeModal(this.addDocModal);
            });

        //  This function will open the add doc modal 
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

    setAjax(ajax) {
        this.ajax = ajax;
    }

    // This method will download all the user documents from server
    // dir should be an array with keys and csrf token should be an string with csrf_token value
    downloadElements(dir, csrf_token) {

        const downloadPromise = this.ajax.download(dir, csrf_token);
        // Wait for promise response and then update documents and render
        downloadPromise.then((response) => {
            this.model.updateElement(["documents"], response.data, "assign");

            this.render();
        });
    }

    // This method will upload and update all the user documents from server
    // dir should be an array with keys and csrf token should be an string with csrf_token value
    uploadElements(dir, data, csrf_token) {
        console.log("Upload", csrf_token);
        console.group(dir, data);
        const uploadPromise = this.ajax.upload(dir, data, csrf_token);

        //Wait for promise response and then print the response
        uploadPromise.then((response) => {
            console.log(response.data)
        });
    }

    // This method only add an element on the view with values specified on the values object
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

    // This method will create and return a new object with user´s input
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

    // This method shuld be used when the dom content load
    // get all documents from local storage and add all documents on the view
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
