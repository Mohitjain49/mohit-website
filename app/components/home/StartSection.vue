<template>
<div id="start" class="start-section">
    <div id="start-innerContainer" ref="startContent">
        <div class="start-section-title">Mohit Jain</div>
        <div class="start-section-subtitle">
            Lead Software Developer At 
            <span> <RouterLink class="ivue-subtitle" to="/#ivue" title="See what I worked on at iVue!"> iVue </RouterLink> </span>
        </div>
        <div class="start-section-subtitle">
            Co-creator of <span><a :href="WORLDS_IVUE_LINK" class="wiv-subtitle">Worlds iVue</a></span>
        </div>

        <div class="start-buttonRow main">
            <RouterLink v-for="link in MAIN_BTNS" :to="link.path" :title="link.title"
                class="start-buttonRow-btn inner-path"
                :style="getSpecialBtnStyles(link.color)">

                <font-awesome-icon :icon="link.icon" />
                <div class="start-btn-caption"> {{ link.shortTitle }} </div>
            </RouterLink>
        </div>
        <div class="start-buttonRow contact-links" ref="startSocialsContainer">
            <template v-for="(contact, index) in SOCIALS">
                <div class="start-buttonRow-btn-container" v-if="(index != 2 && index != 4)" :style="getColorStyles(contact.color)">
                    <a v-if="!isMounted" :href="contact.link" class="start-buttonRow-btn"
                        :title="((index == 0) ? contact.name : ('My ' + contact.name + ' Profile'))"
                        :style="getSpecialBtnStyles(contact.color)">

                        <font-awesome-icon :icon="contact.linkIcon" />
                    </a>
                    <button v-else class="start-buttonRow-btn"
                        :title="((index == 0) ? contact.name : ('My ' + contact.name + ' Profile'))"
                        :style="getSpecialBtnStyles(contact.color)"
                        @click="(event) => onContactBtnClick(event, contact)"
                        @dblclick="shareContactLink(contact.link)">

                        <font-awesome-icon :icon="contact.linkIcon" />
                    </button>

                    <Transition name="fade-transition">
                        <div v-if="(startContactObj === contact.id)" class="start-contactBtn-dropdown" :style="getContactDropdownStyles(contact.color)">
                            <button class="start-contactBtn-dropdown-button top" @click="shareContactLink(contact.link)" :title="contact.shareBtn">
                                Share <FontAwesomeIcon icon="fa-share-from-square" />
                            </button>
                            <RouterLink class="start-contactBtn-dropdown-button" :to="('/contact/#' + contact.id)" title="Go To Contact Page">
                                Go To Contact Page <FontAwesomeIcon icon="fa-link" />
                            </RouterLink>
                            <a :href="contact.link" :title="contact.linkBtn"
                                :target="(contact.link.startsWith('mailto:') ? '_blank' : '_self')"
                                class="start-contactBtn-dropdown-button bottom">

                                {{ ((contact.linkBtn === 'Send Email') ? 'Send Me An Email' : ('Go To My ' + contact.name)) }}
                                <FontAwesomeIcon icon="fa-up-right-from-square" />
                            </a>
                        </div>
                    </Transition>
                </div>
            </template>
        </div>
    </div>
</div>
</template>

<script setup>
const webData = useWebsiteDataStore();
const visitorLeftPage = usePageLeave();
const router = useRouter();

const startContent = ref(null);
const startSocialsContainer = ref(null);
const startContactObj = ref("");

useIntersectionObserver(startContent, ([{ isIntersecting }]) => { setNameTransitions(isIntersecting); });
watch(visitorLeftPage, (newValue) => { if(newValue) { hideStartContactDropdown(); } });
const isMounted = onMountedAdvanced(() => { onClickOutside(startSocialsContainer.value, () => { hideStartContactDropdown(); }); });

/**
 * This function triggers whenever the a button for a social media link is clicked.
 * @param {PointerEvent} event The pointer event from the contact button.
 * @param {{ link: String, id: String }} obj The custom object sent by the contact button.
 */
function onContactBtnClick(event = new PointerEvent('click'), obj) {
    if(event.altKey) {
        shareContactLink(obj.link); // If the Alt key is pressed, the share popup is automatically opened.
    } else if(event.ctrlKey) {
        window.open(obj.link, (obj.link.startsWith("mailto:") ? "_blank" : "_self")) // If the Ctrl key is pressed, the webpage itself is automatically opened.
    } else if(event.shiftKey) {
        router.push('/contact/#' + obj.id); // If the Shift key is pressed, the key opens up the social tab on the contact page for the button.
    } else {
        startContactObj.value = ((startContactObj.value === obj.id) ? "" : obj.id); // If no special key is pressed, this sets the Start Contact Dropdown.
    }
}

