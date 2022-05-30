<template>
    <li class="todo-item" v-bind:class="{ 'is-complete': todo.completed }">
        <p class="p-3">
            <input type="checkbox" v-model="todo.completed" />
            {{ todo.title }}
            <button @click="$emit('del-todo', todo.id)" class="del">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        </p>
    </li>
</template>

<script>
export default {
    name: "TodoItem",
    props: ["todo"]
};
</script>

<style scope>
.todo-item {
    padding: 10px;
    width: 100%;
    border-bottom: 1px #ccc dotted;
}
.is-complete {
    text-decoration: line-through;
}
.del {
    color: #000;
    border: none;
    padding: 5px 9px;
    cursor: pointer;
    float: right;
}
ul {
    list-style-type: none;
}
</style>
