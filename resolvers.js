// THIS FILE ARE RESOLVERS FOR 'unplugin-auto-import` THAT FETCH COMPONENTS FOR THE VUE.JS PROJECT TO USE.

import * as fs from "fs";
import * as path from 'path';

/**
 * This function resolves all components in the components folder with special conditions.
 * @param {String} name The name of the component.
 * @param {Boolean} ssr If true, the app is rendering on the server.
 */
export function resolveComponents(name = "", ssr = true) {
    if(name === "") { return null; }
    const allFiles = fs.readdirSync(path.resolve("src/components"), { recursive: true });

    // This for loop parses all the components' filenames to ensure that we are reading an actual component.
    for(let i = 0; i < allFiles.length; i++) {
        let file = allFiles[i];
        if(file.endsWith(".md") || file.endsWith(".vue")) {
            allFiles[i] = file.replaceAll("\\", "/");
        } else {
            allFiles.splice(i, 1);
            i--;
        }
    }

    // This for loop actually finds and sends all the components to where they are called.
    const fileIndex = allFiles.findIndex((item) => {
        return (name === item.split("/").pop().split(".")[0]);
    });

    if(fileIndex == -1) { return null; }
    const filename = allFiles[fileIndex];

    if(filename.endsWith(".client.vue") && ssr) {
        return null;
    } else if(filename.endsWith(".server.vue") && !ssr) {
        return null;
    } else {
        return { name: "default", from: ("@/components/" + filename) }
    }
}

/**
 * This function resolves all instances of the Font Awesome Icon.
 * @param {String} name The name of the found component
 */
export function resolveFontAwesomeIcons(name = "") {
    if(name === "FontAwesomeIcon") {
        return { name: "FontAwesomeIcon", from: '@fortawesome/vue-fontawesome' }
    }
}