<style scoped lang="scss">
@use "~/styles/navmenu";
</style>

<template>
<!-- <WebCover v-if="(resumeMenuOpen && fullScreenSet)" /> -->
<Transition :name="webData.websiteMenuTransition">
    <div v-show="resumeMenuOpen" class="mohit-navMenu flame" id="mohit-resumeMenu" ref="resumeMenu">
        <MenuTop />

        <div class="mohit-navMenu-sectionheader" :style="getColorStyles('var(--website-light-text)')">
            <span> Options </span>
            <font-awesome-icon icon="fa-gear" />
        </div>
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

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="setAllResumeOptions(!allSelected)" pulse-loop>
                <font-awesome-icon :icon="(allSelected ? 'fa-rotate-left' : 'fa-check-to-slot')" />
                <span> {{ (allSelected ? 'Clear All Options' : 'Select All Options') }} </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(3)" pulse-loop>
                <font-awesome-icon icon="fa-file-export" />
                <span> Back To Document Options </span>
            </button>
        </div>

        <div v-if="(newResumeState || resumeStore.queryOutOfSync)" class="mohit-navMenu-opt-break"></div>
        <div v-if="resumeStore.queryOutOfSync" class="mohit-navMenu-opt">
            <button class="mohit-navMenu-mainOpt" pulse-loop
                @click="() => { reloadNuxtApp({ force: true }); }"
                :style="getColorStyles('var(--blue-one)')">

                <font-awesome-icon icon="fa-rotate-right" />
                <span> Reload Webpage </span>
            </button>
        </div>
        <div v-if="newResumeState" class="mohit-navMenu-opt" :style="getColorStyles('#03ad03')">
            <button class="mohit-navMenu-mainOpt" @click="editResumeState()" pulse-loop>
                <font-awesome-icon icon="fa-file-pen" />
                <span> Modify My Resume! </span>
            </button>
        </div>
    </div>
</Transition>
</template>

<script setup>
const webData = useWebsiteDataStore();
const resumeStore = useResumeStore();
const { resumeMenuOpen } = storeToRefs(webData);

const resumeOptions = ref([
    { name: "qrcode", title: "Add QR Code", faIcon: "fa-qrcode", color: 'var(--blue-one)', status: false },
    { name: "remove-links", title: "Remove Hyperlinks", faIcon: "fa-link-slash", color: 'var(--blue-three)', status: false },
]);
const newResumeState = computed(() => {
    if(resumeOptions.value[0].status !== resumeStore.qrcodeAdded) { return true; }
    if(resumeOptions.value[1].status !== resumeStore.linksRemoved) { return true; }
    return false;
});
const allSelected = computed(() => { return (-1 == resumeOptions.value.findIndex((item) => { return !item.status; })); });

// This makes sure that the initial resume menu status is set every time the visitor opens it.
onMounted(() => { setInitResumeMenuStatus(); });
watch(resumeMenuOpen, () => { if(resumeMenuOpen.value) { setInitResumeMenuStatus(); }});

/**
 * This function toggles whether an option to modify te rendered resume should be made or not.
 * @param {Number} index The index of the option to toggle.
 */
function toggleResumeOption(index = 0) {
    resumeOptions.value[index].status = !resumeOptions.value[index].status;
}

/** This function edits the current resume that the viewer sees. */
async function editResumeState() {
    await resumeStore.resetBlob({
        addQrcode: resumeOptions.value[0].status,
        removeLinks: resumeOptions.value[1].status
    });
    webData.closeNavMenu();
}

/** This function sets the initial state of the resume menu options available to the user. */
function setInitResumeMenuStatus() {
    try {
        resumeOptions.value[0].status = resumeStore.qrcodeAdded;
        resumeOptions.value[1].status = resumeStore.linksRemoved;
    } catch(e) {}
}

/**
 * This function sets all the customization options that can be applied to the resume.
 * @param {Boolean} status The new status of the resume menu.
 */
function setAllResumeOptions(status = true) {
    for(let i = 0; i < resumeOptions.value.length; i++) {
        resumeOptions.value[i].status = status;
    }
}

const resumeMenu = shallowRef(null);
usePulseLoopAnimation(resumeMenu);
useWebsiteMenuUtility(resumeMenu);
</script>