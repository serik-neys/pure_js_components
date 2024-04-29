class CountDown extends HTMLElement {
    constructor() {
        super()

        this.date = this.getAttribute("date")
        this.message = this.getAttribute("message")

        this.checkedDateValue()

        this.textContent = this.date
        this.targetTime = new Date(this.date).getTime();
        this.intervalId = setInterval(this.updateCountdown.bind(this), 1000);

    }

    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.targetTime - now;

        if (distance <= 0) {
            clearInterval(this.intervalId);
            this.innerText = this.message;
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const countdownText = `${days} days ${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)} left`;
            this.innerText = countdownText;
        }
    }

    checkedDateValue() {
        if(!this.date) {
            this.date = new Date(Date.now() + 15000)
        }
    }

    formatTime(time) {
        return time < 10 ? "0" + time : time;
    }

}

customElements.define('count-down', CountDown)