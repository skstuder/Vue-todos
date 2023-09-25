<script setup>
import TodoItem from "./TodoItem.vue";

const props = defineProps({
    todos: {
        type: Array,
        required: true
    }
});
</script>

<template>
    <div>
        <h3>Tasks</h3>
        <ul class="list-group">
            <TodoItem class="list-group-item px-2 py-3" v-for="(todo, i) in todos" :key="i" v-bind:todo="todo" v-on:del-todo="$emit('del-todo', todo.id)" />
        </ul>
    </div>
</template>
