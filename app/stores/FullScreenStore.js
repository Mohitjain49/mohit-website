export const useFullScreenStore = defineStore("screen-store", () => {
    const fullScreenSet = ref(false);
    const faIcon = computed(() => { return (fullScreenSet.value ? 'fa-compress' : 'fa-expand'); });
    const elementTitle = computed(() => { return (fullScreenSet.value ? 'Exit Full Screen' : 'Full Screen'); });

    /**
     * This function sets whether a specific element takes up the whole screen or not.
     * @param {HTMLElement} element The element to expand to full screen.
     */
    async function setFullScreen(element = new HTMLElement()) {
        const fullScreenInactive = !fullScreenSet.value;
        try {
            if((element.requestFullscreen != undefined) && fullScreenInactive) {
                await element.requestFullscreen();
            } else if((element.webkitRequestFullscreen != undefined) && fullScreenInactive) {
                await element.webkitRequestFullscreen();
            } else if((element.mozRequestFullscreen != undefined) && fullScreenInactive) {
                await element.mozRequestFullscreen();
            } else if((element.msRequestFullscreen != undefined) && fullScreenInactive) {
                await element.msRequestFullscreen();
            } else if(!fullScreenInactive) {
                await exitFullScreen();
            }
        } catch(e) {
            console.error(e);
        }
    }

    /**
     * This function returns the status of whether or not the app is in full screen mode.
     */
    function setFullScreenStatus() {
        fullScreenSet.value = (document.fullscreenElement != null);
    }

    /**
     * This function exits the full screen for any element.
     */
    async function exitFullScreen() {
        if(fullScreenSet.value) { return document.exitFullscreen(); }
    }

    return { fullScreenSet, faIcon, elementTitle, setFullScreen, setFullScreenStatus, exitFullScreen }
});

/** This function returns a computed value that returns whether the website is in full screen mode or not. */
export function getFullScreenSet() {
    const { fullScreenSet } = storeToRefs(useFullScreenStore());
    return computed(() => { return fullScreenSet.value });
}