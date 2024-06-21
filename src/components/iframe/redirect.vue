<template>
  <div class="example" style="width: 100%; height: 100%">
    <a-spin />
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: 'plugRedirect',
  setup() {
      let router = useRouter();
    let route = useRoute();
    const state = reactive({});

    onMounted(() => {
        googleLoginJudgment()
        getUrlErrInfo()
    });

    const googleLoginJudgment = () => {
      if (route.query.loginType == 2 || route.query.loginType == "2") {
        if (route.query.isFrame == "1" || route.query.isFrame == 1) {
          // window.postMessage({ data: route.query, type: 0 }, "*");
          window.close();
        }
      }
    };

    const getUrlErrInfo = () => {
      const url = window.location.href;
      // 创建URL对象
      const parsedUrl = new URL(url);
      // 获取查询参数部分
      const hash = parsedUrl.hash;
      // 检查是否存在"error"参数
      const hasErrorParam = hash.includes("?error");
      // 输出结果
      if (hasErrorParam) {
        if (route.query.isFrame == "1" || route.query.isFrame == 1) {
          // window.postMessage({ data: route.query, type: 1 }, "*");
          window.close();
        } else {
          message.error('Account Not Founnd');
        }
      }
    };

    return {
      ...toRefs(state)
    };
  }
});
</script>
<style lang="less">
.example {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
