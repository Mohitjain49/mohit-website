import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import personalRouter from './routes.js'
const pinia = createPinia();

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
    FaIcons.faArrowDown,
    FaIcons.faFileLines,
    FaIcons.faBars,
    FaIcons.faHouse,
    FaIcons.faMessage,
    FaIcons.faLaptopCode,
    FaIcons.faFileCode,
    FaIcons.faFileArrowDown,
    FaIcons.faFileArrowUp,
    FaIcons.faCopy,
    FaIcons.faEnvelope,
    FaIcons.faPhone,
    FaIcons.faCircleDot,
    FaIcons.faStar,
    FaIcons.faCopyright,
    FaIcons.faArrowUp,

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
    FaBrands.faCloudflare
);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).
    use(personalRouter).
    use(pinia).
    mount('#app');
