<template>
    <div class="about d-flex align-center flex-column">
        <br />
        <h1>About This Project</h1>
        <div class="content">
            <br />
            <p>
                This project was my first ever vue project, initally it started as the result of following a tutorial. I have used this repo to experiment/refactor on a smaller
                scale before larger scale assignments at work. I consider this project one of my
                <a href="https://ilango.me/learning-by-building-breakable-toys/" target="_blank">small breakable toy's</a>
                .
            </p>

            <h2>First Refactor in 2019 as a junior dev</h2>
            <ul>
                <li>Converted it to use vuetify, framework used by employer at the time</li>
                <li>Added transitions</li>
                <li>Added vue router</li>
                <li>Added axios to make request to public api's</li>
                <li>Changed from a copy of a tutorial to something that had my unique style</li>
            </ul>
            <h2>Second refactor in 2022 as a mid level dev</h2>
            <ul>
                <li>Removed Vuetify and added my own custom classless css library called OliverCSS</li>
                <li>Converted from webpack to vite</li>
                <li>Converted from vue 2 to vue 3</li>
                <li>Upgraded Vue router to V4</li>
                <li>Upgraded all packages that were not vue 3 compatible</li>
                <li>Removed all security vulnerabilites, 50 total</li>
            </ul>
        </div>
    </div>
</template>
<script>
import image from "../assets/vue-screenshot.png";
export default {
    data: function () {
        return {
            image: image
        };
    }
};
</script>

<style scoped>
img {
    width: 100%;
}
li {
    list-style-type: disc;
}
</style>
