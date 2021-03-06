export default {
     methods: {
        check(){
            const api = `${process.env.VUE_APP_APIPATH}api/user/check`;
            const vm = this;
            vm.$http.post(api).then(response => {
              if(!response.data.success){
                vm.$router.push('/login')
              }
            })
          }
     },
     created() {
         this.check();
     },
}