<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click.prevent="openCartModal(true)">加入優惠券</button>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th width="180">優惠碼</th>
          <th width="100">折扣</th>
          <th width="100">到期日</th>
          <th width="100">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date }}</td>
          <td>
            <span class="text-danger" v-if="!item.is_enabled">未啟用</span>
            <span class="text-success" v-else>啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click.prevent="openCartModal(false, item)"
              >編輯</button>
              <button class="btn btn-outline-secondary btn-sm" @click="removeCoupon(item.id)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination="pagination" @getPages="getCoupons"></Pagination>

    <div class="modal fade" id="cartModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title">新增優惠券</h5>
            <button class="close text-white" data-dismiss="modal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <form action>
              <div class="form-group">
                <label for="title" class="h6">標題</label>
                <input type="text" class="form-control" id="title" v-model="coupon.title" />
              </div>
              <div class="form-group">
                <label for="code" class="h6">優惠碼</label>
                <input type="text" class="form-control" id="code" v-model="coupon.code" />
              </div>
              <div class="form-group">
                <label for="due_date" class="h6">到期日</label>
                <input type="date" class="form-control" id="due_date" v-model="coupon.due_date" />
              </div>
              <div class="form-group">
                <label for="percent" class="h6">折扣</label>
                <input type="text" class="form-control" id="percent" v-model="coupon.percent" />
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                    v-model="coupon.is_enabled"
                  />
                  <label for="is_enabled" class="h6 mb-0">是否啟用</label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button class="btn btn-primary" @click="addCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../components/Pagination.vue";
export default {
  data() {
    return {
      coupons: [],
      coupon: {},
      isLoading: false,
      pagination: {},
      isNew: false
    };
  },
  components: {
    Pagination: Pagination
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.coupons = response.data.coupons;
        console.log(response.data);
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    },
    addCoupon() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/admin/coupon`;
      let http = "post";
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/admin/coupon/${vm.coupon.id}`;
        http = "put";
      }
      this.$http[http](api, { data: vm.coupon }).then(response => {
        console.log(response.data);
        $("#cartModal").modal("hide");
        this.getCoupons();
      });
    },
    openCartModal(isNew, item) {
      if (isNew) {
        this.coupon = {};
        this.isNew = isNew;
      } else {
        this.coupon = Object.assign({}, item);
        this.isNew = isNew;
      }
      $("#cartModal").modal("show");
    },
    removeCoupon(id){
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/admin/coupon/${id}`;
      const vm = this;
      this.$http.delete(api).then(response => {
        console.log(response.data)
        vm.getCoupons();
      });
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>