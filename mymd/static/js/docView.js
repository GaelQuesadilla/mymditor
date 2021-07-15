export default class View {
    constructor() {
        const saveButton = document.createElement("li");
        saveButton.innerHTML = `<button class="green" id="saveButton">Save</button>`;
        document.querySelector("nav ul").appendChild(saveButton);

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
        this.document.value = this.doc.document[this.doc.title].value;
    }
    save() {
        const values = {
            value: this.document.value,
        };
        const index = ["documents", "value", this.doc.title];
        this.model.updateElement(index, values, "assign");
    }

    render() {
        this.updateContent();
    }
}
