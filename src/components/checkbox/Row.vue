<template>
    <div class="l-row" :class="[wrapClass]" :style="wrapStyle">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'l-row',
    provide() {
        return {
            gutter: this.gutter
        }
    },
    props: {
        gutter: {
            type: [String, Number],
            default: () => {
                return 0
            }
        },
        type: {
            type: String,
            default() {
                return ''
            }
        },
        justify: {
            type: String,
            default() {
                return ''
            }
        }
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
            if (this.type === 'flex') {
                let style = {
                    'justify-content': this.justify,
                    // width: 100 * window.devicePixelRatio + '%',
                    // width:'100%'
                }
                return style
            }
            // let scale = 1 / window.devicePixelRatio;

        },
        wrapClass() {
            return this.type === 'flex' ? 'l-row-flex' : ''
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
.l-row {
    &.l-row-flex {
        display: flex;
        // justify-content: flex-end;
    }
    &::after {
        display: table;
        clear: both;
        content: "";
    }
}
</style>
