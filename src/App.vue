<template>
  <div id="app">
    <van-nav-bar title="需求申请" />

    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        name="category"
        :value="categoryName"
        label="需求类型"
        placeholder="点击选择需求类型"
        @click="showCategoryPicker = true"
        :rules="[{ required: true, message: '请选择需求类型' }]"
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
        readonly
        clickable
        name="technicalField"
        :value="technicalFieldName"
        label="技术领域"
        placeholder="点击选择技术领域"
        @click="showTechnicalFieldPicker = true"
        :rules="[{ required: true, message: '请选择技术领域' }]"
      />
      <van-popup v-model="showTechnicalFieldPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="technicalFieldColumns"
          @confirm="onTechnicalFieldConfirm"
          @cancel="showTechnicalFieldPicker = false"
        />
      </van-popup>

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
        :rules="[{ required: true, message: '请填写需求内容' }]"
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
      deadlineDateStr: "",
      category: "",
      categoryName: "",
      technicalField: "",
      technicalFieldName: "",
      comment: "",
      categoryColumns: ["类型1", "类型2", "类型3", "类型4", "类型5"],
      technicalFieldColumns: [
        "技术领域1",
        "技术领域2",
        "技术领域3",
        "技术领域4",
        "技术领域5",
      ],
      showCategoryPicker: false,
      showTechnicalFieldPicker: false,
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
        url: "https://106.12.95.128:8080/science/userAddDemand",
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
