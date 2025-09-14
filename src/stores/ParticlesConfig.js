export const HOME_BACKGROUND = {
    background: {
        color: "#000000",
    },
    fpsLimit: 40,
    particles: {
        color: { value: ["rgba(126, 90, 0, 0.9)", "#E8E163", "#E92A60"] },
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

export const WAKE_LOCK_BACKGROUND = {
    background: {
        color: "#000000",
    },
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
};

export const FEATURES_BACKGROUND = {
    background: {
        color: "#000000", // Dark night sky background
    },
    sounds: { enable: false },
    preset: "fireworks",
    particles: {
        color: { value: ["#E8E163", "rgb(159, 191, 255)", "#E92A60"] },
        shape: { type: "star" },
        size: { value: { min: 0.001, max: 20 }, },
        move: {
            speed: { min: 1, max: 1 }, // much faster launch
        },
        life: {
            count: 50,
        },
    },
    emitters: {
        direction: "top",
        rate: {
            delay: 0.1,
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
}

export const CODE_SCANNER_BACKGROUND = {
    background: {
        color: "#000000", // Dark night sky background
    },
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
}