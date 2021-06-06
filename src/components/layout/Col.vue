<template>
    <div class="l-col" :class="[bgClass]" :style="wrapStyle">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'l-col',
    inject: {
        gutter: {
            default: 0
        }
    },
    props: {
        span: {
            type: [String, Number],
            default: () => {
                return 1
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
                paddingLeft: this.gutter / 2 + 'px',
                paddingRight: this.gutter / 2 + 'px',
                marginLeft: this.offset / 24 * 100 + '%',
                width: this.span / 24 * 100 + '%',
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
.l-col {
    box-sizing: border-box;
    float: left;
    word-wrap:break-word;
}
</style>
