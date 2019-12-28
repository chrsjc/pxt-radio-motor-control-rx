class Remote {

    constructor(group: number) {
        radio.setGroup(group);

        radio.onReceivedValue(function (name, value) {
            if (this.onReceivedValueHandler) {
                this.onReceivedValueHandler();
            }

            if (name == "speedL") {
                if (this.onReceivedSpeedLHandler) {
                    this.onReceivedSpeedLHandler(value);
                }
            } else if (name == "speedR") {
                if (this.onReceivedSpeedRHandler) {
                    this.onReceivedSpeedRHandler(value);
                }
            }
        })
    }

    onReceivedValue(cb: () => void) {
        this.onReceivedValueHandler = cb;
    }

    onReceivedSpeedL(cb: (speed: number) => void) {
        this.onReceivedSpeedLHandler = cb;
    }

    onReceivedSpeedR(cb: (speed: number) => void) {
        this.onReceivedSpeedRHandler = cb;
    }

    private onReceivedValueHandler: () => void;
    private onReceivedSpeedLHandler: (speed: number) => void;
    private onReceivedSpeedRHandler: (speed: number) => void;
}