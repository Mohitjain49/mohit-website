/**
 * This function sets the initial transition for a Nav Card.
 * @param {String} cardId The element id for the card.
 */
export function setNavCardAnimation(cardId = "#ivue-nav-newCard") {
    const navCard = document.getElementById(cardId).classList;
    navCard.add("animate__animated", "animate__jackInTheBox", "animate__slowLess");
    setTimeout(() => { navCard.remove("animate__animated", "animate__jackInTheBox", "animate__slowLess") }, 1500);
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
export function setFlashAnimation(event = new MouseEvent("mouseenter")) {
    if(event.type === "mouseenter") {
        event.target.classList.add("animate__animated", "animate__flash");
    } else {
        event.target.classList.remove("animate__animated", "animate__flash");
    }
}

/**
 * This function adds or removes a heartbeat animation to any element.
 */
export function setHeartbeatAnimation(event = new MouseEvent("mouseenter")) {
    if(event.type === "mouseenter") {
        event.target.classList.add('animate__animated', 'animate__heartBeat');
    } else {
        event.target.classList.remove('animate__animated', 'animate__heartBeat');
    }
}

/**
 * This function sets a bounce animation for any element.
 */
export function setBounceAnimation(event = new MouseEvent("mouseenter")) {
    if(event.type === "mouseenter") {
        event.target.classList.add('animate__animated', 'animate__bounce');
    } else {
        event.target.classList.remove('animate__animated', 'animate__bounce');
    }
}

/**
 * This function sets a pulse animation for any element for an infinite amount of time.
 */
export function setPulseLoopAnimation(event = new MouseEvent("mouseenter")) {
    if(event.type === "mouseenter") {
        event.target.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
    } else {
        event.target.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
    }
}

/**
 * This function adds the flash animation, then removes it after 0.8s.
 */
export function addFlashAnimation(event = new MouseEvent("click")) {
    event.target.classList.add('animate__animated', 'animate__flash');
    setTimeout(() => {
        event.target.classList.remove('animate__animated', 'animate__flash');
    }, 800)
}