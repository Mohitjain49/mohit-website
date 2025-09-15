<script setup>
const isDarkMode = ref(false);
onMounted(() => { initWebData(); });

/**
 * This function toggles whether the page is in dark mode or not.
 */
function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
}

useHead(getMeta("Mohit Jain | Google Mockup", "google-mockup",
    "This is a simple project I give to new frontend developers to introduce them to Vue.js development."
));
</script>

<template>
<div id="google-mockup-page" :class="['personal-web-body', (isDarkMode ? 'dark-mode' : '')]">
    <div class="gMockup-center">
        <h1 class="gMockup-title"> Google </h1>
        <input type="text" id="search" class="gMockup-search-bar" placeholder="Search Google or type a URL" />
    </div>

    <footer class="bottom-bar">
        <div class="bottom-content">
            <button> Directions </button>
            <button @click="toggleDarkMode()">Settings</button>
        </div>
    </footer>
</div>
</template>

<style scoped>
#google-mockup-page {
    background-color: white;
    color: #121212;
    height: calc(100% - 60px);
    min-height: calc(100% - 60px);
}
#google-mockup-page.dark-mode {
    background-color: #121212;
    color: #e0e0e0;
}

.gMockup-center {
    height: calc(100% - 50px);
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

.dark-mode .search-bar {
  background: #222;
  color: #e0e0e0;
  border-color: #444;
}

.subheadings {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.subheadingsLeft {
  display: flex;
  gap: 20px;
  padding: 24px;
}

.subheadingsRight {
  display: flex;
  gap: 20px;
  align-items: center;
  padding-right: 24px;
}

/* Bottom Bar styles */
.bottom-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  border-top: none;
  box-shadow: none;
  background-color: #e0e0e0;
  z-index: 100;
  transition: background-color 0.3s, color 0.3s;
}

.bottom-content {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #e0e0e0;
    border-top: none;
    box-shadow: none;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.bottom-bar,
.bottom-content {
  border-top: none !important;
  box-shadow: none !important;
  background-color: #e0e0e0;
  margin: 0;
  padding: 0;
}


.dark-mode .bottom-bar,
.dark-mode .bottom-content {
  background-color: #222 !important;
  color: #e7d9d9 !important;
  border-top: none !important;
  box-shadow: none !important;
}

.bottom-bar button {
    margin: 0px 10px;
    font-size: 14px;
    color: #333;
}

.dark-mode .bottom-bar button {
  color: #ebebeb; /*WHERE PROBLEM WAS I HATE THIS STUPID LINE OF CODE, IT MADE ME LOSE 2 HOURS OF MY LIFE*/
}
footer {
  border-top: none !important;
  box-shadow: none !important;
  background: transparent !important;
  margin: 0 !important;
  padding: 0 !important;
}

.dark-mode footer {
  border-top: none !important;
  box-shadow: none !important;
  background: transparent !important;
  margin: 0 !important;
  padding: 0 !important;
}

</style>