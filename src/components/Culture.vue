<script setup>
import PocketBase from 'pocketbase';
import ModuleTitle3 from '../components/ModuleTitle3.vue'
import { onMounted, ref } from 'vue'

const culture = ref([])
const pb = new PocketBase('https://autoreport.site:8888');

onMounted(async () => {
  const records = await pb.collection('culture').getFullList({
    sort:"ent",
  })
  culture.value = records
})
</script>

<template>
  <div class="w-full bg-[#f7f7f7]">
    <ModuleTitle3 chinese="企业文化" introduce="Culture" />
      <div class="px-[6%]">
        <a-row :gutter="24">
          <a-col :span="12">
            <div class="s-custom relative bg-white h-[140px] md:h-[175px]">
              <div
                class="text-[#f0f7ff] text-[50px] font-[700] absolute top-0 z-1 md:text-[60px]"
              >
                01
              </div>
              <div class="flex">
                <div
                  class="text-[#294dce] text-[22px] ml-[20px] pt-[18px] z-10 relative md:text-4xl md:pt-[27px]"
                >
                  {{ culture[0]?.ent }}
                </div>
                <div
                  class="text-[#000] text-[16px] mt-[23px] mb-[19px] pl-7 z-10 relative md:text-[24px] md:mt-[28px] md:mb-[20px] md:pl-9"
                >
                  {{ culture[0]?.title }}
                </div>
              </div>
              <div
                class="text-[#999] text-[14px] leading-[25px] font-normal mx-6 md:text-2xl md:leading-[32px]"
              >
                {{ culture[0]?.content }}
              </div>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="s-custom relative bg-white h-[140px] md:h-[175px]">
              <div
                class="text-[#f0f7ff] text-[50px] font-[700] absolute top-0 z-1 md:text-[60px]"
              >
                02
              </div>
              <div class="flex">
                <div
                  class="text-[#294dce] text-[22px] ml-[20px] pt-[18px] z-10 relative md:pt-[27px] md:text-4xl"
                >
                  {{ culture[1]?.ent }}
                </div>
                <div
                  class="text-[#000] text-[16px] mt-[23px] mb-[19px] pl-7 z-10 relative md:text-[24px] md:mt-[28px] md:mb-[20px] md:pl-9"
                >
                  {{ culture[2]?.title }}
                </div>
              </div>
              <div
                class="text-[#999] text-[14px] leading-[25px] font-normal mx-6 md:text-2xl md:leading-[32px]"
              >
                {{ culture[2]?.content }}
              </div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <div class="my-10 bg-white relative h-[150px] md:h-[175px] md:my-[50px]">
              <div
                class="text-[#f0f7ff] text-[50px] font-[700] absolute top-0 z-1 md:text-[60px]"
              >
                03
              </div>
              <div class="flex">
                <div
                  class="text-[#294dce] text-[22px] ml-[20px] pt-[18px] z-10 relative md:text-4xl md:pt-[27px]"
                >
                  {{ culture[2]?.ent }}
                </div>
                <div
                  class="text-[#000] text-[16px] mt-[23px] mb-[20px] pl-7 z-10 relative md:text-[24px] md:mt-[28px] md:mb-[20px] md:pl-9"
                >
                  {{ culture[1]?.title }}
                </div>
              </div>
              <div
                class="text-[#999] text-[14px] leading-[25px] font-normal mx-6 md:text-2xl md:leading-[32px]"
              >
                {{ culture[1]?.content }}
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
  </div>
</template>

<style scoped>
@media (max-width: 400px) {
  .s-custom {
    height: 155px;
  }
}
</style>
