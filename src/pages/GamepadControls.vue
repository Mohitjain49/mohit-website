<template>
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
                    <tr><td>🅰️/🅱️ Select</td><td>A / B Buttons</td></tr>
                    <tr><td>⬅️ Decrease Cursor Speed</td><td>Left Bumper</td></tr>
                    <tr><td>➡️ Increase Cursor Speed</td><td>Right Bumper</td></tr>
                    <tr><td>📖 Navigation Menu</td><td>+ / -</td></tr>
                </tbody>
            </table>
        </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | Gamepad Controls", "gamepad",
    "These are the gamepad controls on my website."
))
</script>

<style scoped>
.gamepad-controls-body {
    min-height: 525px;
    height: calc(100vh - 60px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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

@media (max-width: 500px) {
    .gamepad-controls {
        width: 300px;
        padding: 20px;
    }
    .gamepad-controls h2 {
        font-size: 26px;
    }

    .gamepad-controls th, .gamepad-controls td {
        font-size: 12px;
    }
}
</style>