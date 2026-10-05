export default defineNuxtPlugin((nuxtApp) => {
    const FALLBACK_CURSOR = "pointer";
    const CURSORS = ["pointer", "wait", "default", "not-allowed", "not-allowed", "not-allowed"];

    /**
     * This function is ran when an element using the directive is mounted.
     * @param {HTMLButtonElement} el The HTML Element used in the directive. 
     * @param {import("vue").DirectiveBinding<Number>} binding The Binding with the directive.
     */
    function setActionButtonCursor(el, binding) {
        try {
            if(!el || (!binding.value && binding.value != 0)) { return; }
            el.style.cursor = (CURSORS[binding.value] ?? FALLBACK_CURSOR);
        } catch(e) {}
    }

    // This makes a new directive that allows any element to use the pulse-loop animation when hovered over.
    nuxtApp.vueApp.directive('action-cursor', {
        mounted(el, binding) { setActionButtonCursor(el, binding); },
        updated(el, binding) { setActionButtonCursor(el, binding); }
    });
});