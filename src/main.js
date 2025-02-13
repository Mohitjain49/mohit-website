import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueObserveVisibility from 'vue3-observe-visibility'

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
    FaIcons.faCircleInfo,
    FaIcons.faCopyright,
    FaIcons.faArrowUp,
    FaIcons.faPenFancy,

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
    FaBrands.faGolang
);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).
    use(VueObserveVisibility).
    use(personalRouter).
    use(pinia).
    mount('#app');
