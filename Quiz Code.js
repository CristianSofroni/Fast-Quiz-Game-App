"use strict";

const TIME_OVER_SYM = Symbol("TO");
const TIMER_INTERVAL_SYM = Symbol("TI");

class Quiz {
    // ... (rest of the Quiz class implementation, unchanged)

    /**
     * Get the details of the timing of the quiz.
     * @returns {{start: null, end: null, timeOver: *, quizTime: *, elapsedTime: number, remainingTime: *}}
     */
    get timeDetails() {
        let now = new Date().getTime();
        return {
            quizTime: this._time,
            start: this._startTime,
            end: this._endTime,
            elapsedTime: ((this._endTime || now) - this._startTime) / 1000, // ms to sec
            remainingTime: secToTimeStr(this._remainingTime),
            timeOver: this[TIME_OVER_SYM],
        };
    }

    /**
     * Control the ticker of the time of the running quiz.
     * @private
     */
    _setTicker() {
        if (!this._startTime) {
            console.log("Quiz not started yet.");
            return;
        }

        if (this[TIMER_INTERVAL_SYM]) {
            console.log("The ticker has been set before.");
            return;
        }

        let privateRemainingTimeInSec = this._time;
        this[TIME_OVER_SYM] = false;
        this[TIMER_INTERVAL_SYM] = setInterval(() => {
            --privateRemainingTimeInSec;
            this._remainingTime = privateRemainingTimeInSec;
            if (privateRemainingTimeInSec <= 0) {
                this[TIME_OVER_SYM] = true;
                this.stop();
            }
        }, 1000);
    }
}

// ... (rest of the helper functions, unchanged)
