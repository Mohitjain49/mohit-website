<template>
<ParticlesBackground :particlesOptions="WAKE_LOCK_BACKGROUND" />
<FeaturesReturnWidget />

<main id="wakeLock-page" class="personal-web-body">
    <div class="wakeLock-body">
        <div :class="['wakeLock-box', ((menuState == 1) ? 'keybinds' : '')]">
            <template v-if="menuState == 0">
                <button class="wakeLock-button" @click="webData.toggleWakeLock()">
                    <ClientOnly>
                        <font-awesome-icon :icon="webData.wakeLockIcon" :flip="webData.wakeLockChangeFresh" />
                        <span> {{ webData.wakeLockStatement }} </span>

                        <template #fallback>
                            <font-awesome-icon icon="fa-ban" />
                            <span> {{ "Feature Unavailable" }} </span>
                        </template>
                    </ClientOnly>
                </button>
                <a :href="WAKE_LOCK_MDN_DOCS" class="wakeLock-mdn-docs">
                    This page uses the Screen Wake Lock Web API to keep the screen on when enabled, 
                    preventing the screen from closing naturally.
                </a>
            </template>

            <table v-if="menuState == 1" role="table" class="keybinds-table">
                <thead>
                    <tr>
                        <th class="column-one" scope="col"> Keybind </th>
                        <th class="column-two" scope="col"> Action </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> <span>Alt</span> + <span>W</span> </td>
                        <td> Navigate To This Page </td>
                    </tr>
                    <tr>
                        <td><span>Ctrl</span> + <span>Alt</span> + <span>W</span></td>
                        <td> Remotely Toggle Wake Lock </td>
                    </tr>
                </tbody>
            </table>

            <button class="wakelock-key-btn" @click="toggleMenuState" :title="menuBtnTitle">
                <FontAwesomeIcon :icon="((menuState == 0) ? 'fa-key' : 'fa-code')" />
            </button>
        </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
const webData = useWebsiteDataStore();
const menuState = ref(0);

const WAKE_LOCK_MDN_DOCS = "https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API";
const menuBtnTitle = computed(() => { return ((menuState.value == 0) ? "See Keybinds" : "Back To Main"); });

onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | Wake Lock", "wakelock",
    "This page uses the Wake Lock Web API to keep the screen on when enabled, " +
    "preventing the screen from closing naturally."
));

/**
 * This function sets the state of the menu.
 */
function toggleMenuState() {
    menuState.value = ((menuState.value == 0) ? 1 : 0);
}
</script>

<style scoped lang="scss">
#wakeLock-page {
    background: rgba(0, 0, 0, 0.25);
    padding-top: 0px;
    min-height: 100%;
}
.wakeLock-body {
    width: 100%;
    height: calc(var(--true-100vh, 100vh) + 10px);
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--vibrant-flame);
}

.wakeLock-box {
    position: relative;
    width: 500px;
    height: 250px;
    background-color: rgba(0, 0, 0, 0.85);
    border-radius: 20px;
    border: 2px solid var(--vibrant-flame);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
}
.wakeLock-box.keybinds {
    border-color: var(--lightning-yellow);
}

.wakeLock-mdn-docs {
    width: 80%;
    height: fit-content;
    margin-top: 20px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}
.wakeLock-mdn-docs:hover {
    text-decoration: underline;
}

.wakeLock-button {
    width: 65%;
    height: 25%;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    border: 2px dotted var(--vibrant-flame);
    text-align: center;
    color: var(--vibrant-flame);
    font-size: 19px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
}
.wakeLock-button svg {
    margin-right: 5px;
}

.wakelock-key-btn {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 35px;
    width: 35px;
    font-size: 17px;
    color: var(--lightning-yellow);
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 2px dashed;
    border-bottom: 2px dashed;
    border-bottom-right-radius: 10px;
    transition: var(--default-transition), font-size 0.2s;
}
.wakeLock-box.keybinds .wakelock-key-btn {
    color: var(--vibrant-flame) !important;
}
.wakelock-key-btn:hover {
    background-color: var(--dark-background);
    font-size: 19px;
}

.keybinds-table {
    width: 80%;
    color: var(--lightning-yellow);
    border-collapse: separate;
    border-spacing: 0;
    font-family: 'Montserrat', sans-serif;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid white;
}
.keybinds-table th, .keybinds-table td {
    padding: 10px 14px;
    border: 1px solid #e6e6e6;
    text-align: left;
    font-size: 13px;
}

.keybinds-table .column-one {
    width: 35%;
}
.keybinds-table .column-two {
    width: 65%;
}

.keybinds-table thead th {
    background: var(--dark-background);
    font-weight: 600;
    font-size: 17px;
}
.keybinds-table td span {
    background-color: #3a3a3a;
    padding: 3px;
    border-radius: 5px;
}

@media (max-width: 600px) {
    .wakeLock-box {
        width: 300px;
        height: 250px;
    }
    .wakeLock-button {
        width: 80%;
        font-size: 14px;
    }
    .keybinds-table {
        width: 90%
    }

    .keybinds-table th, .keybinds-table td {
        padding: 8px 10px;
    }
    .keybinds-table .column-one {
        width: 50%;
    }
    .keybinds-table .column-two {
        width: 50%;
    }
}
</style>