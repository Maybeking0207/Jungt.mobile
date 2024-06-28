<script setup>
import { onMounted, ref } from 'vue'
import PocketBase from 'pocketbase'

const title = ref('')
const dataList = ref([])
const tabIndex = ref(0)

function getUrl(id) {
  return `/solution/${id}`
}
// 更新当前的 title 和 tabIndex，用于在用户切换标签时更新界面显示的内容
function changeTitle(index) {
  title.value = dataList.value[index].summarize
  tabIndex.value = index
}
onMounted(async () => {
  const pb = new PocketBase('https://autoreport.site:8888')
  const data = await pb
    .collection('servers')
    .getFullList({ expand: 'content' })
  dataList.value = data.map((item) => {
    return {
      tabs: item.tabs,
      summarize: item.summarize,
      content: item.expand.content.map((con) => {
        const url = 'https://autoreport.site:8888/api/files/zumwf6ituvjyvjn'
        return {
          id: con.id,
          title: con.title,
          content: con.content,
          img: `${url}/${con.id}/${con.img}`,
        }
      }),
    }
  })
  // window.location.href 返回当前页面的完整 URL，检查 URL 中是否包含问号
  if(window.location.href.includes('?') === true){
    // 将 URL 按照 ? 分割，获取 ? 后的部分。再将数字符串按 = 分割，获取等号后面的部分。例如，https://example.com?page=2 返回 2。
    // +：将字符串 2 转换为数字 2。
    tabIndex.value = +window.location.href.split('?')[1].split("=")[1]
  }
  title.value = dataList.value[tabIndex.value].summarize
})

</script>

<template>
  <div class="w-full">
    <div class="mt-10 mb-8 px-[6%] md:mt-20 md:mb-14">
      <div class="text-2xl text-[#333] font-[700] text-center md:text-4xl ">解决方案</div>
      <div class="text-base text-[#777] font-[300] leading-[25px] mt-3 md:mt-4 md:text-2xl md:leading-10">{{ title }}</div>
    </div>
    <a-tabs @change="changeTitle" :active-key="tabIndex" :default-active-key="tabIndex">
      <a-tab-pane
        v-for="(item, index) in dataList"
        :key="index"
        :title="item.tabs"
      >
        <div class="px-[6%] mt-8 flex flex-wrap md:px-[10%] md:mb-10">
          <div
            v-for="(itemList, indexList) in item.content"
            :key="indexList"
            class="mb-10 w-[370px] pb-[20px] bg-[#f6f7f8] hover:shadow md:w-[800px]"
          >
            <a :href="getUrl(itemList.id)" target="_blank">
              <div class="w-full h-[170px] md:h-[220px]">
                <img
                  :src="itemList.img"
                  alt="图片"
                  class="w-full h-full bg-position-center bg-cover bg-no-repeat"
                >
              </div>
              <div
                class="text-[16px] font-[600] text-[#333] leading-6 mt-5 mx-8 mb-3 md:text-[22px] md:mt-8 md:mb-6"
              >
                {{ itemList.title }}
              </div>
              <div class="text-[14px] mx-8 leading-[25px] md:text-[20px] md:leading-10">
                {{ itemList.content }}
              </div>
            </a>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
:deep(.arco-tabs-nav) {
  @apply mt-0 overflow-x-auto whitespace-nowrap;
  -webkit-overflow-scrolling: touch; /* iOS 平滑滚动支持 */
  scrollbar-width: none; /* 隐藏滚动条（可选） */
  -ms-overflow-style: none; /* 隐藏滚动条（可选） */
}

:deep(.arco-tabs-nav::before) {
  @apply hidden;
}

:deep(.arco-tabs-tab) {
  @apply flex-1 h-[48px] leading-[48px] text-[14px] cursor-pointer border-[1px] border-[#d0d0d0] border-l-0 m-0 px-4 text-[#333] md:text-2xl;
}

/* 这里把 w-full 删去才能实现 a-tabs 滑动效果 */
:deep(.arco-tabs-nav-tab-list) {
  @apply flex;
}

:deep(.arco-tabs-tab-title) {
  @apply block my-0 mx-auto;
}

:deep(.arco-tabs-tab:first-child) {
  @apply border-l-[1px] border-[#d0d0d0];
}

:deep(.arco-tabs-tab-active) {
  @apply bg-[#0e57a2] text-white !important;
}

:deep(.arco-tabs-tab:hover) {
  @apply bg-white text-[#0e57a2];
}

:deep(.arco-tabs-nav-ink) {
  @apply hidden;
}

.textbox {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.amini:hover {
  animation: 0.6s ease-in-out forwards;
  animation-name: animations;
  position: relative;
  z-index: 999 !important;
}

@keyframes animations {
  0% {
    z-index: 0;
  }
  100% {
    transform: scale(1.1);
    width: 480px;
    z-index: 1000;
  }
}

</style>
