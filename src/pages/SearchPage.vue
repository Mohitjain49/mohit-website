<template>
<client-only>
    <vue-particles id="particlests" :options="NIGHT_BACKGROUND"></vue-particles>
</client-only>

<main class="personal-web-body transparent">
    <div class="search-wrapper">
        <h1 @click="performSearch()">Search the Site</h1>
        <input v-model="query" type="text" placeholder="Search..." class="search-input" />

        <div v-if="results.length > 0" class="results">
            <div v-for="result in results" :key="result.item.id" class="result">
                <h2 class="title">{{ result.item.title }}</h2>
                <p class="excerpt">{{ truncate(result.item.content, 160) }}</p>
                <a :href="result.item.url" class="link">View Page</a>
            </div>
        </div>
        <p v-else-if="(query !== '')" class="no-results">No results found.</p>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
import Fuse from 'fuse.js';
const router = useRouter();
const route = useRoute();

onMounted(() => {
    initWebData();
    query.value = route.query.q;
    performSearch();
});


useHead(getMeta('Mohit Jain | Search', '/search',
    "You can search through any page in my website here."
));

const index = [
    {
        id: 1,
        title: 'My Experience',
        content: 'I work with Vue.js, Cesium, AWS, and drones.',
        url: '/experience',
    },
    {
        id: 2,
        title: 'Projects',
        content: 'Explore my recent work in drone mapping and web development.',
        url: '/projects',
    },
]

const fuse = new Fuse(index, {
    keys: ['title', 'content'],
    threshold: 0.5,
})

const query = ref('')
const results = ref([])

function performSearch() {
    router.push({ query: { q: query.value } }).then(() => {
        results.value = ((query.value !== '') ? fuse.search(query.value) : [])
    });
}

function truncate(text, length) {
    return ((text.length > length) ? (text.slice(0, length) + '...') : text)
}
</script>

<style scoped>
.search-wrapper {
    width: calc(100% - 40px);
    max-width: 800px;
    min-height: calc(100vh - 90px);
    margin: auto;
    margin-top: 30px;
    font-family: 'Segoe UI', sans-serif;
    color: #f5f5f5;
    padding: 0px 10px;
    border-radius: 12px;
}
.search-wrapper h1 {
    color: var(--website-light-text);
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
}

.search-input {
    width: calc(100% - 2rem);
    padding: 0.8rem 1rem;
    border: none;
    border-radius: 8px;
    background: #2a2a2a;
    color: #fff;
    font-size: 1rem;
    margin-bottom: 1.5rem;
}

.results {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.result {
    padding: 1rem;
    background: #2b2b2b;
    border-radius: 10px;
    border: 1px solid #3c3c3c;
}

.title {
    margin: 0;
    color: #f9b620;
}

.excerpt {
    color: #ccc;
    margin: 0.5rem 0;
}

.link {
    color: #8cc6ff;
    text-decoration: none;
    font-weight: bold;
}

.link:hover {
    text-decoration: underline;
}

.no-results {
    color: #999;
    margin-top: 1rem;
}
</style>