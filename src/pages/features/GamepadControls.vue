<template>
<ParticlesBackground :particlesOptions="GAMEPAD_CONTROLS_BACKGROUND" />
<FeaturesReturnWidget />

<main class="personal-web-body transparent">
    <div class="gamepad-controls-body">
        <div class="gamepad-controls-body-container left">
            <div class="gamepad-desc">
                <p>
                    This file simply shows the controls for using a gamepad here. 
                    The files below are the 4 main files in my code that give functionality to the Gamepad on this website.
                </p>
                <ul>
                    <li> <a :href="JOYPAD_EVENTS_FILE" target="mohit-gamepad"> Joypad Events </a> </li>
                    <li> <a :href="JOYPAD_CLASSES_FILE" target="mohit-gamepad"> Joypad Classes </a> </li>
                    <li> <a :href="GAMEPAD_STORE_FILE" target="mohit-gamepad"> Gamepad Pinia Store </a> </li>
                    <li> <a :href="GAMEPAD_COMPONENT_FILE" target="mohit-gamepad"> Gamepad Vue.js Component </a> </li>
                </ul>
                <FontAwesomeIcon class="gamepad-desc-icon" icon="fa-code" />
            </div>
        </div>

        <div class="gamepad-controls-body-container right">
            <div class="gamepad-controls">
                <h2>
                    <font-awesome-icon icon="fa-gamepad" />
                    <span> Gamepad Controls </span>
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Button / Control</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> Move Cursor </td>
                            <td>
                                <img :src="left_stick" />
                                <span> Left Stick or </span>
                                <img :src="dpad_controller" />
                                <span> D-pad </span>
                            </td>
                        </tr>
                        <tr>
                            <td> Scroll Vertically </td>
                            <td> <img :src="right_stick_vertical" /> <span> Right Stick </span> </td>
                        </tr>
                        <tr>
                            <td> Select </td>
                            <td> <img :src="a_button" /> <span> Right Buttons </span> </td>
                        </tr>
                        <tr>
                            <td> Decrease Cursor Speed </td>
                            <td> <img :src="left_bumper" /> <span> Left Bumper </span> </td>
                        </tr>
                        <tr>
                            <td> Increase Cursor Speed </td>
                            <td> <img :src="right_bumper" /> <span> Right Bumper </span> </td>
                        </tr>
                        <tr>
                            <td> Decrease Volume </td>
                            <td> <img :src="left_trigger" /> <span> Left Trigger </span> </td>
                        </tr>
                        <tr>
                            <td> Increase Volume </td>
                            <td> <img :src="right_trigger" /> <span> Right Trigger </span> </td>
                        </tr>
                        <tr>
                            <td> Navigation Menu </td>
                            <td> <img :src="plus_button" /> <span>/</span> <img :src="minus_button" /> </td>
                        </tr>
                    </tbody>
                </table>
                <p class="gamepad-controls-iconSource">
                    <span> Icon Source: </span> <a :href="ICON_SOURCE" v-html="ICON_SOURCE"></a>
                </p>
            </div>
        </div>
    </div>
</main>
</template>

<script setup>
import left_stick from "@/assets/gamepad-buttons/left_stick.png";
import right_stick_vertical from "@/assets/gamepad-buttons/right_stick_vertical.png";
import dpad_controller from "@/assets/gamepad-buttons/dpad_controller.png";

import a_button from "@/assets/gamepad-buttons/a_button.png";
import plus_button from "@/assets/gamepad-buttons/plus_button.png";
import minus_button from "@/assets/gamepad-buttons/minus_button.png";

import left_bumper from "@/assets/gamepad-buttons/left_bumper.png";
import right_bumper from "@/assets/gamepad-buttons/right_bumper.png";
import left_trigger from "@/assets/gamepad-buttons/left_trigger.png";
import right_trigger from "@/assets/gamepad-buttons/right_trigger.png";

const ICON_SOURCE = "https://kenney.nl/assets/input-prompts";
const JOYPAD_EVENTS_FILE = (PERSONAL_WEBSITE_REPOSITORY_LINK + "/blob/main/src/joypad-events.js");
const JOYPAD_CLASSES_FILE = (PERSONAL_WEBSITE_REPOSITORY_LINK + "/blob/main/src/joypad-classes.js");
const GAMEPAD_STORE_FILE = (PERSONAL_WEBSITE_REPOSITORY_LINK + "/blob/main/src/stores/GamepadStore.js");
const GAMEPAD_COMPONENT_FILE = (PERSONAL_WEBSITE_REPOSITORY_LINK + "/blob/main/src/components/GamepadComponent.vue");

onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | Gamepad Controls", "gamepad",
    "These are the gamepad controls on my website."
));
</script>

<style scoped>
.gamepad-controls-body {
    height: 600px;
    min-height: calc(100vh - 60px);
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.gamepad-controls-body-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
}
.gamepad-controls-body-container.left {
    align-items: flex-end;
}

.gamepad-controls {
    height: fit-content;
    padding: 23px;
    background-color: var(--dark-background);
    color: #eee;
    border: 1px solid;
    border-radius: 15px;
    font-family: "Lexend", sans-serif;
    margin-left: 20px;
}
.gamepad-controls h2 {
    font-size: 30px;
    margin-bottom: 16px;
    font-family: "Lexend", sans-serif;
}

.gamepad-controls table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;
}
.gamepad-controls th, .gamepad-controls td {
    border: 1px solid #555;
    padding: 12px;
    text-align: left;
    vertical-align: middle;
}

.gamepad-controls th:nth-child(1), .gamepad-controls td:nth-child(1) {
    color: var(--website-light-text);
}
.gamepad-controls td img {
    width: 20px;
    user-select: none;
    position: relative;
    top: 2px;
}
.gamepad-controls td span {
    position: relative;
    bottom: 2px;
}

.gamepad-controls-iconSource {
    text-align: center;
    margin: 0px auto;
    margin-top: 10px;
    color: white;
    font-family: 'Roboto', sans-serif;
}
.gamepad-controls-iconSource a {
    color: var(--blue-four);
    text-decoration: underline;
}

.gamepad-desc {
    position: relative;
    margin-right: 20px;
    height: 180px;
    width: fit-content;
    max-width: 400px;
    padding: 16px;
    border: 1px solid var(--website-light-text);
    background-color: var(--dark-background);
    border-radius: 20px;
    font-family: 'Montserrat', sans-serif;
}
.gamepad-desc p {
    color: var(--website-light-text);
    font-family: 'Montserrat', sans-serif;
}

.gamepad-desc li {
    color: var(--website-text);
}
.gamepad-desc a:hover {
    text-decoration: underline;
}

.gamepad-desc-icon {
    position: absolute;
    bottom: 12px;
    right: 12px;
    color: var(--website-light-text);
    font-size: 24px;
}

@media (max-width: 1100px) {
    .gamepad-controls-body {
        grid-template-columns: 1fr;
        height: 950px;
    }
    .gamepad-controls-body-container {
        align-items: center !important;
        height: fit-content;
    }

    .gamepad-desc {
        margin-right: 0px;
        margin-top: 40px;
    }
    .gamepad-controls {
        margin-left: 0px;
    }
}
@media (max-width: 500px) {
    .gamepad-controls, .gamepad-desc {
        width: 300px;
        padding: 20px;
    }
    .gamepad-desc {
        padding-bottom: 25px;
    }
    .gamepad-controls h2 {
        font-size: 26px;
    }
    .gamepad-controls th, .gamepad-controls td {
        font-size: 12px;
    }
}
</style>