<script setup lang="ts">
import LandingHeader from '@/components/LandingHeader.vue'
import LandingFooter from '@/components/LandingFooter.vue'
</script>
<template>
    <div class="landing-layout">
        <LandingHeader />
        <router-view />
        <LandingFooter />
    </div>
</template>
<style scoped>

</style>