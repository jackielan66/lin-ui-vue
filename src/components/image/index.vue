<template>
    <div class="l-image" :class="wrapName" :style="wrapStyle" ref="imgWrap" :data-src="src">
        <img class="l-image-content" style="display:none" @click="onTap" />
        <span class="loading"> 加载中 </span>
    </div>
</template>

<script>

const obsrverImgs = new IntersectionObserver((entrys) => {
    entrys.forEach(el => {
        console.log(el, 'el')
        let $target = el.target;
        if (el.isIntersecting) {
            if ($target.dataset.src) {
                let image = new Image();
                image.onload = function () {
                    let $imgDom = $target.querySelector('img');
                    let $loading = $target.querySelector('.loading');
                    $imgDom.src = image.src;
                    $imgDom.style.display = 'inline-block';
                    $loading.style.display = 'none';

                }
                image.src = $target.dataset.src;
            }
            obsrverImgs.unobserve($target)
        }
    })
}, {
    root: null,
    thresholds: [.7]
})

export default {
    name: 'l-image',
    props: {
        src: {
            type: String,
        },
        round: Boolean,
        height: {
            type: [String, Number],
        },
        width: {
            type: [String, Number],
            default: () => {
                return '100%'
            }
        }
    },
    computed: {
        wrapStyle() {
            return {
                height: this.height+'px',
                width: this.width+'px'
            }
        },
        wrapName() {
            let className = [];
            console.log(this.round, 'thisround')
            if (this.round) {
                className.push('l-image--round')
            }
            return className
        },
        svgClass() {
            if (this.className) {
                return 'svg-icon ' + this.className
            } else {
                return 'svg-icon'
            }
        }
    },
    mounted() {
        //   console.log(this,'this')
        this.$nextTick(() => {

            obsrverImgs.observe(this.$el)
        })

    },
    methods: {
        onTap() {
            this.$emit('click')
        }
    }
}
</script>

<style scoped lang="less">
img {
    width: 100%;
}
.l-image {
    display: inline-block;
    overflow: hidden;
    &.l-image--round {
        border-radius: 50%;
    }
    .l-image-content{
        width: 100%;
        height: 100%;
    }
}
</style>