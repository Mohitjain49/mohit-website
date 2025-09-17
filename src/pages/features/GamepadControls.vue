<template>
<FeaturesReturnWidget />
<main class="personal-web-body">
    <div class="gamepad-controls-body">
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
                    <tr><td>🕹️ Move Cursor</td><td>Left Stick</td></tr>
                    <tr><td>🧭 Move Cursor</td><td>D-pad</td></tr>
                    <tr><td>📜 Scroll Vertically</td><td>Right Stick</td></tr>
                    <tr><td>🅰️/🅱️ Select</td><td>Right Buttons</td></tr>
                    <tr><td>⬅️ Decrease Cursor Speed</td><td>Left Bumper</td></tr>
                    <tr><td>➡️ Increase Cursor Speed</td><td>Right Bumper</td></tr>
                    <tr><td>📖 Navigation Menu</td><td>+ / -</td></tr>
                </tbody>
            </table>
            <button class="gamepad-previous-btn" @click="router.back()">
                <font-awesome-icon icon="fa-arrow-left" />
                <span> Previous Page </span>
            </button>
        </div>

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
        </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
const router = useRouter();
const JOYPAD_EVENTS_FILE = (PERSONAL_WEBSITE_REPOSITORY_LINK + "/blob/main/src/joypad-events.js");
const JOYPAD_CLASSES_FILE = (PERSONAL_WEBSITE_REPOSITORY_LINK + "/blob/main/src/joypad-classes.js");
const GAMEPAD_STORE_FILE = (PERSONAL_WEBSITE_REPOSITORY_LINK + "/blob/main/src/stores/GamepadStore.js");
const GAMEPAD_COMPONENT_FILE = (PERSONAL_WEBSITE_REPOSITORY_LINK + "/blob/main/src/components/GamepadComponent.vue");

onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | Gamepad Controls", "gamepad",
    "These are the gamepad controls on my website."
))
</script>

<style scoped>
.gamepad-controls-body {
    min-height: 740px;
    height: calc(100vh - 60px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.gamepad-controls {
    padding: 24px;
    background-color: var(--dark-background);
    color: #eee;
    border-radius: 15px;
    font-family: "Lexend", sans-serif;
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
}

.gamepad-previous-btn {
    margin-top: 10px;
    padding: 7px;
    border: 1px solid white;
    border-radius: 10px;
    transition: var(--default-transition);
}
.gamepad-previous-btn:hover {
    background-color: #555;
}

.gamepad-desc {
    margin-top: 20px;
    height: 180px;
    width: fit-content;
    max-width: 400px;
    padding: 17px;
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