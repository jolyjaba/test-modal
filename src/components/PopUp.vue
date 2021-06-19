<template>
  <div class="pop-up">
    <div class="pop-up__overlay" @click="closeModal"></div>
    <div class="pop-up__modal">
      <span class="pop-up__button" @click="closeModal">
        <svg>
          <use xlink:href="@/assets/icons/icons.svg#close" />
        </svg>
      </span>
      <div class="title title--large">Налоговый вычет</div>
      <div class="description">
        Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер
        налогового вычета составляет не более 13% от своего официального
        годового дохода.
      </div>
      <section class="input-section">
        <div class="title title--small">Ваша зарплата в месяц</div>
        <input
          type="text"
          class="input"
          :value="isFocusOnInput ? getLocalePrice(price) : currency(price)"
          @focus="isFocusOnInput = true"
          @blur="isFocusOnInput = false"
          @keypress="checkIsNumber"
          @input="onChangeValue"
          :disabled="!true"
          placeholder="Введите данные"
        />
        <Button :textButton="true" @onClick="calculateAmount">
          Рассчитать
        </Button>
      </section>
      <DeductionList v-if="isTotalShown" v-model="totalAmounts"></DeductionList>
      <div class="radio__section">
        <div class="radio__title">Что уменьшаем?</div>
        <div class="radio__options">
          <div
            v-for="item in options"
            :key="item.id"
            @click="onChangeOption(item)"
            :class="['radio__option', { 'not-active': !item.selected }]"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
      <Button :disabled="!true" :fullWidth="true"> Добавить </Button>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import DeductionList from "./DeductionList.vue";
