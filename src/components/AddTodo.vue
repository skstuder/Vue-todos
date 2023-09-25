<script setup>
import { watch, ref } from 'vue';

const title = ref("");
const isShowingText = ref(false)
    
watch(isShowingText, (newValue) => {
    emits("is-showing-text", newValue);
})

function addTodo() {
    if (!title.value) return
    const newTodo = {
        title: title.value,
        completed: false,
        id: Date.now()
    };
    emits("add-todo", newTodo);
    title.value = "";
    isShowingText.value = !isShowingText.value;
}

const emits = defineEmits(["add-todo", "is-showing-text"])

</script>

<template>
    <div class="add-todo">
        <input v-model="title" :counter="50" aria-label="Add Todo" placeholder="Add a task!" required @keyup.enter="addTodo" />
        <div class="w-full flex justify-end">
            <button width="100%" class="ml-3 text-sm font-bold" @click="addTodo">Add Todo</button>
        </div>
    </div>
</template>

<style scoped>
.start-todo-button {
    width: 100%;
    padding: 10px 20px;
    margin: 10px 0px;
    border: 3px var(--darkerGreen) dashed;
    border-radius: 10px;
    background: var(--green);
    text-align: center;
}
a {
    text-decoration: none;
    color: var(--textColor);
}
input {
    width: 100%;
    margin-bottom: 10px;
    border-bottom: 2px solid var(--grey);
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    background: var(--background);
}
input:focus {
    outline: none;
    border-bottom-color: var(--black);
}
.add-todo {
    margin-top:30px
}
.ml-3 {
    margin-left: .5rem;
}
.w-full {
    width: 100%;
}
.flex {
    display: flex;
}
.justify-end {
    justify-content: flex-end;
}
</style>
