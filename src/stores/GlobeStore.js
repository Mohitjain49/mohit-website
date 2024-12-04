import { defineStore } from "pinia";
import { ref } from "vue";

import AppGlobe from "./AppGlobe.js";
import * as Cesium from 'cesium';

export const CESIUM_GLOBE_ID = "mohit-website-globe";
export const CESIUM_GEOCODER_ID = "mohit-website-geocoder";

export const useGlobeStore = defineStore("globe-store", () => {
    /**
     * @type {import('vue').Ref<AppGlobe>} This is the Cesium Globe that is used within the webpage.
     */
    const cesiumGlobe = ref(null);

    /**
     * @type {import('vue').Ref<MapPoints>} This manages the interest points placed on the map.
     */
    const mapPoints = ref(null);

    const globeRCMHandler = ref(new GlobeRCMHandler());
    const hoverPointHandler = ref(new HoverPointHandler());
    const rcmZoomPosition = ref(null);

    const hoverPoint = ref({
        title: "",
        position: { top: null, left: null }
    });

    /**
     * @type {Cesium.ScreenSpaceEventHandler}
     */
    var eventHandler = null;
    const eventTypes = Cesium.ScreenSpaceEventType;

    const globePresent = ref(false);
    const geocoderDisplay = ref({ display: "block" });
    const geocoderBtnTitle = ref("Hide Search Bar")
    const featureIndex = ref(-1);

    /**
     * This mounts the globe store when used by the Globe Page.
     */
    function mountGlobeStore() {
        if(globePresent.value) { return; }
        globePresent.value = true;
        document.body.style.overflowX = "hidden";

        globeRCMHandler.value.setRCMResizeEL();
        hoverPointHandler.value.setTitle();

        cesiumGlobe.value = new AppGlobe(CESIUM_GLOBE_ID, CESIUM_GEOCODER_ID);
        mapPoints.value = new MapPoints(cesiumGlobe.value.viewer);
        setGlobeELs();
    }

    /**
     * This unmounts the globe store when the user exits the Globe Page.
     */
    function unmountGlobeStore() {
        if(!globePresent.value) { return; }
        globePresent.value = false;
        document.body.style.overflowX = "auto";
        
        closeRCM();
        setFeatureIndex();
        hoverPointHandler.value.setTitle();
        globeRCMHandler.value.removeRCMResizeEL();

        removeGlobeELs();
        mapPoints.value.clearMapPoints();
        cesiumGlobe.value.destroyMap();
    }

    /**
     * This functions sets the event listeners for the map.
     */
    function setGlobeELs() {
        eventHandler = cesiumGlobe.value.viewer.screenSpaceEventHandler;
        eventHandler.setInputAction(
            (event) => {onGlobeLeft()},
            eventTypes.LEFT_DOWN
        );
        eventHandler.setInputAction(
            (event) => {onGlobeMouseMove(event)},
            eventTypes.MOUSE_MOVE
        );
        eventHandler.setInputAction(
            (event) => {onGlobeLeft()},
            eventTypes.LEFT_UP
        );
        eventHandler.setInputAction(
            (event) => {onGlobeLeft()},
            eventTypes.LEFT_CLICK
        );
        eventHandler.setInputAction(
            (event) => {onGlobeRightClick(event)},
            eventTypes.RIGHT_CLICK
        );
        eventHandler.setInputAction(
            (event) => {onGlobeLeft()},
            eventTypes.LEFT_DOUBLE_CLICK
        );
    }

    /**
     * This removes the event listeners for the map.
     */
    function removeGlobeELs() {
        eventHandler.removeInputAction(eventTypes.LEFT_DOWN);
        eventHandler.removeInputAction(eventTypes.MOUSE_MOVE);
        eventHandler.removeInputAction(eventTypes.LEFT_UP);
        eventHandler.removeInputAction(eventTypes.LEFT_CLICK);
        eventHandler.removeInputAction(eventTypes.RIGHT_CLICK);
        eventHandler.removeInputAction(eventTypes.LEFT_DOUBLE_CLICK);
        eventHandler = null;
    }

    /**
     * This is the default function ran whenever visitors use a "left" input type.
     */
    function onGlobeLeft() {
        cesiumGlobe.value.cancelCameraFlight();
        globeRCMHandler.value.setRCMOpen(-1);
    }

    /**
     * This is the default function for when the user right clicks on the map.
     */
    function onGlobeRightClick(event) {
        cesiumGlobe.value.cancelCameraFlight();
        const xValue = event.position.x;
        const yValue = event.position.y;

        globeRCMHandler.value.setRCMOpen(0);
        globeRCMHandler.value.mountRCM(xValue, yValue, 0);
        setRCMZoomPosition(xValue, yValue);
    }

    /**
     * This is the default function for when the user moves their mouse on the screen.
     */
    function onGlobeMouseMove(event) {
        const hoverPosition = event.endPosition;
        hoverPointHandler.value.setTitle(mapPoints.value.identifyPoint(hoverPosition));
        hoverPointHandler.value.setPosition(hoverPosition.y, hoverPosition.x);
    }

    /**
     * This sets the status of whether or not the Geocoder is visible or not.
     */
    function setGeocoderDisplay() {
        const geocoderPresent = (geocoderDisplay.value.display === "block");
        geocoderDisplay.value.display = (geocoderPresent ? "none" : "block");
        geocoderBtnTitle.value = (geocoderPresent ? "Show Search Bar" : "Hide Search Bar");
    }

    /**
     * Given a x position and y position, determines if the position selected allows the user to zoom in.
     * @param {Number} xValue The x position.
     * @param {Number} yValue The y position.
     */
    function setRCMZoomPosition(xValue, yValue) {
        const cartesianThree = cesiumGlobe.value.viewer.camera.pickEllipsoid(
            new Cesium.Cartesian2(xValue, yValue)
        );

        if(cartesianThree != undefined) {
            const coords = Cesium.Cartographic.fromCartesian(cartesianThree);
            rcmZoomPosition.value = Cesium.Cartesian3.fromDegrees(
                Cesium.Math.toDegrees(coords.longitude),
                Cesium.Math.toDegrees(coords.latitude), 5000
            );
        } else {
            rcmZoomPosition.value = null
        }
    }

    /**
     * This zooms to the position where the user right clicked.
     */
    function zoomToSelectedPosition() {
        if(rcmZoomPosition.value == null) { return; }
        cesiumGlobe.value.viewer.camera.flyTo({
            duration: 3,
            destination: rcmZoomPosition.value
        });
    }

    /**
     * This sets what feature of the globe is open.
     * @param index The index of the feature. -1 by default.
     */
    function setFeatureIndex(index = -1) {
        featureIndex.value = ((featureIndex.value == index) ? -1 : index);
    }

    /**
     * This calls the "changePointImage" function from the Map Points class.
     */
    function setPointImage() {
        if(globePresent.value) { mapPoints.value.changePointImage(); }
    }

    /**
     * This calls the "zoomToPoint" function from the Map Points class.
     * @param {Number} index The index of the point.
     */
    function callZoomToPoint(index) {
        if(globePresent.value && index > -1) { mapPoints.value.zoomToPoint(index); }
    }

    /**
     * This closes any present RCM.
     */
    function closeRCM() {
        globeRCMHandler.value.setRCMOpen(-1);
        rcmZoomPosition.value = null;
    }

    return { cesiumGlobe, mapPoints, globeRCMHandler, hoverPointHandler, geocoderDisplay,
        featureIndex, geocoderBtnTitle, globePresent, rcmZoomPosition, hoverPoint,
        mountGlobeStore, unmountGlobeStore, setGeocoderDisplay, setFeatureIndex,
        setPointImage, callZoomToPoint, zoomToSelectedPosition, closeRCM
    }
})

