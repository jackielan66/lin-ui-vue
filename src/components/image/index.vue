<template>
  <div class="l-image" >
      <img :src="src"  />
  </div>
</template>

<script>

// intersectionobserver 懒加载
export default {
  name: 'l-image',
  props: {
    src: {
      type: String,
    },
    className: {
      type: String,
      default: ''
    }
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
    }
  }
}
</script>

<style scoped lang="less">
img{
    width: 100%;
}
.l-image {
  
}
</style>