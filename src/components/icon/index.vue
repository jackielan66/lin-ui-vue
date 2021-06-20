<template>
    <svg :class="svgClass" aria-hidden="true"  :style="wrapStyle">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script>
export default {
    name: 'l-icon',
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ''
        },
        color: [String],
    },
    computed: {
        iconName() {
            return `#l-icon-${this.iconClass}`
        },
        svgClass() {
            if (this.className) {
                return 'svg-icon ' + this.className
            } else {
                return 'svg-icon'
            }
        },
        wrapStyle(){
            if(this.color){
                return {
                    // backgroundColor:this.color,
                    // fill: this.color
                }
            }
        }

    }
}
</script>

<style lang="less">
path { fill: inherit !important }
.svg-icon {
    width: 1em;
  height: 1em;
//   vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>