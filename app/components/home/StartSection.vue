<template>
<div id="start" class="start-section">
    <div :id="START_INNER_CONTAINER_ID" ref="startContent">
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
        <div class="start-buttonRow contact-links">
            <div v-for="(contact, index) in SOCIALS_START" class="start-buttonRow-btn-container" :style="getColorStyles(contact.color)">
                <a v-if="!isMounted" :href="contact.link" class="start-buttonRow-btn"
                    :title="((index == 0) ? contact.name : ('My ' + contact.name + ' Profile'))"
                    :style="getSpecialBtnStyles(contact.color)">

                    <font-awesome-icon :icon="contact.linkIcon" />
                </a>
                <button v-else :class="['start-buttonRow-btn', MAIN_CONTACT_BUTTONS_CLASS]"
                    :title="((index == 0) ? contact.name : ('My ' + contact.name + ' Profile'))"
                    :style="getSpecialBtnStyles(contact.color)"
                    :[CONTACT_BUTTON_INDEX_ATTRIBUTE]="String(index)"
                    :[CONTACT_BUTTON_LINK_ATTRIBUTE]="contact.link"
                    :[CONTACT_BUTTON_ID_ATTRIBUTE]="contact.id">

                    <font-awesome-icon :icon="contact.linkIcon" />
                </button>

                <Transition name="fade-context-menu-transition">
                    <div :id="CONTACT_DROPDOWN_ID" v-if="(startContactObj === contact.id)"
                        :class="['start-contactBtn-dropdown', (contactDropdownShareHover ? 'share-hover' : '')]"
                        :style="getContactDropdownStyles(contact.color)">

                        <button :id="CONTACT_DROPDOWN_SHARE_ID" class="start-contactBtn-dropdown-button"
                            :title="contact.shareBtn"
                            @click="() => { shareContactLink(contact.link); }">

                            <span> Share </span>
                            <FontAwesomeIcon icon="fa-share-from-square" />
                        </button>
                        <RouterLink class="start-contactBtn-dropdown-button"
                            :to="('/contact/#' + contact.id)"
                            title="Go To Contact Page">
                            
                            <span> Go To Contact Page </span>
                            <FontAwesomeIcon icon="fa-link" />
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
        </div>
    </div>
</div>
</template>

<script setup>
const SOCIALS_START = [SOCIALS[0], SOCIALS[1], SOCIALS[2], SOCIALS[4]];
const START_INNER_CONTAINER_ID = "start-innerContainer";
const CONTACT_DROPDOWN_ID = "start-contact-dropdown";
const CONTACT_DROPDOWN_SHARE_ID = "start-contact-dropdown-share";

const MAIN_CONTACT_BUTTONS_CLASS = "mohit-start-buttonRow-contact-button";
const CONTACT_BUTTON_ID_ATTRIBUTE = "mohit-contact-id";
const CONTACT_BUTTON_LINK_ATTRIBUTE = "mohit-contact-link";
const CONTACT_BUTTON_INDEX_ATTRIBUTE = "mohit-contact-array-index";

/** @type {AbortController} This abort controller manages all the events for this component. */
var abortController = null;
var contextMenuTimeout = null;
const isMounted = ref(false);

const webData = useWebsiteDataStore();
const styleStore = useStyleStore();
const router = useRouter();

const startContent = useTemplateRef('startContent');
const startContactObj = ref("");
const contactDropdownShareHover = ref(false);

/** This manages an Raf loop that records whether the user is hovering over the contact dropdown share button or not. */
useRafFn(() => {
    const currentMouseElement = styleStore.mouseElement;
    contactDropdownShareHover.value = (currentMouseElement ? Boolean(currentMouseElement.closest("#" + CONTACT_DROPDOWN_SHARE_ID)) : false);
}, { immediate: true });

