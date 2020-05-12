<template>
  <div id="app">
    <van-nav-bar title="联盟会员" />
    <!-- <van-tabs v-model="active" animated>
      <van-tab title="需求申请"> <addDemand /></van-tab>
      <van-tab title="政策咨询"><userAddUpdateConsult /></van-tab>
    </van-tabs> -->
    <!-- <addDemand /> -->
    <userAddMember />
    <!-- <userAddUpdateConsult /> -->
  </div>
</template>

<script>
// import addDemand from "./components/addDemand";
import userAddMember from "./components/userAddMember";
export default {
  name: "App",
  components: { userAddMember },
  data() {
    return { active: 0 };
  },
};
</script>

<style lang="scss">
#app > div > div.van-tabs__wrap.van-hairline--top-bottom {
  margin-bottom: 10px;
}

.van-tabs__line {
  background-color: #1989fa;
}
.van-tabs {
  height: 100%;
}
#app {
  background: #f7f8fa;
  height: 100vh;
}
body {
  background: #f7f8fa;
  height: 100vh;
  // overflow: hidden;
}
.van-nav-bar {
  margin-bottom: 0px;
}

.aa {
  margin-bottom: 20px;
}
</style>
