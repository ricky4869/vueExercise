<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': pagination.current_page == 1}">
          <a href="#"
            class="page-link"
            aria-label="Previous"
            @click.prevent="getPage(pagination.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :key="page"
          :class="{'active': pagination.current_page === page}"
        >
          <a href="#" class="page-link" @click.prevent="getPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': pagination.current_page == pagination.total_pages}">
          <a href="#"
            class="page-link"
            aria-label="Next"
            @click.prevent="getPage(pagination.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
    props:['pagination'],
    methods: {
        getPage(item){
            this.$emit('getPages', item)
        }
    }

}
</script>

<style scoped>
.page-link{
  cursor: pointer;
}
</style>