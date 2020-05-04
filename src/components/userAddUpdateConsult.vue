<template>
  <div>

    <van-form @submit="onSubmit">

      <van-field
        class="aa"
        id="content"
        v-model="content"
        rows="10"
        autosize
        label=""
        type="textarea"
        name="content"
        maxlength="300"
        placeholder="请输入需求内容"
        show-word-limit
        :rules="[{ required: true, message: '请填写申请内容' }]"
      />
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
      <van-field
        v-model="email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />


      <div style="margin: 20px; margin-bottom:20px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      id: "",
      content: "",
      contacts: "",
      tel: "",
      email: "",
    };
  },
  methods: {
    onSubmit(values) {
      values.technicalField = this.technicalField;
      values.category = this.category;
      values.id = -1;
      values.deadlineDateStr = new Date();
      console.log("submit", values);

      this.$axios({
        method: "post",
        url: "http://106.12.95.128:8080/science/userAddUpdateConsult",
        data: values,
        transformRequest: [
          function(data) {
            data = JSON.stringify(data);
            return data;
          },
        ],
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          console.log(response, "success"); // 成功
        })
        .catch(error => console.log(error, "error")); // 失败
    },
    onCategoryConfirm(value, index) {
      this.categoryName = value;
      this.category = index;
      this.showCategoryPicker = false;
    },
    onTechnicalFieldConfirm(value, index) {
      this.technicalFieldName = value;
      this.technicalField = index;
      this.showTechnicalFieldPicker = false;
    },
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
