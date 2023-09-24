<template>
    <div>
        <a v-if="!isShowingText" href="#" @click="isShowingText = !isShowingText">
            <div class="d-flex justify-center flex-column start-todo-button">Add A Task</div>
        </a>
        <form v-else class="add-todo" @submit="addTodo" @keyup.enter="addTodo">
            <input v-model="title" :counter="50" aria-label="Add Todo" placeholder="Add a task!" required />
            <button width="100%" class="primary" @click="addTodo" @keyup.enter="addTodo">Add Todo</button>
            <!-- Todo: fix spacing with tailwind -->
            <button width="100%" class="primary" @click="isShowingText = !isShowingText">Clear</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "AddTodo",
    data() {
        return {
            title: "",
            isShowingText: false
        };
    },
    watch: {
        isShowingText(newValue) {
            this.$emit("is-showing-text", newValue);
        }
    },
    methods: {
        addTodo() {
            const newTodo = {
                title: this.title,
                completed: false,
                id: Date.now()
            };
            //send up to parent
            this.$emit("add-todo", newTodo);
            this.title = "";
            this.isShowingText = !this.isShowingText;
        }
    }
};
</script>

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
</style>
