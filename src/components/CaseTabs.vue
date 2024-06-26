<script setup>
import { onMounted, ref } from 'vue'
import PocketBase from 'pocketbase'

const tabsList = ref([])
const tabIndex = ref(0)
onMounted(async () => {
  const pb = new PocketBase('https://autoreport.site:8888')
  const data = await pb
    .collection('project')
    .getFullList({ expand: 'cardList.card' })
  tabsList.value = data.map((item) => {
    return {
      tab: item.tab,
      cardList: item.expand.cardList.map((card) => {
        const url = 'https://autoreport.site:8888/api/files/66ahek2wcveg7nl'
        return {
          title: card.title,
          value: card.value,
          img: `${url}/${card.id}/${card.img}`,
          card: card.expand.card,
        }
      }),
    }
  })
  if(window.location.href.includes('?') === true){
    tabIndex.value = +window.location.href.split('?')[1].split("=")[1]
  }
  console.log(tabIndex.value)
})
const changeTab = (index) => {
  tabIndex.value = index
}
</script>

<template>
  <div class="w-full">
    <a-tabs :active-key="tabIndex" :default-active-key="tabIndex" @change="changeTab">
      <a-tab-pane
        v-for="(item, index) in tabsList"
        :key="index"
        :title="item.tab"
      >
        <div
          v-for="(cardItem, cardIndex) in item.cardList"
          :key="cardIndex"
          class="my-[30px]"
        >
          <img :src="cardItem.img" class="w-full object-cover h-[280px] md:h-[320px]">
          <div class="p-[20px] w-full bg-white md:p-[30px]">
            <div class="items-center mb-4">
              <div class="text-[16px] font-[600] text-[#333] mb-2 md:text-[22px] md:mt-2">
                {{ cardItem.title }}
              </div>
              <div class="font-normal text-[15px] text-[#747474]">
                {{ cardItem.value }}
              </div>
            </div>
            <a-row :gutter="[0, 20]">
              <a-col
                v-for="(cardCardItem, cardCardIndex) in cardItem.card"
                :key="cardCardIndex"
              >
                <div
                  class="border-[1px] border-[#e8e8e8] pt-[10px] px-2.5 pb-2.5 md:my-1 md:p-4"
                >
                  <span class="overflow-hidden text-ellipsis leading-[25px] text-[14px] md:text-[20px] md:leading-10 ">
                    <span class="text-[#447bf3] text-[14px] font-[700] md:text-[20px]">{{
                      cardCardItem.background
                    }}</span>
                    {{ cardCardItem.data }}
                  </span>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
:deep(.arco-tabs-nav) {
  @apply h-[54px] mx-1 md:h-[68px];
}

:deep(.arco-tabs-nav::before) {
  @apply hidden;
}

:deep(.arco-tabs-tab) {
  @apply mt-[7px] pb-[13px] text-[15px] font-[700] md:text-2xl md:pb-[20px] md:mt-[9px];
}

:deep(.arco-tabs-nav-ink) {
  @apply bg-[#1890ff];
}

:deep(
    .arco-tabs-nav-type-line .arco-tabs-tab:hover .arco-tabs-tab-title::before
  ) {
  @apply bg-white;
}

:deep(.arco-tabs-tab:hover) {
  @apply text-[#1890ff];
}

:deep(.arco-tabs-tab .arco-tabs-tab-active) {
  @apply text-[#1890ff];
}

:deep(.arco-tabs-content) {
  @apply bg-[#F0F2F5] p-0;
}

:deep(.arco-tabs-content-item) {
  @apply px-[6%] mt-[10px] md:mt-[20px];
}

.textbox {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
