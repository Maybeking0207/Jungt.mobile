<script setup>
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import PocketBase from 'pocketbase';
const pb = new PocketBase('https://autoreport.site:8888')
const messageValue = ref({
  name: '',
  content: '',
  phone: '',
})

const submitClick = async() =>  {
  if (messageValue.value.name === '')
    Message.info('请输入姓名')

  if (messageValue.value.phone === '')
    Message.info('请输入电话')

  if (messageValue.value.name !== '' && messageValue.value.phone !== '') {
    await pb.collection('message').create(messageValue.value).then((res) => {
      Message.success('您的留言我们已经收到')
      messageValue.value = {
        name: '',
        content: '',
        phone: '',
      }
    })
  }
}
</script>

<template>
  <div class="w-full h-[560px] bg-[#121416] relative md:h-[770px]">
    <div class="pt-[40px] px-[6%] h-[500px] md:pt-[60px] md:h-[686px]">
      <div class="flex md:mb-[10px]">
        <div> 
          <div class="text-2xl text-white mb-[0.5em] md:text-4xl">
            联系我们
          </div>
          <div class="text-base text-[#ccc] mb-[2em] md:text-2xl">
            Contact Us
          </div>
        </div>
        <div class="text-[#ccc] text-[16px] font-[500] ml-[45px] md:text-2xl mt-3 md:ml-60">
          邮箱：sales@jungt.com
        </div>
      </div>
      <a-row :gutter="24">
        <a-col :span="24">
          <a-row>
            <a-col :span="12">
              <input
                v-model="messageValue.name"
                class="w-[85%] h-[50px] bg-[#2f3640] list-none border-0 outline-none p-[10px] text-white text-[13px] md:text-[18px] md:px-[30px] md:h-[60px]" name="name"
                placeholder="请输入姓名"
              >
            </a-col>
            <a-col :span="11">
              <input
                v-model="messageValue.phone"
                class="w-full h-[50px] bg-[#2f3640] list-none border-0 outline-none  p-[10px] text-white text-[13px] ml-4 md:text-[18px] md:px-[30px] md:h-[60px]"
                name="phone" placeholder="请输入手机号"
              >
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <textarea
                v-model="messageValue.content"
                class="w-full md:w-[97.5%] h-[100px] bg-[#2f3640] list-none border-0 outline-none py-[20px] px-[10px] text-white align-top text-[13px] mt-[20px] md:text-[18px] md:px-[30px] md:h-[120px] md:mt-[40px]"
                name="message" placeholder="请输入留言内容"
              />
            </a-col>
          </a-row>
          <a-row>
            <a-button type="primary" class="arco-btn-size-medium" @click="submitClick">
              提交
            </a-button>
          </a-row>
        </a-col>
      </a-row>
      <div class="new-footer-icons border-t-[1px] border-[#292d34] px-[6%]">
        <div class="new-footer-code flex justify-between py-10">
          <!-- 微信 icon 开始 -->
          <div class="new-footer-code-wx relative">
            <img src="/public/icon/wx.5941cfd7.png" class="w-[34px] h-[34px] md:w-[50px] md:h-[50px]"/>
            <div class="wx-gzh">
              <img alt="wx二维码" src="/WeChat-official-account.png">
            </div>
            <div class="stri-wx"></div>
          </div>
          <!-- 微信 icon 结束 -->
          <!-- 微博 icon 开始 -->
          <div class="new-footer-code-wb">
            <a href="https://weibo.com/u/6253522927"><img src="/public/icon/wb.a3ce2dd3.png" class="w-[34px] h-[34px] md:w-[50px] md:h-[50px]"/></a> 
          </div>
          <!-- 微博 icon 结束 -->
          <!-- 抖音 icon 开始 -->
          <div class="new-footer-code-dy relative">
            <img src="/public/icon/dy.af83eb1e.png" class="w-[34px] h-[34px] md:w-[50px] md:h-[50px]"/>
            <div class="dy-gzh">
              <img alt="dy二维码" src="/dy-gzh-ewm.png">
            </div>
            <div class="stri-dy"></div>
          </div>
          <!-- 抖音 icon 结束 -->
          <!-- 小红书 icon 开始 -->
          <div class="new-footer-code-xhs">
            <a href="https://www.xiaohongshu.com/user/profile/64df3d8a0000000001007ee0"><img src="/public/icon/xhs6.png" class="w-[34px] h-[34px] md:w-[50px] md:h-[50px]"/></a>
          </div>
          <!-- 小红书 icon 结束 -->
        </div>
      </div>  
    </div>
    <footer
      class="w-full flex justify-center items-center bg-[#1b1e21] text-white h-[60px] leading-[60px] md:h-[80px] md:text-2xl"
    >
      上海疆通科技有限公司版权所有
      <a href="https://beian.miit.gov.cn/" style="list-style: none; text-decoration: none; color: purple">沪ICP备</a>
      18029365号
    </footer>
  </div>
