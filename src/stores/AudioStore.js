import click_sound from "@/assets/sounds/click_sound_effect.wav";
import scan_sound from "@/assets/sounds/scan_sound_effect.mp3";

export const useAudioStore = defineStore("audio-store", () => {
    const CLICK_VOLUME_KEY = "mohit-audio-clickVolume";
    const webData = useWebsiteDataStore();

    const showVolumeGamepadMenu = ref(false);
    var volumeInterval = null;

    /**
     * @type {import('vue').Ref<HTMLAudioElement>} This is an audio reference variable for the click sound effect.
     */
    const audioClickClip = ref(null);

    /**
     * @type {import('vue').Ref<HTMLAudioElement>} This is an audio reference variable for the scan sound effect.
     */
    const audioScanClip = ref(null);

    const volumeInput = ref("50");
    const volumeInputIcon = computed(() => {
        const volumeInt = parseInt(volumeInput.value);
        return ((volumeInt == 0) ? 'fa-volume-off' : ((volumeInt < 50) ? "fa-volume-low" : "fa-volume-high"));
    })

    /**
     * @type {SpeechSynthesisUtterance | null} This is the utterance for the speech synthesis.
     */
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
        volumeInput.value = ((audioClipVolume === null) ? "50" : audioClipVolume);
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
     * This function removes the saved volume in local storage.
     */
    function removeLocalStorageVolume() {
        localStorage.removeItem(CLICK_VOLUME_KEY);
    }

    /**
     * This function confirms whether a click should trigger the click sound or not.
     * @param {MouseEvent} event The click event
     */
    function confirmClickSound(event) {
        if(event.type !== "click" && event.isTrusted) { return; }
        const foundElement = event.target;

        const usuableLink = foundElement?.closest('a');
        const usuableButton = foundElement?.closest('button');
        if(usuableLink || usuableButton) { playClickSound() }
    }

    /**
     * This function plays the click sound effect.
     */
    function playClickSound() {
        audioClickClip.value.currentTime = 0;
        audioClickClip.value.play();
    }

    /**
     * This function plays the scan sound effect.
     */
    function playScanSound() {
        audioScanClip.value.currentTime = 0;
        audioScanClip.value.play();
    }

    /**
     * This function sets the Volume Interval, which can edit the volume of the click sound every second.
     * @param {Number} amount The amount to add to the volume each interval.
     */
    function setVolumeInterval(amount = 1) {
        if(volumeInterval != null) { return; }
        showVolumeGamepadMenu.value = (!webData.navMenuOpen);

        volumeInterval = setInterval(() => {
            const volumeInt = parseInt(volumeInput.value);
            const stopDecrease = (amount < 0 && volumeInt == 0);
            const stopIncrease = (amount > 0 && volumeInt == 0);

            if(stopDecrease || stopIncrease) { return; }
            volumeInput.value = String(Math.max(0, Math.min(100, volumeInt + amount)));
            changeAudioVolume();
        }, 50);
    }

    /**
     * This function stops the volume interval.
     */
    function stopVolumeInterval() {
        if(volumeInterval == null) { return; }
        showVolumeGamepadMenu.value = false;
        clearInterval(volumeInterval);
        volumeInterval = null;
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

    return { audioClickClip, audioScanClip, volumeInput, volumeInputIcon, showVolumeGamepadMenu,
        ttsAvailable, ttsPlaying, ttsIcon, ttsTitle, checkTTSAvailable, cancelTTS, startTTS,
        setupClickAudio, changeAudioVolume, confirmClickSound, setVolumeInterval, stopVolumeInterval,
        playClickSound, playScanSound
    }
});

/**
 * This function triggers the click sound effect.
 */
export function triggerClickSound() {
    useAudioStore().playClickSound();
}

/**
 * This function triggers the scan sound effect.
 */
export function triggerScanSound() {
    useAudioStore().playScanSound();
}