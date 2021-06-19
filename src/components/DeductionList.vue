<template>
  <div class="wrapper">
    <div class="title title--small">
      Итого можете внести в качестве досрочных:
    </div>
    <div class="list">
      <div v-for="(item, index) in getList" :key="index" class="list__item">
        <input
          type="checkbox"
          name="value"
          :id="index"
          :checked="item.isChecked"
          @change="onChange(item)"
          :value="item.yearDeduction"
        />
        <label
          :for="index"
          :class="[
            'item__checkbox',
            { checked: item.isChecked, disabled: item.isDisabled },
          ]"
        >
          <svg class="item__checkbox-icon">
            <use xlink:href="@/assets/icons/icons.svg#check" />
          </svg>
        </label>
        <label
          :for="index"
          :class="['item__label', { disabled: item.isDisabled }]"
        >
          {{ item.yearDeduction.toLocaleString("ru-RU") }} рублей
          <span style="color: #808080">в {{ item.yearOrder }}-ый год</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeductionList",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  computed: {
    getList: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
  methods: {
    onChange(item) {
      item.isChecked = !item.isChecked;
      this.getList = [...this.getList];
    },
  },
};
</script>

<style lang="scss" scoped>
$itemHeight: 56px;
$itemMaxCount: 4;

.wrapper {
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  @media screen and (min-device-width: $mobile-media-query) {
    margin-bottom: 4px;
  }
  @media screen and (min-device-width: $tablet-media-query) {
    margin-bottom: unset;
  }
}

.list {
  overflow: overlay;
  max-height: $itemHeight * $itemMaxCount;
  &__item {
    display: flex;
    align-items: center;
    height: $itemHeight;
    border-bottom: 1px solid #dfe3e6;
    gap: 12px;
    & input[type="checkbox"] {
      display: none;
    }
  }
  @media screen and (min-device-width: $mobile-media-query) {
    overflow: unset;
    max-height: 100%;
  }
  @media screen and (min-device-width: $tablet-media-query) {
    overflow: overlay;
    max-height: $itemHeight * $itemMaxCount;
  }
}

.item {
  &__checkbox {
    width: 20px;
    height: 20px;
    border: 1px solid #dfe3e6;
    box-sizing: border-box;
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      border: 1px solid #000000;
    }
    &-icon {
      width: 14px;
      height: 11px;
    }
    &.checked {
      background: linear-gradient(
          255.35deg,
          #dc3131 0.83%,
          rgba(255, 79, 79, 0) 108.93%
        ),
        #ff5e56;
      border: none;
    }
    &.disabled {
      background: #bec5cc;
      pointer-events: none;
      border: none;
    }
  }
  &__label {
    font-size: 14px;
    line-height: 24px;
    &.disabled {
      pointer-events: none;
    }
  }
}
</style>