// This sets up event listeners that close the contact dropdown when the user clicks outside the dropdown itself or an assoicated button for it.
onMounted(async() => {
    try {
        isMounted.value = true;
        await nextTick();

        abortController = new AbortController();
        const signal = abortController.signal;

        window.addEventListener("pointerdown", (event) => { checkContactDropdownStayVisible(event); }, { signal });
        window.addEventListener("mousedown", (event) => { checkContactDropdownStayVisible(event); }, { signal });
        window.addEventListener("touchstart", (event) => { checkContactDropdownStayVisible(event); }, { signal });

        /** @type {HTMLCollectionOf<HTMLButtonElement>} This is a list of the contact buttons in the start section. */
        const contactButtons = document.getElementsByClassName(MAIN_CONTACT_BUTTONS_CLASS);

        // This sets event listeners for all the contact buttons in the start section.
        for(let i = 0; i < contactButtons.length; i++) {
            const currentContactButton = contactButtons.item(i);
            currentContactButton.addEventListener("click", (event) => { onContactBtnClick(event); }, { signal });
            currentContactButton.addEventListener("contextmenu", (event) => { onContactBtnClick(event); }, { signal });
            currentContactButton.addEventListener("dblclick", (event) => { onContactBtnDblClick(event); }, { signal });
            currentContactButton.addEventListener("keydown", (event) => { onContactBtnKeydown(event); }, { signal });
        }
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
});

onBeforeUnmount(() => { if(abortController != null) { abortController.abort(); }});
useIntersectionObserver(startContent, ([{ isIntersecting }]) => { setNameTransitions(isIntersecting); });

/**
 * Given an element, this closes the open Contact Button Dropdown if the element is not a valid element to click.
 * @param {Event} event The event fired from the window event listener.
 */
function checkContactDropdownStayVisible(event) {
    // console.log(event);
    if(!event || !event.target) { return; }

    /** @type {Element} The element target from the event. */
    const element = event.target;
    const contactDropdownElement = document.getElementById(CONTACT_DROPDOWN_ID);

    if(contactDropdownElement == null || !(contactDropdownElement instanceof Element)) { return; }
    if(contactDropdownElement === element || contactDropdownElement.contains(element) || element.closest(".start-buttonRow-btn")) { return; }
    hideStartContactDropdown();
}

/**
 * This function triggers whenever a button for a social media link is clicked.
 * @param {PointerEvent} event The pointer event from the contact button.
 */
function onContactBtnClick(event) {
    try {
        if(!event || !event.target || (event.pointerId == -1) || !event.type) { return; }
        if(event.type.toLowerCase() === "contextmenu" && event.ctrlKey) { return; }
        const buttonAttributes = getContactButtonAttributes(event.target);

        if(!Boolean(buttonAttributes.id)) { return; }
        event.preventDefault();

        if(event.altKey) {
            if(Boolean(buttonAttributes.link)) { shareContactLink(buttonAttributes.link); }
        } else if(event.ctrlKey) {
            if(Boolean(buttonAttributes.link)) {
                window.open(buttonAttributes.link, (buttonAttributes.link.startsWith("mailto:") ? "_blank" : "_self"));
            }
        } else if(event.shiftKey) {
            router.push('/contact/#' + buttonAttributes.id);
        } else if(startContactObj.value === buttonAttributes.id) {
            hideStartContactDropdown();
            if(contextMenuTimeout != null) { clearTimeout(contextMenuTimeout); }
            contextMenuTimeout = null;

            if(event.type.toLowerCase() === "contextmenu") {
                triggerClickSound();
                contextMenuTimeout = setTimeout(() => {
                    startContactObj.value = buttonAttributes.id;
                    contextMenuTimeout = null;
                }, 100);
            }
        } else {
            if(event.type.toLowerCase() === "contextmenu") { triggerClickSound(); }
            startContactObj.value = buttonAttributes.id;
        }
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
}

/**
 * This function triggers whenever a button for a social media link is clicked.
 * @param {PointerEvent} event The pointer event from the contact button.
 */
function onContactBtnDblClick(event) {
    try {
        if(!event || !event.target) { return; }

        /** @type {Element} The element that the user is clicked on. */
        const element = event.target;
        const buttonElement = element.closest("." + MAIN_CONTACT_BUTTONS_CLASS);

        if(!buttonElement || !(buttonElement instanceof HTMLButtonElement)) { return; }
        const linkAttribute = buttonElement.getAttribute(CONTACT_BUTTON_LINK_ATTRIBUTE);
        if(Boolean(linkAttribute)) { shareContactLink(linkAttribute); }
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
}

/**
 * This function triggers whenever key is pressed down while the user if focusing on a contact button.
 * @param {KeyboardEvent} event The keyboard event from the contact button.
 */
function onContactBtnKeydown(event) {
    try {
        if(!event || !event.target || !event.key) { return; }
        const buttonAttributes = getContactButtonAttributes(event.target);
        if(!Boolean(buttonAttributes.id)) { return; }

        const key = event.key.toLowerCase();
        const noCtrlKey = !event.ctrlKey;
        const noRepeat = !event.repeat;
        var buttonFocusNumber = -1;

        if(key === "enter" && noRepeat) {
            startContactObj.value = ((startContactObj.value === buttonAttributes.id) ? "" : buttonAttributes.id);
            triggerClickSound();
        } else if((key === "arrowup" || key === "w") && noCtrlKey) {
            event.preventDefault();
            hideStartContactDropdown();
        } else if((key === "arrowdown" || key === "s") && noCtrlKey) {
            event.preventDefault();
            startContactObj.value = buttonAttributes.id;
        } else if((key === "arrowleft" || key === "a") && noCtrlKey && noRepeat) {
            buttonFocusNumber = ((buttonAttributes.index <= 0) ? (SOCIALS_START.length - 1) : (buttonAttributes.index - 1));
        } else if((key === "arrowright" || key === "d") && noCtrlKey && noRepeat) {
            buttonFocusNumber = ((buttonAttributes.index >= 3) ? 0 : (buttonAttributes.index + 1));
        }

        if(buttonFocusNumber > -1) {
            event.preventDefault();
            document.getElementsByClassName(MAIN_CONTACT_BUTTONS_CLASS).item(buttonFocusNumber).focus();
            if(startContactObj.value !== "") { startContactObj.value = SOCIALS_START[buttonFocusNumber].id; }
        }
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
}

/**
 * This function returns all the custom attributes from a contact button.
 * @param {Element} eventTarget The event target from interacting with the button.
 */
function getContactButtonAttributes(eventTarget = null) {
    if(!eventTarget) { return; }
    const buttonElement = eventTarget.closest("." + MAIN_CONTACT_BUTTONS_CLASS);

    if(!buttonElement || !(buttonElement instanceof HTMLButtonElement)) {
        return { link: null, id: null, index: NaN }
    } else {
        return {
            link: buttonElement.getAttribute(CONTACT_BUTTON_LINK_ATTRIBUTE),
            id: buttonElement.getAttribute(CONTACT_BUTTON_ID_ATTRIBUTE),
            index: Number(buttonElement.getAttribute(CONTACT_BUTTON_INDEX_ATTRIBUTE))
        }
    }
}

/** This function sets the transitions for the left half of the start section. */
function setNameTransitions(isVisible) {
    if(!isVisible) {
        hideStartContactDropdown();
        document.getElementById(START_INNER_CONTAINER_ID)?.classList.remove("animate__animated", "animate__fadeIn");
        document.getElementsByClassName("start-section-title").item(0)?.classList.remove("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName("start-section-subtitle").item(0)?.classList.remove("animate__animated", "animate__lightSpeedInRight");
        document.getElementsByClassName("start-section-subtitle").item(1)?.classList.remove("animate__animated", "animate__lightSpeedInRight");
        document.getElementsByClassName("start-buttonRow").item(0)?.classList.remove("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName("start-buttonRow").item(1)?.classList.remove("animate__animated", "animate__lightSpeedInRight");
        return;
    }

    if(getCssInnerWidth() <= 450) {
        document.getElementById(START_INNER_CONTAINER_ID)?.classList.add("animate__animated", "animate__fadeIn");
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
];
</script>

<style scoped lang="scss">
$width-start-scale: 1280;
$height-start-scale: 775; 

.start-section {
    position: relative;
    height: 640px;
    min-height: var(--true-100vh-safe);
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
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: inherit;
    color: inherit;
    --animate-duration: 1.2s;

    --custom-scale-var: max(1.0,
        min(
            calc(var(--true-100vw-safe) / (#{$width-start-scale} * 1px)),
            calc(var(--true-100vh-safe) / (#{$height-start-scale} * 1px))
        )
    );
    scale: var(--custom-scale-var, 1.0);
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
.start-buttonRow-btn:hover, .start-buttonRow-btn:focus {
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
    transition: opacity 0.5s, color 0.2s !important;
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
    transition: border 0.2s;
}

.start-contactBtn-dropdown.share-hover::before {
    border-color: transparent transparent var(--dark-background) transparent;
}
.start-contactBtn-dropdown.share-hover .start-contactBtn-dropdown-button#start-contact-dropdown-share {
    background-color: var(--dark-background);
    text-shadow: 0px 0px 8px;
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
    border-bottom: 1px solid;
    transition: background-color 0.2s, text-shadow 0.2s;
}
.start-contactBtn-dropdown-button:hover {
    background-color: var(--dark-background);
    text-shadow: 0px 0px 8px;
}

.start-contactBtn-dropdown-button#start-contact-dropdown-share {
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

@include dynamic-less-equal-width-rule-scopedBlock(640) {
    #start-innerContainer { width: 100%; }
    .start-buttonRow.main { width: 100%; }
    .start-buttonRow.contact-links { width: calc(100% - 120px); }
}
@include dynamic-less-equal-width-rule-scopedBlock(600) {
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
        top: calc(75% + 12px);
        scale: 0.75;
    }
}
@include dynamic-less-equal-width-rule-scopedBlock(450) {
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