class Timer {
    min;
    sec;
    ms;
    count;
    malt;
    salt;
    msalt;

    constructor(idElement = "timer", sec=0, min=0, ms=0) {
        console.log(`Creamos un Timer`);

        this.idElement = idElement;

        if (localStorage.getItem('timer') !== null) {
            let timerFromLocalStorage = JSON.stringify.parse(localStorage.getItem('time'));

            this.s = parseInt(timerFromLocalStorage.s);
            this.m = parseInt(timerFromLocalStorage.m);
            this.ms = parseInt(timerFromLocalStorage.ms);
        } else {
            this.ms = ms;
            this.min = min;
            this.sec = sec;
        }

    }

    start() {
        this.ms = 0;
        sec = 0;
        this.min = 0;

        count = setInterval(function() {

            if (this.ms == 100) {
                this.ms = 0;

                if (this.sec == 60) {
                    this.sec = 0;
                    this.min++;
                } else {
                    if (this.sec % 2 == 0) {
                        let timerObject = {
                            sec: this.sec,
                            ms: this.ms,
                            min: this.min
                        };

                        localStorage.setItem('timer', JSON.stringify(timerObject));
                    }
                }

            } else {
                this.ms++;
            }

            malt = stopWatch.pad(this.min);
            salt = stopWatch.pad(this.sec);
            msalt = stopWatch.pad(this.ms);

            stopWatch.update(this.malt + ":" + this.salt + ":" + this.msalt);
        }, 10);
    }

    stop() {
        clearInterval(count);
    }

    update(txt) {
        let temp = document.getElementById('timer');
        temp.firstChild.nodeValue = txt;

        let timerObject = {
            sec: this.sec,
            ms: this.ms,
            min: this.min
        };

        localStorage.setItem('timer', JSON.stringify(timerObject));
    }

    pad(time) {
        var temp;

        if (time < 10) {
            temp = "0" + time;
        } else {
            temp = time;
        }

        return temp;
    }
}

stopWatch.start();