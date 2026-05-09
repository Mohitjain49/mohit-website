<template>
<ParticlesBackground :particlesOptions="GAMEPAD_CONTROLS_BACKGROUND" />
<FeaturesReturnWidget />

<main class="personal-web-body transparent">
    <div class="gamepad-controls-body">
        <div class="gamepad-controls-body-container left">
            <div class="gamepad-desc" id="scripts">
                <p>
                    This webpage simply shows the controls for using a gamepad here. 
                    The files below are the 3 main files in my code that give functionality to the Gamepad on this website.
                </p>
                <ul>
                    <li> <RouterLink to="/gamepad/custom-events/"> Custom Gamepad Events </RouterLink> </li>
                    <li> <RouterLink to="/gamepad/store-and-utility/"> Gamepad Vue.js Store & Utility </RouterLink> </li>
                    <li> <RouterLink to="/gamepad/vuejs-component/"> Gamepad Vue.js Component </RouterLink> </li>
                </ul>
                <FontAwesomeIcon class="gamepad-desc-icon" icon="fa-code" />
            </div>

            <div class="gamepad-connections" id="connections">
                <template v-for="cursor in gamepadStore.gamepadCursors">
                    <div class="gamepad-connection-statusBar" :style="{ color: cursor.color }">
                        <h2> {{ ('Gamepad ' + (cursor.index + 1)) }} </h2>

                        <div class="status-icons">
                            <div v-if="!cursor.standardMapping" class="statusIcon" :title="NON_STANDARD_MAPPING_MESSAGE">
                                <FontAwesomeIcon icon="fa-warning" style="color: orange;" />
                            </div>
                            <div class="statusIcon" :title="getGamepadConnectionStatusTitle(cursor.index, cursor.connected)">
                                <FontAwesomeIcon :flip="cursor.connectedFresh"
                                    :style="{ color: (cursor.connected ? 'lightgreen' : 'darkred') }"
                                    :icon="('fa-plug-circle-' + (cursor.connected ? 'plus' : 'minus'))"
                                />
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <div class="gamepad-controls-body-container right">
            <div class="gamepad-controls" id="controls">
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
                                <br class="move-cursor-mobileBreak" />
                                <img :src="dpad_controller" />
                                <span> D-pad </span>
                            </td>
                        </tr>
                        <tr>
                            <td> Reset Cursor </td>
                            <td> <img :src="left_stick_press" /> <span> Left Stick (Press) </span> </td>
                        </tr>
                        <tr>
                            <td> Scroll Vertically </td>
                            <td> <img :src="right_stick_vertical" /> <span> Right Stick </span> </td>
                        </tr>
                        <tr>
                            <td> Select </td>
                            <td> <img :src="a_button" /> <span> / </span> <img :src="b_button" /> </td>
                        </tr>
                        <tr>
                            <td> Scroll To Top </td>
                            <td>
                                <img :src="x_button" />
                                <span> / </span>
                                <img :src="y_button" />
                                <span> / </span>
                                <img :src="right_stick_press" />
                            </td>
                        </tr>
                        <tr>
                            <td> Navigation Menu </td>
                            <td> <img :src="plus_button" /> <span>/</span> <img :src="minus_button" /> </td>
                        </tr>
                        <tr>
                            <td> Set Cursor Speed </td>
                            <td>
                                <img :src="left_bumper" />
                                <span> / </span>
                                <img :src="right_bumper" />
                                <span> (Bumpers) </span>
                            </td>
                        </tr>
                        <tr>
                            <td> Set Volume </td>
                            <td>
                                <img :src="left_trigger" />
                                <span> / </span>
                                <img :src="right_trigger" />
                                <span> (Triggers) </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p class="gamepad-controls-iconSource">
                    <span> Icon Source: </span> <a :href="GAMEPAD_ICON_SOURCE" v-html="GAMEPAD_ICON_SOURCE"></a>
                </p>
            </div>
        </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
import left_stick from "~/assets/gamepad-buttons/left_stick.png";
import left_stick_press from "~/assets/gamepad-buttons/left_stick_press.png";
import right_stick_vertical from "~/assets/gamepad-buttons/right_stick_vertical.png";
import right_stick_press from "~/assets/gamepad-buttons/right_stick_press.png";
import dpad_controller from "~/assets/gamepad-buttons/dpad_controller.png";

import a_button from "~/assets/gamepad-buttons/a_button.png";
import b_button from "~/assets/gamepad-buttons/b_button.png";
import x_button from "~/assets/gamepad-buttons/x_button.png";
import y_button from "~/assets/gamepad-buttons/y_button.png";
import plus_button from "~/assets/gamepad-buttons/plus_button.png";
import minus_button from "~/assets/gamepad-buttons/minus_button.png";

