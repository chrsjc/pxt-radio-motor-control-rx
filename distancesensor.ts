class DistanceSensor {
    private readonly triggerPin: DigitalPin;
    private duration: number = 0;

    constructor(triggerPin: DigitalPin, echoPin: DigitalPin) {
        this.triggerPin = triggerPin;

        pins.onPulsed(echoPin, PulseValue.High, function () {
            this.duration = pins.pulseDuration();

            if (this.onEchoHandler) {
                this.onEchoHandler();
            }
        })
    }

    trigger() {
        pins.digitalWritePin(this.triggerPin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(this.triggerPin, 0);
    }

    getDuration() {
        return this.duration;
    }

    onEcho(cb: () => void) {
        this.onEchoHandler = cb;
    }

    private onEchoHandler: () => void;
}