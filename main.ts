const motorMin = -100;
const motorMax = 100;
const screenMin = 0;
const screenMax = 4;

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

        return pins.map(
            value,
            this.min,
            this.max,
            screenMax, // screen origin is top left
            screenMin
        )
    }
}

enum Side {
    Left = 0, Right = 1
}

const motor = [new Motor(kitronik_motor_driver.Motors.Motor2), new Motor(kitronik_motor_driver.Motors.Motor1)]
const verticalBar = [new VerticalBar(0, motorMin, motorMax), new VerticalBar(4, motorMin, motorMax)];

radio.onReceivedValue(function (name, value) {
    packetReceived = true
    if (name == "speedL") {
        motor[Side.Left].speed = value
    } else if (name == "speedR") {
        motor[Side.Right].speed = value
    }
})

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

radio.setGroup(1)

control.inBackground(function () {
    while (true) {
        verticalBar[Side.Left].plot(motor[Side.Left].speed)
        verticalBar[Side.Right].plot(motor[Side.Right].speed)
        plotPacketReceived()
        basic.pause(100)
    }
})
