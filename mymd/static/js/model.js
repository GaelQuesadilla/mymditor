export default class Model {
    constructor() {
        // This is the constructor of the class
        this.view = null;
        this.storage = JSON.parse(localStorage.getItem("mymdstorage"));

        if (!this.storage || this.storage.length < 1) {
            this.storage = {
                style: {
                    nigthMode: false,
                },
                documents: {
                    value: {
                        "WELCOME.md": { value: "WELCOME TO MY APP!!" },
                    },
                },
            };
        }
    }
    getStorage() {
        return this.storage;
    }

    // A function that returns an elemet from local storage
    // index must be an array with keys(string or ints)
    getElement(index) {
        let storageValue = this.storage;
        for (let i of index) {
            storageValue = storageValue[i];
        }
        return storageValue;
    }

    // A function that append or updates an element
    // values variables must be an array with keys(string or ints) of the element to update
    // method = "push" append values, method = "assign" assign values
    updateElement(index, values, method = "push") {
        //? For key in index array go to requested object

        const storageValue = this.getElement(index);

        if (method.toUpperCase() === "PUSH") {
            const keys = Object.keys(values);
            console.log(storageValue, keys);
            for (let element in storageValue) {
                console.log(element);
                if (element === keys[0]) {
                    const error = "ELEMENT ALREADY EXIST";
                    console.error(error);
                    return error;
                }
            }
            Object.assign(storageValue, values);
            this.save();

            return null;
        } else if (method.toUpperCase() === "ASSIGN") {
            Object.assign(storageValue, values);
            this.save();
        } else {
            const error = "INVALID LOCAL UPDATE METHOD";
            console.error(error, method.toUpperCase);
            return error;
        }

        this.save();
        return null;
    }

    save() {
        localStorage.setItem("mymdstorage", JSON.stringify(this.storage));
    }
}
