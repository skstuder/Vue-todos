<script setup>
const props = defineProps(["todo"]);
</script>

<template>
    <li class="todo-item" v-bind:class="{ 'is-complete': todo.completed }">
        <p class="p-3">
            <input type="checkbox" v-model="todo.completed" aria-label="todo checkbox" />
            {{ todo.title }}
            <button @click="$emit('del-todo', todo.id)" class="delete-button" aria-label="delete button">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        </p>
    </li>
</template>


<style scope>
.todo-item {
    padding: 10px;
    width: 100%;
    border-bottom: 1px #ccc dotted;
}
.is-complete {
    text-decoration: line-through;
}
.d-none {
    display: none;
}
.delete-button {
    color: #000;
    border: none;
    padding: 5px 9px;
    cursor: pointer;
    float: right;
    background: var(--red);
    color: var(--white);
}
ul {
    list-style-type: none;
}
</style>
