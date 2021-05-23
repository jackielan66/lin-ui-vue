<template>
    <button class="l-button" @click="tapItem" :disabled="disabled" :class="[bgClass,
    plainClass,
    blockClass,
    sizeClass,
    mapClass,disabledClass,loadingClass]" :style="wrapStyle">
        <l-icon v-show="loading" iconClass="bingtutubiao" />
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'l-button',
    props: {
        disabled: {
            type: [Boolean],
            default: false
        },
        block: {
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
        size: {
            type: String,
            default() {
                // large small mini
                return 'normal'
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

        },
        sizeClass() {
            // large small mini
            // return 'normal'
            const sizeClassMap = {
                'large': 'l-button--large',
                'small': 'l-button--small',
                'mini': 'l-button--mini',
                'normal': 'l-button--normal',
            }
            return sizeClassMap[this.size] || 'l-button--normal'
        },
        blockClass() {
            return this.block ? 'l-button--block' : ''
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
                'primary': 'l-button--primary',
                'danger': 'l-button--danger'
            }
            return bgClassMap[this.type] || 'l-button--primary'
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
.l-button {
    position: relative;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    outline: none;
    border: none;
    font-size: 14px;
    display: inline-block;
    &.l-button--primary {
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
        border: 1px solid #1989fa;
        border-width: 0;
    }
    &.l-button--plain.l-button--danger {
        color: #ee0a24;
        border: 1px solid #ee0a24;
        border-width: 0;
    }
    &.l-button--loading {
        cursor: default;
    }
    &.l-button--plain:active {
        background-color: #eee;
        opacity: 0.7;
    }

    // 大小
    &.l-button--large {
        height: 50px;
        padding: 0 24px;
        font-size: 16px;
    }
    &.l-button--normal {
        padding: 0 15px;
        font-size: 14px;
    }
    &.l-button--small {
        height: 32px;
        padding: 0 8px;
        font-size: 12px;
    }
    &.l-button--mini {
        height: 24px;
        padding: 0 4px;
        font-size: 10px;
    }
    // 大小end

    &.l-button--block {
        display: block;
        width: 100%;
    }
    &:active {
        opacity: 0.7;
    }
    &.l-button--loading:active {
        background-color: inherit;
        opacity: 1;
    }
    &::before {
        content: " ";
        position: absolute;
        left: -50%;
        top: -50%;
        width: 200%;
        height: 200%;
        border: 1px solid;
        border-color: inherit;
        transform: scale(0.5);
        border-radius: 4px;
        // background-color:red;
    }
}
</style>
