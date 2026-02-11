// Refer to the tsParticles docs: https://particles.js.org/docs/
// Refer to the tsParticles docs: https://particles.js.org/docs/documents/tsParticles_Engine.Options_Particles_Shape.html
import { faCopyright, faStar, faCertificate, faQuestion, faDiamondTurnRight, faCode, faGamepad, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

/** @type {Ref<import('@tsparticles/engine').IOptions>} */
export const HOME_BACKGROUND = ref({
    background: { color: "#000000" },
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 40,
    particles: {
        // color: { value: ["rgba(126, 90, 0, 0.9)", "#E8E163", "#E92A60"] },
        move: {
            direction: "bottom",
            enable: true,
            outModes: { default: "out" },
            speed: 1.5,
            straight: false,
        },
        number: {
            density: { enable: true, area: 1200 },
            value: 400
        },
        opacity: {
            value: { min: 0.1, max: 0.75 },
            animation: { enable: true, speed: 1.5, sync: false },
        },
        shape: {
            type: "image",
            options: {
                image: [
                    { src: getFontAwesomeSvg(faStar, "rgba(126, 90, 0, 0.9)"), width: 100, height: 100 },
                    { src: getFontAwesomeSvg(faStar, "#E8E163"), width: 100, height: 100 },
                    { src: getFontAwesomeSvg(faStar, "#E92A60"), width: 100, height: 100 },
                ]
            }
        },
        size: {
            value: { min: 5, max: 6 },
        },
    },
    detectRetina: true,
    tRetina: true,
});

/** @type {Ref<import('@tsparticles/engine').IOptions>} */
export const BLUE_BACKGROUND = ref({
    background: { color: "#0047AB" },
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 40,
    particles: {
        color: { value: ["rgb(187, 210, 255)"] },
        move: {
            direction: "none",
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: 0.75,
            straight: false,
        },
        number: {
            density: { enable: true, area: 1200 },
            value: 375
        },
        opacity: {
            value: { min: 0.1, max: 0.75 },
            animation: { enable: true, speed: 1.5, sync: false },
        },
        shape: {
            type: "image",
            options: {
                image: { src: getFontAwesomeSvg(faCertificate, "rgb(187, 210, 255)"), width: 100, height: 100 }
            }
        },
        size: {
            value: { min: 5, max: 7 },
        },
    },
    detectRetina: true,
    tRetina: true,
});

/** @type {Ref<import('@tsparticles/engine').IOptions>} */
export const ORANGE_BACKGROUND = ref({
    background: { color: "rgb(248, 206, 171)" },
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 40,
    particles: {
        color: { value: ["rgb(126, 90, 0)"] },
        move: {
            direction: "none",
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: 0.75,
            straight: false,
        },
        number: {
            density: { enable: true, area: 1200 },
            value: 1000
        },
        opacity: {
            value: { min: 0.1, max: 0.75 },
            animation: { enable: true, speed: 1.5, sync: false },
        },
        shape: {
            type: "square"
        },
        size: {
            value: { min: 2, max: 3 },
        },
    },
    detectRetina: true,
    tRetina: true,
});

/** @type {Ref<import('@tsparticles/engine').IOptions>} */
export const GREEN_BACKGROUND = ref({
    background: { color: "rgb(0, 100, 0)" },
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 40,
    particles: {
        color: { value: ["rgb(144, 238, 144)"] },
        move: {
            direction: "none",
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: 0.75,
            straight: false,
        },
        number: {
            density: { enable: true, area: 1200 },
            value: 1000
        },
        opacity: {
            value: { min: 0.1, max: 0.75 },
            animation: { enable: true, speed: 1.5, sync: false },
        },
        shape: {
            type: "square"
        },
        size: {
            value: { min: 2, max: 3 },
        },
    },
    detectRetina: true,
    tRetina: true,
});

/** @type {Ref<import('@tsparticles/engine').IOptions>} */
export const INSTALL_BACKGROUND = ref({
    background: { color: "#232323" },
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 40,
    particles: {
        color: { value: ["rgba(126, 90, 0, 0.9)", "#E8E163"] },
        move: {
            direction: "",
            enable: true,
            outModes: { default: "out" },
            speed: 1.0,
            straight: false,
        },
        number: {
            density: { enable: true, area: 1200 },
            value: 100
        },
        opacity: {
            value: { min: 0.1, max: 0.75 },
            animation: { enable: true, speed: 1.5, sync: false },
        },
        shape: {
            type: "star"
        },
        size: {
            value: { min: 2, max: 3 },
        },
    },
    detectRetina: true,
    tRetina: true,
});

/** @type {Ref<import('@tsparticles/engine').IOptions>} */
export const WAKE_LOCK_BACKGROUND = ref({
    background: { color: "#000000" },
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 40,
    particles: {
        color: { value: ["#E92A60"] },
        move: {
            direction: "",
            enable: true,
            outModes: { default: "out" },
            speed: 1.0,
            straight: false,
        },
        number: {
            density: { enable: true, area: 1200 },
            value: 200
        },
        opacity: {
            value: { min: 0.1, max: 0.75 },
            animation: { enable: true, speed: 1.5, sync: false },
        },
        shape: {
            type: "star"
        },
        size: {
            value: { min: 2, max: 3 },
        },
    },
    detectRetina: true,
    tRetina: true,
});

/** @type {Ref<import('@tsparticles/engine').IOptions>} */
export const FEATURES_BACKGROUND = ref({
    background: { color: "#000000" },
    fullScreen: { enable: true, zIndex: -1 },
    sounds: { enable: false },
    preset: "fireworks",
    particles: {
        color: { value: ["#E8E163", "rgb(159, 191, 255)", "#E92A60"] },
        shape: { type: "star" },
        size: { value: { min: 0.001, max: 20 }, },
        move: { speed: { min: 1, max: 1 }, },
        life: { count: 0, },
    },
    emitters: {
        direction: "top",
        rate: {
            delay: 0.2,
            quantity: 1
        },
        life: {
            count: 1,
        },
        size: {
            width: 90,
            height: 100
        },
        position: {
            y: 50,
            x: 50
        }
    }
});

/** @type {Ref<import('@tsparticles/engine').IOptions>} */
export const CODE_SCANNER_BACKGROUND = ref({
    background: { color: "#000000" },
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
        number: { value: 150 },
        color: {  value: "rgb(159, 191, 255)" },
        shape: { type: "square" },
        opacity: {
            value: { min: 0.7, max: 1 }, // Twinkling effect
            animation: {
                enable: true,
                speed: 1.5,
                minimumValue: 0.3,
                sync: false,
            },
        },
        size: {
            value: { min: 1, max: 3 }, // Varying star sizes
        },
        move: {
            enable: true,
            speed: 1.5, // Very slow movement
            direction: "none",
            outModes: {
                default: "bounce",
            },
        },
    },
});

