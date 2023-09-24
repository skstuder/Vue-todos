<script setup>
import { ref } from "vue";
import TodoContainer from "../components/layout/TodoContainer.vue";
import PomoContainer from "../components/layout/PomoContainer.vue";

const isShowingText = ref(false)

function updateIsShowingText(event) {
    isShowingText.value = event;
}
</script>

<template>
    <div class="home-layout">
        <pomo-container class="pomo-container" :is-showing-text="isShowingText" />
        <todo-container class="todo-container" @is-showing-text="updateIsShowingText" />
    </div>
</template>


<style>

    .home-layout {
        display: flex;
        flex-direction: column;
    }
    .pomo-container {
        flex: 1;
        height: 300px;
    }
    

</style>
