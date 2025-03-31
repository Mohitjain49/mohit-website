<template>
<RouterLink to="/skills" class="skills-note">
    <div class="skills-note-image">
        <font-awesome-icon icon="fa-circle-info" class="skills-note-moreInfo-icon" />
    </div>
    <div class="skills-note-body more-info">
        <div class="skills-note-header"> More Info </div>
        <div class="skills-note-desc">
            Click on this card or the "Skills" link at the top for a detailed description on all my skills.
        </div>
    </div>
</RouterLink>
</template>

<script setup>
import "@/styles/note.css";
</script>