class Motor {
    private readonly motor: kitronik_motor_driver.Motors;
    private speed: number = 0;
    static readonly min: number = -100;
    static readonly max: number = 100;

    constructor(motor: kitronik_motor_driver.Motors) {
        this.motor = motor;
    }

    getSpeed(): number {
        return this.speed;
    }

    setSpeed(speed: number) {

        this.speed = speed;

        if (this.speed > 0) {
            kitronik_motor_driver.motorOn(this.motor, kitronik_motor_driver.MotorDirection.Forward, this.speed);
        } else if (this.speed < 0) {
            kitronik_motor_driver.motorOn(this.motor, kitronik_motor_driver.MotorDirection.Reverse, Math.abs(this.speed));
        } else {
            kitronik_motor_driver.motorOff(this.motor);
        }

    }

    stop() {
        kitronik_motor_driver.motorOff(this.motor);
    }
}