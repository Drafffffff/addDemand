<template>
  <div id="app">
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
        :rules="[{ validator, message: '请输入正确的邮箱' }]"
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
      email: "",
      deadlineDateStr: "",
      category: "",
      categoryName: "",
      technicalField: "",
      technicalFieldName: "",
      comment: "",
      categoryColumns: [],
      categoryData: [],
      technicalFieldColumns: [],
      technicalFieldData: [],
      showCategoryPicker: false,
      showTechnicalFieldPicker: false,
      // pattern: /\^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    };
  },
  methods: {
    validator(val) {
      var regEmail = /^([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      return regEmail.test(val);
    },
    onSubmit(values) {
      values.technicalField = this.technicalField;
      values.category = this.category;
      values.technicalFieldName = this.technicalFieldName;
      values.categoryName = this.categoryName;
      values.id = -1;
      values.deadlineDateStr = new Date();
      console.log("submit", values);

      this.$axios({
        method: "post",
        url: "http://106.12.95.128:8080/science/userAddDemand",
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
    onCategoryConfirm(value, index) {
      this.categoryName = value;
      this.category = this.categoryData[index].id;
      this.showCategoryPicker = false;
    },
    onTechnicalFieldConfirm(value, index) {
      this.technicalFieldName = value;
      this.technicalField = this.technicalFieldData[index].id;
      this.showTechnicalFieldPicker = false;
    },
  },
  beforeMount() {
    // this.$axios({
    //   method: "post",
    //   url: "http://106.12.95.128:8080/science/getCodesByCategory",
    //   headers: {
    //     "Content-type": "application/x-www-form-urlencoded",
    //   },
    //   data: {
    //     category: "DemandCategory",
    //     pageIndex: 1,
    //     pageSize: 1000,
    //     valid: 1,
    //   },
    //   transformRequest: [
    //     function(data) {
    //       let ret = "";
    //       for (let it in data) {
    //         ret +=
    //           encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
    //       }
    //       return ret;
    //     },
    //   ],
    // }).then(res => {
    //   console.log(res.data);
    // });

    fetch("http://106.12.95.128:8080/science/getCodesByCategory", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: new URLSearchParams([
        ["category", "DemandCategory"],
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

    fetch("http://106.12.95.128:8080/science/getCommonCategorys", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: new URLSearchParams([
        ["category", "0107"],
        ["pageIndex", 1],
        ["pageSize", 1000],
        ["valid", 1],
      ]).toString(),
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        this.technicalFieldData = JSON.parse(res).datas;
        this.technicalFieldData.forEach(e => {
          this.technicalFieldColumns.push(e.name);
        });
        // console.log(JSON.parse(res).datas);
      });
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
