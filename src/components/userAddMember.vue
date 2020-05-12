<template>
  <div id="app">
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        name="categoryName"
        :value="categoryName"
        label="企业类型"
        placeholder="点击选择企业类型"
        @click="showCategoryPicker = true"
        :rules="[{ required: true, message: '请选择企业类型' }]"
      />
      <van-popup v-model="showCategoryPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="categoryColumns"
          @confirm="onCategoryConfirm"
          @cancel="showCategoryPicker = false"
        />
      </van-popup>

      <van-field
        v-model="name"
        name="name"
        label="企业名称"
        placeholder="企业名称"
        :rules="[{ required: true, message: '请填写企业名称' }]"
      />

      <van-field
        v-model="businessScope"
        name="businessScope"
        label="主营业务"
        placeholder="主营业务"
        :rules="[{ required: true, message: '请填写主营业务' }]"
      />

      <van-field
        v-model="address"
        name="address"
        label="办公地址"
        placeholder="办公地址"
        :rules="[{ required: true, message: '请填写办公地址' }]"
      />
      <van-field
        readonly
        clickable
        name="buildDateStr"
        :value="buildDateStr"
        label="成立时间"
        placeholder="点击成立时间"
        :rules="[{ required: true, message: '请填写成立时间' }]"
        @click="showTimePicker = true"
      />
      <van-popup v-model="showTimePicker" position="bottom">
        <van-datetime-picker
          type="date"
          @confirm="onTimeConfirm"
          @cancel="showTimePicker = false"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </van-popup>

      <van-field
        v-model="contacts"
        name="contacts"
        label="联系人"
        placeholder="联系人"
        :rules="[{ required: true, message: '请填写联系人' }]"
      />

      <van-field
        v-model="tel"
        name="tel"
        type="digit"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <!-- <van-field
        v-model="email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ validator, message: '请输入正确的邮箱' }]"
      /> -->

      <div style="margin: 20px; margin-bottom:20px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "App",
  components: {},
  data() {
    return {
      id: "",
      content: "",
      contacts: "",
      tel: "",
      businessScope: "",
      address: "",
      buildDateStr: "",
      buildDate: "",
      name: "",
      categoryId: "",
      categoryName: "",
      comment: "",
      categoryColumns: [],
      categoryData: [],
      showCategoryPicker: false,
      showTimePicker: false,
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2025, 10, 10),
    };
  },
  methods: {
    onSubmit(values) {
      values.categoryId = this.categoryId;
      values.categoryName = this.categoryName;
      values.id = -1;
      values.deadlineDateStr = new Date();
      console.log("submit", values);

      this.$axios({
        method: "post",
        url: "http://106.12.95.128:8080/science/userAddMember",
        data: values,
        transformRequest: [
          function(data) {
            data = JSON.stringify(data);
            return data;
          },
        ],
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          console.log(response, "success"); // 成功
          Toast.success("提交成功，工作人员会与您联系");
          setTimeout(() => {
            location.reload();
          }, 1500);
          // this.$toast("提交成功");
        })
        .catch(error => console.log(error, "error")); // 失败
    },
    onTimeConfirm(time) {
      let Y = time.getFullYear() + "-";
      let M =
        (time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1) + "-";
      let D = time.getDate() + " ";

      this.buildDateStr = Y + M + D;
      this.showTimePicker = false;
    },
    onCategoryConfirm(value, index) {
      this.categoryName = value;
      this.categoryId = this.categoryData[index].id;
      this.showCategoryPicker = false;
    },
  },
  beforeMount() {
    fetch("http://106.12.95.128:8080/science/getCodesByCategory", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: new URLSearchParams([
        ["category", "MemberCategory"],
        ["pageIndex", 1],
        ["pageSize", 1000],
        ["valid", 1],
      ]).toString(),
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        this.categoryData = JSON.parse(res).datas;
        this.categoryData.forEach(e => {
          this.categoryColumns.push(e.name);
        });
        // console.log(JSON.parse(res).datas);
      });
    // console.log(JSON.parse(res).datas);
  },
};
</script>

<style lang="scss">
body {
  background: #f7f8fa;
  height: 100vh;
  // overflow: hidden;
}
.van-nav-bar {
  margin-bottom: 20px;
}

.aa {
  margin-bottom: 20px;
}
</style>
