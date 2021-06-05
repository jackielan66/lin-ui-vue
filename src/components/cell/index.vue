<template>
    <div class="l-cell l-border-bottom" @click="tapItem" :disabled="disabled" :class="[bgClass,
    plainClass,
    blockClass,
    sizeClass,
    mapClass,disabledClass,loadingClass]" :style="wrapStyle">
        <div class="l-cell--title">
            {{title}}
        </div>
        <div class="l-cell--value">
            <span>  {{value}}</span>
            <l-icon v-if="isLink" iconClass="arrow-right-bold" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'l-cell',
    props: {
        isLink: {
            type: [Boolean],
            default: false
        },
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
        size: {
            type: String,
            default() {
                // large small mini
                return 'normal'
            }
        },
        title: {
            type: String,
            default() {
                // large small mini
                return ''
            }
        },
        value: {
            type: String,
            default() {
                // large small mini
                return ''
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
                'large': 'l-cell--large',
                'small': 'l-cell--small',
                'mini': 'l-cell--mini',
                'normal': 'l-cell--normal',
            }
            return sizeClassMap[this.size] || 'l-cell--normal'
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
            // const bgClassMap = {
            //     'primary': 'l-button--primary',
            //     'danger': 'l-button--danger'
            // }
            // return bgClassMap[this.type] || 'l-button--primary'
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
@import url("../style/index.less");
.l-cell {
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
    height: 44px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    outline: none;
    border: none;
    font-size: 14px;
    .l-cell--title {
        color: @black;
        font-size: @font-size-md;
    }
    .l-cell--value {
         color: @text-color;
    }
    &.l-button--disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
    &.l-button--plain {
    }
    &.l-button--plain.l-button--primary {
        color: @primary-color;
        border: 1px solid @primary-color;
        border-width: 0;
    }
    &.l-button--plain.l-button--danger {
        color: @danger-color;
        border: 1px solid @danger-color;
        border-width: 0;
    }
 

    // 大小
    &.l-button--large {
        height: 50px;
        padding: 0 24px;
        font-size: 16px;
    }
    &.l-cell--normal {
        padding: 10px 16px;
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
}
</style>
