<template>
  <div>
    <div class="text">
      <div>
        钱塘中心是浙江省教育厅和钱塘新区管委会联合签发的直属联盟服务机构，由钱塘新区各大高校联合发起成立，助力企业难题解决，加速科技成果转化。将为企业免费提供各类科技政策、人才及项目落地政策和大学生创新创业政策等咨询服务。请将您的需求以最简单的方式填入下表，届时联盟中心老师将和您联系，为您解答！
      </div>
    </div>

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
        placeholder="请输入咨询内容"
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
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          console.log(response, "success"); // 成功
          Toast.success("提交成功，工作人员会与您联系");
          setTimeout(() => {
            location.reload();
          }, 1500);
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

.text {
  background-color: white;
  div {
    font-size: 0.85rem;

    color: #666;
    padding: 30px;
    margin-bottom: 20px;
    padding-top: 20px;
    line-height: 22px;
    letter-spacing: 2px;
    text-indent: 20px;
    font-weight: bold;
  }
}
.van-panel {
  margin-bottom: 20px;
}
.van-nav-bar {
  margin-bottom: 20px;
}

.aa {
  margin-bottom: 20px;
}
#app > div:nth-child(2) > div > div.van-cell.van-panel__header {
  display: none;
}
</style>
