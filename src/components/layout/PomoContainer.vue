<template>
    <div class="background">
        <h1 class="text-white">{{ minsAndSecs }}</h1>
        <p class="text-white">
            Pomodoro phase:
            <span v-if="!isStarted && hasBegun">PAUSED</span>
            <span v-else>{{ this.currentPhaseLabel }}</span>
        </p>

        <button v-if="!this.isStarted" @click="startTimer">Start Pomodoro</button>
        <button v-if="this.isStarted" @click="pauseTimer">Pause Pomodoro</button>
    </div>
</template>

<script>
const TIMES = {
    workTimer: 1500,
    shortBreakTimer: 300,
    longBreakTimer: 1200
};
const STAGES = ["work1", "shortBreak1", "work2", "shortBreak2", "work3", "shortBreak3", "work4", "longBreak"];
export default {
    data() {
        return {
            hasTimerEnabled: false,
            timerCount: 0,
            times: TIMES,
            stages: STAGES,
            currentStage: "",
            isStarted: false,
            hasBegun: false,
            root: null
        };
    },
    props: {
        isShowingText: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        minsAndSecs() {
            const minutes = Math.floor(this.timerCount / 60);
            const seconds = this.timerCount % 60;
            return `${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`;
        },
        currentPhaseLabel() {
            let answer;
            if (this.currentStage === "work1" || this.currentStage === "work2" || this.currentStage === "work3" || this.currentStage === "work4") {
                answer = "Hard at work";
            }
            if (this.currentStage === "shortBreak1" || this.currentStage === "shortBreak2" || this.currentStage === "shortBreak3") answer = "Take a short break";
            if (this.currentStage === "longBreak") answer = "Take a nice long break";
            return answer;
        }
    },

    watch: {
        hasTimerEnabled(value) {
            if (value) {
                this.timerCount--;
            }
        },
        currentStage() {
            if (this.currentStage === "work1" || this.currentStage === "work2" || this.currentStage === "work3" || this.currentStage === "work4") {
                this.timerCount = this.times.workTimer;
            }
            if (this.currentStage === "shortBreak1" || this.currentStage === "shortBreak2" || this.currentStage === "shortBreak3") this.timerCount = this.times.shortBreakTimer;
            if (this.currentStage === "longBreak") {
                this.timerCount = this.times.longBreakTimer;
            }
        },

        timerCount: {
            handler(value) {
                if (value > 0 && this.hasTimerEnabled) {
                    setTimeout(() => {
                        this.timerCount--;
                    }, 1000);
                } else if (this.hasTimerEnabled) {
                    let nextIndex = this.stages.indexOf(this.currentStage) + 1;
                    if (this.stages[nextIndex]) {
                        this.currentStage = this.stages[nextIndex];
                    } else {
                        this.currentStage = this.stages[0];
                    }
                }
            },
            immediate: true // This ensures the watcher is triggered upon creation
        }
    },

    methods: {
        startTimer() {
            this.hasBegun = true;
            this.isStarted = !this.isStarted;
            this.hasTimerEnabled = true;
        },

        pauseTimer() {
            this.isStarted = !this.isStarted;
            this.hasTimerEnabled = false;
        },

        padTo2Digits(num) {
            return num.toString().padStart(2, "0");
        },

        checkIfStarted(e) {
            if (e?.keyCode === 32 && !this.isShowingText) {
                if (this.isStarted) {
                    this.pauseTimer();
                } else {
                    this.startTimer();
                }
            }
        },

        listenForSpace() {
            window.addEventListener("keyup", (event) => {
                this.checkIfStarted(event);
            });
        }
    },
    created() {
        this.currentStage = this.stages[0];
        this.root = document.documentElement;
        this.listenForSpace();
    },
    updated() {
        if ((this.isStarted && this.currentStage === "work1") || this.currentStage === "work2" || this.currentStage === "work3" || this.currentStage === "work4") {
            this.root.style.setProperty("--background", "#C2E5D3");
        } else if (
            (this.isStarted && this.currentStage === "shortBreak1") ||
            this.currentStage === "shortBreak2" ||
            this.currentStage === "shortBreak3" ||
            this.currentStage === "shortBreak4"
        )
            this.root.style.setProperty("--background", "#FFCCCB");
        else if (this.isStarted && this.currentStage === "longBreak") {
            this.root.style.setProperty("--background", "#FFFFE0");
        } else {
            this.root.style.setProperty("--background", "var(--lightgrey)");
        }
    }
};
</script>

<style scoped>
:root {
    --background: var("--background");
    height: 100%;
}
.background {
    padding: 20px;
    border-radius: var(--border-radius);
    background-color: rgba(75, 66, 66, 0.5);
    height: 100%;
    text-align: center;
}
.text-white {
    color: white;
}
button {
    cursor: pointer;
    margin: 5px 5px;
}
@media only screen and (min-width: 500px) {
    .background {
        margin: 10px 20px;
    }
}
</style>
