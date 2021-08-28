export default class Model {
    constructor() {
        // This is the constructor of the class
        this.view = null;
        this.storageName = "mymdstorage";
        this.storage = JSON.parse(localStorage.getItem(this.storageName));

        if (!this.storage || this.storage.length < 1) {
            this.storage = {
                style: {
                    nightMode: true,
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

    // A function that returns an element from local storage
    // index must be an array with keys(string or integers)
    getElement(index) {
        var storageValue = this.storage;

        indexFor: for (let i of index) {
            if (i === "") {
                continue indexFor;
            }
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
                    const error = "Element already exist";
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
            const error = "Invalid local update method";
            console.error(error, method.toUpperCase);
            return error;
        }

        return null;
    }

    // This method delete the specified element in index array
    deleteElement(index) {
        let storageValue = this.getElement(index.slice(0,index.length-1));
        const deleteOutput = delete(storageValue[index[index.length-1]])
        this.save()
        return deleteOutput
    }

    // this method save all changes in local storage
    save() {
        localStorage.setItem(this.storageName, JSON.stringify(this.storage));
    }
}
