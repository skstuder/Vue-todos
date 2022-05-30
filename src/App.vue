<template>
    <body>
        <header>
            <div>Todos App</div>
            <nav>
                <a href="#">todo's</a>
                <a href="#">about</a>
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
