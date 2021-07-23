export default class View {
    constructor() {
        this.model = null;
        this.doc = {};
        this.urls = null;
        this.ajax = null;
        this.document = document.querySelector("#doc");
        this.saveButton = document.querySelector("#saveButton");
        this.saveButton.addEventListener("click", () => {
            this.save();
        });
        this.deleteButton = document.querySelector("#deleteButton");
        this.deleteButton.addEventListener("click", () => {
            this.delete();
        });

        this.csrf_token = document.querySelector(
            ".optionList ul input[name=csrfmiddlewaretoken]"
        ).value;

        this.downloadButton = document.querySelector("#btnDownload");
        this.downloadButton.addEventListener("click", () => {
            this.download();
        });
        this.uploadButton = document.querySelector("#btnUpload");
        this.uploadButton.addEventListener("click", () => {
            this.upload();
        });
    }

    setModel(model) {
        this.model = model;
    }

    setUrls(urls) {
        this.urls = urls;

        const params = this.urls.getUrlParams();
        const title = params.get("docName");

        const value = this.model.getElement(["documents", "value", title]);

        let document = {};
        document[title] = { value: value.value };

        Object.assign(this.doc, { document }, { title: title });

        this.url = {
            params,
        };
    }

    setAjax(ajax) {
        this.ajax = ajax;
    }

    updateContent() {
        this.document.innerHTML = this.doc.document[this.doc.title].value;
    }
    save() {
        const values = {
            value: this.document.innerHTML,
        };
        const index = ["documents", "value", this.doc.title];
        this.model.updateElement(index, values, "assign");
    }

    delete() {
        const index = ["documents", "value", this.doc.title];
        this.model.deleteElement(index);
        window.location.href = "http://localhost:8000/";
    }

    download() {
        const dir = ["documents", "value", this.doc.title];
        const downloadPromise = this.ajax.download(dir, this.csrf_token);

        downloadPromise.then((response) => {
            console.log(response.data)
            this.document.innerHTML = response.data.value;
        });
    }

    upload() {
        const dir = ["documents", "value", this.doc.title];
        const uploadPromise = this.ajax.upload(
            dir,
            { value: {value: this.document.innerHTML} },
            this.csrf_token
        );

        uploadPromise.then((response) => {
            console.log(response);
            this.save()
        });
    }

    render() {
        this.updateContent();
    }
}
