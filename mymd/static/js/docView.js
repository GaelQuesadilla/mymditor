export default class View {
    constructor() {
        this.model = null;
        this.urls = null;
        this.ajax = null;
        this.doc = {};
        
        // this.document should be select a div element that will be contain all document values
        this.document = document.querySelector("#doc");

        this.saveButton = document.querySelector("#saveButton");
        // this function will save an specified element in the local database 
        this.saveButton.addEventListener("click", () => {
            this.save();
        });

        this.deleteButton = document.querySelector("#deleteButton");
        // This function will delete an specified element in the local database
        this.deleteButton.addEventListener("click", () => {
            this.delete();
        });

        // This variable should contain the csrf_token value 
        this.csrf_token = document.querySelector(
            ".optionList ul input[name=csrfmiddlewaretoken]"
        ).value;

        this.downloadButton = document.querySelector("#btnDownload");
        // This function will download an specified element from server's database and then update the local element
        this.downloadButton.addEventListener("click", () => {
            this.download();
        });

        this.uploadButton = document.querySelector("#btnUpload");
        // This function will upload an specified element from server's database
        this.uploadButton.addEventListener("click", () => {
            this.upload();
        });
    }

    setModel(model) {
        this.model = model;
    }

    // This method will save urls class and then save important calues
    setUrls(urls) {
        this.urls = urls;

        const params = this.urls.getUrlParams();

        // save important values in this.doc
        const title = params.get("docName");

        const value = this.model.getElement(["documents", "value", title]);

        let document = {};
        document[title] = { value: value.value };

        Object.assign(this.doc, { document }, { title: title });

        // SaVE URLSearchParams() class from params const in this.url
        this.url = {
            params,
        };
    }

    setAjax(ajax) {
        this.ajax = ajax;
    }

    // Replace this.document value with the local storage value
    updateContent() {
        this.document.innerHTML = this.doc.document[this.doc.title].value;
    }

    // Update the specified element in local storage
    save() {
        const values = {
            value: this.document.innerHTML,
        };
        const index = ["documents", "value", this.doc.title];
        this.model.updateElement(index, values, "assign");
    }

    // Delete the element from local storage 
    delete() {
        const index = ["documents", "value", this.doc.title];
        this.model.deleteElement(index);
        window.location.href = "http://localhost:8000/";
    }

    // This method should post and wait for a response with element data from servers database and update the view of the document
    download() {
        const dir = ["documents", "value", this.doc.title];
        const downloadPromise = this.ajax.download(dir, this.csrf_token);

        downloadPromise.then((response) => {
            // Replace document value with ajax response
            this.document.innerHTML = response.data.value;
        });
    }

    // This method should post the values document and wait for a response to save the document data in local storage
    upload() {
        const dir = ["documents", "value", this.doc.title];
        const uploadPromise = this.ajax.upload(
            dir,
            { value: {value: this.document.innerHTML} },
            this.csrf_token
        );

        uploadPromise.then((response) => {
            this.save()
        });
    }

    // This method shuld be used when the dom content load
    // Only update the content of the view
    render() {
        this.updateContent();
    }
}
