import { createRouter, createWebHistory } from "vue-router";

import PersonalMain from "./pages/PersonalMain.vue";
import MyGlobe from "./pages/MyGlobe.vue";
import ContactPage from "./pages/ContactPage.vue";
import InvalidRoute from "./pages/InvalidRoute.vue";
import Resume from "./pages/Resume.vue";

import SkillsNav from "./pages/skills/SkillsNav.vue";
import FrontendSkills from "./pages/skills/FrontendSkills.vue";
import ModulesSkill from "./pages/skills/modules/ModulesSkill.vue";
import AWSSkills from "./pages/skills/modules/AWSSkills.vue";

import ExperienceMain from "./pages/experience/ExperienceMain.vue";
import IvueWeb from "./pages/experience/IvueWeb.vue";
import SubloMain from "./pages/experience/sublo/SubloMain.vue";

import Updates from "./pages/updates/Updates.vue";
import UpdateLog from "./pages/updates/UpdateLog.vue";

const personalRoutes = [
    { path: "/", name: "Main Page", component: PersonalMain },
    { path: "/globe", name: "My Globe", component: MyGlobe },
    { path: "/resume", name: "My Resume", component: Resume },

    // { path: "/contact", name: "Contact Mohit", component: ContactPage, alias: ['/contact-me'] },
    { path: '/:catchAll(.*)', name: 'NotFound', component: InvalidRoute },

    {
        path: "/skills",
        children: [
            { path: "", name: "Main Skills Page", component: SkillsNav },
            { path: "frontend", children: [
                { path: "", name: "Skills Frontend Page", component: FrontendSkills },
                { path: ":id", name: "Skills Frontend Dynamic Page", component: FrontendSkills },
            ]},
            { path: "modules", children: [
                { path: "", redirect: "/skills/modules/cesium" },
                { path: ":id", name: "Skills Modules Dynamic Page", component: ModulesSkill }
            ]},
            { path: "aws", alias: ['amazon'], children: [
                { path: "", name: "Skills AWS Page", component: AWSSkills },
                { path: ":id", name: "Skills AWS Dynamic Page", component: AWSSkills },
            ]},
        ]
    },
    {
        path: "/experience",
        alias: ['/exp'],
        children: [
            { path: "", name: "Main Experience Page", component: ExperienceMain },
            { path: "sublo", name: "Main Sublo Page", component: SubloMain },
            { path: "ivue", alias: ["ivueworld"], children: [
                { path: "", name: "iVue Main Page", component: IvueWeb },
                { path: ":id", name: "iVue Dynamic Page", component: IvueWeb }
            ]},
        ]
    },
    {
        path: "/updates",
        alias: ['/update'],
        children: [
            { path: "", name: "Updates Page", component: Updates, alias: ["home", "main"] },
            { path: ":version", name: "Update Log", component: UpdateLog }
        ]
    }
];

const personalRouter = createRouter({
    history: createWebHistory(),
    routes: personalRoutes
});

export default personalRouter;