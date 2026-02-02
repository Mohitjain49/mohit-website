/**
 * This function sets the initial transition for a Nav Card.
 * @param {String} cardId The element id for the card.
 */
export function setNavCardAnimation(cardId = "#ivue-nav-newCard") {
    const navCard = document.getElementById(cardId);
    if(!navCard || (typeof navCard.classList === "undefined") || !(navCard.classList instanceof DOMTokenList)) { return; }

    navCard.classList.add("animate__animated", "animate__jackInTheBox", "animate__slowLess");
    setTimeout(() => { navCard.classList.remove("animate__animated", "animate__jackInTheBox", "animate__slowLess") }, 1500);
}

/**
 * This sets an Animation for the Home Tabs based on whether the tab is visible or not.
 * @param {HTMLElement} target The HTML element that was observed.
 * @param {Boolean} fromLeft If true, the element should enter from the left, otherwise it enters from the right.
 * @param {Boolean} isVisible Whether the target is visible or not.
 */
export function setHomeTabAnimation(target, fromLeft = true, isVisible = true) {
    if(!isVisible) { return; }
    const animationClassList = ["animate__animated", "animate__bounceInLeft", "animate__bounceInRight", "animate__fadeIn"];
    const animationClass = animationClassList[(window.innerWidth > 450) ? (fromLeft ? 1 : 2) : 3];

    target.classList.add("animate__animated", animationClass);
    setTimeout(() => { target.classList.remove(...animationClassList); }, 1200);
}

/**
 * This adds a transition to a card/widget as visitors scroll to it.
 * @param {Boolean} isVisible This must be true for the function to run.
 * @param {Element} target The element gotten from the event.
 */
export function addNoteCardAnimation(target, isVisible = true) {
    if(!isVisible) { return; }
    target.classList.add("animate__animated", ((window.innerWidth > 450) ? "animate__zoomIn" : "animate__fadeIn"));
    setTimeout(() => { target.classList.remove("animate__animated", "animate__zoomIn", "animate__fadeIn"); }, 1000);
}

/**
 * This adds and removes a flash animation for any element.
 */
export function setFlashAnimation(event = new PointerEvent("pointerenter")) {
    if(event.type === "pointerenter" && event.pointerType === "mouse") {
        event.target.classList.add("animate__animated", "animate__flash");
    } else {
        event.target.classList.remove("animate__animated", "animate__flash");
    }
}

/**
 * This function adds or removes a heartbeat animation to any element.
 */
export function setHeartbeatAnimation(event = new PointerEvent("pointerenter")) {
    if(event.type === "pointerenter" && event.pointerType === "mouse") {
        event.target.classList.add('animate__animated', 'animate__heartBeat');
    } else {
        event.target.classList.remove('animate__animated', 'animate__heartBeat');
    }
}

/**
 * This function sets a bounce animation for any element.
 */
export function setBounceAnimation(event = new PointerEvent("pointerenter")) {
    if(event.type === "pointerenter" && event.pointerType === "mouse") {
        event.target.classList.add('animate__animated', 'animate__bounce');
    } else {
        event.target.classList.remove('animate__animated', 'animate__bounce');
    }
}

/**
 * This function sets a pulse animation for any element for an infinite amount of time.
 */
export function setPulseLoopAnimation(event = new PointerEvent("pointerenter")) {
    if(event.type === "pointerenter" && event.pointerType === "mouse") {
        event.target.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
    } else {
        event.target.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
    }
}

/**
 * This function sets a pulse animation for any element and repeats it twice.
 */
export function setPulseTwiceAnimation(event = new PointerEvent("pointerenter")) {
    if(event.type === "pointerenter" && event.pointerType === "mouse") {
        event.target.classList.add('animate__animated', 'animate__pulse', 'animate__repeat-2');
    } else {
        event.target.classList.remove('animate__animated', 'animate__pulse', 'animate__repeat-2');
    }
}

/**
 * This function adds or removes a transition to a social media link button.
 */
export function setHeadShakeAnimation(event = new PointerEvent("pointerenter")) {
    if(event.type === "pointerenter" && event.pointerType === "mouse") {
        event.target.classList.add("animate__animated", "animate__headShake");
    } else {
        event.target.classList.remove("animate__animated", "animate__headShake");
    }
}

/**
 * This function adds the flash animation, then removes it after 0.8s.
 */
export function addFlashAnimation(event = new MouseEvent("click")) {
    event.target.classList.add('animate__animated', 'animate__flash');
    setTimeout(() => { event.target.classList.remove('animate__animated', 'animate__flash'); }, 800)
}