export const useFullScreenStore = defineStore("screen-store", () => {
    const fullScreenSet = ref(false);
    const faIcon = computed(() => { return (fullScreenSet.value ? 'fa-compress' : 'fa-expand'); });
    const elementTitle = computed(() => { return (fullScreenSet.value ? 'Exit Full Screen' : 'Full Screen'); });
    const docElementTitle = computed(() => { return (fullScreenSet.value ? "Shrink Document" : "Expand Document"); });

    /**
     * This function sets whether a specific element takes up the whole screen or not.
     * @param {HTMLElement} element The element to expand to full screen.
     */
    function setFullScreen(element = new HTMLElement()) {
        const fullScreenInactive = !fullScreenSet.value;
        try {
            if((element.requestFullscreen != undefined) && fullScreenInactive) {
                element.requestFullscreen();
            } else if((element.webkitRequestFullscreen != undefined) && fullScreenInactive) {
                element.webkitRequestFullscreen();
            } else if((element.mozRequestFullscreen != undefined) && fullScreenInactive) {
                element.mozRequestFullscreen();
            } else if((element.msRequestFullscreen != undefined) && fullScreenInactive) {
                element.msRequestFullscreen();
            } else if(!fullScreenInactive) {
                exitFullScreen();
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

    return { fullScreenSet, faIcon, elementTitle, docElementTitle,
        setFullScreen, setFullScreenStatus, exitFullScreen
    }
});