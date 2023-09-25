<script setup>
    import { ref, computed, watch, onMounted, onUpdated } from "vue";
    const TIMES = {
        workTimer: 1500,
        shortBreakTimer: 300,
        longBreakTimer: 1200
    };
    const STAGES = ["work1", "shortBreak1", "work2", "shortBreak2", "work3", "shortBreak3", "work4", "longBreak"];

    const props = defineProps({
        isShowingText: {
            type: Boolean,
            default: false
        }
    })
        
    const hasTimerEnabled = ref(false)
    const timerCount = ref(0)
    const times = ref(TIMES)
    const timerId = ref(null)
    const stages = ref(STAGES)
    const currentStage = ref("")
    const isStarted = ref(false)
    const hasBegun = ref(false)
    const root = ref(null)

    const minsAndSecs = computed(() => {
        const minutes = Math.floor(timerCount.value / 60);
        const seconds = timerCount.value % 60;
        return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    });

    const currentPhaseLabel = computed(() => {
        let answer;
        if (!hasBegun.value) {
            answer = "Not started yet";

        } else if (currentStage.value === "work1" || currentStage.value === "work2" || currentStage.value === "work3" || currentStage.value === "work4") {
            answer = "Hard at work";
        }
        else if (currentStage.value === "shortBreak1" || currentStage.value === "shortBreak2" || currentStage.value === "shortBreak3") answer = "Take a short break";
        else if (currentStage.value === "longBreak") answer = "Take a nice long break";
        return answer;
    });

    watch(hasTimerEnabled, (value) => {
        if (value) {
            timerCount.value--;
        }
    })

    watch(currentStage, () => {
        if (currentStage.value === "work1" || currentStage.value === "work2" || currentStage.value === "work3" || currentStage.value === "work4") {
            timerCount.value = times.value.workTimer;
        }
        else if (currentStage.value === "shortBreak1" || currentStage.value === "shortBreak2" || currentStage.value === "shortBreak3") timerCount.value = times.value.shortBreakTimer;
        else if (currentStage.value === "longBreak") {
            timerCount.value = times.value.longBreakTimer;
        }
    })

    watch(timerCount, (value) => {
        if (value > 0 && hasTimerEnabled.value) {
            clearTimeout(timerId.value);
            timerId.value = setTimeout(() => {
                timerCount.value--;
            }, 1000);
        } else if (hasTimerEnabled.value) {
            clearTimeout(timerId.value); 
            let nextIndex = stages.value.indexOf(currentStage.value) + 1;
            if (stages.value[nextIndex]) {
                currentStage.value = stages.value[nextIndex];
            } else {
                currentStage.value = stages.value[0];
            }
        }
    })

    function skipPhase(){
        let nextIndex = stages.value.indexOf(currentStage.value) + 1;
        if (stages.value[nextIndex]) {
            currentStage.value = stages.value[nextIndex];
        } else {
            currentStage.value = stages.value[0];
        }
    }


    function startTimer() {
        hasBegun.value = true;
        isStarted.value = !isStarted.value;
        hasTimerEnabled.value = true;
    }

    function pauseTimer() {
        hasTimerEnabled.value = false;
        isStarted.value = !isStarted.value;
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, "0");
    }

    function checkIfStarted(e) {
        if (e?.keyCode === 32 && !isShowingText.value) {
            if (isStarted.value) {
                pauseTimer();
            } else {
                startTimer();
            }
        }
    }

    function listenForSpace() {
        window.addEventListener("keyup", (event) => {
            checkIfStarted(event);
        });
    }
    

    onMounted(() => {
        currentStage.value = stages.value[0];
        root.value = document.documentElement;
        listenForSpace();
    })

    onUpdated(() => {
        if ((isStarted.value) && (currentStage.value === "work1" || currentStage.value === "work2" || currentStage.value === "work3" || currentStage.value === "work4")) {
            root.value.style.setProperty("--background", "#C2E5D3");
        } else if (
            (isStarted.value) && (currentStage.value === "shortBreak1" ||
            currentStage.value === "shortBreak2" ||
            currentStage.value === "shortBreak3" ||
            currentStage.value === "shortBreak4")
        )
            root.value.style.setProperty("--background", "#FFCCCB");
        else if (isStarted.value && currentStage.value === "longBreak") {
            root.value.style.setProperty("--background", "#FFFFE0");
        } else {
            root.value.style.setProperty("--background", "var(--white)");
        }
    }) 

</script>

<template>
    <div class="background">
        <div class="d-flex flex-2">
            <div class="d-flex-row">
                <h1 class="text-white">{{ minsAndSecs }}</h1>
            </div>
            <div class="d-flex-row">

                <button class="text-sm" v-if="!isStarted" @click="startTimer">Start Pomodoro</button>
                <button class="text-sm" v-if="isStarted" @click="pauseTimer">Pause Pomodoro</button>
                <button class="text-sm" @click="skipPhase()">Skip Phase</button>
            </div>
        </div>
        <div class="d-flex flex-1">
            <div class="mb-2 text-lg">
                Pomodoro phase:
            </div>
            <div class="mb-2 w-24 h-24">
                <img v-if="!isStarted && hasBegun" src="../../assets/work-station.png"/>
                <img v-else-if="currentPhaseLabel === 'Hard at work'" src="../../assets/computer.png"/>
                <img v-else-if="currentPhaseLabel === 'Take a nice long break'" src="../../assets/yoga.png"/>
                <img v-else-if="currentPhaseLabel === 'Take a short break'" src="../../assets/relax.png"/>
                <img v-else src="../../assets/work-station.png"/>
            </div>
            <span v-if="!isStarted && hasBegun">Paused</span>
            <span v-else>{{ currentPhaseLabel }}</span>
        </div>
    </div>  
</template>

<style scoped>
:root {
    --background: var("--background");
    height: 100%;
}
.d-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    font-weight: bold;
    height: 100%;
}
.d-flex-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.flex-1 {
    flex: 1;
}
.flex-2 {
    flex: 2;
}
.background {
    padding: 20px;
    border-radius: var(--border-radius);
    background-color: rgba(75, 66, 66, 0.5);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.text-white {
    color: white;
}
button {
    cursor: pointer;
    margin: 5px 5px;
}
h1 {
    margin-bottom: 0;
}
p {
    margin-top: 0;
    margin-bottom: 0;
}
mb-2 {
    margin-bottom: 10px;
}
@media only screen and (min-width: 500px) {
 
h1 {
    margin-bottom: 10px;
}
p {
    margin-top: 10px;
    margin-bottom: 20px;
}
}
@media only screen and (max-width: 992px) {
 
.background {
    flex-direction: column;
}
.d-flex-row {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
}
</style>
