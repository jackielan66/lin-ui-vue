<template>
  <div
    class="pull-refresh-wrapper"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- 下拉提示区域 -->
    <div
      class="pull-refresh-indicator"
      :style="{ height: `${distance}px`, transition: transitionStyle }"
    >
      <div
        class="spinner"
        :class="refreshing?'spinning':''"
        :style="spinnerStyle"
      />
      <span
        v-if="!refreshing && distance >= threshold"
        style="margin-left: 8px;"
      >
        {{ distance >= threshold ? '松开刷新' : '' }}
      </span>
      <span v-else-if="refreshing" style="margin-left: 8px;">
        刷新中...
      </span>
    </div>

    <!-- 内容区 -->
    <div class="pull-refresh-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    name: 'PullRefresh',
    props: {
        threshold: {
            type: Number,
            default: 60 // 触发刷新的下拉距离
        }
    },
    data() {
        return {
            startY: 0,
            distance: 0,
            refreshing: false,
            isTouching: false,
            transitionStyle: 'none'
        }
    },
    computed: {
        spinnerStyle() {
            const opacity = Math.min(this.distance / this.threshold, 1)
            const rotate = this.refreshing
                ? 'rotate(0deg)'
                : `rotate(${this.distance * 3}deg)`
            return {
                opacity,
                transform: rotate,
                // animation: this.refreshing ? 'spin 0.8s linear infinite' : 'none'
            }
        }
    },
    methods: {
        handleTouchStart(e) {
            if (this.refreshing) return
            if (document.documentElement.scrollTop > 0) return
            this.isTouching = true
            this.startY = e.touches[0].clientY
            this.distance = 0
            this.transitionStyle = 'none' // 触摸时不加过渡
        },
        handleTouchMove(e) {
            if (!this.isTouching || this.refreshing) return
            const moveY = e.touches[0].clientY
            const diff = moveY - this.startY
            if (diff > 0) {
                e.preventDefault()
                // 阻尼效果：拉得越多阻力越大
                const damped = diff * 0.5 * (1 - Math.min(diff / 600, 0.6))
                this.distance = Math.min(damped, 150)
            }
        },
        handleTouchEnd() {
            if (!this.isTouching) return
            this.isTouching = false
            if (this.distance >= this.threshold) {
                this.triggerRefresh()
            } else {
                this.reset()
            }
        },
        triggerRefresh() {
            this.refreshing = true
            this.transitionStyle = 'height 0.3s ease'
            this.distance = this.threshold
            this.$emit('refresh', this.onRefreshDone)
        },
        onRefreshDone() {
            this.refreshing = false
            this.reset()
        },
        reset() {
            this.transitionStyle = 'height 0.4s cubic-bezier(0.25, 1.5, 0.5, 1)'
            this.distance = 0
        }
    }
}
</script>

<style scoped>
.pull-refresh-wrapper {
  overflow: hidden;
}

.pull-refresh-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f6f6;
  color: #666;
  font-size: 14px;
}

.spinner.spinning {
  animation: spin 0.8s linear infinite;
}
.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid #999;
  border-top-color: transparent;
  border-radius: 50%;
  transition: opacity 0.2s, transform 0.2s;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.pull-refresh-content {
  background: #fff;
}
</style>
