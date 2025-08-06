import click_sound from "@/assets/sounds/click_sound_effect.wav";

export const useAudioStore = defineStore("audio-store", () => {
    const CLICK_VOLUME_KEY = "mohit-audio-clickVolume";
    const showVolumeGamepadMenu = ref(false);
    var volumeInterval = null;

    /**
     * @type {import('vue').Ref<HTMLAudioElement>} This is an audio reference variable.
     */
    const audioClip = ref(null);
    const volumeInput = ref("50");
    const volumeInputIcon = computed(() => {
        const volumeInt = parseInt(volumeInput.value);
        return ((volumeInt == 0) ? 'fa-volume-off' : ((volumeInt < 50) ? "fa-volume-low" : "fa-volume-high"));
    })

    /**
     * This function sets up the click audio for my website.
     */
    function setupClickAudio() {
        audioClip.value = new Audio(click_sound);
        audioClip.value.preload = "auto";

        const audioClipVolume = localStorage.getItem(CLICK_VOLUME_KEY);
        volumeInput.value = ((audioClipVolume === null) ? "50" : audioClipVolume);
        changeAudioVolume();
    }

    /**
     * This function changes the audio volume based on the "volumeInput" variable.
     */
    function changeAudioVolume() {
        localStorage.setItem(CLICK_VOLUME_KEY, volumeInput.value);
        audioClip.value.volume = (parseInt(volumeInput.value) / 100);
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
        if(usuableLink || usuableButton) { triggerClickSound(); }
    }

    /**
     * This function sets the Volume Interval, which can edit the volume of the click sound every second.
     * @param {Number} amount The amount to add to the volume each interval.
     */
    function setVolumeInterval(amount = 1) {
        if(volumeInterval != null) { return; }
        showVolumeGamepadMenu.value = true;

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

    return { audioClip, volumeInput, volumeInputIcon, showVolumeGamepadMenu,
        setupClickAudio, changeAudioVolume, confirmClickSound,
        setVolumeInterval, stopVolumeInterval
    }
});

/**
 * This function triggers a click sound effect.
 */
export function triggerClickSound() {
    const audioClip = useAudioStore().audioClip;
    audioClip.currentTime = 0;
    audioClip.play();
}