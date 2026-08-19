<template>
<DocumentViewer v-if="documentStore.hostedDocuments[index].blobCreated"
    :url="documentStore.hostedDocuments[index].objectUrl"
    :shareMinWidth="0"
    :addShare="(index == 1)"
    :annontations="true"
    :templateIndex="index"
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

onMountedAdvanced(() => { documentStore.mountDocumentPage(); });
onBeforeUnmount(() => { documentStore.unmountDocumentPage(); });

const PAGE_METADATA = [
    {
        title: "Mohit Jain | My Resume",
        route: "resume",
        desc: "Feel free to take a look at my resume.",
        type: "default",
    },
    {
        title: "Mohit Jain | Create A GitHub Repository",
        route: "create-github-repo",
        desc: ("This is an instructions guide on how to create and clone a Repository with GitHub. " +
            "It'll walk anyone through creating an account with GitHub as well."),
        type: "default",
    },
    {
        title: "Mohit Jain | Generative Artificial Intelligence Transforming Industries Research Paper",
        route: "Generative_Artificial_Intelligence_Transforming_Industries_Research_Paper",
        desc: ("This is a research paper that I contributed to. " +
            "It talks about the Applications of Generative Artificial Intelligence in the workplace."),
        type: "default",
    }
];

const CURRENT_METADATA = PAGE_METADATA[props.index];
useHead(getMeta(CURRENT_METADATA.title, CURRENT_METADATA.route, CURRENT_METADATA.desc, "#464646", CURRENT_METADATA.type));
</script>