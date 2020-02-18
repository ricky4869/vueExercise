<template>
    <div>
        <nav>
        <ul class="nav-navbar mr-auto text-center list-unstyled">
            <li class="nav-item bg-warning text-white h5 py-3 mb-0 ">商品類別</li>
            <li class="nav-item h5 mb-0 text-dark border-top-0">
                <a class="nav-link p-3 sider-item" href="#" :class="{'active': active == 'all'}" @click='active = "all"'>全部商品</a>
            </li>
            <li class="nav-item h5 mb-0 text-dark border-top-0">
                <a class="nav-link p-3 sider-item" href="#" :class="{'active': active == 'movie'}" @click='active = "movie"'>熱門電影</a>
            </li>
            <li class="nav-item h5 mb-0 text-dark border-top-0">
                <a class="nav-link p-3 sider-item" href="#" :class="{'active': active == 'tv'}" @click='active = "tv"'>精彩影集</a>
            </li>
            <li class="nav-item h5 mb-0 text-dark border-top-0">
                <a class="nav-link p-3 sider-item" href="#" :class="{'active': active == 'eat'}" @click='active = "eat"'>嘴饞推薦</a>
            </li>
        </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props:['active'],
}
</script>


<style scoped>
    .sider-item{
        border: 1px solid #ddd;
    }
    .sider-item:hover,.sider-item.active{
        border-color: #b54434; 
        background-color: #B54434;
        color: #fff;
    }
</style>