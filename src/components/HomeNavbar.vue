<template>
  <div>
    <!-- <div class="bg-info"> -->
    <div class="container">
      <nav class="navbar navbar-dark navbar-expand-md flex-md-nowrap p-0">
        <router-link class="navbar-brand logo mr-0" to="/">
          <img src="../assets/logo.png" alt width="120" />
        </router-link>
        <button class="navbar-toggler btn" data-toggle="collapse" data-target=".navbarCollapse">
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse navbarCollapse">
          <ul class="navbar-nav col-12 col-md-6 px-3">
            <li class="nav-item">
              <router-link class="nav-link text-center" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-center" to="/aboutpage">關於我們</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-center" to="/productspage/all">商品目錄</router-link>
            </li>
          </ul>
          <ul class="navbar-nav flex-row px-3 col-12 col-md-6 justify-content-end">
            <li class="nav-item d-none d-md-block">
              <div class="btn-group">
                <a
                  href="#"
                  class="nav-link px-2"
                  data-dropdown=".cart-dropdown"
                  data-toggle="dropdown"
                >
                  <h6 class="fas fa-shopping-cart mb-0"></h6>
                </a>
                <div class="dropdown-menu dropdown-menu-right cart-dropdown p-0 border-0">
                  <div class="h5 px-3 py-2 mb-0 bg-warning text-white">購物車</div>
                  <div
                    class="unCart d-flex align-items-center justify-content-center"
                    v-if="cartLen <= 0"
                  >
                    <div class="text-center">
                      <i class="fas fa-box-open"></i>
                      <p>購物車內沒有商品</p>
                    </div>
                  </div>
                  <ul class="d-block list-unstyled px-3 py-2" v-if="cartLen > 0">
                    <li
                      class="d-flex justify-content-between p-2 cart-item"
                      v-for="item in carts.carts"
                      :key="item.id"
                    >
                      <div class="col-3">
                        <img class="w-100" :src="item.product.imageUrl" alt />
                      </div>

                      <div class="col-9 d-flex flex-column justify-content-between">
                        <p>{{ item.product.title }}</p>
                        <div
                          class="ml-3 text-right text-primary"
                        >小計: {{ item.final_total | currency}}</div>
                      </div>
                    </li>
                  </ul>
                  <div class="row dropdown-footer p-3">
                    <div class="col-4 d-flex justify-content-center align-items-center">
                      總計:
                      <span class="h5 text-primary mb-0 ml-2">{{ carts.final_total | currency }}</span>
                    </div>
                    <div class="col-8">
                      <router-link
                        to="/cartpage"
                        :class="{'disabled': cartLen <= 0}"
                        class="btn btn-primary w-100"
                      >前往購物車</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item d-md-none">
              <router-link class="nav-link px-2" to="/cartpage">
                <h6 class="fas fa-shopping-cart mb-0"></h6>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link px-2" to="/admin/products">
                <h6 class="fas fa-user mb-0"></h6>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      carts: [],
      cartLen: ""
    };
  },
  methods: {
    logout() {
      const api = `${process.env.APIPATH}logout`;
      const vm = this;
      this.$http.post(api).then(response => {
        if (response.data.success) {
          console.log(response.data);
          vm.$router.push("/login");
        }
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
      });
    },
    getCartMeun() {
      $(".cart-dropdown").dropdown("show");
    }
  },
  computed: {
    updataCart() {
      if (cartLen) {
        return this.carts;
      }
    }
  },
  // watch: {
  //   carts: function() {
  //     this.getCarts();
  //   }
  // },
  created() {
    this.getCarts();
  }
};
</script>

<style>
.jumbotron-text {
  background-color: rgba(255, 255, 255, 0.5);
}
.router-link-exact-active {
  color: #fff !important;
}
.cart-dropdown {
  width: 400px;
}
.cart-dropdown ul {
  height: 320px;
  overflow: auto;
}
.unCart {
  height: 240px;
}
.unCart i {
  color: #ccc;
  font-size: 150px;
}
.unCart p {
  font-weight: 700;
  color: #ccc;
  font-size: 30px;
}
.cart-item {
  width: 100%;
  white-space: nowrap;
  font-size: 0.8em;
  border-bottom: 1px solid #ddd;
}
</style>