import blue_location_dot from "../assets/location-dots/Blue_Location_Dot.svg";
import green_location_dot from "../assets/location-dots/Green_Location_Dot.svg";
import black_location_dot from "../assets/location-dots/Black_Location_Dot.svg";
import orange_location_dot from "../assets/location-dots/Orange_Location_Dot.svg";
import white_location_dot from "../assets/location-dots/White_Location_Dot.svg"

export class MapPoints {
    /**
     * This class contains data for each point of interest that has affected my life.
     * This will include locations for where certain frameworks like React and Vue.js were created,
     *     all the way to personal interests like Anime and Video Games I've Played.
     * @param {Cesium.Viewer} viewer The viewer used to create and manage each point.
     */
    constructor(viewer) {
        this.viewer = viewer;
        this.INTEREST_POINTS = INTEREST_POINTS;
        Object.freeze(this.INTEREST_POINTS);

        this.points = [];
        this.pointsCreated = false;
        this.hoverPoint = "";

        this.createMapPoints();
        this.changePointImage();
    }

    /**
     * This function creates all the Map Points that can be displayed on the map.
     */
    createMapPoints() {
        this.pointsCreated = true;
        for(let i = 0; i < this.INTEREST_POINTS.length; i++) {
            const interestPoint = this.INTEREST_POINTS[i];

            this.points.push(this.viewer.entities.add({
                customId: interestPoint.title,
                position: this.createPosition(
                    interestPoint.longitude,
                    interestPoint.latitude
                ),

                billboard: {
                    image: orange_location_dot,
                    width: 25, height: 35,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                }
            }));
        }
    }

    /**
     * This clears all the map points.
     */
    clearMapPoints() {
        this.pointsCreated = false;
        this.hoverPoint = "";

        for(let i = 0; i < this.points.length; i++) {
            this.viewer.entities.remove(this.points[i]);
        }
    }

    /**
     * This zooms into a specific point.
     * @param {Number} index The index of the point.
     */
    zoomToPoint(index) {
        if(!this.pointsCreated) { return; }
        const point = this.INTEREST_POINTS[index];
        this.viewer.camera.flyTo({
            destination: this.createPosition(
                point.longitude, point.latitude, 100000
            ),
            duration: 3
        });
    }

