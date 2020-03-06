<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 300px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div
              class="d-flex align-items-baseline"
              :class="{'justify-content-end': !item.origin_price, 'justify-content-between': item.origin_price}"
            >
              <div class="h5" v-if="!item.origin_price">{{ item.price | currency }} 元</div>
              <del class="h6" v-if="item.origin_price">原價 {{ item.origin_price | currency }} 元</del>
              <div class="h5" v-if="item.origin_price">現在只要 {{ item.price | currency }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getPorduct(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.isItem === item.id"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addCart(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.isCart === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pagination="pagination" @getPages="getPorducts" v-if="products.length"/>
    <div class="container mt-5" v-if="cartLen > 0">
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
              <button type="button" class="btn btn-outline-danger" @click="removeCartModal(item)">
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
    <div class="row my-5 justify-content-center">
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
    <div class="modal fade" id="productModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title">
              <span>{{ product.title }}</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="w-100" alt />
            <div
              class="d-flex align-items-baseline my-4"
              :class="{'justify-content-end': !product.origin_price, 'justify-content-between': product.origin_price}"
            >
              <div class="h4" v-if="!product.origin_price">{{ product.price | currency }} 元</div>
              <del class="h6" v-if="product.origin_price">原價 {{ product.origin_price | currency }} 元</del>
              <div class="h4" v-if="product.origin_price">現在只要 {{ product.price | currency }} 元</div>
            </div>
            <select class="custom-select form-control mt-3" v-model="buyQty">
              <option :value="num" v-for="num in 10" :key="num">選購 {{ num }} {{ product.unit }}</option>
            </select>
          </div>
          <div class="modal-footer">
            <h5 class="mr-3">小計 {{ product.price * buyQty | currency}} 元</h5>
            <button
              type="button"
              class="btn btn-primary text-white"
              @click="addCart(product.id, buyQty)"
            >加入購物車</button>
          </div>
        </div>
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
</template>

<script>
import $ from "jquery";
import Pagination from "../../components/Pagination.vue";
import Check from '../../mixin/check';
export default {
  data() {
    return {
      buyQty: 1,
      isLoading: false,
      products: [],
      product: {},
      pagination: {},
      carts: [],
      cartLen: '',
      delCart: {},
      cartTitle: "",
      status: {
        isItem: "",
        isCart: ""
      },
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
  mixins:[Check],
  components: {
    Pagination: Pagination
  },
  methods: {
    getPorducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.products = response.data.products;
        console.log(vm.products);
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    },
    getPorduct(Id) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/product/${Id}`;
      const vm = this;
      vm.isLoading = true;
      vm.buyQty = 1;
      vm.status.isItem = Id;
      this.$http.get(api).then(response => {
        console.log(response.data);
        $("#productModal").modal("show");
        vm.product = response.data.product;
        console.log(vm.product.num);
        vm.product.num = 1;
        vm.isLoading = false;
        vm.status.isItem = "";
      });
    },
    addCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`;
      const vm = this;
      vm.status.isCart = id;
      const cart = {
        product_id: id,
        qty
      };
      console.log(cart);
      this.$http.post(api, { data: cart }).then(response => {
        console.log(response.data);
        vm.status.isCart = "";
        this.getCarts();
        $("#productModal").modal("hide");
      });
    },
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
        if(response.data.success){
          vm.$router.push(`/admin/checkout/${response.data.orderId}`)
        }
      });
    }
  },

  created() {
    this.getPorducts();
    this.getCarts();
  }
};
</script>