</template>
<style scoped>
:deep(.arco-btn-size-medium) {
  @apply text-white my-[30px] text-[13px] w-[95px] h-[45px] mx-auto md:w-[120px] md:h-[56px] md:text-2xl md:my-[50px];
}
.wx-gzh{
  width: 104px;
  height: 0px;
  background-color: #fff;
  position: absolute;
  bottom: 50px;
  left: 50%;
  margin-left: -50px;
  overflow: hidden;
}
.wx-gzh img{
  width: 96px;
  margin: 4px auto;
}
.new-footer-code-wx:hover>.wx-gzh{
  height: 104px;
}
.stri-wx{
  width: 0;
  height: 0;
  border-top: 8px solid #fff;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  position: absolute;
  top: -16px;
  left: 50%;
  margin-left: -8px;
  display: none;
}
.new-footer-code-wx:hover>.stri-wx{
  display: block;
}
.dy-gzh{
  width: 104px;
  height: 0px;
  background-color: #fff;
  position: absolute;
  bottom: 50px;
  left: 50%;
  margin-left: -50px;
  overflow: hidden;
}
.dy-gzh img{
  width: 96px;
  margin: 4px auto;
}
.new-footer-code-dy:hover>.dy-gzh{
  height: 104px;
}
.stri-dy{
  width: 0;
  height: 0;
  border-top: 8px solid #fff;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  position: absolute;
  top: -16px;
  left: 50%;
  margin-left: -8px;
  display: none;
}
.new-footer-code-dy:hover>.stri-dy{
  display: block;
}
@media (min-width: 768px) {
  .wx-gzh {
    width: 208px; /* 增大宽度 */
    height: 0px;
    bottom: 80px;
    margin-left: -104px; /* 调整水平居中 */
    overflow: hidden;
  }
  .wx-gzh img {
    width: 192px; /* 增大图片宽度 */
    margin: 8px auto; /* 调整内边距 */
  }
  .new-footer-code-wx:hover > .wx-gzh {
    height: 208px; /* 增大高度 */
  }
  .stri-wx {
    border-top: 16px solid #fff; /* 调整三角形大小 */
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    top: -32px; /* 调整位置 */
    margin-left: -16px; /* 调整水平居中 */
  }
  .new-footer-code-wx:hover>.stri-wx{
    display: block;
  }
  .dy-gzh{
    width: 208px;
    height: 0px;
    background-color: #fff;
    position: absolute;
    bottom: 80px;
    left: 50%;
    margin-left: -104px;
    overflow: hidden;
  }
  .dy-gzh img{
    width: 192px;
    margin: 8px auto;
  }
  .new-footer-code-dy:hover>.dy-gzh{
    height: 208px;
  }
  .stri-dy{
    border-top: 16px solid #fff;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    position: absolute;
    top: -32px;
    left: 50%;
    margin-left: -16px;
    display: none;
  }
  .new-footer-code-dy:hover>.stri-dy{
    display: block;
  }
  }
</style>