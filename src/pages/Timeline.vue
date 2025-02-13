<template>
<NavigationMain />
<div id="timeline" class="personal-web-body">
    <div class="timeline">
    <div v-for="(event, index) in events" :key="index" class="timeline-event">
      <div class="timeline-date">{{ event.date }}</div>
      <div class="timeline-content">
        <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import NavigationMain from '../components/NavigationMain.vue';
import { useWebsiteDataStore } from '../stores/WebsiteData.js';
import { onMounted } from 'vue';

const webData = useWebsiteDataStore();
onMounted(() => {
    document.title = "Mohit Jain | Timeline";
    webData.mountWebData();
});

const events = [
        {
          date: '2021',
          title: 'Foundation of the Company',
          description: 'The company was founded with a vision to innovate.',
        },
        {
          date: '2022',
          title: 'First Product Launch',
          description: 'Launched our flagship product to great acclaim.',
        },
        {
          date: '2023',
          title: 'Expansion into New Markets',
          description: 'Expanded operations to Europe and Asia.',
        },
        {
          date: '2024',
          title: 'Company Rebranding',
          description: 'Updated our brand identity to reflect growth.',
        },
        {
          date: '2025',
          title: 'Launch of New Product',
          description: 'Introduced a revolutionary new product line.',
        },
      ]
</script>

<style scoped>
#timeline {
    background: var(--blue-cobalt);
    top: 0px;
    padding-top: 50px;
}
.timeline {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #ccc;
  left: 50%;
  margin-left: -1px;
}

.timeline-event {
  padding: 20px 40px;
  position: relative;
  width: 50%;
}

.timeline-event:nth-child(odd) {
  left: 0;
  text-align: right;
}

.timeline-event:nth-child(even) {
  left: 50%;
  text-align: left;
}

.timeline-date {
  font-weight: bold;
  color: #333;
}

.timeline-content {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.timeline-content h3 {
  margin-top: 0;
}
</style>