    /**
     * This changes the image used for the point based on the local storage.
     */
    changePointImage() {
        const PERSONAL_WEBSITE_COLOR_KEY = "A7F9K3M2B8X1Q4L5T2J6N8H9P9J2X6N0M4A1S8E7G3U5R4B1";
        const colorFound = localStorage.getItem(PERSONAL_WEBSITE_COLOR_KEY);
        var image = null;
        
        if(colorFound == null || !this.pointsCreated) { return; }
        if(colorFound === "Gold/Orange") {
            image = orange_location_dot;
        } else if(colorFound === "Silver/Blue") {
            image = blue_location_dot;
        } else if(colorFound === "Forest") {
            image = green_location_dot;
        } else if(colorFound === "Light") {
            image = white_location_dot;
        } else if(colorFound === "Dark") {
            image = black_location_dot;
        }

        for(let i = 0; i < this.points.length; i++) {
            this.points[i].billboard.image = image;
        }
    }

    /**
     * Given the Cesium Cartesian 2 position, this function identifes what point visitors hover over.
     * @param {Cesium.Cartesian2} position The position the user hovered over.
     */
    identifyPoint(position) {
        const interestEntity = this.viewer.scene.pick(position);
        return ((Cesium.defined(interestEntity)) ? interestEntity.id._customId : "");
    }

    /**
     * This makes a position with three parameters.
     * @param {Number} lon The longitude of the position.
     * @param {Number} lat The latitude of the position.
     * @param {Number} alt The altitude above the position.
     */
    createPosition(lon, lat, alt = 0) {
        return Cesium.Cartesian3.fromDegrees(lon, lat, alt);
    }
}

import mappa_logo from "../assets/entertainment/Mappa_Logo.png";
import ufotable_logo from "../assets/entertainment/Ufotable_Logo.png";
import ivue_logo from "../assets/ivue/iVue_Black_Text.png";

export const INTEREST_POINTS = [
    {
        longitude: -84.1227830536351,
        latitude: 34.184434607592536,
        importance: "Work",
        title: "iVue",
        image: ivue_logo,
        location: "Cumming, GA, USA"
    },
    {
        longitude: 139.6895,
        latitude: 35.6957,
        importance: "Entertainment",
        title: "Ufotable",
        image: ufotable_logo,
        location: "Shinjuku, Tokyo, Japan"
    },
    {
        longitude: 140.078367515253,
        latitude: 35.86781218995495,
        importance: "Entertainment",
        title: "Mappa Studios",
        image: mappa_logo,
        location: "Suginami, Tokyo, Japan"
    },
]

export class GlobeRCMHandler {
    /**
     * This class handles this globe's Right Click Menus (RCMs) and
     * what happens when the user rights clicks on the Globe page in general.
     */
    constructor() {
        this.rcmOpen = -1;
        this.rcmStyle = { top: "0px", left: "0px" }

        this.RCM_HEIGHTS = [165];
        Object.freeze(this.RCM_STATS);
    }

    /**
     * This sets the status of what RCM is open given a number.
     * @param {Number} rcmIndex The index of the RCM to open. -1 by default.
     */
    setRCMOpen(rcmIndex = -1) {
        this.rcmOpen = rcmIndex;
    }

    /**
     * This mounts an RCM upon opening it.
     * @param {Number} xValue The horizontal pixel where the user right clicked.
     * @param {Number} yValue The vetrical pixel where the user right clicked.
     * @param {Number} index The index of the RCM.
     */
    mountRCM(xValue, yValue, index = -1) {
        const rcmHConstant = this.RCM_HEIGHTS[index];
        if((rcmHConstant + 30) > (window.innerHeight - yValue)) {
            this.rcmStyle.top = String(yValue - rcmHConstant - 2) + "px";
        } else {
            this.rcmStyle.top = String(yValue) + "px";
        }

        if(300 > (window.innerWidth - xValue)) {
            this.rcmStyle.left = String(xValue - 260) + "px";
        } else {
            this.rcmStyle.left = String(xValue) + "px";
        }
    }

    /**
     * This sets the event listener that closes the RCM whenever the screen size changes.
     */
    setRCMResizeEL() {
        window.addEventListener("resize", () => {this.setRCMOpen(-1)});
    }

    /**
     * This removes the event listener that closes the RCM whenever the screen size changes.
     */
    removeRCMResizeEL() {
        window.removeEventListener("resize", () => {this.setRCMOpen(-1)});
    }
}

export class HoverPointHandler {
    /**
     * This class handles the Hover Point's parameters.
     */
    constructor() {
        this.title = "";
        this.position = { top: "", left: "" }
    }

    /**
     * This sets the title of the Hover Point.
     * @param {String} title The new title.
     */
    setTitle(title = "") {
        this.title = title;
    }

    /**
     * This sets the position of where the user hovered.
     * @param {Number} top The distance from the top of the page in pixels.
     * @param {Number} left The distance from the left of the page in pixels.
     */
    setPosition(top = 0, left = 0) {
        const invertVertical = (50 > (window.innerHeight - top - 60));
        const invertHorizontal = (115 > (window.innerWidth - left))

        this.position = {
            top: String(top - (invertVertical ? 40 : 0)) + "px",
            left: String(left + (invertHorizontal ? -115 : 5)) + "px"
        }
    }
}