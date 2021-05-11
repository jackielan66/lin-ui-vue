<template>
    <div v-l-pull-down="onRefresh" >
        <div> 搜索
            <l-icon iconClass="bingtutubiao" />
             </div>
        <l-swipe v-model="index" :lists="banners">

        </l-swipe>
        <!-- <lDialog v-model="show" title="系统提示" message="消息提示" type="confirm"  @handleConfirm="handleConfirm"/> -->
        <button @click="handleShow" >显示按钮 </button>
        <button @click="handleShowConfirm" >显示二次确认 </button>
    </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld.vue'
import lSwipe from '../../components/swipe/index'
import lDialog from '../../components/dialog/index.vue'

// import lSwipeItem from '../components/swipe-item/index'
// import lTabs from '../components/tabs/index'
// import lToast from '../components/toast/index'
// import '../../icon-svg/bingtutubiao.svg';




export default {
    name: 'App',
    components: {
        lSwipe,lDialog
        // HelloWorld, lSwipe, lSwipeItem, lTabs,lToast
    },
    data() {
        return {
            show:true,
            index: 0,
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
    mounted() {
        setTimeout(() => {
            if (this.$toast) {
                this.$toast('登录成功')
            }
        }, 1000)
    },
    methods:{
        onRefresh(){
            window.location.reload()
        },
        handleShow(){
            // console.log(  this.$dialog(),"=>")
            Dialog.alert({
                title:'确认弹窗',
                message: '弹窗内容,确认信息无误么，那么将进行修改了。请你去人操作。',
            }).then(res=>{
                console.log("confirm  =>")
            }).catch(err=>{

            })
        },
        handleShowConfirm(){
            Dialog.confirm({
                title:'确认弹窗',
                message: '弹窗内容,确认信息无误么，那么将进行修改了。请你去人操作。',
            }).then(res=>{
                console.log("二次确认confirm  =>")
            }).catch(err=>{

            })
        },
         handleConfirm(){
            this.show=false;
            this.$toast('确认取消了')
        },
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
