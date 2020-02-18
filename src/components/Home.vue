<template>
  <div>
    <div class="bg-info">
      <HomeNavbar/>
      <router-view></router-view>
      <Footer/>
    </div>
  </div>
</template>


<script>

import HomeNavbar from '../components/HomeNavbar'
import Footer from '../components/Footer'
// import Sidebar from './Sidebar'
// import Alert from './AlertMessage'

export default {
  components:{
    HomeNavbar,
    Footer,
    // Sidebar,
    // Alert,
  },
};
</script>














