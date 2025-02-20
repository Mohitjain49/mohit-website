import { defineStore } from "pinia";
import { ref } from "vue";
import MJ_Resume from "../assets/documents/Mohit_Jain_Resume.pdf";

export const useWebsiteDataStore = defineStore("WebsiteData", () => {
    const dateStore = useDateStore();

    /**
     * An reference integer that determines the Mode of the Nav Bar.
     * If it equals 0, it is on laptop mode, or the screen width is above 800px.
     * If it equals 1, it is on tablet mode, or the screen width is above 600px.
     * If it equals 2, it is on phone mode, or the screen width is at most 600px.
     */
    const pageView = ref(0);
    const navBarDropdown = ref(-1);
    const mobileSidebarOpen = ref(false);

    /**
     * This function adds event listeners to the website as soon as its loaded.
     */
    function setEventListeners() {
        resizePageComponents();
        window.addEventListener("resize", () => { resizePageComponents(); });
        dateStore.startDateInterval();
    }

    /**
     * This function removes event listeners to the website as soon as its loaded.
     */
    function removeEventListeners() {
        window.removeEventListener("resize", () => { resizePageComponents(); });
        dateStore.stopDateInterval();
    }

    /**
     * This runs whenever a page is opened.
     */
    function mountWebData() {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        setNavBarDropdown(-1);
    }

    /**
     * This sets which Navigation Bar dropdown is open.
     * @param {Number} newIndex The index of the dropdown.
     */
    function setNavBarDropdown(newIndex = -1) {
        navBarDropdown.value = ((newIndex == navBarDropdown.value) ? -1 : newIndex);
    }

    /**
     * This toggles the status of the mobile sidebar for a skills or experience page.
     */
    function toggleMobileSidebar() {
        mobileSidebarOpen.value = ((pageView.value != 2) ? false : !mobileSidebarOpen.value);
        document.body.style.overflowY = (mobileSidebarOpen.value ? 'hidden' : '');
    }

    /**
     * This closes the mobile sidebar for a skills or experience page.
     */
    function closeMobileSidebar() {
        mobileSidebarOpen.value = false;
        document.body.style.overflowY = '';
    }

    /**
     * This sets the size of crucial components within the website.
     */
    function resizePageComponents() {
        const windowWidth = window.innerWidth;
        
        if(windowWidth <= 600) {
            pageView.value = 2;
        } else if(windowWidth <= 825) {
            pageView.value = 1;
            closeMobileSidebar();
        } else {
            pageView.value = 0;
            closeMobileSidebar();
            if(navBarDropdown.value == 0) { setNavBarDropdown(-1); }
        }
    }

    return { navBarDropdown, pageView, mobileSidebarOpen,
        setEventListeners, removeEventListeners, mountWebData,
        setNavBarDropdown, toggleMobileSidebar, closeMobileSidebar
    }
});

export const useDateStore = defineStore("DateStore", () => {
    const dateObj = ref({
        day: -1,
        month: -1,
        year: -1,
        hour: -1,
        minute: -1,
        second: -1,
        meridian: "",
    });
    const dateStrings = ref({
        daySection: "",
        timeSection: "",
        timeSectionWithSec: ""
    })

    var dateInterval = null;

    /**
     * This sets the date object and date strings.
     */
    function setDateObj() {
        const dateNow = new Date();
        const newDateObj = {
            day: dateNow.getDate(),
            month: (dateNow.getMonth() + 1),
            year: dateNow.getFullYear(),
            hour: ((dateNow.getHours() % 12 == 0) ? 12 : (dateNow.getHours() % 12)),
            minute: (dateNow.getMinutes()),
            second: (dateNow.getSeconds()),
            meridian: (dateNow.getHours() >= 12 ? "PM" : "AM")
        }
        dateObj.value = newDateObj;

        const minuteNum = ((newDateObj.minute < 10) ? String('0' + newDateObj.minute) : newDateObj.minute);
        const secondNum = ((newDateObj.second < 10) ? String('0' + newDateObj.second) : newDateObj.second);

        dateStrings.value.daySection = String(newDateObj.month + "/" + newDateObj.day + "/" + newDateObj.year);
        dateStrings.value.timeSection = String(newDateObj.hour + ":" + minuteNum + " " + newDateObj.meridian);
        dateStrings.value.timeSectionWithSec = String(newDateObj.hour + ":" + minuteNum + ":" + secondNum + " " + newDateObj.meridian);
    }

    /**
     * This function starts the date interval.
     */
    function startDateInterval() {
        if(dateInterval != null) { return; }
        dateInterval = setInterval(() => {
            setDateObj();
        }, 1000);
    }

    /**
     * This function stops the date interval.
     */
    function stopDateInterval() {
        if(dateInterval != null) { return; }
        clearInterval(dateInterval);
        dateInterval = null;
    }

    return { dateObj, dateStrings, setDateObj,
        startDateInterval, stopDateInterval
    }
});

/**
 * This function mounts the website data pinia store on a page.
 */
export function initWebData() {
    const webData = useWebsiteDataStore();
    webData.mountWebData();
}

/**
 * This function closes the Navigation Bar's dropdown menu.
 */
export function closeNavBarDropdown() {
    const webData = useWebsiteDataStore();
    webData.setNavBarDropdown(-1);
}

/**
 * This function downloads my resume for the visitor to see.
 */
export function downloadResume() {
   const link = document.createElement('a');
   link.href = MJ_Resume;
   link.download = 'Mohit_Jain_Resume.pdf';
   link.click();
}