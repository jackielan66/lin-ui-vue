<template>
    <transition :name="transitionName">
        <div class="l-popup" :class="wrapClass" v-show="show">
             <slot></slot>
        </div>
    </transition>
</template>

<script>
let $maskEl = null;
let $parentEl = null;
export default {
    name: 'l-popup',
    props: {
        value: false,
        title: '',
        message: '',
        type: '',
        round:Boolean,
        position: {
            type: [String],
            default: () => {
                return ''
            }
        }
    },
    data() {
        return {
            show: true,
            options: {

            }
        }
    },
    watch: {
        value: {
            handler(n, o) {
                this.show = n;
                this.toggleMask()
            },
            immediate: true
        }
    },
    computed: {
        transitionName() {
            if (this.position === 'top') {
                return 'popup-top';
            }
            if (this.position === 'bottom') {
                return 'popup-bottom';
            }
        },
        mapTitle() {
            return this.title || this.options.title
        },
        mapMessage() {
            return this.message || this.options.message
        },
        wrapClass() {
            let classNames = [];
            if (this.position === 'top') {
                classNames.push('l-popup--top')
            }
            if (this.position === 'bottom') {
                classNames.push('l-popup--bottom')
            }
            if (this.round) {
                classNames.push('l-popup--round')
            }
            return classNames
        },

    },
    mounted() {

    },
    methods: {

        toggleMask() {
            this.$nextTick(() => {
                $parentEl = this.$el.parentNode;
                if ($maskEl) {
                    $maskEl.removeEventListener('click', this.handleCancel)
                    setTimeout(() => {
                        $parentEl.removeChild($maskEl)
                        $maskEl = null
                    }, 500)
                } else {
                    $maskEl = document.createElement('div');
                    $maskEl.classList.add('l-mask');
                    $parentEl.insertBefore($maskEl, this.$el)
                    $maskEl.addEventListener('click', this.handleCancel)
                }
            })

        },
        alert(opt = {}) {
            return this.open(opt)
        },
        confirm(opt = {}) {
            // this.type = 'confirm';
            return this.open(opt)
        },
        handleConfirm() {
            // console.log(`handleConfirm`)
            this.$emit('handleConfirm')

        },
        handleCancel(event) {
            this.show = false;
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
<style lang="less" >
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

.l-popup {
    position: fixed;
    background: #fff;
    z-index: 100;
    width: 100%;
    transition: all 500ms;
    &.l-popup--top {
        top: 0;
    }
    &.l-popup--bottom {
        bottom: 0;
        &.l-popup--round{
            border-radius: 16px 16px 0 0;
        }
    }
    .l-popup--content {
        position: relative;
        background: #fff;
        height: 100%;
        z-index: 100;
    }
}

.popup-top-enter {
    transform: translate3d(0, -100%, 0);
}
.popup-top-enter-to {
    transform: translate3d(0, 0, 0);
}
.popup-top-leave {
    transform: translate3d(0, 0, 0);

    // top: 0px;
}
.popup-top-leave-to {
    transform: translate3d(0, -100%, 0);
}

.popup-bottom-enter ,.popup-bottom-leave-to{
    transform: translate3d(0, 100%, 0);
}
.popup-bottom-enter-to,.popup-bottom-leave{
    transform: translate3d(0, 0, 0);
}

</style>
