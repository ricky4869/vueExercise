<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="getModal(true)">建立新產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120px">分類</th>
          <th>產品分類</th>
          <th width="120px">原價</th>
          <th width="120px">售價</th>
          <th width="100px">是否啟用</th>
          <th width="140px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in products" :key="key">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency}}</td>
          <td class="text-right">{{ item.price | currency}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-primary btn-sm" @click="getModal(false, item)">編輯</button>
              <button class="btn btn-secondary btn-sm" @click.prevent="delModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <Pagination :pagination="pagination" @getPages="getPorducts"></Pagination> -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <ValidationObserver  v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(updataProduct)">
            <div class="modal-content border-0">
              <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                  <span>{{ addorChange }}產品</span>
                </h5>
                <button type="button" class="close opacity-100 text-white" data-dismiss="modal">
                  <span aria-hidden="true" class="fas fa-times"></span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="image">輸入圖片網址</label>
                      <input
                        type="text"
                        class="form-control"
                        id="image"
                        placeholder="請輸入圖片連結"
                        v-model="tempProduct.imageUrl"
                      />
                    </div>
                    <div class="form-group">
                      <label for="customFile">
                        或 上傳圖片
                        <i class="fas fa-spinner fa-spin" v-if="status.uploadimageUrl"></i>
                      </label>
                      <input
                        type="file"
                        id="customFile"
                        class="form-control"
                        ref="files"
                        @change="uploadfiles"
                      />
                    </div>
                    <img
                      :src="tempProduct.imageUrl"
                      img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                      class="img-fluid"
                      alt
                    />
                  </div>
                  <div class="col-sm-8">
                    <div class="form-group">
                      <ValidationProvider v-slot="{ errors, classes }" rules="required">
                        <label for="title">標題</label>
                        <input
                          :class="classes"
                          type="text"
                          class="form-control"
                          id="title"
                          placeholder="請輸入標題"
                          v-model="tempProduct.title"
                        />
                      </ValidationProvider>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <ValidationProvider v-slot="{ errors, classes }" rules="required">
                        <label for="category">分類</label>
                        <input
                          type="text"
                          class="form-control"
                          :class="classes"
                          id="category"
                          placeholder="請輸入分類"
                          v-model="tempProduct.category"
                        />
                        </ValidationProvider>
                      </div>
                      <div class="form-group col-md-6">
                        <ValidationProvider v-slot="{ errors, classes }" rules="required">
                        <label for="price">單位</label>
                        <input
                          type="unit"
                          class="form-control"
                          :class='classes'
                          id="unit"
                          placeholder="請輸入單位"
                          v-model="tempProduct.unit"
                        />
                        </ValidationProvider>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                        <input
                          type="number"
                          class="form-control"
                          id="origin_price"
                          placeholder="請輸入原價"
                          v-model="tempProduct.origin_price"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <ValidationProvider v-slot="{ errors, classes }" rules="required">
                        <label for="price">售價</label>
                        <input
                          type="number"
                          class="form-control"
                          :class='classes'
                          id="price"
                          placeholder="請輸入售價"
                          v-model="tempProduct.price"
                        />
                        </ValidationProvider>
                      </div>
                    </div>
                    <hr />

                    <div class="form-group">
                      <label for="description">產品描述</label>
                      <textarea
                        type="text"
                        class="form-control"
                        id="description"
                        placeholder="請輸入產品描述"
                        v-model="tempProduct.description"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label for="content">說明內容</label>
                      <textarea
                        type="text"
                        class="form-control"
                        id="content"
                        placeholder="請輸入產品說明內容"
                        v-model="tempProduct.content"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="is_enabled"
                          v-model="tempProduct.is_enabled"
                          :true-value="1"
                          :false-value="0"
                        />
                        <label class="form-check-label" for="is_enabled">是否啟用</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button
                  type="submit"
                  class="btn btn-primary"
                >{{addorChange}}</button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close text-white opacity-100" data-dismiss="modal">
              <span aria-hidden="true" class="fas fa-times"></span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="removeProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../../components/Pagination";
import Check from '../../mixin/check.js'
export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: true,
      isLoading: false,
      addorChange: "新增商品",
      status: {
        uploadimageUrl: false
      },
      pagination: {}
    };
  },
  mixins: [Check],
  components: {
    Pagination: Pagination
  },
  methods: {
    getPorducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.products = response.data.products;
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
        console.log(response.data)
      });
    },
    getModal(isNEw, item) {
      console.log(isNEw, item);
      if (isNEw) {
        this.tempProduct = {};
        $("#productModal").modal("show");
        this.isNew = true;
        this.addorChange = "新增";
      } else {
        $("#productModal").modal("show");
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
        this.addorChange = "修改";
      }
    },
    updataProduct() {
      let api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/admin/product`;
      let http = "post";
      let page = 1;
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/admin/product/${vm.tempProduct.id}`;
        http = "put";
        page = vm.pagination.current_page;
      }
      this.$http[http](api, { data: vm.tempProduct }).then(response => {
        if (response.data.success) {
          vm.$bus.$emit("message:push", response.data.message, "success");
          $("#productModal").modal("hide");
          vm.getPorducts(page);
        } else {
          vm.$bus.$emit("message:push", response.data.message, "success");
          alert(response.data.message)
          console.log("新增失敗");
        }
      });
    },
    delModal(item) {
      $("#delProductModal").modal("show");
      this.tempProduct = Object.assign({}, item);
    },
    removeProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then(response => {
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getPorducts(vm.pagination.current_page);
        } else {
          alert(response.data.message);
        }
      });
    },
    closeModal() {
      this.tempProduct = {};
    },
    uploadfiles() {
      const uploadfile = this.$refs.files.files[0];
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/admin/upload`;
      const formData = new FormData();
      vm.status.uploadimageUrl = true;
      if (uploadfile == undefined) {
        vm.status.uploadimageUrl = false;
        vm.tempProduct.imageUrl = "";
      } else {
        formData.append("file-to-upload", uploadfile);
        this.$http
          .post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(response => {
            if (response.data.success) {
              vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
              vm.status.uploadimageUrl = false;
            }
          });
      }
    },
    // check(){
    //         const api = `${process.env.VUE_APP_APIPATH}api/user/check`;
    //         const vm = this;
    //         vm.$http.post(api).then(response => {
    //           if(!response.data.success){
    //             vm.$router.push('/login')
    //             console.log(response.data)
    //           }
    //         })
    //       }
  },
  created() {
    this.getPorducts();
    // this.check()
  }
};
</script>