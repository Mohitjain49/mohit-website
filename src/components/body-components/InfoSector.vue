<template>
<div class="info-sector center-flex-display" :style="sectorObj.style">
    <div class="info-sector-innerContainer">
        <div class="info-sector-title center-flex-display">
            <img :src="sectorObj.image" class="info-sector-image" draggable="false"/>
            <div v-html="sectorObj.title"></div>
        </div>
        
        <p v-for="desc in sectorObj.descriptions"
            class="info-sector-text"
            :style="{ 'color': sectorObj.style.color }"
            v-html="desc">
        </p>
        <div class="info-section-btn-container center-flex-display">
            <a v-for="button in sectorObj.buttons"
                class="info-section-btn"
                :href="button.link"
                target="_blank"
                v-html="button.title"
                :style="{ 'color': sectorObj.style.color }">
            </a>
        </div>

        <div v-for="picture in sectorObj.pictures" class="info-sector-picture-section">
            <div class="info-section-halfLine" :style="{ 'backgroundColor': sectorObj.style.color }"></div>
            
            <div class="info-sector-picture-header" v-html="picture.header"></div>
            <img :src="picture.file" class="info-sector-picture-file"
                @click="openPictureLink(picture.fileLink)"
                :style="{ 'cursor': (picture.fileLink === '#') ? 'default' : 'pointer' }"    
            />

            <div v-if="picture.links[0] != undefined" class="info-sector-picture-links-container">
                <div v-for="link in picture.links" class="center-flex-display" :style="{ 'width': 'calc(100% / ' + picture.links.length + ')' }">
                    <RouterLink v-if="link.nativeRoute" :to="link.path"
                        class="info-sector-picture-link"
                        v-html="link.text"
                        :style="{ 'color': sectorObj.style.color }"
                    />
                    <a v-else :href="link.path" target="_blank"
                        class="info-sector-picture-link"
                        v-html="link.text"
                        :style="{ 'color': sectorObj.style.color }">
                    </a>
                </div>
            </div>
        </div>
        <div v-if="sectorObj.addBottomSpace" style="height: 50px"></div>
    </div>
</div>
</template>

<script setup>
const props = defineProps({
    sectorObj: Object
});

/**
 * This opens a link for a picture on a different tab.
 * @param {String} link The link to navigate to.
 */
const openPictureLink = (link = "#") => {
    if(link === "#") { return; }
    window.open(link, "_blank");
}
</script>

<style scoped>
.info-sector {
    padding-top: 25px;
    width: 100%;
    height: auto;
    min-height: auto;
}
.info-sector-innerContainer {
    width: auto;
    max-width: 800px;
    height: fit-content;
}

.info-sector-title {
    height: 100px;
    width: 100%;
    font-size: 50px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: bold;
    letter-spacing: 2px;
    text-align: left;
}
.info-sector-image {
    height: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.25);
    border-radius: 10px;
    padding: 5px;
    margin-right: 5px;
}

.info-sector-text {
    font-family: 'Lexend', 'Roboto', monospace;
    height: auto;
    width: calc(100% - 30px);
    padding: 5px 15px;
    font-size: 18px;
    overflow-y: auto;
    overflow-x: hidden;
}

.info-section-btn-container {
    height: 80px;
    width: 100%;
}
.info-section-btn {
    cursor: pointer;
    padding: 10px 15px;
    border: 1px solid;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    font-family: 'Lexend', 'Roboto', sans-serif;
    letter-spacing: 1px;
    text-decoration: none;
    margin: 0px 10px;
}

.info-section-halfLine {
    margin: 30px 0px;
    width: 100%;
    height: 1px;
}

.info-sector-picture-section {
    height: auto;
    width: 100%;
}
.info-sector-picture-file {
    position: relative;
    width: 80%;
    left: 10%;
    cursor: pointer;
    background: white;
}

.info-sector-picture-header {
    margin: 20px 0px;
    font-size: 40px;
    font-family: 'Trebuchet MS', Arial, sans-serif;
    font-weight: bold;
    text-align: center;
}

.info-sector-picture-links-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 75px;
    width: 100%;
}
.info-sector-picture-link {
    padding-bottom: 2px;
    text-decoration: none;
    font-family: 'Calibri', 'Trebuchet MS', sans-serif;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    transition: border 0.2s;
}
.info-sector-picture-link:hover {
    border-bottom: 1px solid;
}

@media (max-width: 800px) {
    .info-sector-title {
        font-size: 40px;
    }
}
@media (max-width: 600px) {
    .info-sector-title {
        font-size: 30px;
    }
}
</style>