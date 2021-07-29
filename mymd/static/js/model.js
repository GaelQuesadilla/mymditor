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

    // This method return all local storage values
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

    // This method append or updates an element
    // values variable must be an array with keys(string or ints) of the element to update
    // method="push" check id element exist, if the element exist return error, method = "assign" assign values
    updateElement(index, values, method = "push") {

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

        return null;
    }

    // This method delete the specified element in dir array
    deleteElement(dir) {
        let storageValue = this.getElement(dir.slice(0,dir.length-1));
        const deleteOutput = delete(storageValue[dir[dir.length-1]])
        this.save()
        return deleteOutput
    }

    // this method save all changes in localstorage
    save() {
        localStorage.setItem("mymdstorage", JSON.stringify(this.storage));
    }
}
