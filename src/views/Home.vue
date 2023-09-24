<template>
    <div class="home-layout">
        <pomo-container class="pomo-container" :is-showing-text="isShowingText" />
        <todo-container class="todo-container" @is-showing-text="updateIsShowingText" />
    </div>
</template>

<script>
import TodoContainer from "../components/layout/TodoContainer.vue";
import PomoContainer from "../components/layout/PomoContainer.vue";

export default {
    components: {
        TodoContainer,
        PomoContainer
    },
    data() {
        return {
            isShowingText: false
        };
    },
    methods: {
        updateIsShowingText(event) {
            this.isShowingText = event;
        }
    }
};
</script>

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
