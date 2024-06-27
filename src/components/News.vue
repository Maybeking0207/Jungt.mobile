<script setup>
import { onMounted, ref } from 'vue'
import PocketBase from 'pocketbase'

const NewsListView = ref([]) // 响应式变量。当 NewsListView 的值发生变化时，Vue 会自动更新使用到这个变量的模板部分，使 UI 保持与数据一致
const pb = new PocketBase('https://autoreport.site:8888')

onMounted(async () => {
  const records = await pb.collection('news').getFullList({
    sort:"-time",
  })
  const data = records.map((item) => {
    return {
      title: item.title,
      time: item.time,
      link: item.link,
    }
  })
  NewsListView.value = data.slice(0, 5);
})
</script>

<template>
  <div class="bg-white pt-[40px] pb-[28px] mx-[6%] relative md:pt-20 md:pb-14">
    <div class="text-2xl text-[#333] font-[700] text-center md:text-4xl">
      新闻资讯
    </div>
    <div class="text-base text-[#ccc] font-[700] text-center md:text-2xl">
      News
    </div>
    <!-- 新闻内容 start -->
    <div class="mt-8 md:mt-20">
      <div v-for="(newsItem, index) in NewsListView" :key="index">
        <div class="card border-t-[1px] md:border-t-[2px] border-[#e0e0e0] w-full bg-white py-[14px] pl-1 md:py-[26px]">         
          <a :href="newsItem.link" target="_blank" class="text-ellipsis overflow-hidden w-full text-[14px] text-[#111111] md:text-2xl line-clamp-1">
            {{ newsItem.title }}
          </a>
          <span class="text-[14px] font-normal text-[#959595] block mt-1 md:text-2xl md:mt-3">
            {{ newsItem.time.slice(0, 10) }}
          </span>
        </div>
      </div>
    </div>
    <!-- 新闻内容 end -->
     <div class="know-more my-5">
      <a href="https://mp.weixin.qq.com/mp/homepage?__biz=MzIwMDg4MDQyMA==&hid=6&sn=3fcd9a84b24e2c9d8665828cc67e0f42&scene=18#wechat_redirect" class="text-[#E73522] text-[14px] font-[700] md:text-2xl">了解更多新闻动态</a>
      <span class="arrow-right"></span>
    </div>
  </div>
</template>

<style scoped>
.arrow-right {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-top: 2px solid #E73522;
  border-right: 2px solid #E73522;
  transform: rotate(45deg);
  margin-left: 16px;
}

.know-more:hover>.arrow-right{
  margin-left: 40px;
  transition: all 0.3s ease-out;
}
@media (min-width: 768px){
  .arrow-right {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-bottom: 2px;
    border-top: 4px solid #E73522;
    border-right: 4px solid #E73522;
    transform: rotate(45deg);
    margin-left: 20px;
  }
  .know-more:hover>.arrow-right{
  margin-left: 60px;
  transition: all 0.3s ease-out;
  }
}
</style>
