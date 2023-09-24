<template>
    <div>
    <template>
        <Todos  :todos="todos" @del-todo="deleteTodo" />
        <AddTodo @add-todo="addTodo" @is-showing-text="isShowingText" />
    </template>
   
    </div>
</template>
<script>
import Todos from "../Todos.vue";
import AddTodo from "../AddTodo.vue";

const SAMPLE_TODOS = [
    { userId: 1, id: 1, title: "Here is a sample todo!", completed: false, sample: true },
    { userId: 2, id: 2, title: "Here is a sample todo that's completed!", completed: true, sample: true }
];

export default {
    components: {
        Todos,
        AddTodo
    },
    data() {
        return {
            sampleTodos: SAMPLE_TODOS,
            todos: [],
            hasSampleTodos: true
        };
    },
    methods: {
        deleteTodo(id) {
            this.todos = this.todos.filter((todo) => todo.id !== id);
            localStorage.setItem("todos", JSON.stringify([...this.todos]));
        },
        addTodo(newTodo) {
            localStorage.setItem("todos", JSON.stringify([...this.todos, newTodo]));
            this.todos = [...this.todos, newTodo];
        },

        getTodosFromLocalStorage() {
            this.todos = JSON.parse(localStorage.getItem("todos")) || [];
        },

        isShowingText(event) {
            this.$emit("is-showing-text", event);
        }
    },
    created() {
        this.getTodosFromLocalStorage();
    }
};
</script>

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
