<template>
    <body>
        <header>
            <div>Todos App</div>
            <nav>
                <router-link to="/">todo's</router-link>
                <router-link to="/about">about</router-link>
            </nav>
        </header>
        <div class="layout">
            <router-view />
        </div>
    </body>
</template>

<script>
export default {
    name: "App",

    data: () => ({
        //
    })
};
</script>
