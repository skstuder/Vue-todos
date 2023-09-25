<script setup>
    import { onMounted, ref } from "vue";
    import Todos from "../Todos.vue";
    import AddTodo from "../AddTodo.vue";

    const SAMPLE_TODOS = [
        { userId: 1, id: 1, title: "Here is a sample todo!", completed: false, sample: true },
        { userId: 2, id: 2, title: "Here is a sample todo that's completed!", completed: true, sample: true }
    ];

    const sampleTodos = SAMPLE_TODOS
    const todos = ref([])
    const hasSampleTodos = ref(true)


    function deleteTodo(id) {
        todos.value = todos.value.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify([...todos.value]));
    }
    function addTodo(newTodo) {
        localStorage.setItem("todos", JSON.stringify([...todos.value, newTodo]));
        todos.value = [...todos.value, newTodo];
    }

    function getTodosFromLocalStorage() {
        todos.value = JSON.parse(localStorage.getItem("todos")) || [];
    }

    function isShowingText(event) {
        emits("is-showing-text", event);
    }

    onMounted(() => {
        getTodosFromLocalStorage();
    }) 

    const emits = defineEmits(["is-showing-text"])
</script>

<template>
    <Todos  :todos="todos" @del-todo="deleteTodo" />
    <AddTodo @add-todo="addTodo" @is-showing-text="isShowingText" />
</template>


<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.bg-grey {
    background-color: #343434;
    min-height: 100vh;
}
body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
}
.btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
}
.btn:hover {
    background: #666;
}
p {
    margin-top: 10px;
}
</style>
