<template>
<div id="start" class="start-section" ref="start">
    <div id="start-innerContainer">
        <div class="start-section-title">Mohit Jain</div>
        <div class="start-section-subtitle">
            Lead Software Developer At <span><a :href="MAIN_IVUE_WEBSITE_LINK" style="color: white;">iVue</a></span>
        </div>
        <div class="start-section-subtitle">
            Co-creator of <span><a :href="WORLDS_IVUE_LINK" style="color: #48A548;">Worlds iVue</a></span>
        </div>

        <div class="start-buttonRow main">
            <RouterLink v-for="link in MAIN_BTNS" :to="link.path"
                class="start-buttonRow-btn inner-path"
                :style="getSpecialBtnStyles(link.color)"
                :title="link.title"
                @pointerenter="setHeartbeatAnimation"
                @mouseleave="setHeartbeatAnimation">

                <font-awesome-icon :icon="link.icon" />
                <div class="start-btn-caption"> {{ link.shortTitle }} </div>
            </RouterLink>
        </div>
        <div class="start-buttonRow contact-links" ref="startSocialsContainer">
            <template v-for="(contact, index) in SOCIALS">
                <button v-if="(index != 2 && index != 4)" class="start-buttonRow-btn"
                    :ref="(el) => {startSocialBtns[index] = ref(el)}"
                    :title="((index == 0) ? contact.name : ('My ' + contact.name + ' Profile'))"
                    :style="getSpecialBtnStyles(contact.color)"
                    @click="(event) => onContactBtnClick(event, contact)"
                    @pointerenter="setHeartbeatAnimation"
                    @mouseleave="setHeartbeatAnimation">

                    <font-awesome-icon :icon="contact.linkIcon" />
                </button>
            </template>
        </div>
    </div>

    <Transition name="fade-transition">
        <div v-if="(startContactObj != null)" class="start-contactBtn-dropdown" :style="dropdownCoords">
            <button class="start-contactBtn-dropdown-button top" @click="webData.setQRCodePopup(startContactObj.link)" :title="startContactObj.shareBtn">
                Share <FontAwesomeIcon icon="fa-share-from-square" />
            </button>
            <RouterLink class="start-contactBtn-dropdown-button" :to="('/contact/#' + startContactObj.id)" title="Go To Contact Page">
                Go To Contact Page <FontAwesomeIcon icon="fa-link" />
            </RouterLink>
            <a :href="startContactObj.link" :target="dropdownLinkTarget" class="start-contactBtn-dropdown-button bottom":title="startContactObj.linkBtn">
                {{ ((startContactObj.linkBtn === 'Send Email') ? 'Send Me An Email' : ('Go To My ' + startContactObj.name)) }}
                <FontAwesomeIcon icon="fa-up-right-from-square" />
            </a>
        </div>
    </Transition>
</div>
</template>

<script setup>
const webData = useWebsiteDataStore();
const visitorLeftPage = usePageLeave();
const startContactObj = ref(null);

const start = ref(null);
const startSocialsContainer = ref(null);
const startSocialBtns = ref([]);
const boxes = ref([]);

useIntersectionObserver(start, ([{ isIntersecting }]) => {
    setNameTransitions(isIntersecting);
});

watch(visitorLeftPage, () => {
    if(visitorLeftPage.value) { hideStartContactDropdown(); }
});

onMounted(() => {
    const emailRect = useElementBounding(startSocialBtns.value[0]);
    const linkedinRect = useElementBounding(startSocialBtns.value[1]);
    const githubRect = useElementBounding(startSocialBtns.value[3]);
    const steamRect = useElementBounding(startSocialBtns.value[5]);
    boxes.value.push(emailRect, linkedinRect, githubRect, steamRect);

    onClickOutside(startSocialsContainer.value, (event) => {
        if(event.target?.closest(".start-contactBtn-dropdown") == null) { hideStartContactDropdown(); }
    });
})

// This states the target for the dropdown link button
const dropdownLinkTarget = computed(() => {
    if(startContactObj.value == null) { return "_blank"; }
    return (startContactObj.value.link.startsWith('mailto:') ? '_blank' : '_self');
});