/** This function sets the transitions for the left half of the start section. */
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

    if(getMohitInnerWidth() <= 450) {
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
 * This function opens the share popup for a contact link.
 * @param {String} link The Contact Link.
 */
function shareContactLink(link = "") {
    webData.setQRCodePopup(link);
    sleep(100).then(() => { hideStartContactDropdown(); });
}

/** This function hides the contact dropdown on this section. */
function hideStartContactDropdown() { startContactObj.value = ""; }

/** This function returns the styles for a special button. */
function getSpecialBtnStyles(color = "rgb(126, 90, 0)") {
    return { color, borderColor: color, boxShadow: ("0px 0px 10px 1px " + color) }
}

/** This function returns the styles for the contact dropdown. */
function getContactDropdownStyles(color = "rgb(126, 90, 0)") {
    return { color, borderColor: color, "--filter-drop-shadow": "drop-shadow(0px -2px 0px " + color + ")" }
}

const MAIN_BTNS = [
    { path: "/contact/", icon: "fa-paper-plane", color: "var(--website-text)", title: "Contact Me", shortTitle: "Contact" },
    { path: "/skills/", icon: "fa-code", color: "var(--blue-three)", title: "See My Skills", shortTitle: "Skills" },
    { path: "/experience/", icon: "fa-file-code", color: "var(--website-text)", title: "See My Experience", shortTitle: "Exp" },
    { path: "/projects/", icon: "fa-cubes", color: "var(--globe-green-opaque)", title: "See My Projects", shortTitle: "Projects" },
    { path: "/resume/", icon: "fa-file-lines", color: "var(--website-text)", title: "See My Resume", shortTitle: "Resume" },
]
</script>

<style scoped lang="scss">
.start-section {
    position: relative;
    height: 640px;
    min-height: var(--true-100vh, 100vh);
    width: 100%;
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
    font-size: 100px;
    font-weight: bold;
    color: var(--website-text);
    width: 100%;
    height: fit-content;
    margin-bottom: 10px;
    text-shadow: var(--website-text) 1px 0 30px;
}
.start-section-subtitle {
    text-align: center;
    width: 100%;
    font-size: 26px;
    line-height: 35px;
    color: var(--website-text);
    text-shadow: var(--website-text) 1px 0 10px;
}
.start-section-subtitle span {
    position: relative;
    right: 1px;
}

.start-section-subtitle a.ivue-subtitle {
    color: white;
    transition: var(--default-transition);
    padding: 0px 3px;
    padding-bottom: 2px;
    border-radius: 5px;
}
.start-section-subtitle a.wiv-subtitle {
    color: #48A548;
    transition: var(--default-transition);
    padding: 0px 3px;
    padding-bottom: 2px;
    border-radius: 5px;
}
.start-section-subtitle a:hover {
    background-color: rgba(255, 255, 255, 0.175);
}

.start-buttonRow {
    margin-top: 15px;
    width: 640px;
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
    width: 540px;
}

.start-buttonRow-btn {
    cursor: pointer;
    text-decoration: none;
    touch-action: manipulation;
    color: var(--website-text);
    background-color: rgba(0, 0, 0, 1);
    font-size: 27px;
    font-weight: bold;
    padding: 10px;
    width: 33px;
    height: 33px;
    border-radius: 15px;
    border: 2px solid var(--website-text);
    transition: var(--default-transition), scale 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 0px 10px 1px var(--website-text);
}
.start-buttonRow-btn:hover {
    background-color: rgb(39, 39, 39);
    scale: 1.1;
}

.start-buttonRow-btn.inner-path {
    height: 47px !important;
}
.start-btn-caption {
    position: relative;
    top: 4px;
    font-size: 10.5px;
    user-select: none;
}

.start-buttonRow-btn-container {
    position: relative;
    width: fit-content;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
}

.start-contactBtn-dropdown {
    position: absolute;
    height: fit-content;
    width: 150px;
    background-color: #000000;
    top: calc(100% + 15px);
    right: calc(50% - 75px);
    color: white;
    color: inherit;
    border: 2px solid;
    border-color: inherit;
    border-radius: 10px;
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
    height: 30px;
    width: 100%;
    font-size: 11px;
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
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 16px;
    gap: 4px;
}
.start-contactBtn-dropdown-button.bottom {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom: none;
}

@include dynamic-less-equal-width-rule(640) {
    .start-buttonRow.main { width: 100%; }
    .start-buttonRow.contact-links { width: calc(100% - 120px); }
}
@include dynamic-less-equal-width-rule(600) {
    .start-section { height: 450px; }
    .start-btn-caption { font-size: 9.5px; }

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
    .start-contactBtn-dropdown {
        top: calc(75% + 10px);
        scale: 0.75;
    }
}
@include dynamic-less-equal-width-rule(450) {
    .start-section-title {
        font-size: 62px;
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