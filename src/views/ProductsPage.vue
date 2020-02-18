<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="bg-light py-5">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-3">
            <nav class="mt-4">
              <ul class="nav-navbar mr-auto text-center list-unstyled">
                <li class="nav-item bg-warning text-white h5 py-3 mb-0">商品類別</li>
                <li class="nav-item h5 mb-0 text-dark border-top-0">
                  <a
                    class="nav-link p-3 sider-item"
                    :class="{'active': active == 'all'}"
                    @click="categoryPage('all')"
                  >全部商品</a>
                </li>
                <li class="nav-item h5 mb-0 text-dark border-top-0">
                  <a                   
                    class="nav-link p-3 sider-item"
                    :class="{'active': active == 'movie'}"
                    @click="categoryPage('movie')"
                  >熱門電影</a>
                </li>
                <li class="nav-item h5 mb-0 text-dark border-top-0">
                  <a
                    class="nav-link p-3 sider-item"
                    :class="{'active': active == 'tv'}"
                    @click="categoryPage('tv')"
                  >精彩影集</a>
                </li>
                <li class="nav-item h5 mb-0 text-dark border-top-0">
                  <a
                    class="nav-link p-3 sider-item"
                    :class="{'active': active == 'eat'}"
                    @click="categoryPage('eat')"
                  >嘴饞推薦</a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-12 col-md-9">
            <router-view :active='active'></router-view>
          </div>
        </div>
      </div>
    </div>
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
  data() {
    return {
      starProduct: "",
      totalPages: "",
      active: "all",
      buyQty: 1,
      isLoading: false,
      products: [],
      product: {},
      pagination: {},
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
    categoryPage(isactive) {
      const vm = this
      this.active = isactive;
      // console.log(this.active)
      vm.$router.push(`/productspage/${isactive}`);
    }
  },
  created() {
    this.active = this.$route.params.active;
  },
};
</script>

<style scoped>
.sider-item {
  border: 1px solid #ddd;
  cursor: pointer;
}
.sider-item:hover,
.sider-item.active {
  border-color: #b54434;
  background-color: #b54434;
  color: #fff;
}
</style>