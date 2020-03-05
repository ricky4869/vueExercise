<template>
  <div>
    <div class="row mt-4">
      <div class="col-12 col-md-6 order-md-2">
        <div
          class="bg-cover"
          style="height: 500px;"
          :style="{backgroundImage: `url(${product.imageUrl})`}"
        ></div>
      </div>
      <div class="col-12 col-md-6">
        <div class="p-3">
          <div class="product-title mb-3">
            片名:
            <h3>{{ product.title }}</h3>
            <span class="badge badge-secondary float-right ml-2">{{ product.category }}</span>
          </div>
          <div class="product-content">
            <h6>故事大綱:</h6>
            <p class="mb-5">{{ product.description }}</p>
            <h6>主要演員:</h6>
            <p class="mb-5">{{ product.content }}</p>
          </div>
          <div
            class="d-flex"
            :class="{'justify-content-end': !product.origin_price, 'justify-content-between': product.origin_price}"
          >
            <h4 v-if="!product.origin_price">售價: {{ product.price | currency}}</h4>
            <del class="h6" v-if="product.origin_price">原價: {{ product.origin_price | currency}}</del>
            <h4 v-if="product.origin_price">優惠價: {{ product.price | currency}}</h4>
          </div>
          <select class="custom-select form-control" v-model="buyQty">
            <option :value="num" v-for="num in 10" :key="num">選購 {{ num }} {{ product.unit }}</option>
          </select>
          <div class="product-footer row justify-content-end align-items-center mt-3">
            <h4 class="mb-0 mr-3">小計: {{ product.price * buyQty | currency}}</h4>
            <button class="btn btn-primary" @click.prevent="addCart(product.id)">加入購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productId: "",
      product: {},
      buyQty: "1"
    };
  },
  methods: {
    getPorduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/product/${vm.productId}`;
      this.$http.get(api).then(response => {
        vm.product = response.data.product;
      });
    },
    addCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`;
      const vm = this;
      const cart = {
        product_id: id,
        qty
      };
      console.log(cart);
      this.$http.post(api, { data: cart }).then(response => {
        alert(response.data.message)
        window.location.reload();
      });
    }
  },
  watch: {
    productId: function() {
      this.getPorduct();
    }
  },
  created() {
    this.productId = this.$route.params.productId;
    this.getPorduct();
  }
};
</script>