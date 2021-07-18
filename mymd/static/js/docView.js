export default class View {
    constructor() {
        this.model = null;
        this.doc = {};
        this.urls = null;
        this.document = document.querySelector("#doc");
        this.saveButton = document.querySelector("#saveButton");
        this.saveButton.addEventListener("click", () => {
            this.save();
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

    updateContent() {
        console.log();
        this.document.innerHTML = this.doc.document[this.doc.title].value;
    }
    save() {
        const values = {
            value: this.document.innerHTML,
        };
        const index = ["documents", "value", this.doc.title];
        this.model.updateElement(index, values, "assign");
    }

    render() {
        this.updateContent();
    }
}
