import Mohit_Jain_Resume from "/Mohit_Jain_Resume.pdf";
import Fulton_Internship_Program_Appreciation_Certificate_Spring_2025 from "/Fulton_Internship_Program_Appreciation_Certificate_Spring_2025.pdf";

export const useDocumentStore = defineStore("document-store", () => {
    const route = useRoute();
    const ttsAvailable = ref(false);

    /**
     * @type {SpeechSynthesisUtterance} This is the utterance for the speech synthesis.
     */
    var ttsUtterance = null;
    const ttsPlaying = ref(false);

    const ttsIcon = computed(() => {
        return ((ttsAvailable.value && !ttsPlaying.value) ? 'fa-volume-high' : 'fa-volume-xmark');
    });
    const ttsTitle = computed(() => {
        if(!ttsAvailable.value) {
            return "Text To Speech is Not Available.";
        } else if(ttsPlaying.value) {
            return "Stop Playing Message.";
        } else {
            return "Play Your Message!";
        }
    });

    /**
     * This function downloads a document for the visitor to see.
     */
    function downloadDoc() {
        const docIndex = (route.path.includes("resume") ? 0 : 1);
        const DOCUMENTS = [Mohit_Jain_Resume, Fulton_Internship_Program_Appreciation_Certificate_Spring_2025];
        const DOCUMENT_NAMES = ["Mohit_Jain_Resume", "Fulton_Internship_Program_Appreciation_Certificate_Spring_2025"];
    
        const link = document.createElement('a');
        link.href = DOCUMENTS[docIndex];
        link.download = (DOCUMENT_NAMES[docIndex] + '.pdf');
    
        link.click();
        link.remove();
    }

    /**
     * This function mounts a page that hosts a document.
     */
    function mountDocumentPage() {
        initWebData();
        if(route.path.includes("md") || route.path.includes("markdown")) { return; }

        nextTick(() => {
            hideVerticalOverflow();
            window.addEventListener("resize", hideVerticalOverflow);
        });
    }

    /**
     * This function unmounts a page that hosts a document.
     */
    function unmountDocumentPage() {
        document.body.style.overflowY = "";
        window.removeEventListener("resize", hideVerticalOverflow);
    }

    /**
     * This function hides the body's vertical overflow.
     */
    function hideVerticalOverflow() {
        document.body.style.overflowY = "hidden";
    }

    /**
     * This function returns true if the user is using a pdf route.
     */
    function checkPDFRoute() {
        return route.path.includes('pdf');
    }

    /**
     * This function returns when the route is using a markdown file.
     */
    function checkMarkdownRoute() {
        return (route.path.includes('markdown') || route.path.includes('md'));
    }

    /**
     * This sets whether or not speech synthesis is available for this browser.
     */
    function checkTTSAvailable() {
        ttsAvailable.value = ('speechSynthesis' in window);
    }

    /**
     * this function stops TTS from continuing.
     */
    function cancelTTS() {
        if(!ttsAvailable.value) { return; }
        window.speechSynthesis.cancel();
        ttsUtterance = null;
        ttsPlaying.value = false;
    }

    /**
     * This function starts a utterance of the current text.
     * @param {String} text The text for the utterance.
     */
    function startTTS(text = "") {
        if(!ttsAvailable.value) { return; }
        cancelTTS();
        ttsUtterance = new SpeechSynthesisUtterance(text);

        ttsUtterance.onend = function() { cancelTTS(); };
        ttsUtterance.onerror = function() { cancelTTS(); };

        window.speechSynthesis.speak(ttsUtterance);
        ttsPlaying.value = true;
    }

    return { ttsAvailable, ttsPlaying, ttsIcon, ttsTitle,
        checkTTSAvailable, cancelTTS, startTTS, downloadDoc,
        hideVerticalOverflow, checkPDFRoute, checkMarkdownRoute,
        mountDocumentPage, unmountDocumentPage
    }
});