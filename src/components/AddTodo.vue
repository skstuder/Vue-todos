<template>
    <form class="d-flex justify-center flex-column" @submit="addTodo" @keyup.enter="addTodo">
        <textarea v-model="title" :counter="50" aria-label="Add Todo" required />
        <button type="submit" value="submit" width="100%" class="primary">Add Todo</button>
    </form>
</template>

<script>
export default {
    name: "AddTodo",
    data() {
        return {
            title: ""
        };
    },
    methods: {
        addTodo(e) {
            e.preventDefault();
            const newTodo = {
                title: this.title,
                completed: false,
                id: Date.now()
            };
            //send up to parent
            this.$emit("add-todo", newTodo);
            this.title = "";
        }
    }
};
</script>

<style scoped></style>
