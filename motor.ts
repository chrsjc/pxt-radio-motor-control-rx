class Motor {
    private readonly motor: kitronik_motor_driver.Motors
    private _speed: number = 0;
    constructor(motor: kitronik_motor_driver.Motors) {
        this.motor = motor;
    }

    get speed(): number
    { return this._speed }

    set speed(newSpeed: number) {

        this._speed = newSpeed;

        if (this._speed > 0) {
            kitronik_motor_driver.motorOn(this.motor, kitronik_motor_driver.MotorDirection.Forward, this._speed)
        } else if (this._speed < 0) {
            kitronik_motor_driver.motorOn(this.motor, kitronik_motor_driver.MotorDirection.Reverse, Math.abs(this._speed))
        } else {
            kitronik_motor_driver.motorOff(this.motor)
        }

    }

    stop() {
        kitronik_motor_driver.motorOff(this.motor);
    }
}