// This returns custom styles for the contact button dropdown so that it looks unique.
const dropdownCoords = computed(() => {
    if(checkSSR() || startContactObj.value === null) {
        return { left: "0px", top: "0px", color: "white", "--filter-drop-shadow": "drop-shadow(0 -2px 0 white)" }
    }

    /** @type {DOMRectReadOnly} */
    let box = null;
    const id = startContactObj.value.id;
    const color = startContactObj.value.color;

    if(id === "work_email") {
        box = boxes.value[0];
    } else if(id === "linkedin") {
        box = boxes.value[1];
    } else if(id === "github") {
        box = boxes.value[2];
    } else if(id === "steam") {
        box = boxes.value[3];
    }

    const left = (String(((box.right + box.left) / 2) - 77 + window.scrollX) + "px");
    const top = (String(box.top + box.height + 15 + window.scrollY) + "px");
    return { left, top, color, "--filter-drop-shadow": ("drop-shadow(0 -2px 0 " + color + ")") };
});

/**
 * This function triggers whenever the a button for a social media link is clicked.
 * @param {PointerEvent} event The pointer event from the contact button.
 * @param { { link: String } } obj The custom object sent by the contact button.
 */
function onContactBtnClick(event = new PointerEvent('click'), obj) {
    if(event.altKey) {
        webData.setQRCodePopup(obj.link); // If the Alt key is pressed, the share popup is automatically opened.
    } else if(event.ctrlKey) {
        (obj.link, (obj.link.startsWith("mailto:") ? "_blank" : "_self")) // If the Ctrl key is pressed, the webpage itself is automatically opened.
    } else {
        startContactObj.value = ((startContactObj.value?.id === obj.id) ? null : obj); // Sets the Start Contact Dropdown.
    }
}

/**
 * This function sets the transitions for the left half of the start section.
 */