import left_bumper from "~/assets/gamepad-buttons/left_bumper.png";
import right_bumper from "~/assets/gamepad-buttons/right_bumper.png";
import left_trigger from "~/assets/gamepad-buttons/left_trigger.png";
import right_trigger from "~/assets/gamepad-buttons/right_trigger.png";

const gamepadStore = useGamepadStore();
const router = useRouter();

onMounted(() => { initWebData(); manageGamepadTabGlow(); });
useHead(getMeta("Mohit Jain | Gamepad Controls", "gamepad", "These are the gamepad controls on my website." ));
watch(() => router.currentRoute.value.hash, (newValue, oldValue) => { manageGamepadTabGlow(oldValue); });

/**
 * This function manages which gamepad tab is "glowing" or not.
 * @param {String} oldValue The old hash value.
 */
function manageGamepadTabGlow(oldValue = "") {
    // This section removes the glow effect from the old tab.
    if(oldValue !== "" && oldValue.length > 0) {
        const oldIndex = GAMEPAD_PAGE_TABS.findIndex(item => item === oldValue.substring(1));
        if(oldIndex != -1) {
            const oldTab = document.getElementById(GAMEPAD_PAGE_TABS[oldIndex]);
            if(oldTab && typeof (oldTab.classList !== "undefined") && (oldTab.classList instanceof DOMTokenList)) {
                oldTab.classList.remove("glowing");
            }
        }
    }

    // This section adds the glow effect to the new tab.
    const hash = router.currentRoute.value.hash;
    if(hash !== "" && hash.length > 0) {
        const newIndex = GAMEPAD_PAGE_TABS.findIndex(item => item === hash.substring(1));
        console.log(hash, newIndex)
        if(newIndex != -1) {
            const newTab = document.getElementById(GAMEPAD_PAGE_TABS[newIndex]);
            if(newTab && typeof (newTab.classList !== "undefined") && (newTab.classList instanceof DOMTokenList)) {
                newTab.classList.add("glowing");
            }
        }
    }
}

/**
 * This function returns a String based on whether a gamepad is connected to the website.
 * @param {Boolean} index The index of the gamepad relative to other gamepads.
 * @param {Boolean} status The status of whether a gamepad is connected to the website or not.
 */
function getGamepadConnectionStatusTitle(index = 0, status = false) {
    return ("Gamepad " + (index + 1) + " Is " + (status ? "" : "Not ") + "Connected To My Website" + (status ? "!" : "."));
}

const GAMEPAD_PAGE_TABS = ["scripts", "connections", "controls"];
const NON_STANDARD_MAPPING_MESSAGE = ("Special Gamepad Detected. " +
    "Note that some of the default gamepad controls for my website may not work as expected with this particular gamepad."
);
</script>

<style scoped>
.gamepad-controls-body {
    height: 650px;
    min-height: var(--body-height);
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
.move-cursor-mobileBreak {
    display: none;
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
.glowing {
    box-shadow: 0px 0px 10px 2px var(--website-light-text);
}

.gamepad-controls {
    height: fit-content;
    padding: 30px;
    background-color: var(--dark-background);
    color: #eee;
    border: 1px solid;
    border-radius: 15px;
    font-family: "Lexend", sans-serif;
    margin-left: 20px;
    scroll-margin-top: 70px;
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
    padding: 14px 12px;
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
    scroll-margin-top: 70px;
}
.gamepad-desc-icon {
    position: absolute;
    bottom: 12px;
    right: 12px;
    color: var(--website-light-text);
    font-size: 24px;
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

.gamepad-connections {
    position: relative;
    margin-right: 20px;
    margin-top: 20px;
    height: 350px;
    width: fit-content;
    max-width: 400px;
    padding: 16px;
    border: 1px solid var(--blue-one);
    background-color: var(--dark-background);
    border-radius: 20px;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    scroll-margin-top: 70px;
}
.gamepad-connection-statusBar {
    width: 396px;
    height: 70px;
    border: 2px solid;
    border-radius: 10px;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    color: inherit;
}

.gamepad-connection-statusBar h2 {
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    font-size: 22px;
    margin-left: 10px;
}

.gamepad-connection-statusBar .status-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    font-size: 22px;
    margin-right: 10px;
    color: darkred;
    gap: 10px;
}
.gamepad-connection-statusBar .statusIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    font-size: 22px;
    color: darkred;
}

@media (max-width: 1100px) {
    .gamepad-controls-body {
        grid-template-columns: 1fr;
        height: 1400px;
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
    .gamepad-connections {
        margin-right: 0px;
    }
}
@media (max-width: 500px) {
    .gamepad-controls, .gamepad-desc, .gamepad-connections {
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
    .gamepad-connection-statusBar {
        width: 300px;
    }
    .move-cursor-mobileBreak {
        display: block;
    }

    .gamepad-desc ul {
        padding-left: 20px;
    }
}
</style>