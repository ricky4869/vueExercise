<template>
<div>
  <body class="text-center">
    <form class="form-signin" @submit.prevent="signin">
      <img class="mb-4" src="/docs/4.2/assets/brand/bootstrap-solid.svg" alt width="72" height="72" />
      <h1 class="h3 mb-3 font-weight-normal">管理者登入</h1>
      <label for="inputEmail" class="sr-only">E-mail:</label>
      <input
        v-model="user.username"
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">密碼:</label>
      <input
        v-model="user.password"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
      <p class="mt-5 mb-3 text-muted">&copy; 登入後可管理商品新增、編輯、刪除</p>
    </form>
  </body>
</div>
</template>


<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}admin/signin`;
      const vm = this
      this.$http.post(api, vm.user).then(response => {
        if(response.data.success){
          vm.$router.push('/admin/products')
        }else{
          alert(response.data.message)
        }
      });
    }
  }
};
</script>




<style scoped>
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>