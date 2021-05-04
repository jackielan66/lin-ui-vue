<template>
    <section class="tabs">
        <!-- <slot name="tab" ></slot> -->
        <nav class="tabs-nav">
             <div :key="idx" v-for="(item,idx) in tabs"  class="tabs-nav-title" :class="{'active':value==idx  }  " @click="handleTab(idx)">{{item}}</div>

            <!-- <div key="0" class="tabs-nav-title" :class="{'active':index==0  }  " @click="handleTab(0)">标签1</div>
            <div key="1" class="tabs-nav-title" :class="{'active':index==1  }  " @click="handleTab(1)">标签2</div>
            <div key="2" class="tabs-nav-title" :class="{'active':index==2  }  " @click="handleTab(2)">标签3</div> -->
        </nav>
        <span class="tabs-nav-line" :style="lineStyle"></span>
        <section class="tabs-panel">
            <!-- {{$slots.default.map((item)=>item)}} -->
            <slot></slot>
            <!-- <div key="0" class="tabs-panel-content" @touchstart.stop="touchStart" @touchmove.stop="touchMove" @touchend.stop="touchEnd" :class="panelAnimateClass " v-if="index==0">标签1</div>
            <div key="1" class="tabs-panel-content" :class="panelAnimateClass" v-if="index==1">标签2</div>
            <div key="2" class="tabs-panel-content" :class="panelAnimateClass " v-if="index==2">标签3</div> -->
        </section>
    </section>
</template>

<script>
export default {
    name: 'l-tabs',
    props: {
        value:{
            type:[Number,String],
            default:0
        },
        tabs:{
            type:Array,
            default(){
                return []
            }
        },
        msg: String
    },
    data() {
        return {
            width: 0,
            // index: 0,
            panelAnimateClass: '',
            startX:0,
            moveDis:0
        }
    },
    computed: {
        lineStyle() {
            let left = 0;
            let len = 3;
            let bodyClientWidth = document.documentElement.clientWidth;
            let navItemWidth = parseInt(bodyClientWidth / len);
            left = navItemWidth / 2 + navItemWidth * this.value;
            // left *= (this.index+1
            return { left: left + "px", width: '20px', marginLeft: '-10px' }
        },

    },
    mounted(){
        console.log(this.$slots,"====")
        // this.$slots.tab
    },
    methods: {
        handleTab(curIndex) {
            this.$emit("input",curIndex)
            // this.panelAnimateClass = curIndex > this.index ? 'shift-in' : 'shift-out'
            // this.index = curIndex;
        },
        touchStart(event) {
            let startX = event.targetTouches[0].pageX;
            this.startX = startX;
            // console.log(event, "touchUp")
            // console.log(event, "touchDown")
            // event.target.style.left = 0
        },
        touchEnd(event) {
            //              console.log(event, "touchEnd")

            // let endX = event.targetTouches[0].pageX;
            let moveDis = Math.abs(this.moveDis)
            console.log(moveDis,"end")
            if(moveDis>= document.documentElement.clientWidth/2){

            }else{
                        event.target.style.transform = "translateX(" + 0 + "px)";
            }
            //   > document.documentElement.clientWidth/2
            // let initLeft = 
            
            // event.target.style.left = 0
        },
        touchMove(event) {
            //  console.log(event, "touchUp")
            let moveX = event.targetTouches[0].pageX;
            let moveDis = moveX - this.startX;
            this.moveDis = moveDis
            console.log(moveDis, "touchMove")
            event.target.style.transform = "translateX(" + moveDis + "px)";
            // console.log(event, "touchMove")
            // event.target.style.left = 0
        },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  >
.tabs {
    position: relative;
    height: 300px;
    transform: translateX();
    /* overflow:
     hidden; */
}
.tabs .tabs-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
}
.tabs-nav-title {
    display: flex;
    justify-content: center;
}
.tabs-nav-title.active {
    color: red;
    font-weight: bold;
}

.tabs-nav-line {
    transition: left 100ms;
    position: absolute;
    left: 0;
    height: 2px;
    background-color: red;
    z-index: 99;
}
.tabs-nav > div {
    flex: 1;
}

.tabs-panel {
    position: relative;
}
.tabs-panel-content {
    height: 400px;
    transition: all linear 100ms;
    position: relative;
    background-color: #ccc;
}
.tabs-panel-content.shift-in {
    animation: shiftIn 100ms linear;
    /* transform: translateX(200px) */
}
.tabs-panel-content.shift-out {
    animation: shiftOut 100ms linear;
    /* transform: translateX(200px) */
}

@keyframes shiftIn {
    from {
        left: 100vw;
    }
    to {
        left: 0px;
    }
}
@keyframes shiftOut {
    from {
        right: 100vw;
    }
    to {
        right: 0vw;
    }
}

.dot {
    position: absolute;
    left: 0;
    width: 100%;
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
</style>
