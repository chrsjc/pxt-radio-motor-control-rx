class VerticalBar {
    private readonly x: number;
    private readonly min: number;
    private readonly max: number;

    constructor(x: number, min: number, max: number) {
        this.x = x;
        this.min = min;
        this.max = max;
    }

    plot(value: number) {

        const y = this.scale(value);

        for (let i = screenMin; i <= screenMax; i++) {
            if (i == y) {
                led.plot(this.x, i)
            } else {
                led.unplot(this.x, i)
            }
        }
    }

    private scale(value: number) {

        /*
        return pins.map(
            value,
            this.min,
            this.max,
            screenMax, // screen origin is top left
            screenMin
        )
        */

        //return ((value - this.min) * (screenMax - screenMin)) / (this.max - this.min) + screenMin;
        const outRange = screenMax - screenMin;
        const inRange = this.max - this.min;
        const out = ((value - this.min) / inRange) * outRange;
        //serial.writeValue("out", out)
        return Math.round(Math.clamp(screenMin, screenMax, out));
    }
}