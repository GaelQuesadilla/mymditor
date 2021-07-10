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
                {
                    id: 2,
                    title: "documents",
                    value: [{ title: "doc.md", value: "WELCOME TO MY APP" }],
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

    updateElement(index, values, method = "push") {
        console.log(values);

        let storageValue = this.storage;
        for (let i of index) {
            storageValue = storageValue[i];
        }

        console.log(storageValue);

        if (method.toUpperCase() === "PUSH") {
            storageValue.push(values);
        } else if (method.toUpperCase() === "ASSIGN") {
            Object.assign(storageValue, values);
        } else {
            console.error(
                "LOCAL UPDATE METHOD NOT DEFINED :",
                method.toUpperCase
            );
        }

        this.save();
    }

    save() {
        localStorage.setItem("mymdstorage", JSON.stringify(this.storage));
        console.log(this.storage);
    }
}
