<template>
    <div class="home-layout">
        <pomo-container class="pomo-container" />
        <todo-container class="todo-container" />
    </div>
</template>

<script>
import TodoContainer from "../components/layout/TodoContainer.vue";
import PomoContainer from "../components/layout/PomoContainer.vue";

export default {
    name: "Home",
    components: {
        TodoContainer,
        PomoContainer
    }
};
</script>

<style>
.home-layout {
    display: block;
}
.pomo-container {
    margin-bottom: 20px;
}
@media only screen and (min-width: 500px) {
    .home-layout {
        display: flex;
        flex-direction: row;
    }
    .pomo-container {
        flex: 1;
        margin-right: 40px;
        height: 300px;
    }
    .todo-container {
        flex: 3;
    }
}
</style>
