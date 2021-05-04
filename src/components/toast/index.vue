<template>
    <div class="l-toast" :class="mapClass" >
        <div class="l-toast-title">{{msg}}</div>
    </div>
</template>

<script>
export default {
    name: 'l-toast',
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
        show:false
        // msg: String
    },
    data() {
        return {
            msg:'',
            // show: false,
            // index: 0,
            panelAnimateClass: '',
            startX:0,
            moveDis:0
        }
    },
    computed: {
        mapClass() {
            return this.show ? 'show':''
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
.l-toast {
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    transition: all 500ms;
    /* display: none; */
    /* opacity: 1; */
    animation: fadeUp 100ms;
}



.l-toast.show{
    opacity: 1;
    bottom: 20px;
    display: flex;
}

.l-toast-title {
    background-color: #ccc;
    text-align: center;
    /* margin: 0 20px; */
    padding: 10px 30px ;
    border-radius: 20px;

}

@keyframes fadeUp{
    from {
        bottom: 0;
        opacity: 0;
    }
    to {
        bottom: 20px;
        opacity: 1;
    }
}

</style>
