<script setup>
</script>

<template>
    <body>
        <header>
            <div>Todos App</div>
            <nav>
                <router-link to="/">todo's</router-link>
            </nav>
        </header>
        <div class="layout">
            <router-view />
        </div>
    </body>
</template>

