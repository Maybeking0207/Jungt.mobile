<script setup>
import { onMounted, ref } from 'vue'
import PocketBase from 'pocketbase'

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})
const dataList = ref({})
onMounted(async () => {
  const pb = new PocketBase('https://autoreport.site:8888')
  const record = await pb.collection('content').getOne(props.id, {
    expand: 'prescriptionList.prescriptionDescList',
  })
  const data = record.expand.prescriptionList.map((item) => {
    return {
      title: item.title,
      titleEn: item.titleEn,
      prescriptionDescList: item.expand.prescriptionDescList.map((pres) => {
        const url = 'https://autoreport.site:8888/api/files/d3yhb0cn81chf8q'
        return {
          icon: `${url}/${pres.id}/${pres.icon}`,
          descTitle: pres.descTitle,
          msg: pres.msg,
          tab:pres.tab,
        }
      }),
    }
  })
  dataList.value = {
    title: record.title,
    content: record.content,
    prescriptionList: data,
  }
})
const getParams = (id) =>{
  return `/case?id=${id}`
}
</script>

<template>
  <div class="w-full">
    <div class="mt-10 mb-8 px-[6%] md:mt-20 md:mb-14">
      <div class="text-2xl text-[#333] font-[700] text-center md:text-4xl ">{{ dataList?.title }}</div>
      <div class="text-base text-[#777] font-[200] leading-[25px] mt-3 md:mt-4 md:text-2xl md:leading-10">{{ dataList?.content }}</div>
    </div>

    <!-- 第一部分:方案 -->
    <div
      v-if="dataList.prescriptionList"
      class="bg-[#f5f5f5] px-[6%] pb-8"
    >
      <div class="py-[30px] md:py-[60px]">
        <div class="text-2xl text-[#333] font-[700] text-center md:text-4xl"> {{ dataList.prescriptionList[0].title }}</div>
        <div class="text-base text-[#ccc] font-[700] text-center md:text-2xl md:mt-2">{{ dataList.prescriptionList[0].titleEn }}</div>
      </div>
      <div class="mb-4 md:mb-[40px]">
        <div
          v-for="(list, listIndex) in dataList.prescriptionList[0]
            .prescriptionDescList"
          :key="listIndex"
          class="amini w-full mb-4 md:mb-8"
        >
          <div
            class="bg-white border-[1px] border-[#ededed] flex w-full p-[10px]"
          >
            <img
              :src="list.icon"
              alt="图片"
              class="w-[80px] h-[80px] mx-[1%] my-auto md:w-[100px] md:h-[100px]"
            >
            <div class="ml-3 pr-1 md:ml-6 md:pr-2">
              <div
                class="text-[#333] text-[16px] font-[500] text-ellipsis word-break-break-all -webkit-box-orient:vertical md:text-[22px] md:mt-4"
              >
                {{ list.descTitle }}
              </div>
              <div
                class="text-[#999] leading-[25px] font-normal text-[14px] mt-2  md:text-[20px] md:leading-10 md:mb-4"
              >
                {{ list.msg }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第二部分:痛点 -->
    <div
      v-if="dataList.prescriptionList"
      class="bg-white px-[6%] pb-8"
    >
      <div class="py-[30px] md:py-[60px]">
        <div class="text-2xl text-[#333] font-[700] text-center md:text-4xl"> {{ dataList.prescriptionList[1].title }}</div>
        <div class="text-base text-[#ccc] font-[700] text-center md:text-2xl md:mt-2">{{ dataList.prescriptionList[1].titleEn }}</div>
      </div>
      <div class="mb-4 md:mb-[40px]">
        <div
          v-for="(list, listIndex) in dataList.prescriptionList[1]
            .prescriptionDescList"
          :key="listIndex"
          class="amini w-full mb-4 md:mb-8"
        >
          <div
            class="bg-white border-[1px] border-[#ededed] flex w-full p-[10px]"
          >
            <img
              :src="list.icon"
              alt="图片"
              class="w-[70px] h-[70px] mx-[1%] my-[auto] pl-1 md:w-[100px] md:h-[100px]"
            >
            <div class="ml-6 pr-1 md:pr-2">
              <div
                class="text-[#333] text-[16px] font-[500] text-ellipsis pr-[10px] word-break-break-all -webkit-box-orient:vertical md:text-[22px] md:mt-4"
              >
                {{ list.descTitle }}
              </div>
              <div
                class="text-[#999] leading-[25px] font-normal text-[14px] mt-2 md:text-[20px] md:leading-10 md:mb-4"
              >
                {{ list.msg }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第三部分:收益 -->
    <div
      v-if="dataList.prescriptionList"
      class="bg-[#f5f5f5] px-[6%] pb-8"
    >
      <div class="py-[30px] md:py-[40px]">
        <div class="text-2xl text-[#333] font-[700] text-center md:text-4xl"> {{ dataList.prescriptionList[2].title }}</div>
        <div class="text-base text-[#ccc] font-[700] text-center md:text-2xl md:mt-2">{{ dataList.prescriptionList[2].titleEn }}</div>
      </div>
      <div class="mb-4 md:mb-[60px]">
        <div
          v-for="(list, listIndex) in dataList.prescriptionList[2]
            .prescriptionDescList"
          :key="listIndex"
          class="amini w-full mb-4 md:mb-8"
        >
          <div
            class="bg-white border-[1px] border-[#ededed] flex w-full p-[10px]"
          >
            <img
              :src="list.icon"
              alt="图片"
              class="w-[70px] h-[70px] mx-[1%] my-auto pl-1 md:w-[100px] md:h-[100px]"
            >
            <div class="ml-7 pr-1 md:pr-2">
              <div
                class="text-[#333] text-[16px] font-[500] text-ellipsis pr-[10px] word-break-break-all -webkit-box-orient:vertical md:text-[22px] md:mt-4"
              >
                {{ list.descTitle }}
              </div>
              <div
                class="text-[#999] leading-[25px] font-normal text-[14px] mt-2 md:text-[20px] md:leading-10 md:mb-4"
              >
                {{ list.msg }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第四部分:案例  -->
    <div
      v-if="dataList.prescriptionList && dataList.prescriptionList.length === 4"
      class="bg-white px-[6%]"
    >
      <div class="py-[30px] md:py-[60px]">
        <div class="text-2xl text-[#333] font-[700] text-center md:text-4xl"> {{ dataList.prescriptionList[3].title }}</div>
        <div class="text-base text-[#ccc] font-[700] text-center md:text-2xl md:mt-2">{{ dataList.prescriptionList[3].titleEn }}</div>
      </div>
      <div class="flex flex-wrap justify-start gap-6 relative">
        <div
          v-for="(list, listIndex) in dataList.prescriptionList[3]
            .prescriptionDescList"
          :key="listIndex"
          class="mb-10 md:mb-[60px]"
        >
        <a :href="getParams(list.tab)">
          <div
            class="bg-white border-[1px] border-[#ededed] w-[180px] md:w-[210px]"
          >
            <img
              :src="list.icon"
              alt="图片"
              class="w-[180px] h-[180px] md:w-[210px] md:h-[200px]"
            >
            <div class="flex h-full bg-gray-100 px-4 py-4">
              <div
                class="text-[#333] text-[14px] md:text-[18px]"
              >
                {{ list.descTitle }}
              </div>
            </div>
          </div>
        </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
