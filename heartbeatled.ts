class HeartBeatLed {
    private readonly x: number;
    private readonly y: number;
    private shouldToggle: boolean = false;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    plot() {
        if (this.shouldToggle) {
            led.toggle(this.x, this.y);
            this.shouldToggle = false;
        } else {
            led.plot(this.x, this.y);
        }
    }

    toggle() {
        this.shouldToggle = true;
    }
}