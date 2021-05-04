<template>
    <div class="swipe-wrap" @touchstart.stop="touchstart" @touchend.stop="touchend">
        <section class="swipe" :style="wrapStyle">
            <div class="swipe-item" v-for="(item,idx) in lists" :key="idx" :style="getStyle(idx )">
                <img :src="item" />
            </div>
            <slot></slot>
        </section>
        <ul class="dot">
            <li v-for="(item,idx) in lists" :class="{'active':idx===value}" :key="idx"></li>
        </ul>
    </div>

</template>

<script>
const bodyClientWidth = document.body.clientWidth

export default {
    name: 'l-swipe',
    props: {
        lists: {
            type: Array,
            default: () => {
                return []
            }
        },
        msg: String,
        value: 0,
        duration:{
            type: Number,
            default: () => {
                return 5000
            }
        },
    },
    data() {
        return {
            width: 0,
            left: 0,
            width: 0,
            timer: null
        }
    },
    computed: {
        dots() {
            // return [...this.lists]
        },
        wrapStyle() {
            let left = this.value * bodyClientWidth
            return { left: -left + 'px' }
            // return { left: this.left + 'px' ,width:this.width+'px'}
        }
    },
    mounted() {
        this.startInterval()
    },
    methods: {
        getStyle(index) {
            return {
                width: bodyClientWidth + 'px',
                left: bodyClientWidth * index + 'px'
            }
        },
        touchstart() {
            console.log("touchstart")
            window.clearInterval(this.timer)
            this.timer=null
        },
        touchend() {
            this.startInterval()
        },
        startInterval() {
            console.log(this.duration,"====duration");
            if(this.timer){
                window.clearInterval(this.timer)
            }
            this.timer = window.setInterval(() => {
                let result = this.value + 1;
                if (result >= this.lists.length) {
                    result = 0
                }
                console.log(result, "this.value+1")
                this.$emit("input", result)
            }, this.duration)
        }

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.swipe-wrap {
    position: relative;
    overflow: hidden;
}
.swipe {
    position: relative;
    height: 300px;
    transition: all 500ms;
    /* overflow: hidden; */
}
.swipe-item {
    position: absolute;
    /* display: inline-block; */
}
.dot {
    position: absolute;
    left: 0;
    width: 100vw;
    bottom: 10px;
    /* background: red; */
    text-align: center;
}
.dot li {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ccc;
    margin: 0 2px;
}
.dot li.active {
    background-color: red;
}
</style>
