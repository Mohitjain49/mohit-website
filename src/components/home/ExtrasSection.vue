<template>
<div id="extras">
    <div class="extras-title" v-observe-visibility="setCardAnimation"> Extras </div>
    <div v-for="note in EXTRAS_NOTES" class="extras-note-container"
        v-observe-visibility="setCardAnimation">

        <RouterLink :to="note.path" class="extras-note" :class="note.class"
            @mouseenter="setPulseLoopAnimation"
            @mouseleave="setPulseLoopAnimation">

            <div class="extras-note-icon">
                <font-awesome-icon :icon="note.icon" />
            </div>
            <div class="extras-note-label"> {{ note.name }} </div>
        </RouterLink>
    </div>
</div>
</template>

<script setup>
/**
 * This adds a animation to a card/widget as visitors scroll to it.
 */
function setCardAnimation(isVisible, entry) {
    if(!isVisible) { return; }
    entry.target.classList.add("animate__animated", "animate__zoomIn");
    setTimeout(() => { entry.target.classList.remove("animate__animated", "animate__zoomIn"); }, 1000);
}

const EXTRAS_NOTES = [
    { name: "Copyright", path: "/copyright", icon: "fa-copyright", class: "copyright" },
    { name: "My Icons", path: "/icons", icon: "fa-pen-fancy", class: "icons" },
    { name: "QR Codes", path: "/qrcode", icon: "fa-qrcode", class: "qrcode" }
];
</script>

<style scoped>
#extras {
    height: fit-content;
    width: 800px;
    padding: 50px calc(50% - 400px);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
.extras-title {
    text-align: center;
    position: relative;
    font-size: 115px;
    font-weight: bold;
    font-family: 'Lexend', 'sans-serif';
    color: var(--website-text);
    width: 100%;
    height: fit-content;
    margin-bottom: 15px;
    text-shadow: var(--website-text) 1px 0 30px;
    grid-column: span 3;
}

.extras-note-container {
    height: 250px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.extras-note {
    height: 200px;
    width: 200px;
    background-color: var(--dark-background);
    border-radius: 25px;
    border: 3px solid var(--website-light-text);
    color: var(--website-dark-text)
}

.extras-note.copyright {
    color: var(--blue-cobalt);
    border-color: var(--blue-cobalt);
}
.extras-note.icons {
    color: var(--blue-one);
    border-color: var(--blue-one);
}
.extras-note.qrcode {
    color: var(--website-text);
    border-color: var(--website-text);
}

.extras-note-icon {
    width: 100%;
    height: 148px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 115px;
    border-bottom: 2px dotted;
}
.extras-note-label {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 27px;
    font-family: 'Lexend', sans-serif;
}

@media (max-width: 800px) {
    #extras {
        width: calc(100% - 20px);
        padding: 50px 10px;
    }
    .extras-title {
        font-size: 90px;
    }

    .extras-note-container {
        height: 180px;
    }
    .extras-note {
        height: 150px;
        width: 150px;
    }

    .extras-note-icon {
        font-size: 75px;
        height: 108px;
    }
    .extras-note-label {
        font-size: 20px;
        height: 40px;
    }
}
@media (max-width: 600px) {
    .extras-note-container {
        height: 110px;
    }
    .extras-note {
        height: 90px;
        width: 90px;
        border-radius: 15px;
    }

    .extras-note-icon {
        font-size: 42px;
        height: 58px;
    }
    .extras-note-label {
        font-size: 16px;
        height: 30px;
    }
}
</style>