/** @type {Ref<import('@tsparticles/engine').IOptions>} */
export const COPYRIGHT_BACKGROUND = ref({
    background: { color: "rgb(248, 206, 171)" },
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 40,
    particles: {
        move: {
            direction: "none",
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: 0.75,
            straight: false,
        },
        number: {
            density: { enable: true, area: 1200 },
            value: 200
        },
        opacity: {
            value: { min: 0.1, max: 0.5 },
            animation: { enable: true, speed: 1.5, sync: false },
        },
        shape: {
            type: "image",
            options: {
                image: {
                    src: getFontAwesomeSvg(faCopyright, "rgb(126, 90, 0)"),
                    width: 30, 
                    height: 30
                }
            }
        },
        size: {
            value: 10,
        },
    },
    detectRetina: true,
});

/** @type {Ref<import('@tsparticles/engine').IOptions>} */
export const GAMEPAD_CONTROLS_BACKGROUND = ref({
    background: { color: "#000000" },
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 40,
    particles: {
        // color: { value: ["#DFC5FE"] },
        move: {
            direction: "none",
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: 0.75,
            straight: false,
        },
        number: {
            density: { enable: true, area: 1200 },
            value: 500
        },
        opacity: {
            value: { min: 0.1, max: 0.75 },
            animation: { enable: true, speed: 1.5, sync: false },
        },
        shape: {
            type: "image",
            options: {
                image: [
                    { src: getFontAwesomeSvg(faGamepad, "#2E8B57"), width: 100, height: 100 }
                ]
            }
        },
        size: {
            value: { min: 7, max: 7 },
        },
    },
    detectRetina: true,
    tRetina: true,
});

