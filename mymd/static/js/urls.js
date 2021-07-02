export default class Urls {
    constructor() {
        this.url = window.location.search;
        this.urlSelector = null;
    }

    createSearch(url, params) {
        var urlResult = "";
        if (url != null) {
            urlResult = urlResult + url;
        }

        if (params != null) {
            urlResult = urlResult + "?";
            let value = "";
            let content = "";

            for (let element in params) {
                value = element;
                content = params[element].replace(/ /g, "+");
                urlResult = urlResult + value + "=" + content + "&";
            }

            urlResult = urlResult.substr(0, urlResult.length - 1);
        }

        return urlResult;
    }

    getUrlParams() {
        if (this.urlSelector === null) {
            this.urlSelector = new URLSearchParams(this.url);
        }

        return this.urlSelector;
    }
}
