<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>

export default {
    name: 'App',
    components: {
    },
    data() {
        return {
            tabActivedIndex: 2,
            tabs: ["标签1", "标签2", "标签3"],
            banners: [
                'https://img01.yzcdn.cn/vant/apple-1.jpg',
                'https://img01.yzcdn.cn/vant/apple-2.jpg',
            ]
        }
    },
    mounted() {
        setTimeout(() => {
            this.$toast('登录成功')
    
        }, 1000)
    }
}
</script>

<style lang="less" >
body,
ul,
ol,
li {
    margin: 0;
    padding: 0;
    /* transform: translate3d(); */
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: #eee;
    // min-height: 100vh;
}
img {
    // height: 300px;
}

</style>
