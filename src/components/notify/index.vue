<template>
    <div class="l-notify" :class="[bgClass,mapClass]" :style="wrapStyle">
        {{message}}
    </div>
</template>

<script>
export default {
    name: 'l-notify',
    props: {
        value: {
            type: [Boolean],
            default: false
        },
        type: {
            type: String,
            default() {
                return 'primary'
            }
        },
        duration: {
            type: Number,
            default() {
                return 2000
            }
        },
    },
    data() {
        return {
            message: '',
            // show: false,
            // index: 0,
            panelAnimateClass: '',
            isShow: false,
            moveDis: 0,
        }
    },
    computed: {
        wrapStyle() {
            let style = {
                transform: `translate3d(0, ${this.isShow ? 0 : -50}px, 0)`,
                transition: `transform 500ms`
            }
            return style
        },
        mapClass() {
            return this.show ? 'show' : ''
        },
        bgClass() {
            const bgClassMap = {
                'primary': 'l-notify--primary',
                'danger': 'l-notify--danger'
            }
            return bgClassMap[this.type]
        }
    },
    mounted() {
        // console.log(this.$slots,"====")
        // this.$slots.tab
        window.setTimeout(()=>{
            this.isShow=false
        },this.duration)
    },
    methods: {
        toggleShow(){
            this.isShow = !this.isShow
        },
        
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.l-notify {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    // display: none;
    /* opacity: 1; */
    // transform: translate3d(0,-50px,0);
    // animation: fadeIn 500ms;
    &.l-notify--primary {
        background-color: #1989fa;
    }
    &.l-notify--danger {
        background-color: #ee0a24;
    }
    &.show {
        // display: block;
        // transform: translate3d(0,0,0);
    }
    // @keyframes fadeIn {
    //     from {
    //         transform: translate3d(0, -50px, 0);
    //     }
    //     to {
    //         transform: translate3d(0, 0px, 0);
    //     }
    // }
}
</style>
