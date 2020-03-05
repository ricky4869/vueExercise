<template>
  <div>
    <Jumbotron></Jumbotron>
    <div class="bg-warning py-5">
      <h1 class="mb-5 text-center">ABOUT</h1>
      <div class="row justify-content-center fly-box">
        <div class="col-12 col-md-8 text-center fly-item fly-bottom">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo porro a incidunt repellat, repellendus cupiditate quia repudiandae aliquid aliquam iusto atque consectetur quas cumque saepe error totam hic reiciendis esse!
            Asperiores magnam, sapiente hic quod nam earum dolore amet fuga quibusdam maiores ut quos nihil officiis. Quam possimus temporibus reprehenderit? Sit neque iste voluptates eius, repudiandae placeat a reprehenderit corrupti.
            Nam illo doloremque praesentium sunt nesciunt quisquam quidem veritatis quas voluptatem dolore id autem labore nulla ad blanditiis et officia debitis modi consequatur pariatur assumenda, ratione molestias. Vero, nihil inventore!
          </p>
        </div>
      </div>
    </div>
    <div
      class="jumbotron jumbotron-fluid m-0 d-flex justify-content-center bg-cover bg-fixed align-items-center"
      style="background-image: url('https://images.unsplash.com/photo-1460881680858-30d872d5b530?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80'); height: 360px;"
    ></div>
    <div class="bg-primary py-5">
      <h1 class=" text-center mb-5">PRODUCT</h1>
        <div class="container">
          <div class="row justify-content-center fly-box text-center pt-5">
            <div class="col-12 col-md-4 display-3 fly-item fly-left mb-5">
              <i class="fas fa-film mb-3"></i>
              <h2>MOVIE</h2>
            </div>
            <div class="col-12 col-md-4 display-3 fly-item fly-bottom mb-5">
              <i class="fas fa-tv mb-3"></i>
              <h2>TV</h2>
            </div>
            <div class="col-12 col-md-4 display-3 fly-item fly-right mb-5">
              <i class="fas fa-hotdog mb-3"></i>
              <h2>EAT</h2>
            </div>
          </div>
        </div>
    </div>
    <div
      class="jumbotron jumbotron-fluid m-0 d-flex justify-content-center bg-cover bg-fixed align-items-center"
      style="background-image: url('https://images.unsplash.com/photo-1523207911345-32501502db22?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'); height: 360px;"
    ></div>
    <div class="bg-info">
      <div class="row justify-content-center p-5">
        <div class="col-12 col-md-8 text-white">
          <h1 class="mb-5 text-center">CONTACT US</h1>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(creatOrder)">
              <div class="row">
              <div class="form-group pb-2 col-12 col-md-3">
                <ValidationProvider v-slot="{ errors, classes }" rules="required">
                  <label for="username">姓名</label>
                  <input
                    :class="classes"
                    type="text"
                    name="name"
                    class="form-control"
                    id="username"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="form-group pb-2 col-12 col-md-9">
                <ValidationProvider v-slot="{ errors, classes }" rules="email|required">
                  <label for="useremail">Email</label>
                  <input
                    :class="classes"
                    type="email"
                    name="email"
                    class="form-control"
                    id="useremail"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              </div>


              <div class="form-group">
                <label for="message">留言</label>
                <textarea
                  name="message"
                  id="message"
                  class="form-control"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>

              <div class="text-right">
                <button type="submit" class="btn btn-primary">寄出</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Jumbotron from '../components/Jumbotron'
import flyIn from '../mixin/flyin'
export default {
  mixins: [flyIn],
  components: {
    Jumbotron
  }
};
</script>