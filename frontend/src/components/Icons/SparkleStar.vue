<template>
    <svg viewBox="0 0 24 24" fill="none" :stroke="color || 'currentColor'" :stroke-width="strokeWidth"
        stroke-linecap="round" stroke-linejoin="round" style="width: 1em;height: 1em;display: block;"
        :style="size ? { width: size, height: size } : {}">
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <circle cx="12" cy="12" r="2.2" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: String,
        default: ''
    },
    strokeWidth: {
        type: Number,
        default: 1.6
    },
    color: {
        type: String,
        default: ''
    }
})
</script>