<template>
<div class="newCard-container">
    <a :href="TICTACTOE_PROJECT_LINK" id="tictactoe-nav-newCard" class="nav-newCard" pulse-loop>
        <div class="nav-newCard-header">
            <FontAwesomeIcon icon="fa-table-cells" />
        </div>
        <div class="nav-newCard-picture">
            <img :src="main_app_page" width="77.5%" draggable="false" style="border: 1px solid white;" />
        </div>

        <div class="newCard-devStack">
            <div class="newCard-devStack-title"> Dev Stack </div>
            <div class="newCard-module">
                <img :src="nuxt_icon" draggable="false" />
                <span> Nuxt </span>
            </div>
            <div v-for="name in ['Python', 'Pyodide']" class="newCard-module">
                <font-awesome-icon icon="fa-brands fa-python" style="color: rgb(52, 110, 158)" />
                <span> {{ name }} </span>
            </div>
            <div class="newCard-module">
                <font-awesome-icon icon="fa-brands fa-github" style="color: black" />
                <span> GitHub </span>
            </div>
        </div>

        <div class="nav-newCard-desc">
            This project utiltizes Nuxt and Pyodide (A Python distribution for the browser) to run Tic-Tac-Toe on a website. 
            The Computer Program that plays against you uses a Minimax Algorithm that doesn't lose in any scenario.
        </div>
    </a>
</div>
</template>

<script setup>
import main_app_page from "~/assets/Tictactoe_Project_Page.png";
import nuxt_icon from "~/assets/Nuxt_Icon.png";
onMounted(() => { nextTick(() => { setNavCardAnimation("tictactoe-nav-newCard"); }); });
</script>

<style scoped lang="scss">
@use "~/styles/navcards";
</style>