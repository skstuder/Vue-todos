<template>
    <div>
        <h3>TODO LIST</h3>
        <ul class="list-group">
            <TodoItem class="list-group-item px-2 py-3" v-for="(todo, i) in todos" :key="i" v-bind:todo="todo" v-on:del-todo="$emit('del-todo', todo.id)" />
        </ul>
    </div>
</template>
<script>
import TodoItem from "./TodoItem.vue";
export default {
    name: "Todos",
    components: {
        TodoItem
    },
    props: ["todos"]
};
</script>

<style></style>
