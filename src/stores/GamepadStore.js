export const useGamepadStore = defineStore("gamepad-store", () => {
    var scrollInterval = null;

    /**
     * Using the directional pad on a controller, this function will scroll on the page depending on which button is held down.
     * @param {String} direction The direction to scroll.
     */
    function setScrollInterval(direction = 'up') {
        if(scrollInterval != null) { return; }
        scrollInterval = setInterval(() => {
            window.scrollBy(0, ((direction === "up") ? -10 : 10));
        }, 1);
    }

    /**
     * This function stops the scroll interval.
     */
    function stopScrollInterval() {
        if(scrollInterval == null) { return; }
        clearInterval(scrollInterval);
        scrollInterval = null;
    }

    return { setScrollInterval, stopScrollInterval }
});