function setNameTransitions(isVisible) {
    if(!isVisible) {
        hideStartContactDropdown();
        document.getElementById("start-innerContainer")?.classList.remove("animate__animated", "animate__fadeIn");
        document.getElementsByClassName("start-section-title").item(0)?.classList.remove("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName("start-section-subtitle").item(0)?.classList.remove("animate__animated", "animate__lightSpeedInRight");
        document.getElementsByClassName("start-section-subtitle").item(1)?.classList.remove("animate__animated", "animate__lightSpeedInRight");
        document.getElementsByClassName("start-buttonRow").item(0)?.classList.remove("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName("start-buttonRow").item(1)?.classList.remove("animate__animated", "animate__lightSpeedInRight");
        return;
    }

    if(window.innerWidth <= 450) {
        document.getElementById("start-innerContainer")?.classList.add("animate__animated", "animate__fadeIn");
    } else {
        document.getElementsByClassName("start-section-title").item(0)?.classList.add("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName("start-section-subtitle").item(0)?.classList.add("animate__animated", "animate__lightSpeedInRight");
        document.getElementsByClassName("start-section-subtitle").item(1)?.classList.add("animate__animated", "animate__lightSpeedInRight");
        document.getElementsByClassName("start-buttonRow").item(0)?.classList.add("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName("start-buttonRow").item(1)?.classList.add("animate__animated", "animate__lightSpeedInRight");
    }
}

/**
 * This function hides the contact dropdown on this section.
 */
function hideStartContactDropdown() {
    startContactObj.value = null;
}

/**
 * This function returns the styles for a special button.
 */
function getSpecialBtnStyles(color = "rgb(126, 90, 0)") {
    return { color, borderColor: color, boxShadow: ("0px 0px 10px 1px " + color) }
}

const MAIN_BTNS = [
    { path: "/contact/", icon: "fa-paper-plane", color: "var(--website-text)", title: "Contact Me", shortTitle: "Contact" },
    { path: "/skills/", icon: "fa-code", color: "var(--blue-three)", title: "See My Skills", shortTitle: "Skills" },
    { path: "/experience/", icon: "fa-file-code", color: "var(--website-text)", title: "See My Experience", shortTitle: "Exp" },
    { path: "/projects/", icon: "fa-cubes", color: "var(--globe-green-opaque)", title: "See My Projects", shortTitle: "Projects" },
    { path: "/resume/", icon: "fa-file-lines", color: "var(--website-text)", title: "See My Resume", shortTitle: "Resume" },
]
</script>

<style scoped>
.start-section {
    position: relative;
    height: 600px;
    min-height: 100vh;
    width: 1200px;
    padding: 0px calc(50% - 600px);
    padding-bottom: 10px;
    color: var(--website-text);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Lexend', 'sans-serif';
}
#start-innerContainer {
    height: fit-content;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: inherit;
    color: inherit;
    --animate-duration: 1.2s;
}

.start-section-title {
    text-align: center;
    position: relative;
    font-size: 115px;
    font-weight: bold;
    color: var(--website-text);
    width: 100%;
    height: fit-content;
    margin-bottom: 15px;
    text-shadow: var(--website-text) 1px 0 30px;
}
.start-section-subtitle {
    text-align: center;
    width: 100%;
    font-size: 27px;
    line-height: 38px;
    color: var(--website-text);
    text-shadow: var(--website-text) 1px 0 10px;
}

.start-section-subtitle a {
    transition: var(--default-transition);
    text-decoration: underline;
    padding: 0px 3px;
    padding-bottom: 3px;
    border-radius: 5px;
}
.start-section-subtitle a:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.start-buttonRow {
    margin-top: 20px;
    width: 700px;
    height: fit-content;
    border-radius: 15px;
    background-color: transparent;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.start-buttonRow.main {
    margin-top: 40px;
}
.start-buttonRow.contact-links {
    width: 580px;
}

.start-buttonRow-btn {
    cursor: pointer;
    text-decoration: none;
    color: var(--website-text);
    background-color: rgba(0, 0, 0, 1);
    font-size: 29px;
    font-weight: bold;
    padding: 10px;
    width: 36px;
    height: 36px;
    border-radius: 15px;
    border: 2px solid var(--website-text);
    transition: var(--default-transition);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 0px 10px 1px var(--website-text);
}
.start-buttonRow-btn:hover {
    background-color: rgb(39, 39, 39);
}

.start-buttonRow-btn.inner-path {
    height: 47px;
}
.start-btn-caption {
    position: relative;
    top: 4px;
    font-size: 10.5px;
    user-select: none;
}

.start-contactBtn-dropdown {
    position: absolute;
    height: fit-content;
    width: 150px;
    background-color: #000000;
    top: 0;
    left: 0;
    color: white;
    border: 2px solid;
    border-radius: 20px;
    transition: left 0.2s, opacity 0.5s, color 0.2s;
    --filter-drop-shadow: drop-shadow(0 -2px 0 white);
}
.start-contactBtn-dropdown::before {
    content: '';
    position: absolute;
    top: -16px;
    left: calc(50% - 7.5px);
    border-width: 9px;
    border-style: solid;
    border-color: transparent transparent black transparent;
    filter: var(--filter-drop-shadow);
}

.start-contactBtn-dropdown-button {
    height: 34px;
    width: 100%;
    font-size: 12.5px;
    color: inherit;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 2.5px;
    border-bottom: 1px dotted;
    transition: background-color 0.2s, text-shadow 0.2s;
}
.start-contactBtn-dropdown-button:hover {
    background-color: var(--dark-background);
    text-shadow: 0px 0px 8px;
}

.start-contactBtn-dropdown-button.top {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    font-size: 16px;
    gap: 4px;
}
.start-contactBtn-dropdown-button.bottom {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-bottom: none;
}

@media (max-width: 1225px) {
    .start-section {
        width: 100%;
        padding: 0px;
        padding-bottom: 10px;
    }
    .start-section-title {
        font-size: 120px;
    }
}
@media (max-width: 800px) {
    .start-section-title {
        font-size: 100px;
    }
    .start-section-subtitle {
        font-size: 26px;
        line-height: 35px;
    }
}
@media (max-width: 700px) {
    .start-buttonRow.main {
        width: 100%;
    }
    .start-buttonRow.contact-links {
        width: calc(100% - 120px)
    }
}
@media (max-width: 600px) {
    .start-section {
        height: 450px;
    }
    .start-section-title {
        font-size: 70px;
        margin-bottom: 10px;
    }
    .start-section-subtitle {
        font-size: 23px;
        line-height: 31px;
    }

    .start-buttonRow.contact-links {
        width: calc(100% - 80px);
    }
    .start-buttonRow-btn {
        width: 28px;
        height: 28px;
        font-size: 23px;
    }
    .start-btn-caption {
        font-size: 9.5px;
    }
}

@media (max-width: 450px) {
    .start-section-title {
        font-size: 56px;
        margin-bottom: 10px;
    }
    .start-section-subtitle {
        font-size: 17px;
        line-height: 23px;
    }
    .start-buttonRow.start-buttonRow.main {
        margin-top: 32px;
    }
}
</style>