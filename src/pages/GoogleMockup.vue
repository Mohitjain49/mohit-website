<template>
<div id="google-mockup-page" :class="['personal-web-body', (isDarkMode ? 'dark-mode' : '')]">
    <div class="gMockup-center">
        <template v-if="!directionsOpen">
            <h1 class="gMockup-title"> Google </h1>
            <input type="text" id="search" class="gMockup-search-bar" placeholder="Search Google or type a URL" />
        </template>
        <template v-if="directionsOpen">
            <GoogleMockupAssignmentComponent class="gMockup-directions" />
            <button @click="toggleDirections()" class="gMockup-directions-btn"> Close Directions </button>
        </template>
    </div>

    <footer class="gMockup-bottom-bar">
        <button @click="toggleDirections()"> Directions </button>
        <button @click="toggleDarkMode()"> Settings </button>
    </footer>
</div>
</template>

<script setup>
const isDarkMode = ref(false);
const directionsOpen = ref(false);
onMounted(() => { initWebData(); });

/**
 * This function toggles whether the page is in dark mode or not.
 */
function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
}

function toggleDirections() {
    directionsOpen.value = !directionsOpen.value;
}

useHead(getMeta("Mohit Jain | Google Mockup", "google-mockup",
    "This is a simple project I give to new frontend developers to introduce them to Vue.js development."
));
</script>

<style scoped>
#google-mockup-page {
    background-color: white;
    color: #121212;
    height: fit-content;
    min-height: calc(100% - 60px);
}
#google-mockup-page.dark-mode {
    background-color: #121212;
    color: #e0e0e0;
}

.gMockup-center {
    height: fit-content;
    min-height: calc(100vh - 110px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.gMockup-title {
    color: #3670ee;
    font-size: 80px;
    margin-bottom: 20px;
    font-family: 'Monserrat', sans-serif;
}
.dark-mode .gMockup-title {
    color: #e0e0e0 !important;
}

.gMockup-search-bar {
    width: 600px;
    height: 32px;
    border: 1px solid #3670ee;
    background: white;
    color: #121212;
    padding: 10px;
    font-size: 16px;
    vertical-align: middle;
    border-radius: 24px;
    margin-bottom: 60px;
}
.dark-mode .gMockup-search-bar {
    border: 2px solid #a5a5a5;
    background: #3d3d3d;
    color: #e0e0e0;
}

.gMockup-bottom-bar {
    position: relative;
    width: 100%;
    height: 50px;
    background-color: #e0e0e0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.dark-mode .gMockup-bottom-bar {
    background-color: #222 !important;
    color: #e7d9d9 !important;
    border-top: none !important;
    box-shadow: none !important;
}

.gMockup-bottom-bar button {
    margin: 0px 20px;
    font-size: 19px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    color: #333;
    user-select: none;
}
.dark-mode .gMockup-bottom-bar button {
    color: #ebebeb;
}

.gMockup-directions {
    margin: 0px;
    margin-top: 30px;
    border: 2px solid #3d3d3d;
    background-color: lightgray;
}
.dark-mode .gMockup-directions {
    border-color: transparent;
    background-color: white;
}

.gMockup-directions-btn {
    height: fit-content;
    width: fit-content;
    margin-top: 15px;
    margin-bottom: 30px;
    padding: 10px;
    color: red;
    background-color: lightgray;
    border: 2px solid;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    transition: var(--default-transition);
}
.gMockup-directions-btn:hover {
    background-color: #fad8d8;
    box-shadow: 0px 0px 10px red;
}
</style>