export default {
    methods: {
        flyIn() {
          const flyBoxs = document.querySelectorAll('.fly-box')
          const winTop = window.scrollY;
          const winBottom = window.scrollY + window.innerHeight;
          flyBoxs.forEach(box => {
            const flyItems = box.querySelectorAll(".fly-item");
            const flyAt = box.offsetTop + box.scrollHeight / 2;
            if (winBottom > flyAt && winTop < flyAt) {
                flyItems.forEach(item => {
                   item.classList.add("fly-in"); 
                })
            } else {
                flyItems.forEach(item => {
                    item.classList.remove("fly-in");
                 })
            }
          });
        },
        addflyIn(){
          window.addEventListener("scroll", this.flyIn);
        }
      },
      mounted() {
        this.addflyIn()
      },
      beforeDestroy(){
        window.removeEventListener("scroll", this.flyIn);
      }
}