import Vue from "vue";
import App from "./App.vue";
import { Button, Form, Field } from "vant";
import { Cell, CellGroup } from "vant";
import { NavBar } from "vant";
import { Picker } from "vant";
import { Popup } from "vant";
import axios from "axios";
import { Tab, Tabs } from "vant";

Vue.use(Tab);
Vue.use(Tabs);
Vue.prototype.$axios = axios; //全局注册，使用方法为:this.$axios
Vue.use(Popup);
Vue.use(Picker);
Vue.use(NavBar);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field)
  .use(Button)
  .use(Form);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