/** @type {Ref<import('@tsparticles/engine').IOptions>} */
export const INVALID_BACKGROUND = ref({
    background: { color: "rgb(248, 206, 171)" },
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 40,
    particles: {
        // color: { value: ["#DFC5FE"] },
        move: {
            direction: "none",
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: 0.75,
            straight: false,
        },
        number: {
            density: { enable: true, area: 1200 },
            value: 500
        },
        opacity: {
            value: { min: 0.1, max: 0.75 },
            animation: { enable: true, speed: 1.5, sync: false },
        },
        shape: {
            type: "image",
            options: {
                image: [
                    { src: getFontAwesomeSvg(faQuestion, "#700ee7ff"), width: 100, height: 100 }
                ]
            }
        },
        size: {
            value: { min: 7, max: 7 },
        },
    },
    detectRetina: true,
    tRetina: true,
});

/** @type {Ref<import('@tsparticles/engine').IOptions>} */
export const REDIRECT_BACKGROUND = ref({
    background: { color: "rgb(248, 206, 171)" },
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 40,
    particles: {
        // color: { value: ["#DFC5FE"] },
        move: {
            direction: "none",
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: 0.75,
            straight: false,
        },
        number: {
            density: { enable: true, area: 1200 },
            value: 500
        },
        opacity: {
            value: { min: 0.1, max: 0.75 },
            animation: { enable: true, speed: 1.5, sync: false },
        },
        shape: {
            type: "image",
            options: {
                image: [
                    { src: getFontAwesomeSvg(faDiamondTurnRight, "#700ee7ff"), width: 100, height: 100 }
                ]
            }
        },
        size: {
            value: { min: 7, max: 7 },
        },
    },
    detectRetina: true,
    tRetina: true,
});

/** @type {Ref<import('@tsparticles/engine').IOptions>} */
export const DOCUMENT_BACKGROUND = ref({
    background: { color: "#464646" },
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 40,
    particles: {
        // color: { value: ["white"] },
        move: {
            direction: "none",
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: 0.75,
            straight: false,
        },
        number: {
            density: { enable: true, area: 1200 },
            value: 500
        },
        opacity: {
            value: { min: 0.1, max: 0.75 },
            animation: { enable: true, speed: 1.5, sync: false },
        },
        shape: {
            type: "image",
            options: {
                image: [
                    { src: getFontAwesomeSvg(faFolderOpen, "#FFFFFF"), width: 100, height: 100 }
                ]
            }
        },
        size: {
            value: { min: 7, max: 7 },
        },
    },
    detectRetina: true,
    tRetina: true,
});

/** @type {Ref<import('@tsparticles/engine').IOptions>} */
export const CODE_ICON_BACKGROUND = ref({
    background: { color: "#4d3e3e" },
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 40,
    particles: {
        // color: { value: ["white"] },
        move: {
            direction: "none",
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: 0.75,
            straight: false,
        },
        number: {
            density: { enable: true, area: 1200 },
            value: 500
        },
        opacity: {
            value: { min: 0.1, max: 0.75 },
            animation: { enable: true, speed: 1.5, sync: false },
        },
        shape: {
            type: "image",
            options: {
                image: [
                    { src: getFontAwesomeSvg(faCode, "#FFFFFF"), width: 100, height: 100 }
                ]
            }
        },
        size: {
            value: { min: 7, max: 7 },
        },
    },
    detectRetina: true,
    tRetina: true,
});