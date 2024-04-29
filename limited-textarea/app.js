const template = document.createElement("template")

template.innerHTML = `
        <textarea></textarea>
        <div><span style="color: #000;">0</span> characters left </div>
        `

class LimitedTextarea extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: "open" })
        this.shadow.append(template.content.cloneNode(true))

        this.init()
    }

    init() {
        this.textarea = this.shadow.querySelector('textarea')
        this.wordLeft = this.shadow.querySelector('span')

        this.maxChars = this.getAttribute('maxchars')
        this.setAttribute('valid', true)
        this.setAttribute("value", this.textarea.value)
        this.wordLeft.innerText = this.maxChars

        this.textarea.addEventListener("input", this.addValueListener.bind(this))
    }

    addValueListener(e) {
        const value = e.target.value

        this.wordLeft.innerText = this.maxChars - value.length
        this.changeOptionAndColor(value)

        this.setAttribute("value", value)
    }

    changeOptionAndColor(value) {
        const subtraction = this.getMinusPrecent()

        if (value.length < this.maxChars) {
            this.setAttribute("valid", true)
            this.wordLeft.style.color = "#000"
        }

        if (value.length > this.maxChars) {
            this.setAttribute("valid", false)
            this.wordLeft.style.color = "#ea1010"

        }

        if (value.length > subtraction && this.maxChars > value.length) {
            this.wordLeft.style.color = "#f0620d"
        }
    }

    getMinusPrecent() {
        const percentToSubtract = 90
        return Math.ceil(this.maxChars * (percentToSubtract / 100));
    }

}

customElements.define('limited-textarea', LimitedTextarea)