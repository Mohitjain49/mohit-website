// https://github.com/yjl9903/unplugin-info
// https://day.js.org/

import now from '~build/time';
import { version } from "~build/package";

import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(AdvancedFormat);
const dayjsBuildDate = dayjs(now);
const coprightYear = dayjs().year();

export default defineNuxtPlugin(() => {
    return {
        provide: {
            websiteBuild: {
                date: dayjsBuildDate,
                dateRaw: now,
                version,
                coprightYear,
                releaseDate: dayjsBuildDate.format("MMMM Do, YYYY"),
                releaseTime: dayjsBuildDate.format("h:mm A")
            }
        }
    }
});