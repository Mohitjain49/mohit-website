export default defineNuxtPlugin((nuxtApp) => {
    const FALLBACK_CURSOR = "pointer";
    const ERROR_CURSOR = "not-allowed";
    const CURSORS = ["pointer", "wait", "var(--checkmark-cursor)", "not-allowed", "not-allowed", "not-allowed"];

    /**
     * This function is ran when an element using the directive is mounted.
     * @param {HTMLButtonElement} el The HTML Element used in the directive. 
     * @param {import("vue").DirectiveBinding<Number>} binding The Binding with the directive.
     */
    function setActionButtonCursor(el, binding) {
        try {
            if(!el || (!binding.value && binding.value != 0)) { return; }
            const newCursor = ((binding.value > 2) ? ERROR_CURSOR : (CURSORS[binding.value] ?? FALLBACK_CURSOR))
            el.style.cursor = newCursor;
        } catch(e) {}
    }

    // This makes a new directive that allows any element to use the pulse-loop animation when hovered over.
    nuxtApp.vueApp.directive('action-cursor', {
        mounted(el, binding) { setActionButtonCursor(el, binding); },
        updated(el, binding) { setActionButtonCursor(el, binding); }
    });
});