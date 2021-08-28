export default class Alerts {
    constructor() {}

    // This method will display an alert
    //Container should be a Node element,
    // innerHtml contain element
    pageAlert(alertContainer, innerHtml, classValue, promise = null) {
        // Cross should delete the alert when you click it
        const cross = document.createElement("span");
        cross.classList = "cross";
        // Alert container will have all content
        const alert = document.createElement("div");
        alert.classList = classValue;
        alert.innerHTML = innerHtml;
        alert.appendChild(cross);

        const showAlertFunction = () => {
            return new Promise((resolve, reject) => {
                // display the alert
                alertContainer.appendChild(alert);

                cross.addEventListener("click", () => resolve(null));

                // if a promise is given, remove the alert when that promise is resolved
                if (promise !== null) {
                    promise.then(() => {
                        // A time out
                        setTimeout(() => {
                            resolve(null);
                        }, 300);
                    });

                    promise.catch(()=> {

                        this.pageAlert(
                            alertContainer,
                            "<p>Oops! an error has occurred</p>",
                            "alert white"
                        );
                        // A time out
                        setTimeout(() => {
                            resolve(null);
                        }, 300);
                    })
                } else {
                    setTimeout(() => {
                        resolve(null);
                    }, 2500);
                }
            });
        };

        const showAlert = showAlertFunction();
        showAlert.then(() => this.deleteAlert(alertContainer, alert));
    }

    deleteAlert(container, alert) {
        const deleteTransitionFunction = () => {
            return new Promise((resolve, reject) => {
                alert.style.opacity = "0";

                setTimeout(() => {
                    resolve(null);
                }, 250);
            });
        };
        const deleteTransition = deleteTransitionFunction();
        deleteTransition.then(() => container.removeChild(alert));
    }
}
