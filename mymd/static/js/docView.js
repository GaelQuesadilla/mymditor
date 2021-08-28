import Alerts from "./alerts.js";

export default class View {
    constructor() {
        this.model = null;
        this.urls = null;
        this.ajax = null;
        this.doc = {};
        this.alerts = new Alerts()

        // this.document should be select a div element that will be contain all document values
        this.document = document.querySelector("#doc");

        this.saveButton = document.querySelector("#saveButton");
        // this function will save an specified element in the local database
        this.saveButton.addEventListener("click", () => this.save());

        // This variable should contain the container of the alerts
        this.pageAlerts = document.querySelector("#pageAlerts")

        this.deleteButton = document.querySelector("#deleteButton");
        // This function will delete an specified element in the local database
        this.deleteButton.addEventListener("click", () => this.delete());

        // This variable should contain the csrf_token value
        this.csrf_token = document.querySelector(
            ".optionList ul input[name=csrfmiddlewaretoken]"
        ).value;

        this.downloadButton = document.querySelector("#btnDownload");
        // This function will download an specified element from server's database and then update the local element
        this.downloadButton.addEventListener("click", () => this.download());

        this.uploadButton = document.querySelector("#btnUpload");
        // This function will upload an specified element from server's database
        this.uploadButton.addEventListener("click", () => this.upload());
    }

    setModel(model) {
        this.model = model;
    }

    // This method will save urls class and then save important values
    setUrls(urls) {
        this.urls = urls;

        const params = this.urls.getUrlParams();

        // save important values in this.doc
        const title = params.get("docName");
        const index = ["documents", "value", title];

        let doc = {
            title,
            index,
            getDoc: () => this.model.getElement(["documents", "value", title]),
        };

        Object.assign(this.doc, doc);

        // Save URLSearchParams() class from params const in this.url
        this.url = {
            params,
        };
    }

    setAjax(ajax) {
        this.ajax = ajax;
    }

    // Replace this.document value with the local storage value
    updateContent() {
        this.document.innerHTML = this.doc.getDoc().value;
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
        this.model.deleteElement(this.doc.index);
        window.location.href = `${window.location.protocol}//${window.location.host}/`;
    }

    // This method should post and wait for a response with element data from servers database and update the view of the document
    download() {
        const downloadPromise = this.ajax.download(
            this.doc.index,
            this.csrf_token
        );
        // Alert
        this.alerts.pageAlert(
            this.pageAlerts,
            "<p>Downloading</p><span class='spinner'></span>",
            "alert white",
            downloadPromise
        );

        // Replace document value with ajax response
        downloadPromise.then((response) => {
            this.document.innerHTML = response.data.value;
            // Alert
            this.alerts.pageAlert(
                this.pageAlerts,
                "<p>Downloaded</p>",
                "alert white"
            )
        });
    }

    // This method should post the values document and wait for a response to save the document data in local storage
    upload() {
        const uploadPromise = this.ajax.upload(
            this.doc.index,
            { value: { value: this.document.innerHTML } },
            this.csrf_token
        );

        this.alerts.pageAlert(
            this.pageAlerts,
            "<p>Updating</p><span class='spinner'></span>",
            "alert white",
            uploadPromise
        );

        uploadPromise.then(() => {
            this.save();
            this.alerts.pageAlert(
                this.pageAlerts,
                "<p>Updated</p>",
                "alert white"
            );
        });
    }

    // This method should be used when the dom content load
    // Only update the content of the view
    render() {
        this.updateContent();
    }
}
