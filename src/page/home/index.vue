<template>
    <div>
        <div>  搜索 </div>
        <l-swipe  v-model="index" :lists="banners" >

        </l-swipe>
        <!-- <l-tabs v-model="tabActivedIndex" :tabs="tabs">
            <template>
                <div> 面板1</div>
                <div > 面板2</div>
                <div> 面板3</div>
            </template>
        </l-tabs> -->
        <!-- <lToast msg="图片未上传成功" /> -->
        <!-- <l-swipe>
            <lSwipeItem>
                <div><img :src="banners[0]" /></div>
            </lSwipeItem>
            <lSwipeItem>
                <div><img :src="banners[1]" /></div>

            </lSwipeItem>
            <lSwipeItem>
                <div><img :src="banners[0]" /></div>
            </lSwipeItem>
        </l-swipe> -->
    </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld.vue'
import lSwipe from '../../components/swipe/index'
// import lSwipeItem from '../components/swipe-item/index'
// import lTabs from '../components/tabs/index'
// import lToast from '../components/toast/index'

export default {
    name: 'App',
    components: {
        lSwipe
        // HelloWorld, lSwipe, lSwipeItem, lTabs,lToast
    },
    data() {
        return {
            index:0,
            tabActivedIndex: 2,
            tabs: ["标签1", "标签2", "标签3"],
            banners: [
                'https://img01.yzcdn.cn/vant/apple-1.jpg',
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F2889361085%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622637036&t=2025f280d643b892598d4131b92685d3',
                'https://img01.yzcdn.cn/vant/apple-2.jpg',
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffmn.rrimg.com%2Ffmn060%2Fxiaozhan%2F20120305%2F2140%2Fp%2Fm2w595hq85lt_x_large_sFCt_7dd800004530121b.jpg&refer=http%3A%2F%2Ffmn.rrimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622637637&t=6dba20769f6c0935f7e7ee020c8f26c1'
            ]
        }
    },
    mounted(){
        setTimeout(()=>{
            if(this.$toast){
                 this.$toast('登录成功') 
            }
                   

        },1000)
    }
}
</script>

<style >
body,
ul,
ol,
li {
    margin: 0;
    padding: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}
img {
    height: 300px;
}
</style>