export default {
  components: { Button, DeductionList },
  name: "PopUp",
  data: () => ({
    isFocusOnInput: false,
    price: "",
    maxAmount: 260000,
    list: [
      {
        isChecked: false,
        yearDeduction: 78000,
        yearOrder: 1,
        isDisabled: false,
      },
      {
        isChecked: false,
        yearDeduction: 78000,
        yearOrder: 2,
        isDisabled: false,
      },
      {
        isChecked: false,
        yearDeduction: 78000,
        yearOrder: 3,
        isDisabled: false,
      },
      {
        isChecked: false,
        yearDeduction: 26000,
        yearOrder: 4,
        isDisabled: false,
      },
    ],
    percent: 0.13,
    totalAmounts: [],
    selectedOption: {},
    isTotalShown: false,
    options: [
      {
        id: 1,
        value: "Платёж",
        selected: true,
      },
      { id: 2, value: "Срок", selected: false },
    ],
  }),
  methods: {
    checkIsNumber(evt) {
      evt = evt || window.event;
      const charCode = evt.which || evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    getLocalePrice(val) {
      const copyOfVal = JSON.parse(JSON.stringify(val));
      const formatVal = Number(copyOfVal).toLocaleString("ru-RU");
      this.price = formatVal.replace(/[^0-9.-]+/g, "");
      return formatVal;
    },
    onChangeValue(val) {
      this.price = val.target.value.replace(/[^0-9.-]+/g, "");
    },
    currency(val) {
      return Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
      }).format(val);
    },
    onChangeOption(item) {
      this.selectedOption = { ...item, selected: true };
      this.options = this.options.map((obj) =>
        obj.id === this.selectedOption.id
          ? { ...this.selectedOption }
          : { ...obj, selected: false }
      );
    },
    calculateAmount() {
      this.totalAmounts = [];
      const getPrice = +JSON.parse(JSON.stringify(this.price));
      if (getPrice) {
        const yearSalary = getPrice * 12;
        const yearDeduction = yearSalary * this.percent;
        const floatCountOfDeduction = this.maxAmount / yearDeduction;
        const countOfDeduction = Math.floor(floatCountOfDeduction);
        while (this.totalAmounts.length < countOfDeduction) {
          this.totalAmounts.push({
            isChecked: false,
            yearDeduction,
            yearOrder: this.totalAmounts.length + 1,
            isDisabled: false,
          });
        }
        const reminder = floatCountOfDeduction - countOfDeduction;
        if (reminder) {
          const reminderAmount = +(reminder * yearDeduction).toFixed();
          this.totalAmounts.push({
            isChecked: false,
            yearDeduction: reminderAmount,
            yearOrder: this.totalAmounts.length + 1,
            isDisabled: false,
          });
        }
        this.isTotalShown = true;
      } else {
        this.isTotalShown = false;
      }
    },
    closeModal() {
      this.$store.commit("SET_POPUP", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.pop-up__button {
  position: absolute;
  right: 27px;
  top: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &,
  & svg {
    width: 18px;
    height: 18px;
  }
  @media screen and (min-device-width: $mobile-media-query) {
    right: 22px;
    top: 22px;
    &,
    & svg {
      width: 12px;
      height: 12px;
    }
  }
  @media screen and (min-device-width: $tablet-media-query) {
    right: 27px;
    top: 27px;
    &,
    & svg {
      width: 18px;
      height: 18px;
    }
  }
}

.description {
  color: #808080;
  font-size: 14px;
  line-height: 24px;
  font-style: normal;
  font-weight: normal;
  margin: 16px 0;
  width: fit-content;
  @media only screen and (min-width: $mobile-media-query) {
    font-size: $mobile-font-size;
    line-height: $mobile-line-height;
  }
  @media only screen and (min-width: $tablet-media-query) {
    font-size: 14px;
    line-height: 24px;
  }
}

.pop-up {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  overflow: overlay;
  &__overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: relative;
  }
  &__modal {
    width: $desktop-popup-width;
    min-height: 476px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 30px;
    padding: 32px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    @media screen and (min-device-width: $mobile-media-query) {
      width: $mobile-max-width;
      height: $mobile-min-height;
      border-radius: 0;
      padding: $mobile-modal-padding;
    }
    @media screen and (min-device-width: $tablet-media-query) {
      width: $tablet-max-width;
      height: unset;
      min-height: 476px;
      border-radius: 30px;
      padding: 32px;
    }
    @media screen and (min-device-width: $desktop-media-query) {
      width: $desktop-popup-width;
    }
  }
}

.input {
  &-section {
    margin-bottom: 4px;
  }
  border: 1px solid #dfe3e6;
  box-sizing: border-box;
  border-radius: 3px;
  padding: 7px 10px;
  width: 100%;
  outline: none;
  line-height: 24px;
  font-style: normal;
  font-weight: normal;
  margin: 8px 0;
  font-size: 14px;
  &::placeholder {
    color: #bec5cc;
  }
  &:hover {
    border: 1px solid #000000;
  }
  &:focus {
    border: 1px solid #dfe3e6;
    &::placeholder {
      color: #000000;
    }
  }
  &:disabled {
    border: 1px solid #808080;
    background: #fff;
    &::placeholder {
      color: #808080;
    }
  }
}

.radio {
  &__section {
    display: flex;
    align-items: center;
    gap: 32px;
    margin: 20px 0 40px;
    @media screen and (min-device-width: $mobile-media-query) {
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
    }
    @media screen and (min-device-width: $tablet-media-query) {
      flex-direction: unset;
      align-items: center;
      gap: 32px;
    }
  }
  &__title {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #000000;
  }
  &__options {
    display: flex;
    gap: 16px;
    @media screen and (min-device-width: $mobile-media-query) {
      gap: 8px;
    }
    @media screen and (min-device-width: $tablet-media-query) {
      gap: 16px;
    }
  }
  &__option {
    transition: all 0.1s ease-in;
    cursor: pointer;
    background: $option-background-color;
    border-radius: 50px;
    font-size: 14px;
    line-height: 24px;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #ffffff;
    width: fit-content;
    &.not-active {
      background: #eef0f2;
      color: #000000;
    }

    &:hover {
      background: #dfe3e6;
      color: #000000;
    }

    &:active {
      background: $option-background-color;
      color: #ffffff;
    }
  }
}
</style>
