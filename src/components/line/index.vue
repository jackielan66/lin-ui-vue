<template>
    <div class="l-line" :class="[bgClass]" :style="wrapStyle">

    </div>
</template>

<script>
export default {
    name: 'l-line',
    props: {
        disabled: {
            type: [Boolean],
            default: false
        },
        loading: {
            type: [Boolean],
            default: false
        },
        plain: {
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
            console.log(window.devicePixelRatio)
            let scale = 1 / window.devicePixelRatio;
            let style = {
                transform: `scale(1,${scale})`,
                // width: 100 * window.devicePixelRatio + '%',
                // width:'100%'
            }
            return style
        },
        loadingClass() {
            return this.loading ? 'l-button--loading' : ''
        },
        disabledClass() {
            return this.disabled ? 'l-button--disabled' : ''
        },
        plainClass() {
            return this.plain ? 'l-button--plain' : ''
        },
        mapClass() {
            return this.show ? 'show' : ''
        },
        bgClass() {
            const bgClassMap = {
                'primary': 'l-line--primary',
                'danger': 'l-line--danger'
            }
            return bgClassMap[this.type] || 'l-line--primary'
        },

    },
    mounted() {
        // console.log(this.$slots,"====")
        // this.$slots.tab
        window.setTimeout(() => {
            this.isShow = false
        }, this.duration)
    },
    methods: {
        tapItem(event) {
            if (this.loading || this.disabled) {
                return
            }
            this.$emit('click', event)
        },

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.l-line-wrap {
    position: relative;
}
.l-line {
    box-sizing: border-box;
    // position: absolute;
    // left: 0;
    // width: 100%;
    height: 1px;
    // transform: scale(0.5);
    // width: 200%;
    &.l-line--primary {
        background-color: #1989fa;
    }
    &.l-button--danger {
        background-color: #ee0a24;
    }
    &.l-button--disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    &.l-button--plain {
        background-color: #fff;
    }
    &.l-button--plain.l-button--primary {
        color: #1989fa;
        // border:1px solid #1989fa;
    }
    &.l-button--loading {
        cursor: default;
    }
    &:active {
        opacity: 0.7;
    }
    &.l-button--loading:active {
        opacity: 1;
    }
    &::before {
        content: " ";
        position: absolute;
        left: 0;
        border: 1px solid #ddd;
    }
}
</style>
