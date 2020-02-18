<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="bg-light">
      <div class="container">
        <div class="row justify-content-center pt-5">
          <div class="col-md-8">
            <h3 class="text-center">購物車</h3>
            <table class="table mt-4 table-lg">
              <thead>
                <tr>
                  <th width="50"></th>
                  <th>產品名稱</th>
                  <th width="120">單價</th>
                  <th width="120">數量</th>
                  <th width="120">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in carts.carts" :key="item.id">
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="removeCartModal(item)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">已使用優惠券</div>
                  </td>

                  <td class>{{ item.product.price | currency }}/{{ item.product.unit }}</td>
                  <td class>{{ item.qty }}{{ item.product.unit}}</td>
                  <td>
                    <div :class="{'text-line-through': item.coupon}">{{ item.total | currency }}</div>
                    <div class="text-success" v-if="item.coupon">{{ item.final_total | currency }}</div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th class="h5">總計:</th>
                  <th
                    class="h5"
                    :class="{'text-line-through': carts.final_total !== carts.total}"
                  >{{ carts.total | currency}}</th>
                </tr>
                <tr class="text-success" v-if="carts.final_total !== carts.total">
                  <th></th>
                  <th></th>
                  <th></th>
                  <th class="h5">優惠價:</th>
                  <th class="h5">{{ carts.final_total | currency}}</th>
                </tr>
              </tfoot>
            </table>
            <div class="input-group my-4">
              <input type="text" class="form-control" v-model="couponCode" />
              <div class="input-group-append">
                <button type="button" class="btn btn-outline-success" @click="useCoupon">輸入優惠券</button>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5 pb-5 justify-content-center">
          <ValidationObserver v-slot="{ handleSubmit }" class="col-md-6">
            <form @submit.prevent="handleSubmit(creatOrder)">
              <h4 class="text-center">建立訂單</h4>
              <div class="form-group pb-2">
                <ValidationProvider v-slot="{ errors, classes }" rules="email|required">
                  <label for="useremail">Email</label>
                  <input
                    :class="classes"
                    type="email"
                    name="email"
                    class="form-control"
                    id="useremail"
                    v-model="form.user.email"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="form-group pb-2">
                <ValidationProvider v-slot="{ errors, classes }" rules="required">
                  <label for="username">收件人姓名</label>
                  <input
                    :class="classes"
                    type="text"
                    name="name"
                    class="form-control"
                    id="username"
                    v-model="form.user.name"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="form-group pb-2">
                <ValidationProvider v-slot="{ errors, classes }" rules="required|numeric">
                  <label for="usertel">收件人電話</label>
                  <input
                    :class="classes"
                    type="text"
                    name="tel"
                    class="form-control"
                    id="usertel"
                    v-model="form.user.tel"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="form-group pb-2">
                <ValidationProvider v-slot="{ errors, classes }" rules="required">
                  <label for="useraddresss">收件人地址</label>
                  <input
                    :class="classes"
                    type="text"
                    name="address"
                    class="form-control"
                    id="useraddress"
                    v-model="form.user.address"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="form-group">
                <label for="message">留言</label>
                <textarea
                  name="message"
                  id="message"
                  class="form-control"
                  cols="30"
                  rows="10"
                  v-model="form.message"
                ></textarea>
              </div>

              <div class="text-right">
                <button type="submit" class="btn btn-primary">送出訂單</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
      <div
        class="modal fade"
        id="delCartModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>從購物車刪除</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger">{{ delCart.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-danger" @click="removeCart">確認刪除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      isLoading: false,
      carts: [],
      delCart: {},
      couponCode: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  methods: {
    getCarts() {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.carts = response.data.data;
        vm.cartLen = response.data.data.carts.length;
        vm.isLoading = false;
        console.log(response.data);
      });
    },
    removeCartModal(item) {
      $("#delCartModal").modal("show");
      this.delCart = item;
      this.delCart.title = item.product.title;
      this.cartTitle = item.product.title;
      console.log(this.delCart);
    },
    removeCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart/${vm.delCart.id}`;
      vm.isLoading = true;
      this.$http.delete(api).then(response => {
        $("#delCartModal").modal("hide");
        vm.getCarts();
        console.log(vm.carts);
        vm.isLoading = false;
      });
    },
    useCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/coupon`;
      const code = {
        code: vm.couponCode
      };
      this.$http.post(api, { data: code }).then(response => {
        vm.getCarts();
        vm.couponCode = "";
        console.log(response.data);
      });
    },
    creatOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/order`;
      const order = vm.form;
      this.$http.post(api, { data: order }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push(`/pay/${response.data.orderId}`);
        }
      });
    }
  },
  created() {
    this.getCarts();
  }
};
</script>