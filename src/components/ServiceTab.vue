<script setup>
import PocketBase from 'pocketbase';
import { onMounted, ref } from 'vue'

const pb = new PocketBase('https://autoreport.site:8888');
const server = ref([])  // 使用 ref 定义响应式变量

onMounted(async () => {
  const url = 'https://autoreport.site:8888/api/files/czzxov7j3s8n8rs'
  const records = await pb.collection('servers_mobile').getFullList({
    sort: 'created',
  });

  server.value = records.map((item) => {
    return {
      tabs: item.tabs,
      img: `${url}/${item.id}/${item.img}`,
      id: item.id,
      summarize: item.summarize,
      content: item.content,
    }
  })

  const content = await pb.collection('content').getFullList({
    sort: 'created',
  });
  content.forEach((item, index) => {
    content[
      index
    ].img = `https://autoreport.site:8888/api/files/zumwf6ituvjyvjn/${item.id}/${item.img}`
  })
  content.forEach((item) => {
    server.value.forEach((serverItem) => {
      serverItem.content.forEach((content, index) => {
        if (content === item.id)
          serverItem.content[index] = item
      })
    })
  })
})
const getParams = (id) => {
  return `/solution?id=${id}`
}
</script>

<template>
  <div class="w-full bg-[#F0F2F5]">
    <a-tabs>
      <a-tab-pane
        v-for="(item, index) in server"
        :key="index + 1"
        :title="item.tabs"
      >
        <div class="relative mt-0.5">
          <!-- 标题下的概述部分 start -->
          <div class="w-full float-left relative">
            <div class="pointer w-full py-[10px] px-[6%] overflow-hidden">
              <div
                style="line-break: anywhere; word-wrap: break-word;"
                class="w-full text-[14px] font-[300] text-[#333] relative z-[20] leading-[25px] md:text-2xl lg:text-2xl md:leading-10 lg:leading-10 "
              >
                {{ item.summarize }}
              </div>
            </div>   
          </div>
          <!-- 标题下的概述部分 end -->

          <!-- 概述下的图 start -->
          <div class="w-full px-[20px] float-left relative md:mb-10">
            <div class="relative -m-[5px]">
              <div class="w-full p-[5px] left relative">
                <a :href="getParams(index)">
                  <div v-if="item.content.length === 2">
                    <!-- 概述下的第一张图 start -->
                    <div class="relative">
                      <div
                        class="relative mb-2 h-[185px] w-full -webkit-box-orient:vertical -webkit-line-clamp(3) overflow-hidden py-[32px] px-[30px] text-ellipsis word-break-all mt-2 md:mt-4 md:h-[230px]"
                      >
                        <img
                          :src="item.content[0].img"
                          alt="图片"
                          class="h-[185px] w-full absolute top-[2px] left-[4px] md:h-[230px]"
                        >
                        <div
                          class="text-white text-[15px] font-bold relative z-[20] md:text-2xl"
                        >
                          {{ item.content[0].title }}
                        </div>
                        <div
                          class="bg-white h-[3px] mt-2.5 relative w-[30px] z-[20]"
                        />
                        <div
                          class="w-full word-break-all text-[14px] font-normal text-white relative z-[20] mt-5 textbox md:text-2xl leading-[25px] md:leading-10 md:mt-8"
                        >
                          {{ item.content[0].content }}
                        </div>
                      </div>
                      <div
                        class="h-[185px] md:h-[230px] w-full bg-gradient-to-tr from-blue-700 via-blue-700 to-blue-50 opacity-50 absolute top-[2px] left-[2px] z-10"
                      />
                    </div>
                    <!-- 概述下的第一张图 end -->

                    <!-- 概述下的第二张图 start -->
                    <div class="relative">
                      <div
                        class="relative mb-10 h-[185px] w-full -webkit-box-orient:vertical -webkit-line-clamp(3) overflow-hidden py-[32px] px-[30px] text-ellipsis word-break-all md:h-[230px]"
                      >
                        <img
                          :src="item.content[1].img"
                          alt="图片"
                          class="h-[185px] w-full absolute top-[2px] left-[4px] md:h-[230px]"
                        >
                        <div
                          class="text-white text-[15px] font-bold relative z-[20] md:text-2xl"
                        >
                          {{ item.content[1].title }}
                        </div>
                        <div
                          class="bg-white h-[3px] mt-2.5 relative w-[30px] z-[20]"
                        />
                        <div
                          class="w-full word-break-all text-[14px] font-normal text-white relative z-[20] mt-5 textbox md:text-2xl leading-[25px] md:leading-10 md:mt-8"
                        >
                          {{ item.content[1].content }}
                        </div>
                      </div>
                      <div
                        class="h-[185px] w-full bg-gradient-to-tr from-blue-700 via-blue-700 to-blue-50 opacity-50 absolute top-[2px] left-[2px] z-10 md:h-[230px]"
                      />
                    </div>
                    <!-- 概述下的第二张图 end -->
                  </div>
                  <div v-else>
                    <div class="relative">
                      <a-row :gutter="24" class="mb-2">
                        <!-- 虚拟协作左上图 start -->
                        <a-col :span="12" style="padding-right: 0">
                          <div
                            class="relative h-[185px] w-full -webkit-box-orient:vertical -webkit-line-clamp(3) overflow-hidden py-[30px] px-[15px] text-ellipsis word-break-all md:h-[230px]"
                          >
                            <img
                              :src="item.content[0].img"
                              alt="图片"
                              class="h-[185px] w-full absolute top-[2px] left-[4px] md:h-[230px]"
                            >
                            <div
                              class="text-white text-[14px] font-bold relative z-[20] md:text-2xl"
                            >
                              {{ item.content[0].title }}
                            </div>
                            <div
                              class="bg-white h-[3px] mt-2.5 relative w-[30px] z-[20]"
                            />
                            <div
                              class="w-full word-break-all text-[14px] font-normal text-white relative z-[20] mt-5 textbox leading-[25px] md:leading-10 md:text-2xl"
                            >
                              {{ item.content[0].content }}
                            </div>
                          </div>
                        </a-col>
                        <!-- 虚拟协作左上图 end -->

                        <!-- 虚拟协作右上图 start -->
                        <a-col :span="12" style="padding-left: 0">
                          <div
                            class="relative h-[185px] w-full py-[30px] px-[15px] text-ellipsis word-break-all md:h-[230px]"
                          >
                            <img
                              :src="item.content[1].img"
                              alt="图片"
                              class="h-[185px] w-full absolute top-[2px] left-0 md:h-[230px]"
                            >
                            <div
                              class="text-white text-[14px] font-bold relative z-[20] textbox md:text-2xl"
                            >
                              {{ item.content[1].title }}
                            </div>
                            <div
                              class="bg-white h-[3px] mt-2.5 relative w-[30px] z-[20]"
                            />
                            <div
                              class="w-full word-break-all text-[14px] font-normal text-white relative z-[20] mt-5 textbox leading-[25px] md:leading-10 textbox md:text-2xl"
                            >
                              {{ item.content[1].content }}
                            </div>
                          </div>
                        </a-col>
                        <!-- 虚拟协作右上图 end -->
                      </a-row>
                      <div
                        class="h-[185px] w-full bg-gradient-to-tr from-blue-700 via-blue-700 to-blue-50 opacity-50 absolute top-[2px] left-[2px] z-10 md:h-[230px]"
                      />
                    </div>
                    <div class="relative mb-10">
                      <a-row :gutter="24">
                        <!-- 虚拟协作下图 (第三张) start -->
                        <a-col :span="24">
                          <div
                            class="relative h-[185px] w-full -webkit-box-orient:vertical -webkit-line-clamp(3) overflow-hidden py-[30px] px-[20px] text-ellipsis word-break-all md:h-[230px]"
                          >
                            <img
                              :src="item.content[2].img"
                              alt="图片"
                              class="h-[185px] w-full absolute top-[2px] left-[4px] md:h-[230px]"
                            >
                            <div
                              class="text-white text-[15px] font-bold relative z-[20] md:text-2xl"
                            >
                              {{ item.content[2].title }}
                            </div>
                            <div
                              class="bg-white h-[3px] mt-2.5 relative w-[30px] z-[20]"
                            />
                            <div
                              class="w-full word-break-all text-[14px] font-normal text-white relative z-[20] mt-3 leading-[25px] md:leading-10 textbox md:text-2xl"
                            >
                              {{ item.content[2].content }}
                            </div>
                          </div>
                        </a-col>
                        <!-- 虚拟协作下图 (第三张) end -->
                      </a-row>
                      <div
                        class="h-[185px] w-full bg-gradient-to-tr from-blue-700 via-blue-700 to-blue-50 opacity-50 absolute top-[2px] left-[2px] z-10 md:h-[230px]"
                      />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <!-- 概述下的图 end -->
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>


</template>

<style scoped>
:deep(.arco-tabs-nav) {
  @apply h-[60px] overflow-x-auto whitespace-nowrap;
  -webkit-overflow-scrolling: touch; /* iOS 平滑滚动支持 */
  scrollbar-width: none; /* 隐藏滚动条（可选） */
  -ms-overflow-style: none; /* 隐藏滚动条（可选） */
}

:deep(.arco-tabs-nav::before) {
  @apply hidden;
}

:deep(.arco-tabs-tab) {
  @apply text-[15px] font-[600] md:text-2xl md:px-2;
}

:deep(.arco-tabs-nav-tab-list) {
  @apply flex text-center !important;
}

:deep(.arco-tabs-nav-ink) {
  @apply bg-[#1890ff];
}

:deep(
    .arco-tabs-nav-type-line .arco-tabs-tab:hover .arco-tabs-tab-title::before
  ) {
  @apply bg-[#f7f7f7];
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

.textbox {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
