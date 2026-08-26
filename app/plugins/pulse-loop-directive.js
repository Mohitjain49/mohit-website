export default defineNuxtPlugin((nuxtApp) => {
    /** @type {Array<{ el: HTMLElement, controller: AbortController }>} A list of the animated elements. */
    const animatedElementsList = [];
    var verifyInterval = null;

    const webData = useWebsiteDataStore();
    const styleStore = useStyleStore();
    watch(() => webData.mounted, () => { manageVerifyInterval(); }, { deep: true });

    /**
     * This function finds an element in the list of animated elements.
     * @param {HTMLElement} el The HTML Element that acts as a key here.
     */
    function findElement(el = null) {
        return animatedElementsList.findIndex((item) => { return (item.el === el); });
    }

    /**
     * This function sets a pulse animation for any element for an infinite amount of time.
     * @param {PointerEvent} event The event where the user hovers over or leaves the button.
     */
    function animate(event) {
        /** @type {HTMLElement} This is the element that classes are being added and removed from. */
        const element = event.target;

        if(event.type === "pointerenter" && event.pointerType === "mouse") {
            if(element.classList.contains('animate__animated')) { return; }
            element.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
        } else {
            if(!element.classList.contains('animate__pulse')) { return; }
            element.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
        }
    }

    /** This function verifies that only the elements that the user is hovering over have the pulse loop class. */
    function verifyAnimatedElements() {
        try {
            const currentElementOnMouse = styleStore.mouseElement;
            const numElements = animatedElementsList.length;

            for(let i = 0; i < numElements; i++) {
                const element = animatedElementsList[i].el;
                if(!element || !element.classList.contains('animate__pulse')) { continue; }
                if(element === currentElementOnMouse || element.contains(currentElementOnMouse)) { continue; }
                element.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
            }
        } catch(e) {
            if(import.meta.dev) { console.error(e); }
        }
    }

    /** This function manages the verify interval, activating and deactivating it when necessary. */
    function manageVerifyInterval() {
        const activate = (webData.mounted == 2);
        if(verifyInterval != null) { clearInterval(verifyInterval); }
        verifyInterval = (activate ? setInterval(() => { verifyAnimatedElements(); }, 2000) : null);
    }

    /**
     * This function is ran when an element using the directive is mounted.
     * @param {HTMLElement} el The HTML Element used in the directive. 
     * @param {import("vue").DirectiveBinding<any>} binding The Binding with the directive.
     */
    function onDirectiveElementMounted(el, binding) {
        if(findElement(el) != -1) { return; }
        const animationAbortController = new AbortController();
        const signal = animationAbortController.signal;

        animatedElementsList.push({ el, controller: animationAbortController });
        el.addEventListener("pointerenter", (event) => { animate(event); }, { signal });
        el.addEventListener("pointerleave", (event) => { animate(event); }, { signal });
    }

    /**
     * This function is ran right before when an element using the directive unmounts.
     * @param {HTMLElement} el The HTML Element used in the directive. 
     * @param {import("vue").DirectiveBinding<any>} binding The Binding with the directive.
     */
    function beforeDirectiveElementUnmount(el, binding) {
        const itemIndex = findElement(el);
        if(itemIndex == -1) { return; }
        animatedElementsList[itemIndex].controller.abort();
        animatedElementsList.splice(itemIndex, 1);
    }

    // This makes a new directive that allows any element to use the pulse-loop animation when hovered over.
    nuxtApp.vueApp.directive('pulse-loop', {
        mounted(el, binding) { onDirectiveElementMounted(el, binding); },
        beforeUnmount(el, binding) { beforeDirectiveElementUnmount(el, binding); }
    });
});