export default class Ajax {
    constructor() {}

    post(url, data, csrf_token) {
        data = Object.assign(data, { csrfmiddlewaretoken: csrf_token });

        let asyncPost = new Promise((resolve, reject) => {
            $.ajax({
                url: `http://${window.location.host}/${url}`,
                type: "POST",
                data: data,
                beforeSend: function () {},
                success: (response) => {
                    resolve(response); // Resolve promise and when success
                },
                error: function (err) {
                    reject(err); // Reject the promise and go to catch()
                },
            });
        });
        //Return a download promise
        return asyncPost;
    }

    download(dir, csrf_token) {
        const data = { dataDir: JSON.stringify(dir) };
        const downloadPromise = this.post("docs/download/", data, csrf_token);
        return downloadPromise;
    }

    upload(dir, values, csrf_token) {
        const data = {
            dataDir: JSON.stringify(dir),
            values: JSON.stringify(values),
        };

        console.log(data);
        const uploadPromise = this.post("docs/upload/", data, csrf_token);
        return uploadPromise;
    }
}

// $.ajax({
//  type: "POST",
//  url: `http://${window.location.host}/${url}`,
//  data: data,
