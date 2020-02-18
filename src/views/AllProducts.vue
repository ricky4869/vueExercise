<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div
        class="col-md-4 mb-4 product-item"
        v-for="item in filterProducts.slice(starProduct, starProduct + 10)"
        :key="item.id"
      >
        <div class="card border-0 shadow-sm">
          <div
            class="bg-cover product-image"
            style="height: 300px;"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark text-decoration-none">{{ item.title }}</a>
            </h5>
            <div
              class="d-flex align-items-baseline"
              :class="{'justify-content-end': !item.origin_price, 'justify-content-between': item.origin_price}"
            >
              <div class="h5" v-if="!item.origin_price">{{ item.price | currency }} 元</div>
              <del class="h6" v-if="item.origin_price">原價 {{ item.origin_price | currency }} 元</del>
              <div class="h5" v-if="item.origin_price">優惠{{ item.price | currency }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex bg-warning">
            <button type="button" class="btn btn-info btn-sm" @click="getPorduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.isItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-primary btn-sm ml-auto" @click="addCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.isCart === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pagination="pagination" @getPages="getPorducts" v-if="products.length" />
  </div>
</template>

<script>
import $ from "jquery";
import ProductSider from "./ProductSider.vue";
import Pagination from "../components/Pagination.vue";
export default {
  components: {
    ProductSider,
    Pagination
  },
  props: ["active"],
  data() {
    return {
      starProduct: "",
      totalPages: "",
      buyQty: 1,
      isLoading: false,
      products: [],
      product: {},
      pagination: "",
      carts: [],
      cartLen: "",
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
  methods: {
    getPorducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.products = response.data.products;
        const filterCategory = vm.products.filter(item => {
          if (vm.active == "all") {
            return item;
          } else if (vm.active == item.category) {
            return item;
          }
        });
        vm.starProduct = (page - 1) * 10;
        vm.totalPages = Math.ceil(filterCategory.length / 10);
        vm.pagination = {
          total_pages: vm.totalPages,
          current_page: page
        };
        window.scrollTo(0, 0);
        vm.isLoading = false;
      });
    },
    getPorduct(Id) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/product/${Id}`;
      const vm = this;
      vm.$router.push(`/productspage/product/${Id}`);
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
        alert(response.data.message)
        vm.status.isCart = "";
        this.getCarts();
      });
    },
    getCarts() {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        vm.carts = response.data.data;
        vm.cartLen = response.data.data.carts.length;
        window.scrollTo(0, 0);
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
    creatOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/order`;
      const order = vm.form;
      this.$http.post(api, { data: order }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push(`/admin/checkout/${response.data.orderId}`);
        }
      });
    }
  },
  computed: {
    filterProducts() {
      const vm = this;
      return vm.products.filter(item => {
        if (vm.active == "all") {
          return item;
        } else if (item.category == vm.active) {
          return item;
        }
      });
    }
  },
  watch: {
    active: function() {
      console.log(this.active);
      this.getPorducts();
    }
  },
  created() {
    this.getPorducts();
  }
};
</script>

<style scoped>
.product-item:hover {
  cursor: pointer;
}
.product-image {
  background-size: 100%;
  transition: background-size 0.3s;
}
.product-image:hover {
  background-size: 120%;
}
</style>