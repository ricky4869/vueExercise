<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table table-hover mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>E-mail</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key='item.id' @click="goOrder(item.id)">
          <td>
            {{ new Date(item.create_at * 1000).toLocaleDateString() }}
          </td>
          <td>
            <div>{{ item.user.name }}</div>
            <div>{{ item.user.email }}</div>
          </td>
          <td>
            <div v-for="product in item.products" :key='product.id'>
              {{ product.product.title }} 數量 {{ product.qty }}{{ product.product.unit }}
            </div>
          </td>
          <td>
            {{item.total}}
          </td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else class="text-danger">未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination="pagination" @getPages="getOrders"></Pagination>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination.vue";
import Check from '../../mixin/check';
export default {
  data() {
    return {
      orders: [],
      isLoading: false,
      pagination: {}
    };
  },
  mixins:[Check],
  components:{
    'Pagination': Pagination
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/admin/orders?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.orders = response.data.orders;
        console.log(response.data);
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    },
    goOrder(Id){
      this.$router.push(`/admin/checkout/${Id}`)
    }
  },
  created(){
      this.getOrders();
  }
};
</script>