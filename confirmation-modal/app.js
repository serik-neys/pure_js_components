const styles = {
    overlay: `
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgb(0, 0, 0, 0.3);
    `,
    modal: `
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 3px solid black;
    padding: 15px 20px;
    `,
    btn: `
    margin-top: 15px;
    display: block;
    float: right;
    `
}

const template = document.createElement("template")

template.innerHTML = `
        <h1>ConfirmationModal</h1>
        <div class="modal" style="${styles.modal}">
        <div class="content">
         <slot></slot>
        </div>
          <button style="${styles.btn}"></button>
        </div>
        <div class="overlay" style="${styles.overlay}"></div>
        `

class ConfirmationModal extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: "open" })
        this.shadow.append(template.content.cloneNode(true))

        this.init()
        this.listeners()
    }

    init() {
        this.modal = this.shadow.querySelector(".modal")
        this.closeBtn = this.shadow.querySelector("button")
        this.closeBtn.innerText = this.getAttribute("label")
        this.modalText =  this.shadow.querySelector("h1")
        this.overlay = this.shadow.querySelector(".overlay")
    }

    listeners() {
        this.closeBtn.addEventListener("click", this.closeModal.bind(this))
        this.modalText.addEventListener("click", this.openModal.bind(this))
    }

    openModal() {
        this.modal.style.display = "block"
        this.overlay.style.display = "block"
        this.removeAttribute("confirm")
    }

    closeModal() {
        this.modal.style.display = "none"
        this.overlay.style.display = "none"
        this.setAttribute("confirm", "")
    }

}

customElements.define('confirmation-modal', ConfirmationModal)

