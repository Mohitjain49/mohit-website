import click_sound from "@/assets/sounds/click_sound_effect.mp3";
import scan_sound from "@/assets/sounds/scan_sound_effect.mp3";

export const useAudioStore = defineStore("audio-store", () => {
    const CLICK_VOLUME_KEY = "mohit-audio-clickVolume";
    const CLICK_VOLUME_MUTED_KEY = "mohit-audio-clickVolume-muted";

    const webData = useWebsiteDataStore();
    var volumeGamepadMenuTimeout = null;

    /** @type {Ref<HTMLAudioElement>} This is an audio reference variable for the click sound effect. */
    const audioClickClip = ref(null);

    /** @type {Ref<HTMLAudioElement>} This is an audio reference variable for the scan sound effect. */
    const audioScanClip = ref(null);

    const showVolumeGamepadMenu = ref(false);
    const volumeChangingWithGamepad = ref(false);

    const volumeInput = ref("50");
    const audioMuted = ref(false);

    const volumeInputIcon = computed(() => {
        const volumeInt = parseInt(volumeInput.value);
        if(audioMuted.value) { return "fa-volume-xmark"; }
        return ((volumeInt == 0) ? 'fa-volume-off' : ((volumeInt < 50) ? "fa-volume-low" : "fa-volume-high"));
    });
    const volumeInputTitle = computed(() => {
        return (audioMuted.value ? 'Unmute Volume' : "Mute Volume");
    });

    /** @type {SpeechSynthesisUtterance | null} This is the utterance for the speech synthesis. */
    var ttsUtterance = null;
    const ttsAvailable = ref(false);
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

    const sttUtility = useSpeechRecognition({ lang: "en-US", interimResults: false });
    var sttUpdateFunc = (result) => {}

    const sttUtilityIcon = computed(() => {
        const boolean = (sttUtility.isSupported.value && !sttUtility.isListening.value);
        return (boolean ? "fa-microphone" : "fa-microphone-slash");
    });
    const sttUtilityTitle = computed(() => {
        if(!sttUtility.isSupported.value) {
            return "Speech To Text is Not Available.";
        } else if(sttUtility.isListening.value) {
            return "Deactivate Speech To Text.";
        } else {
            return "Activate Speech To Text!";
        }
    });

    // This runs the update function whenever the speech to text mode gets a new value.
    watch(sttUtility.result, () => { sttUpdateFunc(sttUtility.result.value); });

    watch(volumeChangingWithGamepad, () => {
        if(volumeGamepadMenuTimeout != null) { clearTimeout(volumeGamepadMenuTimeout); }
        if(volumeChangingWithGamepad.value) {
            showVolumeGamepadMenu.value = true;
        } else {
            volumeGamepadMenuTimeout = setTimeout(() => { showVolumeGamepadMenu.value = false; }, 1000);
        }
    });

    /**
     * This function sets up the click audio for my website.
     */
    function setupClickAudio() {
        checkTTSAvailable();
        audioClickClip.value = new Audio(click_sound);
        audioClickClip.value.preload = "auto";

        audioScanClip.value = new Audio(scan_sound);
        audioScanClip.value.preload = "auto";

        const audioClipVolume = localStorage.getItem(CLICK_VOLUME_KEY);
        const audioVolumeMuted = localStorage.getItem(CLICK_VOLUME_MUTED_KEY);

        volumeInput.value = ((audioClipVolume === null) ? "50" : audioClipVolume);
        audioMuted.value = ((audioVolumeMuted === null) ? false : JSON.parse(audioVolumeMuted));
        changeAudioVolume();
    }

    /**
     * This function changes the audio volume based on the "volumeInput" variable.
     */
    function changeAudioVolume() {
        localStorage.setItem(CLICK_VOLUME_KEY, volumeInput.value);
        const newVolume = (parseInt(volumeInput.value) / 100);

        audioClickClip.value.volume = newVolume;
        audioScanClip.value.volume = newVolume;
    }

    /**
     * This function sets the new status of whether click sounds should be muted or not for the website.
     * @param {"toggle" | Boolean} status The new status of whether to mute the audio or not.
     */
    function setAudioMuted(status = "toggle") {
        audioMuted.value = ((status === "toggle") ? !audioMuted.value : status);
        localStorage.setItem(CLICK_VOLUME_MUTED_KEY, JSON.stringify(audioMuted.value));
    }

    /**
     * This function confirms whether a click should trigger the click sound or not.
     * @param {MouseEvent} event The click event.
     */
    function confirmClickSound(event) {
        if(event.type !== "click" && event.isTrusted) { return; }
        const foundElement = event.target;

        const usuableLink = foundElement?.closest('a');
        const usuableButton = foundElement?.closest('button');
        if(usuableLink || usuableButton) { playClickSound(); }
    }

    /**
     * This function plays the click sound effect.
     */
    function playClickSound() {
        if(audioMuted.value) { return; }
        try {
            audioClickClip.value.currentTime = 0;
            audioClickClip.value.play();
        } catch(e) {}
    }

    /**
     * This function plays the scan sound effect.
     */
    function playScanSound() {
        if(audioMuted.value) { return; }
        try {
            audioScanClip.value.currentTime = 0;
            audioScanClip.value.play();
        } catch(e) {}
    }

    /**
     * This function adds a passed in value to the total volume.
     * @param {Number} amount the amount to add to the volume.
     */
    function addToVolume(amount = 1) {
        volumeChangingWithGamepad.value = (!webData.navMenuOpen);
        const volumeInt = (parseInt(volumeInput.value) + amount);
        volumeInput.value = String(Math.max(0, Math.min(100, volumeInt)));
        changeAudioVolume();
    }

    /**
     * This sets whether or not speech synthesis is available for this browser.
     */
    function checkTTSAvailable() {
        ttsAvailable.value = ('speechSynthesis' in window);
    }

    /**
     * This function toggles between whether the speech synthesis is playing or not.
     * @param {String} msg The text for the utterance.
     */
    function manageTTS(msg = "") {
        if(ttsPlaying.value) {
            cancelTTS();
        } else {
            startTTS(msg);
        }
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

    /**
     * This manages whether the website has activated speech to text mode.
     * @param updateFunc A function that will take in the result of the speech recognition as a parameter.
     */
    function manageSTT() {
        if(sttUtility.isListening.value) {
            sttUtility.stop();
        } else {
            sttUtility.start();
        }
    }

    /**
     * This function changes the update function for the speech to text mode.
     * @param updateFunc A function that will take in the result of the speech recognition as a parameter.
     */
    function changeSTTUpdateFunc(updateFunc = (str) => {}) {
        sttUpdateFunc = updateFunc;
    }

    return { audioClickClip, audioScanClip, audioMuted, volumeInput, volumeInputIcon, volumeInputTitle,
        showVolumeGamepadMenu, volumeChangingWithGamepad, ttsAvailable, ttsPlaying, ttsIcon, ttsTitle,
        sttUtility, sttUtilityIcon, sttUtilityTitle, manageSTT, changeSTTUpdateFunc,
        checkTTSAvailable, manageTTS, cancelTTS, startTTS, setupClickAudio, changeAudioVolume, confirmClickSound,
        addToVolume, setAudioMuted, playClickSound, playScanSound
    }
});

/** This function triggers the click sound effect. */
export function triggerClickSound() { useAudioStore().playClickSound(); }

/** This function triggers the scan sound effect. */
export function triggerScanSound() { useAudioStore().playScanSound(); }