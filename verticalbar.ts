class VerticalBar {
    private readonly x: number;
    private readonly min: number;
    private readonly max: number;
    private readonly screenMin: number = 0;
    private readonly screenMax: number = 4;

    constructor(x: number, min: number, max: number) {
        this.x = x;
        this.min = min;
        this.max = max;
    }

    plot(value: number) {
        const y = this.scale(value);
        for (let i = this.screenMin; i <= this.screenMax; i++) {
            if (i == y) {
                led.plot(this.x, i);
            } else {
                led.unplot(this.x, i);
            }
        }
    }

    private scale(value: number) {
        const screenValue = pins.map(
            value,
            this.min,
            this.max,
            this.screenMax, // screen origin is top left
            this.screenMin);
        const pixel = Math.round(screenValue);
        return Math.clamp(this.screenMin, this.screenMax, pixel
        );
    }
}