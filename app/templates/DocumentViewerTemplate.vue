<template>
<DocumentMenu />
<DocumentViewer v-if="documentStore.hostedDocuments[index].blobCreated"
    :url="documentStore.hostedDocuments[index].objectUrl"
    :shareMinWidth="0"
    :addShare="(index == 2)"
    :annontations="(index != 3)"
    :id="htmlClass"
    :class="htmlID"
/>
<main id="resume-container" v-else>
    <div class="document-loading-static">
        <div class="loading-spinner"></div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
const documentStore = useDocumentStore();
const props = defineProps({ index: { type: Number, required: true } });

const htmlClass = computed(() => { return ((props.index != 2) ? '' : CURRENT_METADATA.class); });
const htmlID = computed(() => { return ((props.index == 2) ? '' : CURRENT_METADATA.id); });

onMounted(() => { documentStore.mountDocumentPage(); });
onBeforeUnmount(() => { documentStore.unmountDocumentPage(); });

const PAGE_METADATA = [
    {
        title: "Mohit Jain | My Resume",
        route: "resume",
        desc: "Feel free to take a look at my resume.",
        type: "default",
        id: 'tato-pdf-resume'
    },
    {
        title: "Mohit Jain | My Resume (With QR Code)",
        route: "resume/qrcode",
        desc: "Feel free to take a look at my resume. This version has a QR Code at the top right.",
        type: "resume-extra",
        id: 'tato-pdf-resume'
    },
    {
        title: "Mohit Jain | Create A GitHub Repository",
        route: "create-github-repo",
        desc: ("This is an instructions guide on how to create and clone a Repository with GitHub. " +
            "It'll walk anyone through creating an account with GitHub as well."),
        type: "default",
        class: 'tato-pdf-github-instructions'
    },
    {
        title: "Mohit Jain | Fulton Internship Program Appreciation Certificate Spring 2025",
        route: "Fulton_Internship_Program_Appreciation_Certificate_Spring_2025",
        desc: "This is my Fulton Internship Program Appreciation Certificate from Spring 2025.",
        type: "default",
        id: 'tato-pdf-certificate'
    },
];


const CURRENT_METADATA = PAGE_METADATA[props.index];
useHead(getMeta(CURRENT_METADATA.title, CURRENT_METADATA.route, CURRENT_METADATA.desc, "#464646", CURRENT_METADATA.type));
</script>