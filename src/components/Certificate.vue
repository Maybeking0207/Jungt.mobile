<script setup>
import PocketBase from 'pocketbase';
import { onMounted, ref } from 'vue'
import ModuleTitle3 from '../components/ModuleTitle3.vue'

const itemList = ref([])
const pb = new PocketBase('https://autoreport.site:8888');

onMounted(async () => {
  const records = await pb.collection('certificate').getFullList({
    sort:"created",
  })
  const url = 'https://autoreport.site:8888/api/files/jixbw3lox0vzbo8'
  const list = records.map((item) => {
    return {
      id: item.id,
      title: item.title,
      img: `${url}/${item.id}/${item.image}`,
    }
  })
  getcertificate(itemList, list)
})

function getcertificate(itemList, list) {
  let path = []
  let count = 0
  list.forEach((item) => {
    count++
    path.push(item)
    if (path.length === 3 || count === list.length) {
      itemList.value.push(path)
      path = []
    }
  })
}
</script>

<template>
  <div class="relative h-[300px] md:h-[460px]">
    <ModuleTitle3 chinese="企业证书" introduce="Certificate" />
    <div class="px-[6%] mt-4">
      <a-carousel
        :default-current="1"
        :auto-play="true"
        :autoplay-speed="2000"
        :style="{
          height: '25vh',
        }"
        arrows
        indicator-type="never"
      >
        <a-carousel-item v-for="(item, index) in itemList" :key="index">
          <a-row :gutter="8" class="certificateRow">
            <a-col
              v-for="(certificate, certIndex) in item"
              :key="certIndex"
              :span="8"
              class="certificateCol"
            >
              <div style="text-align: center">
                <img
                  :src="certificate.img"
                  class="h-[90%] w-[70%] my-0 mx-auto"
                >
                <div
                  class="text-white md:text-2xl mt-[25px] z-50"
                  style="text-align: center;"
                >
                  {{ certificate.title }}
                </div>
              </div>
            </a-col>
          </a-row>
        </a-carousel-item>
      </a-carousel>
    </div>
    <div class="b-bg h-[180px] absolute w-full top-[100px] mt-5 z-5 md:top-[240px] md:h-[220px]">
      <svg height="100%" width="100%">
        <ellipse cx="50%" cy="300" rx="70%" ry="145%" style="fill: #294dce" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
:deep(.arco-carousel) {
  @apply relative z-50;
}

:deep(.arco-carousel-arrow-left) {
  @apply bg-[#d9d9d9] absolute -left-[16px] top-[35px] md:top-[80px];
}

:deep(.arco-carousel-arrow-right) {
  @apply bg-[#d9d9d9] absolute -right-[16px] top-[35px] md:top-[80px];
}

:deep(.arco-carousel-arrow > div:hover) {
  @apply bg-[#d9d9d9];
}

@media (max-width: 400px) {
  .s-custom {
    height: 155px;
  }
  .b-bg{
    top: 90px
  }
}

</style>

