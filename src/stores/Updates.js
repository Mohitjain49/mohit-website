import resume from "../assets/documents/Mohit_Jain_Resume.pdf";
import { PIZZA_WEBSITE_LINK, PAGE_SECTORS } from "./Objects.js";

import PageSector from "@/components/body-components/PageSector.vue";

export const Updates = [
    {
        version: "1.1.0",
        versionPath: "1-1-0",
        releaseDate: "November 1st, 2024",
        mainDescription: "Update 1.1.0 was the first update that I made to my website. " +
            "Beforehand, many of the website's pages were extremely linear, simply showing components stacked one atop another. " +
            "This update changed that, showing each of my skills as an environment of its own.",

        topics: [
            {
                name: "Improved Skills/Experience Page Layout",
                elementId: "Skills_Page",
                description: "Over my three years of coding, I have learned many skills, most notably frontend development through my role at iVue. " +
                    "I organized these skills into different paths, showcasing how my experience and skills are linked together. " +
                    "An example with my experience with iVue is down below, where I show how I contribute to the company and develop its software." +
                    "<br><br>Link To Example: <span><a href=\"#/experience/ivue\" style=\"text-decoration: underline;\">Mohit Jain | iVue</a></span>",
                example: {
                    type: "iframe",
                    src: '/#/experience/ivue/',
                }
            },
            {
                name: "New Company Page Sectors",
                elementId: "Page_Sectors",
                description: "As a compliment to the new Experience Pages, These page sectors serve as brief displays of my experience at different companies. " +
                    "You can observe them at the bottom of the <span><a href=\"#/\" style=\"text-decoration: underline;\">Home Page</a></span>. " +
                    "One example is with iVue down below, containing links to my experience, the company's main website, and Worlds iVue, " +
                    "the company's world map software.",
                example: {
                    type: "component",
                    src: PageSector,
                    sectorObj: PAGE_SECTORS[1]
                }
            }
        ]
    },
    {
        version: "1.2.0",
        versionPath: "1-2-0",
        releaseDate: "November 28th, 2024",
        mainDescription: "Over Update 1.2.0, I made a lot of extra pages to this website and even completed another project. " +
            "These pages are one giant leap to making this website scale for more skills and experiences I get over these years.",

        topics: [
            {
                name: "Resume Page",
                elementId: "Resume",
                description: "There used to be a button at the top-left of the site that let visitors download my resume. " +
                    "Considering that many visitors are on my site would like to see my resume without having to download a document, " +
                    "I made a new path that just contains my resume. Use the link down below to see a clearer version." +
                    "<br><br>Link To Resume: <span><a href=\"#/resume\" style=\"text-decoration: underline;\">Mohit Jain | Resume</a></span>",
                example: {
                    type: "iframe",
                    src: resume,
                }
            },
            {
                name: "Pizza Angular Project",
                elementId: "Pizza_Project",
                description: "In my \"Intro to Software Engineering\" college class, " +
                    "I worked with a group for a documentation project on making a pizza order and delivery system. " +
                    "I mainly handled making the prototype for the project, which you can use with the link down below. " +
                    "<br><br>Link To Project: <span><a href=\"" + PIZZA_WEBSITE_LINK + "\" style=\"text-decoration: underline;\">Group Five's Pizza Shop</a></span>" +
                    "<br><br>Note that this project is simply a mockup on how the final result might work. " +
                    "It is not connected to any database or authentication system that stores user accounts. " +
                    "You can use the phone number and password down below to access the main page: " +
                    "<br><br><span style=\"text-decoration: underline;\">Phone Number:</span> 8888880000 " +
                    "<br><span style=\"text-decoration: underline;\">Password:</span> 679drThree#",
                example: {
                    type: "iframe",
                    src: PIZZA_WEBSITE_LINK,
                }
            },
            {
                name: "Update Logs",
                elementId: "Updates",
                description: "I made these update logs with this update for visitors to see what I learn over my software development journey. " +
                    "Each update will show new projects I work on and new skills I learn. " +
                    "Though I did make this website with scalability in mind, updates could also show new UI developments to the website. " +
                    "Use some of the links below to navigate to different update pages:" +
                    "<br><br>Main Updates Page: <span><a href=\"#/updates/main\" style=\"text-decoration: underline;\">Mohit Jain | Updates</a></span>" +
                    "<br>Update 1.1.0: <span><a href=\"#/updates/1-1-0\" style=\"text-decoration: underline;\">Mohit Jain | Update 1.1.0</a></span>",
                example: { type: "none" }
            }
        ]
    }
]