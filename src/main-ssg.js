import "@fontsource/lexend";
import "@fontsource/roboto";
import "@fontsource/montserrat";
import '~build/console';

import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
import VueObserveVisibility from 'vue3-observe-visibility'

import VueParticles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";

import App from "./App.vue";
import { personalRoutes } from "./routes";

import { library } from '@fortawesome/fontawesome-svg-core'
import * as FaIcons from '@fortawesome/free-solid-svg-icons'
import * as FaBrands from '@fortawesome/free-brands-svg-icons'

library.add(
    FaIcons.faList,
    FaIcons.faDatabase,
    FaIcons.faPalette,
    FaIcons.faPaperPlane,
    FaIcons.faBuilding,
    FaIcons.faMapPin,
    FaIcons.faGear,
    FaIcons.faMagnifyingGlass,
    FaIcons.faX,
    FaIcons.faBan,
    FaIcons.faArrowDown,
    FaIcons.faArrowLeft,
    FaIcons.faFileLines,
    FaIcons.faBars,
    FaIcons.faHouse,
    FaIcons.faMessage,
    FaIcons.faLaptopCode,
    FaIcons.faFileCode,
    FaIcons.faCode,
    FaIcons.faFilePdf,
    FaIcons.faFileDownload,
    FaIcons.faCopy,
    FaIcons.faEnvelope,
    FaIcons.faPhone,
    FaIcons.faCircleDot,
    FaIcons.faCircleInfo,
    FaIcons.faCopyright,
    FaIcons.faArrowUp,
    FaIcons.faPenFancy,
    FaIcons.faUsersRectangle,
    FaIcons.faStar,
    FaIcons.faQrcode,
    FaIcons.faGlobe,
    FaIcons.faCubes,
    FaIcons.faDownload,
    FaIcons.faRotateRight,
    FaIcons.faSquareXmark,
    FaIcons.faPizzaSlice,
    FaIcons.faGamepad,
    FaIcons.faArrowPointer,
    FaIcons.faHandPointer,
    FaIcons.faLock,
    FaIcons.faUnlock,
    FaIcons.faCodeBranch,
    FaIcons.faCodeCommit,
    FaIcons.faSquarePen,
    FaIcons.faSchoolFlag,
    FaIcons.faVolumeHigh,
    FaIcons.faVolumeXmark,
    FaIcons.faCircleXmark,
    FaIcons.faEarthAmericas,

    FaBrands.faReact,
    FaBrands.faJs,
    FaBrands.faHtml5,
    FaBrands.faCss3Alt,
    FaBrands.faNodeJs,
    FaBrands.faGithub,
    FaBrands.faLinkedin,
    FaBrands.faAws,
    FaBrands.faDiscord,
    FaBrands.faFontAwesome,
    FaBrands.faCloudflare,
    FaBrands.faJava,
    FaBrands.faGolang,
    FaBrands.faGitlab,
    FaBrands.faPython,
    FaBrands.faGoogleDrive,
    FaBrands.faMarkdown,
    FaBrands.faGoogle,
    FaBrands.faSteam
);

export const createApp = ViteSSG(App, { routes: personalRoutes },
    ({ app }) => {
        const pinia = createPinia();
        app.use(VueObserveVisibility);
        app.use(pinia);

        if(!import.meta.env.SSR) {
            app.use(VueParticles, { init: async engine => { await loadSlim(engine); } });
            if(navigator.getGamepads()) { import("./joypad-events.js"); }
        }
    }
)