<template>
<div class="personal-web-body">
    <div class="redirect-statement">
        {{ (emailPage ? EMAIL_REDIRECT_TEXT : REDIRECT_TEXT) }}
    </div>
</div>
</template>

<script setup>
const props = defineProps({
    websiteLink: { type: String, required: true },
    emailPage: { type: Boolean, default: false }
});

const REDIRECT_TEXT = ("Redirecting You To " + props.websiteLink);
const EMAIL_REDIRECT_TEXT = ("Redirecting You To Your Email Client...");
const router = useRouter();

onMounted(() => {
    initWebData();
    window.location.replace(props.websiteLink);
    
    if(!props.emailPage) { return; }
    setTimeout(() => { router.push("/") }, 1500);
});
</script>

<style scoped>
.redirect-statement {
    width: calc(100% - 24px);
    height: fit-content;
    padding: 25px 12px 0px 12px;
    font-size: 25px;
    font-family: 'Lexend', 'Roboto', sans-serif;
    color: var(--website-text);
    text-align: center;
}

@media (max-width: 700px) {
    .redirect-statement {
        font-size: 15px;
    }
}
</style>