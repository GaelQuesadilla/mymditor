export default class Edit {
    constructor() {
        this.doc = document.querySelector("#doc");
        this.btnBold = document.querySelector("#btnBold");
        this.btnItalic = document.querySelector("#btnItalic");
        this.btnUnderline = document.querySelector("#btnUnderline");
        this.btnCenter = document.querySelector("#btnCenter");
        this.btnLeft = document.querySelector("#btnLeft");
        this.btnUnonderedList = document.querySelector("#btnUnonderedList");
        this.btnFontSize = document.querySelector("#btnFontSize");

        this.init();
    }

    init() {
        this.btnBold.addEventListener("click", () => {
            document.execCommand(
                this.btnBold.getAttribute("datatype", false, null)
            );
        });

        this.btnItalic.addEventListener("click", () => {
            document.execCommand(
                this.btnItalic.getAttribute("datatype", false, null)
            );
        });

        this.btnUnderline.addEventListener("click", () => {
            document.execCommand(
                this.btnUnderline.getAttribute("datatype", false, null)
            );
        });

        this.btnCenter.addEventListener("click", () => {
            document.execCommand(
                this.btnCenter.getAttribute("datatype"),
                false,
                null
            );
        });

        this.btnLeft.addEventListener("click", () => {
            document.execCommand(
                this.btnLeft.getAttribute("datatype"),
                false,
                null
            );
        });

        this.btnUnonderedList.addEventListener("click", () => {
            document.execCommand(
                this.btnUnonderedList.getAttribute("datatype", false, null)
            );
        });

        this.btnFontSize.addEventListener("click", () => {
            const fontSize = document.querySelector("#inputFontSize").value;
            document.execCommand(
                this.btnFontSize.getAttribute("datatype"),
                false,
                fontSize
            );
        });
    }
}
