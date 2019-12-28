class HeartBeatLed {
    private readonly x: number;
    private readonly y: number;
    private _toggle: boolean = false;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    plot() {
        if (this._toggle) {
            led.toggle(this.x, this.y)
            this._toggle = false
        } else {
            led.plot(this.x, this.y)
        }
    }

    toggle() {
        this._toggle = true;
    }
}