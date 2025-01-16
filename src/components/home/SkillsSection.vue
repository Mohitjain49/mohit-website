<template>
<div id="skills" class="sector-transition"></div>
<div class="skills-section">
    <div class="skills-section-title"> My Skills </div>
    <div class="skills-section-mainText">
        Since 2021, I have successfully designed and developed numerous websites, web applications, and projects 
        by utilizing multiple programming languages, frontend frameworks, and web services.
    </div>
</div>
<div class="sector-transition"></div>
</template>

<script setup>

</script>

<style>
:root {
    --blue-one: rgb(159, 191, 255);
    --blue-two: rgb(117, 163, 255);
    --blue-three: rgb(67, 130, 255);
    --blue-four: rgb(82, 139, 252);
    --blue-five: rgb(82, 3, 239);
}
.sector-transition {
    height: 50px;
    width: 100%;
    background: linear-gradient(to top, rgb(248, 206, 171) 0%, var(--blue-two) 100%);
}
.sector-transition#skills {
    background: linear-gradient(to bottom, rgb(248, 206, 171) 0%, var(--blue-one) 100%);
}

.skills-section {
    height: var(--body-height);
    width: 100%;
    background: linear-gradient(to bottom, var(--blue-one) 0%, var(--blue-two) 100%);
    color: var(--blue-five);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}
.skills-section-title {
    position: relative;
    font-size: 90px;
    font-family: 'Lexend', 'sans-serif';
    font-weight: bold;
    color: var(--blue-five);
    width: fit-content;
    margin: 25px 0px;
}

.skills-section-mainText {
    font-size: 20px;
    font-family: 'Lexend', 'sans-serif';
    width: fit-content;
    max-width: 700px;
    padding: 0px 10px;
    text-align: center;
}
.skills-section-descNew {
    font-size: 30px;
    font-family: 'Lexend', 'sans-serif';
}
</style>