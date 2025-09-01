<template>
  <div class="segmented-wrap" :class="{ 'segmented-disabled': disabled }">
    <div
      v-for="(item, index) in normalizedOptions" :key="index"
      class="segmented-item"
      :class="{ 'is-active': item.value === currentValue }" @click="handleClick(item)"
    >
      <!-- 支持自定义 label（VNode 或 string） -->
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Segmented',
    props: {
        value: [String, Number], // 支持 v-model
        options: {
            type: Array,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        normalizedOptions() {
            // 统一 options 格式
            return this.options.map((opt) => {
                if (typeof opt === 'string' || typeof opt === 'number') {
                    return { label: opt, value: opt }
                }
                return {
                    label: opt.label,
                    value: opt.value,
                    disabled: !!opt.disabled
                }
            })
        },
        currentValue() {
            return this.value
        }
    },
    methods: {
        handleClick(item) {
            if (this.disabled || item.disabled) return
            this.$emit('input', item.value) // v-model 支持
            this.$emit('change', item.value)
        }
    }
}
</script>

<style scoped>
.segmented-wrap {
  display: inline-flex;
  padding: 2px;
  border-radius: 6px;
  overflow: hidden;
  background: #f5f5f5;
  font-size: 14px;
  user-select: none;
}

.segmented-disabled {
  opacity: 0.6;
  pointer-events: none;
}

.segmented-item {
  flex: 1;
  padding: 6px 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #555;
}

.segmented-item:hover {
  background-color: rgba(0, 0, 0, 0.06);
}

.segmented-item.is-active {
  color: rgba(0, 0, 0, 0.88);
  background-color: #fff;
  border-radius: 4px;
}
</style>
