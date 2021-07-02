export default class View {
    constructor() {
        this.model = null;
        this.urls = null;
    }

    setModel(model) {
        this.model = model;

        this.doc = {
            index: this.model.findElement("documents"),
        };
    }

    setUrls(urls) {
        this.urls = urls;

        const documents = this.model.getElement(this.doc.index);
        const params = this.urls.getUrlParams();
        const title = params.get("docName");
        const indexValue = this.model.findIndex(
            documents.value,
            "title",
            title
        );

        const value = documents.value[indexValue].value;

        const values = {
            id: indexValue,
            title,
            value,
        };

        Object.assign(this.doc, { values });

        this.url = {
            params,
        };
    }

    updateContent() {
        console.log(this.doc.values.value);
    }

    render() {
        this.updateContent();
    }
}
