export default class Model {
    constructor() {
        // This is the constructor of the class
        this.view = null;
        this.storage = JSON.parse(localStorage.getItem("mymdstorage"));

        if (!this.storage || this.storage.length < 1) {
            this.storage = [
                {
                    id: 0,
                    title: "nigthMode",
                    value: false,
                },
            ];
        }
    }
    getStorage() {
        return this.storage;
    }

    findIndex(element, property, value) {
        const index = element.findIndex((factor) => factor[property] === value);
        return index;
    }

    findElement(title) {
        const index = this.storage.findIndex((value) => value.title === title);
        return index;
    }

    getElement(index) {
        const value = this.storage[index];
        return value;
    }

    updateElement(index, values) {
        Object.assign(this.storage[index], values);
        this.save();
    }

    save() {
        localStorage.setItem("mymdstorage", JSON.stringify(this.storage));
    }
}
