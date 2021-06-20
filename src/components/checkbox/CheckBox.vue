<template>
    <div class="l-check-box" :class="[wrapClass]" :style="wrapStyle" @click="onChange">
        <div class="l-check-box__icon" :class="{'on':value}">
            <l-icon v-show="value" color="red" iconClass="select"></l-icon>
        </div>
        <span class="l-check-box__content">
            <slot></slot>
        </span>

    </div>
</template>

<script>
export default {
    name: 'l-check-box',
    props: {
        value: {
            type: [Boolean],
            default: () => {
                return false
            }
        },
        disabled: {
            type: [Boolean],
            default: () => {
                return false
            }
        },
        shape: {
            type: [String],
            default: () => {
                return ''
            }
        },
        offset: {
            type: [String, Number],
            default: () => {
                return 0
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
            console.log(this.gutter, '=== this. gutter ====')
            let style = {
                // paddingLeft: this.gutter / 2 + 'px',
                // paddingRight: this.gutter / 2 + 'px',
                // marginLeft: this.offset / 24 * 100 + '%',
                // width: this.span / 24 * 100 + '%',
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
        wrapClass() {
            let classList = []
            if (this.shape === 'square') {
                classList.push('l-check-square')
            }
            if (this.disabled) {
                classList.push('l-check--disabled')
            }
            return classList
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
        onChange() {
            if(this.disabled){
                return
            }
            this.$emit('input', !this.value)
        },

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
@import url("../style/index.less");
.l-check-box {
    display: inline-block;

    .l-check-box__icon {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        width: 16px;
        height: 16px;
        border: 1px solid #ddd;
        border-radius: 100%;
        transition: all 300ms;
        &.on {
            background-color: @primary-color;
            color: #fff;
        }
    }
        .l-check-box__content {
        margin-left: 5px;
        vertical-align: middle;
    }


    &.l-check-square {
        .l-check-box__icon {
            border-radius: 0;
        }
    }
    &.l-check--disabled{
        .l-check-box__icon,        .l-check-box__content {
            opacity: .5;
        }
    }


}
</style>
