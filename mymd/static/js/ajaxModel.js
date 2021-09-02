export default class Ajax {
    constructor() {}

    // This method use ajax to do a post request with the next values
    // url must be a string with the dir
    // data should be an object with all values that will be uploaded
    // csrf_token should be a string with the csrf_token value
    post(url, data, csrf_token) {
        data = Object.assign(data, { csrfmiddlewaretoken: csrf_token });

        let form = new FormData();
        for (let i in data) {
            form.append(i, data[i]);
        }

        const location = window.location;
        let asyncPost = new Promise((resolve, reject) => {
            const post = fetch(
                `${location.protocol}//${location.host}/${url}`,
                {
                    method: "POST",
                    body: form,
                }
            );
            post.then((response) => response.json())
                .then((response) => {
                    resolve(response);
                })
                .catch((response) => {
                    reject(response);
                });
        });
        // Return the download promise
        return asyncPost;
    }
    // download method will post to request data to server database
    // dir should be an array with the keys of the document to download
    // csrf_token should be a string with the csrf_token value
    download(dir, csrf_token) {
        const data = { dataDir: JSON.stringify(dir) };
        const downloadPromise = this.post("docs/download/", data, csrf_token);
        return downloadPromise;
    }

    // upload method will post an update to server's database
    // dir should be an array with the keys of the document to update
    // values should be an object with the values that will replace the server's database
    // csrf_token should be a string with the csrf_token value
    upload(dir, values, csrf_token) {
        const data = {
            dataDir: JSON.stringify(dir),
            values: JSON.stringify(values),
        };

        const uploadPromise = this.post("docs/upload/", data, csrf_token);
        return uploadPromise;
    }
}
