<style scoped lang="scss">
@use "~/styles/navmenu";
</style>

<template>
<WebCover v-if="(webData.resumeMenuOpen && fullScreenStore.fullScreenSet)" />
<Transition :name="webData.websiteMenuTransition">
    <div v-show="webData.resumeMenuOpen" class="mohit-navMenu" id="mohit-resumeMenu" ref="resumeMenu">
        <MenuTop />

        <div v-for="(checkbox, index) in resumeOptions" class="mohit-navMenu-opt checkbox-opt" :style="getColorStyles(checkbox.color)">
            <button class="mohit-navMenu-checkbox" @click="toggleResumeOption(index)">
                <div class="mohit-navMenu-checkbox-label">
                    <font-awesome-icon :icon="checkbox.faIcon" />
                    <span> {{ checkbox.title }} </span>
                </div>
                <div :class="['mohit-navMenu-checkbox-box', (checkbox.status ? 'checked' : '')]">
                    <Transition name="navMenu-checkbox-fade-transition" appear>
                        <font-awesome-icon v-if="checkbox.status" icon="fa-check" />
                    </Transition>
                </div>
            </button>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div v-if="newResumeState" class="mohit-navMenu-opt" :style="getColorStyles('#03ad03')">
            <button class="mohit-navMenu-mainOpt" @click="editResumeState()" pulse-loop>
                <font-awesome-icon icon="fa-file-pen" />
                <span> Modify My Resume! </span>
            </button>
        </div>
        <div v-if="documentStore.onDocumentRoute" class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(3)" pulse-loop>
                <font-awesome-icon icon="fa-file-export" />
                <span> Back To Document Options </span>
            </button>
        </div>
    </div>
</Transition>
</template>

<script setup>
const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();
const documentStore = useDocumentStore();

const resumeOptions = ref([
    { name: "qrcode", title: "Add QR Code", faIcon: "fa-qrcode", color: 'var(--blue-one)', status: false },
    { name: "remove-links", title: "Remove Hyperlinks", faIcon: "fa-link-slash", color: 'var(--blue-three)', status: false },
    { name: "flatten-font", title: "Flatten Font To Black", faIcon: "fa-square-pen", color: 'white', status: false }
]);
const newResumeState = ref(false);

function toggleResumeOption(index = 0) {
    resumeOptions.value[index].status = !resumeOptions.value[index].status;
}

/** This function edits the current resume that the viewer sees. */
function editResumeState() {
    webData.closeNavMenu();
}

const resumeMenu = shallowRef(null);
usePulseLoopAnimation(resumeMenu);
useWebsiteMenuUtility(resumeMenu);
</script>