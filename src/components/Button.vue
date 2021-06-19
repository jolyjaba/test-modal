<template>
  <button
    :disabled="disabled"
    :class="['button', { small, primary, fullWidth, textButton }]"
    @click="$emit('onClick')"
  >
    <slot> Button </slot>
  </button>
</template>

<script>
export default {
  props: {
    small: {
      type: Boolean,
      default: () => false,
    },
    primary: {
      type: Boolean,
      default: () => false,
    },
    fullWidth: {
      type: Boolean,
      default: () => false,
    },
    textButton: {
      type: Boolean,
      default: () => false,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  transition: all 0.3s ease;
  cursor: pointer;
  background: linear-gradient(
      255.35deg,
      #dc3131 0.83%,
      rgba(255, 79, 79, 0) 108.93%
    ),
    #ff5e56;
  box-shadow: 0px 0px 24px rgba(234, 0, 41, 0.33);
  border-radius: 6px;
  border: 0;
  padding: 16px 32px;
  height: 56px;
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  @media screen and (min-device-width: $mobile-media-query) {
    height: $mobile-max-height;
    padding: $mobile-padding;
    font-size: $mobile-font-size;
    line-height: $mobile-line-height;
  }
  @media screen and (min-device-width: $tablet-media-query) {
    height: 56px;
    padding: 16px 32px;
    font-size: 16px;
    line-height: 24px;
  }
  &:hover,
  &:active {
    background: #ea0029;
  }
  &:disabled {
    background: #bec5cc;
    box-shadow: none;
    cursor: unset;
  }
  &.primary {
    border: 1px solid #ffffff;
    background: transparent;
    box-shadow: none;
    &:hover,
    &:active {
      background: #ffffff;
      &:not(:disabled) {
        color: #000000;
      }
    }
    &:disabled {
      background: #bec5cc;
    }
  }
  &.fullWidth {
    width: 100%;
    @media screen and (min-device-width: $mobile-media-query) {
      margin-top: auto;
    }
    @media screen and (min-device-width: $tablet-media-query) {
      margin-top: unset;
    }
  }
  &.textButton {
    font-size: 14px;
    line-height: 24px;
    border: 0;
    width: fit-content;
    box-shadow: unset;
    background: unset;
    color: #ea0029;
    padding: 0;
    height: unset;
    border-radius: 0;
    &:hover {
      color: #f53a31;
    }
    &:active {
      color: #ea0029;
    }
  }
}
</style>
