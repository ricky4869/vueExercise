<template>
  <div class="bg-light">
    <loading :active.sync="isLoading"></loading>
    <div class="py-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="payOrder">
        <h3 class="text-center">確認訂單</h3>
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit}}</td>
              <td class="align-middle text-right">{{ item.final_total | currency}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ order.total | currency}}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div>
        <div class="text-right" v-if="order.is_paid === true">
          <router-link to="/" class="btn btn-danger">返回首頁</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      orderId: "",
      order: {
        user: {
          email: ""
        }
      },
      isLoading: false
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.order = response.data.order;
        vm.isLoading = false;
        console.log(response.data);
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/pay/${vm.orderId}`;
      this.$http.post(api).then(response => {
        if (response.data.success) {
          vm.getOrder();
        }
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
    console.log(this.orderId);
  }
};
</script>