<template>
<div id="google-mockup-page" :class="['personal-web-body', (isDarkMode ? 'dark-mode' : '')]">
    <div class="gMockup-center">
        <template v-if="!directionsOpen">
            <h1 class="gMockup-title animate__animated animate__bounceIn"> Google </h1>
            <input type="text" id="search" v-model="gSearchInput" class="gMockup-search-bar animate__animated animate__bounceIn" placeholder="Search Google or type a URL" />

            <div class="gMockup-main-buttons">
                <button @click="searchOnGoogle()" class="gMockup-search-btn animate__animated animate__bounceIn"> Google Search </button>
                <RouterLink to="/skills/#google" class="gMockup-search-btn animate__animated animate__bounceIn">
                    <span style="margin-right: 5px;"> See My Skills </span>
                    <FontAwesomeIcon icon="fa-code" />
                </RouterLink>
            </div>
        </template>
        <template v-if="directionsOpen">
            <ContentRenderer id="directions" class="markdown-body animate__animated animate__fadeIn" v-if="home" :value="home" />
            <button @click="toggleDirections()" class="gMockup-directions-btn animate__animated animate__bounceIn"> Close Directions </button>
        </template>
    </div>

    <footer class="gMockup-bottom-bar">
        <button @click="toggleDirections()">
            <span> {{ ((directionsOpen ? 'Close' : 'Open') + ' Directions') }} </span>
        </button>
        <button @click="toggleDarkMode()" :title="(isDarkMode ? 'Switch To Light Mode' : 'Switch To Dark Mode')">
            <span> {{ ('Dark Mode: ' + (isDarkMode ? 'On' : 'Off')) }} </span>
            <FontAwesomeIcon :icon="(isDarkMode ? 'fa-moon' : 'fa-sun')" />
        </button>
    </footer>
</div>
</template>

<script setup>
const router = useRouter();
const gSearchInput = ref("");

const isDarkMode = ref(false);
const directionsOpen = computed(() => { return (router.currentRoute.value.hash === "#directions"); });
const { data: home } = await useAsyncData(() => queryCollection('content').path('/google-mockup-directions').first());

onMountedAdvanced(() => {
    if((typeof window !== 'undefined') && (typeof window.matchMedia === 'function')) {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches) { toggleDarkMode(); }
    }
});

/** This function toggles whether the page is in dark mode or not. */
function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
}

/** This function toggles whether the directions for the assignments are open or not. */
function toggleDirections() {
    router.push({ path: router.currentRoute.value.path, hash: (directionsOpen.value ? '' : '#directions') });
}

/** This function opens up Google.com to search up something the visitor wants. */
function searchOnGoogle() {
    if(gSearchInput.value === "") { return; }
    window.open(`https://www.google.com/search?q=${encodeURIComponent(gSearchInput.value)}`, "_blank"); 
}

useHead(getMeta("Mohit Jain | Google Mockup", "google-mockup",
    "This is a simple project I give to new frontend developers to introduce them to Vue.js development.",
    "#FFFFFF"
));
</script>

<style scoped lang="scss">
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
    min-height: calc(var(--true-100vh, 100vh) - 100px);
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
    width: 80%;
    max-width: 600px;
    height: 32px;
    border: 1px solid #3670ee;
    background: white;
    color: #121212;
    padding: 10px;
    font-size: 16px;
    vertical-align: middle;
    border-radius: 24px;
}
.dark-mode .gMockup-search-bar {
    border: 2px solid #a5a5a5;
    background: #3d3d3d;
    color: #e0e0e0;
}

.gMockup-main-buttons {
    height: fit-content;
    width: fit-content;
    margin-top: 25px;
    margin-bottom: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 10px;
}

.gMockup-search-btn {
    height: fit-content;
    width: fit-content;
    padding: 10px;
    color: #121212;
    background-color: #dededf;
    border: var(--thin-empty-border);
    border-radius: 10px;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    transition: var(--default-transition);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
.gMockup-search-btn:hover {
    box-shadow: 0px 0px 10px gray;
    border-color: #3670ee;
}

.dark-mode .gMockup-search-btn {
    color: #f8f9fa;
    background-color: #303134;
}
.dark-mode .gMockup-search-btn:hover {
    box-shadow: 0px 0px 10px gray;
    border-color: #f8f9fa;
}

.gMockup-bottom-bar {
    position: relative;
    width: 100%;
    height: 40px;
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
    margin: 0px 15px;
    font-size: 15px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    color: #333;
    user-select: none;
    padding: 5px;
    border-radius: 10px;
    transition: var(--default-transition);
}
.dark-mode .gMockup-bottom-bar button {
    color: #ebebeb;
}
.gMockup-bottom-bar button svg {
    margin-left: 5px;
}

.gMockup-bottom-bar button:hover {
    background-color: #12121230;
}
.dark-mode .gMockup-bottom-bar button:hover {
    background-color: #e0e0e060;
}

#directions {
    margin: 0px;
    margin-top: 30px;
    border: 2px solid #3d3d3d;
    background-color: lightgray;
    scroll-margin-top: apply-zoom-factor(70);
}
.dark-mode #directions {
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

@include dynamic-less-equal-width-rule(500) {
    .gMockup-title { font-size: 70px; }
}
</style>