<script setup>
    import { ref, computed, watchEffect, watch, onMounted, onUpdated } from "vue";
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
        if (currentStage.value === "work1" || currentStage.value === "work2" || currentStage.value === "work3" || currentStage.value === "work4") {
            answer = "Hard at work";
        }
        if (currentStage.value === "shortBreak1" || currentStage.value === "shortBreak2" || currentStage.value === "shortBreak3") answer = "Take a short break";
        if (currentStage.value === "longBreak") answer = "Take a nice long break";
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
        if (currentStage.value === "shortBreak1" || currentStage.value === "shortBreak2" || currentStage.value === "shortBreak3") timerCount.value = times.value.shortBreakTimer;
        if (currentStage.value === "longBreak") {
            timerCount.value = times.value.longBreakTimer;
        }
    })

    watch(timerCount, (value) => {
        if (value > 0 && hasTimerEnabled.value) {
            setTimeout(() => {
                timerCount.value--;
            }, 1000);
        } else if (hasTimerEnabled.value) {
            let nextIndex = stages.value.indexOf(currentStage.value) + 1;
            if (stages.value[nextIndex]) {
                currentStage.value = stages.value[nextIndex];
            } else {
                currentStage.value = stages.value[0];
            }
        }
    })


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
        if ((isStarted.value && currentStage.value === "work1") || currentStage.value === "work2" || currentStage.value === "work3" || currentStage.value === "work4") {
            root.value.style.setProperty("--background", "#C2E5D3");
        } else if (
            (isStarted.value && currentStage.value === "shortBreak1") ||
            currentStage.value === "shortBreak2" ||
            currentStage.value === "shortBreak3" ||
            currentStage.value === "shortBreak4"
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
        <h1 class="text-white">{{ minsAndSecs }}</h1>
        <p class="text-white">
            Pomodoro phase:
            <span v-if="!isStarted && hasBegun">PAUSED</span>
            <span v-else>{{ currentPhaseLabel }}</span>
        </p>

        <button v-if="!isStarted" @click="startTimer">Start Pomodoro</button>
        <button v-if="isStarted" @click="pauseTimer">Pause Pomodoro</button>
    </div>
</template>

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
@media only screen and (min-width: 500px) {
 
    h1 {
    margin-bottom: 10px;
}
p {
    margin-top: 10px;
    margin-bottom: 20px;
}
}
</style>
