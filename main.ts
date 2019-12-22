radio.onReceivedValue(function (name, value) {
    packetReceived = true
    if (name == "speedL") {
        speedL = value
        updateMotor(kitronik_motor_driver.Motors.Motor2, speedL)
    } else if (name == "speedR") {
        speedR = value
        updateMotor(kitronik_motor_driver.Motors.Motor1, speedR)
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
let speedR = 0
let speedL = 0
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
function updateMotor(motor: kitronik_motor_driver.Motors, speed: number) {

    if (speed > 0) {
        kitronik_motor_driver.motorOn(motor, kitronik_motor_driver.MotorDirection.Forward, speed)
    } else if (speed < 0) {
        kitronik_motor_driver.motorOn(motor, kitronik_motor_driver.MotorDirection.Reverse, Math.abs(speed))
    } else {
        kitronik_motor_driver.motorOff(motor)
    }
}
radio.setGroup(1)
control.inBackground(function () {
    while (true) {
        plotMotorL(speedL)
        plotMotorR(speedR)
        plotPacketReceived()
        basic.pause(100)
    }
})
