const screenMin = 0;
const screenMax = 4;
const sensorStop = 1000;
const RadioGroup = 1;

enum Side {
    Left = 0, Right = 1
}

class MotorControl {
    private readonly motor: Motor;
    private readonly sensor: DistanceSensor;
    private duration: number;

    constructor(motor: Motor, sensor: DistanceSensor) {
        this.motor = motor;
        this.sensor = sensor;
        this.duration = -1;
    }

    setSpeed(speed: number) {
        if (speed <= 0) {
            this.motor.setSpeed(speed);
        }
        else if (this.duration > sensorStop) {
            this.motor.setSpeed(speed);
        }
        else {
            this.motor.stop()
        }
    }

    setDuration(duration: number) {
        if (duration != this.duration) {
            this.duration = duration;

            if (this.duration <= sensorStop) {
                this.motor.stop();
            }
        }
    }
}

const motor = [new Motor(kitronik_motor_driver.Motors.Motor2), new Motor(kitronik_motor_driver.Motors.Motor1)]
const verticalBar = [new VerticalBar(0, Motor.min, Motor.max), new VerticalBar(4, Motor.min, Motor.max)];
const heartBeatLed = new HeartBeatLed(2, 2);
const rangeBar = new VerticalBar(1, sensorStop, 5000);
const sensor = new DistanceSensor(DigitalPin.P1, DigitalPin.P2);
const motorControl = [new MotorControl(motor[Side.Left], sensor), new MotorControl(motor[Side.Right], sensor)];

const remote = new Remote(RadioGroup);
remote.onReceivedValue(function () { heartBeatLed.toggle(); })
remote.onReceivedSpeedL(function (speed: number) { motorControl[Side.Left].setSpeed(speed); });
remote.onReceivedSpeedR(function (speed: number) { motorControl[Side.Right].setSpeed(speed); });

control.inBackground(function () {
    while (true) {
        verticalBar[Side.Left].plot(motor[Side.Left].getSpeed())
        verticalBar[Side.Right].plot(motor[Side.Right].getSpeed())
        heartBeatLed.plot()
        rangeBar.plot(sensor.getDuration())
        basic.pause(100)
    }
})

sensor.onEcho(function () {
    const duration = sensor.getDuration();
    motorControl[Side.Left].setDuration(duration);
    motorControl[Side.Right].setDuration(duration)
})

basic.forever(function () {
    sensor.trigger();
    basic.pause(60)
})