<template>
<main class="personal-web-body">
    <div class="redirect-statement"> Redirecting You To Your Email Client... </div>
</main>
</template>

<script setup>
const EMAIL_LINK = SOCIALS[0].link;
const router = useRouter();

onMountedAdvanced(() => {
    window.location.replace(EMAIL_LINK);
    setTimeout(() => { router.push("/") }, 1500);
});

useHead(getMetaWithLink("Mohit Jain | Email Me", EMAIL_LINK,
    "This link will redirect you to your email client for you to email me."
))
</script>