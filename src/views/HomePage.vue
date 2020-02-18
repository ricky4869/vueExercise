<template>
  <div>
    <Jumbotron></Jumbotron>
    <div class="container productlink">
      <div class="row justify-content-center">
        <div class="row col-md-10 py-5 py-md-0">
          <div class="col-12 col-md-4 mt-3 mt-md-0 d-flex justify-content-center">
            <div
              class="productlink_item image_shadow bg-cover d-flex justify-content-center align-items-center"
              style="background-image: url('https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1040&q=80')"
            >
              <router-link
                to="/productspage/movie"
                class="d-flex justify-content-center align-items-center w-100 h-100 text-decoration-none"
              >
                <h3 class="mb-0 font-weight-bolder text-dark">熱門電影</h3>
              </router-link>
            </div>
          </div>
          <div class="col-12 col-md-4 mt-3 mt-md-0 d-flex justify-content-center">
            <div
              class="productlink_item image_shadow bg-cover"
              style="background-image: url('https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60')"
            >
              <router-link
                to="/productspage/tv"
                class="d-flex justify-content-center align-items-center w-100 h-100 text-decoration-none"
              >
                <h3 class="mb-0 font-weight-bolder text-dark">精彩影集</h3>
              </router-link>
            </div>
          </div>
          <div class="col-12 col-md-4 mt-3 mt-md-0 d-flex justify-content-center">
            <div
              class="productlink_item image_shadow bg-cover"
              style="background-image: url('https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60')"
            >
              <router-link
                to="/productspage/eat"
                class="d-flex justify-content-center align-items-center w-100 h-100 text-decoration-none"
              >
                <h3 class="mb-0 font-weight-bolder text-dark">嘴饞推薦</h3>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section mb-10">
      <div class="bg-warning">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 overZone-y px-0 fly-box">
              <div
                class="bg-cover image_shadow h-100 section-image fly-item fly-left"
                style="background-image: url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60)"
              ></div>
            </div>
            <div class="col-md-6 overZone-y row section-text justify-content-md-end fly-box">
              <div
                class="h2 p-3 text-light waiting-mode-rl mb-0 mt-3 mt-md-5 text-md-left text-center col-md-3 col-12 order-md-2 fly-bottom fly-item"
              >
                為什麼，
                <br />
                <span class="mt-5">要看電影</span>
              </div>
              <p
                class="p-3 text-light waiting-mode-rl m-0 col-md-8 col-12 fly-bottom fly-item"
              >電影是一種表演藝術、視覺藝術及聽覺藝術，利用膠卷、錄影帶或數位媒體將影像和聲音捕捉起來，再加上後期的編輯工作而成。電影中看起來連續的畫面，是由一幀幀單獨的照片完成的，至於關於電影中運動的感覺，是因為人們因為視覺上的飛現象</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section mb-10">
      <div class="bg-warning">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 overZone-y order-md-2 px-0 fly-box">
              <div
                class="bg-cover image_shadow h-100 section-image fly-item fly-right"
                style="background-image: url(https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60)"
              ></div>
            </div>
            <div class="col-md-6 overZone-y section-text row fly-box">
              <div
                class="h2 p-3 text-light waiting-mode-rl mb-0 text-md-left text-center col-md-3 col-12 order-md-2 fly-bottom fly-item"
              >
                看電影，
                <br />
                <span class="mt-5">為什麼要配爆米花</span>
              </div>
              <p
                class="p-3 text-light waiting-mode-rl m-0 col-md-8 col-12 fly-bottom fly-item"
              >其實「看電影吃爆米花」這項習慣可說是歷史悠久，除了爆米花本身口感和奶油香甜氣味讓人難以抗拒，想一吃再吃，爆米花也算是在美國經濟大蕭條時期，挽救電影院生意和平民百姓生活小確幸的一大功臣。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Jumbotron from "../components/Jumbotron";
import flyIn from "../mixin/flyin";
export default {
  mixins: [flyIn],
  components: {
    Jumbotron
  }
};
</script>

<style scoped>
.productlink {
  min-height: 200px;
}

.productlink_item {
  position: relative;
  height: 120px;
  width: 100%;
}
.productlink_item > a {
  position: absolute;
  transition: background-color 0.3s;
  background-color: rgba(158, 122, 122, 0.7);
}
.productlink_item > a:hover {
  background-color: rgba(181, 68, 52, 0.7);
}

@media (min-width: 768px) {
  .productlink_item {
    margin-top: -100px;
    height: 200px;
    width: 200px;
  }
}
.section-text {
  height: 400px;
  line-height: 2;
  font-weight: 200;
  letter-spacing: 2px;
}
.section-text > p {
  font-size: 1.2em;
}
.section-image {
  min-height: 300px;
}
</style>