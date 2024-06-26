<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    chinese: {
        type: String,
        required: true
    },
    introduce: {
        type: String,
        required: true
    }
});
</script>

<template>
    <!-- 每个页面的标题 -->
    <div class="py-[30px] md:py-[60px]">
      <div class="text-2xl text-[#333] font-[700] text-center md:text-4xl">{{ chinese }}</div>
      <div class="text-base text-[#ccc] font-[700] text-center md:text-2xl md:mt-2">{{ introduce }}</div>
    </div>
</template>