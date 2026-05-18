/** @type {Array<HTMLElement>} This stores the targets that use the home tab animations. */
var homeTabTargets = [];

/** @type {Array<HTMLElement>} This stores the targets that use the note card animations. */
var noteCardTargets = [];

/** @type {Array<HTMLElement>} This stores the targets that use the flip In X animation. */
var flipInXTargets = [];

/** @type {Array<HTMLElement>} This stores the targets that use the flash animation. */
var flashTargets = [];

/**
 * This finds the index of a target element that currently has a home tab animation ongoing.
 * @param {HTMLElement} target The HTML element that was observed.
 */
function findHomeTabTarget(target) {
    return homeTabTargets.findIndex((item) => { return (item === target); });
}

/**
 * This finds the index of a target element that currently has a note card animation ongoing.
 * @param {HTMLElement} target The HTML element that was observed.
 */
function findNoteCardTarget(target) {
    return noteCardTargets.findIndex((item) => { return (item === target); });
}

/**
 * This finds the index of a target element that currently has a Flip In X animation ongoing.
 * @param {HTMLElement} target The HTML element that was observed.
 */
function findFlipInXTarget(target) {
    return flipInXTargets.findIndex((item) => { return (item === target); });
}

/**
 * This finds the index of a target element that currently has a Flash animation ongoing.
 * @param {HTMLElement} target The HTML element that was observed.
 */
function findFlashTarget(target) {
    return flashTargets.findIndex((item) => { return (item === target); });
}

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
    if(!isVisible || (findHomeTabTarget(target) != -1)) { return; }
    const animationClassList = ["animate__animated", "animate__fadeInLeft", "animate__fadeInRight", "animate__zoomIn"];
    const animationClass = animationClassList[(getMohitInnerWidth() > 450) ? (fromLeft ? 1 : 2) : 3];

    target.classList.add("animate__animated", animationClass);
    homeTabTargets.unshift(target);

    setTimeout(() => {
        target.classList.remove(...animationClassList);
        const targetIndex = findHomeTabTarget(target);
        if(targetIndex != -1) { homeTabTargets.splice(targetIndex, 1); }
    }, 1200);
}

/**
 * This adds a transition to a card/widget as visitors scroll to it.
 * @param {Boolean} isVisible This must be true for the function to run.
 * @param {Element} target The element gotten from the event.
 */
export function addNoteCardAnimation(target, isVisible = true) {
    if(!isVisible || (findNoteCardTarget(target) != -1)) { return; }
    target.classList.add("animate__animated", "animate__zoomIn");
    noteCardTargets.unshift(target);

    setTimeout(() => {
        target.classList.remove("animate__animated", "animate__zoomIn");
        const targetIndex = findNoteCardTarget(target);
        if(targetIndex != -1) { noteCardTargets.splice(targetIndex, 1); }
    }, 1000);
}

/**
 * This adds a transition to a title as visitors scroll to it.
 * @param {Boolean} isVisible This must be true for the function to run.
 * @param {Element} target The element gotten from the event.
 */
export function setFlipInXAnimation(target, isVisible) {
    if(!isVisible || (findFlipInXTarget(target) != -1)) { return; }
    target.classList.add("animate__animated", "animate__flipInX");
    flipInXTargets.unshift(target)

    setTimeout(() => {
        target.classList.remove("animate__animated", "animate__flipInX");
        const targetIndex = findFlipInXTarget(target);
        if(targetIndex != -1) { flipInXTargets.splice(targetIndex, 1); }
    }, 1000);
}

/**
 * This function adds the flash animation, then removes it after 0.8s.
 */
export function addFlashAnimation(event = new MouseEvent("click")) {
    const target = event.target;
    if(findFlashTarget(target) != -1) { return; }
    
    target.classList.add('animate__animated', 'animate__flash');
    flashTargets.unshift(target);

    setTimeout(() => {
        target.classList.remove('animate__animated', 'animate__flash');
        const targetIndex = findFlashTarget(target);
        if(targetIndex != -1) { flashTargets.splice(targetIndex, 1); }
    }, 800);
}

/**
 * -------------------------------------------------------------------
 * These functions set animations for buttons that use pointer events.
 * -------------------------------------------------------------------
 */

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