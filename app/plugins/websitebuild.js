// https://day.js.org/
import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';

// This lets day.js advanced date formats on the website.
dayjs.extend(AdvancedFormat);

export default defineNuxtPlugin(() => {
    const publicRuntimeConfig = useRuntimeConfig().public;
    const dayjsBuildDate = dayjs(publicRuntimeConfig.buildDate);
    const coprightYear = dayjs().year();

    return {
        provide: {
            websiteBuild: {
                date: dayjsBuildDate,
                version: publicRuntimeConfig.version,
                coprightYear,
                releaseDate: dayjsBuildDate.format("MMMM Do, YYYY"),
                releaseTime: dayjsBuildDate.format("h:mm A")
            }
        }
    }
});