export const HOME_BACKGROUND = {
    background: {
        color: "#000000",
    },
    fpsLimit: 40,
    particles: {
        color: { value: ["rgba(126, 90, 0, 0.9)", "#E8E163"] },
        move: {
            direction: "bottom",
            enable: true,
            outModes: { default: "out" },
            speed: 1.5,
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
            type: "star"
        },
        size: {
            value: { min: 2, max: 3 },
        },
    },
    detectRetina: true,
    tRetina: true,
};

export const BLUE_BACKGROUND = {
    background: {
        color: "#0047AB"
    },
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
            value: 750
        },
        opacity: {
            value: { min: 0.1, max: 0.75 },
            animation: { enable: true, speed: 1.5, sync: false },
        },
        shape: {
            type: "circle"
        },
        size: {
            value: { min: 2, max: 3 },
        },
    },
    detectRetina: true,
    tRetina: true,
};

export const ORANGE_BACKGROUND = {
    background: {
        color: "rgb(248, 206, 171)",
    },
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
};

export const GREEN_BACKGROUND = {
    background: {
        color: "rgb(0, 100, 0)",
    },
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
};

export const INSTALL_BACKGROUND = {
    background: {
        color: "#232323",
    },
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
};

export const NIGHT_BACKGROUND = {
    background: {
        color: "#000000", // Dark night sky background
    },
    particles: {
        number: { value: 150 },
        color: {  value: "#ffffff" },
        shape: { type: "circle" },
        opacity: {
            value: { min: 0.3, max: 1 }, // Twinkling effect
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
            speed: 0.2, // Very slow movement
            direction: "none",
            outModes: {
                default: "bounce",
            },
        },
    },
}