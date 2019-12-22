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
}

enum Side {
    Left = 0, Right = 1
}
const motor = [new Motor(kitronik_motor_driver.Motors.Motor2), new Motor(kitronik_motor_driver.Motors.Motor1)]

radio.onReceivedValue(function (name, value) {
    packetReceived = true
    if (name == "speedL") {
        motor[Side.Left].speed = value
    } else if (name == "speedR") {
        motor[Side.Right].speed = value
    }
})
function plotMotor(x: number, y: number) {
    for (let i = 0; i <= 5 - 1; i++) {
        if (i == y) {
            led.plot(x, i)
        } else {
            led.unplot(x, i)
        }
    }
}
function plotMotorL(speedL: number) {
    let yL = speedToScreen(speedL)
    plotMotor(0, yL)
}
function plotMotorR(speedR: number) {
    let yR = speedToScreen(speedR)
    plotMotor(4, yR)
}
function plotPacketReceived() {
    if (packetReceived) {
        led.toggle(2, 2)
        packetReceived = false
    } else {
        led.plot(2, 2)
    }
}
let packetReceived = false
let name = ""
let value = 0
function speedToScreen(speed: number) {

    let y = pins.map(
        speed,
        -100,
        100,
        4,
        0
    )

    return y
}

radio.setGroup(1)
control.inBackground(function () {
    while (true) {
        plotMotorL(motor[Side.Left].speed)
        plotMotorR(motor[Side.Right].speed)
        plotPacketReceived()
        basic.pause(100)
    }
})
