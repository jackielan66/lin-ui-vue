<template>
    <transition name="fade" >
        <div v-if="value">
            <div class="l-dialog" v-if="show" :class="mapClass">
                <div class="l-dialog-title">
                    <strong>{{mapTitle}}</strong>
                </div>
                <div class="l-dialog-content">
                    {{mapMessage}}
                </div>
                <div class="l-dialog-footer">
                    <div v-if="type==='confirm'" class="btn" type="" @click.stop="handleCancel">取消</div>
                    <div class="btn" type="primary" @click.stop="handleConfirm">确认</div>
                </div>
            </div>
            <section class="l-mask" @click.stop="handleCancel" />
        </div>
    </transition>
</template>

<script>
export default {
    name: 'l-dialog',
    props: {
        value: {
            type: [Boolean],
            default: 0
        },
        title: '',
        message: '',
        type: '',
    },
    data() {
        return {

            show: true,
            options: {

            }
        }
    },
    computed: {
        mapTitle() {
            return this.title
        },
        mapMessage() {
            return this.message
        },
        mapClass() {
            return this.show ? 'show' : ''
        },

    },
    mounted() {
        console.log(this.$slots, "====")
        // this.$slots.tab
    },
    methods: {
        alert(opt = {}) {
            // console.log(opt, "opt")
            this.options = opt
            this.show = true;
            return new Promise((resovle, reject) => {

            })
            // this.$emit("input",curIndex)
            // this.panelAnimateClass = curIndex > this.index ? 'shift-in' : 'shift-out'
            // this.index = curIndex;
        },
        handleConfirm() {
            // console.log(`handleConfirm`)
            this.$emit('handleConfirm')

        },
        handleCancel(event) {
            this.$emit('input', false)
            this.$emit('handleCancel')
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
.l-mask {
    position: fixed;
    background: rgba(0, 0, 0, 0.3);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    animation: fadeIn 500ms;
}
.l-dialog {
    position: fixed;
    background: #fff;
    z-index: 100;
    width: calc(100% - 20px);
    box-sizing: border-box;
    margin: 0 10px;
    padding: 10px;
    border-radius: 10px;
    top: 40%;

}
.l-dialog-title {
    font-size: 18px;
    text-align: center;
}
.l-dialog-content {
    text-align: center;
}

.l-dialog-footer {
    display: flex;
    border-top: 1px solid #ccc;
    /* opacity: 1;
    bottom: 20px;
    display: flex; */
}
.l-dialog-footer .btn {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 10px;
}
.btn[type="primary"] {
    color: salmon;
}
.fade-enter{
    opacity: 0;
}
.fade-enter-to {
    transition: opacity 5000ms;;
}
.fade-leave{
    transition: opacity 5000ms;;
}
.fade-leave-active{
        opacity: 0;

}

/* @keyframes fadeIn {
    from {
        transform: scale(1.2);
        opacity: 0;
    }
    to {
                transform: scale(1);

        opacity: 1;
    }
} */
</style>
