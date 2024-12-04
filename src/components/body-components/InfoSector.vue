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
import "../../styles/sectors/infosectorstyles.css";
const props = defineProps({ sectorObj: Object });

/**
 * This opens a link for a picture on a different tab.
 * @param {String} link The link to navigate to.
 */
const openPictureLink = (link = "#") => {
    if(link === "#") { return; }
    window.open(link, "_blank");
}
</script>