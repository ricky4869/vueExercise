export default {
    methods: {
        fixedNavbar() {
               const homeNavbar = document.querySelector(".homeNavbar");
                const winTop = window.scrollY;
                if (winTop > 0) {
                homeNavbar.classList.add("position-fixed");
                } else {
                homeNavbar.classList.remove("position-fixed");
                } 
          },
        addfixed() {
            window.addEventListener("scroll", this.fixedNavbar);
        }
      },
      mounted() {
        this.addfixed();
      },
      beforeDestroy(){
        window.removeEventListener("scroll", this.fixedNavbar);
      }
}