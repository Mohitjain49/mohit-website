<template>
<NavigationMain />
<div id="icons-body">
    <div id="main" class="icon-page-padding"></div>
    <div class="icon-background">
        <div class="icon-text">MKJ</div>
    </div>
    <div id="green" class="icon-page-padding"></div>
    <div class="icon-background green">
        <div class="icon-text">MKJ</div>
    </div>
</div>
</template>

<script setup>
import NavigationMain from '../components/NavigationMain.vue';
</script>

<style scoped>
#icons-body {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: white;
}
.icon-background {
    height: calc(100% - 50px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.icon-background.green {
    background-color: var(--globe-green);
}

.icon-page-padding {
    width: 100%;
    height: 50px;
    background-color: white;
}
.icon-page-padding#green {
    background: linear-gradient(to bottom, white 0%, var(--globe-green) 100%);
}

.icon-text {
    font-size: 400px;
    width: fit-content;
    height: fit-content;
    background: linear-gradient(to right, var(--blue-four) 0%, var(--blue-two) 50%, var(--blue-four) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: bold;
    font-family: 'Lexend', sans-serif;
    text-align: center;
}

@media (max-width: 940px) and (min-width: 501px) {
    .icon-text {
        font-size: 200px;
    }
}
@media (max-width: 500px) {
    .icon-text {
        font-size: 100px;
    }
}
</style>