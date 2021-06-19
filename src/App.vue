<template>
  <div class="container" v-if="!getPopupShow">
    <Button :disabled="!true" :primary="true" @onClick="onClick">
      Налоговый вычет
    </Button>
  </div>
  <PopUp v-if="getPopupShow"></PopUp>
</template>

<script>
import Button from "./components/Button.vue";
import PopUp from "./components/PopUp.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Button,
    PopUp,
  },
  name: "App",
  data: () => ({}),
  computed: {
    ...mapGetters({
      getPopupShow: "getPopupShow",
    }),
  },
  methods: {
    onClick() {
      this.$store.commit("SET_POPUP", true);
    },
  },
};
</script>

<style lang="scss">
@import url("http://fonts.cdnfonts.com/css/lab-grotesque");

*,
*::before,
*::after {
  font-family: "Lab Grotesque", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      255.35deg,
      #dc3131 0.83%,
      rgba(255, 79, 79, 0) 108.93%
    ),
    #ff5e56;
  box-shadow: 0px -0.11px 16.9495px rgba(183, 187, 225, 0.33);
  display: flex;
  align-items: center;
  justify-content: center;
}

.transparent {
  background: transparent !important;
}

.title {
  font-weight: 500;
  width: fit-content;
  &--large {
    font-size: 28px;
    line-height: 40px;
  }
  &--small {
    margin-top: 8px;
    font-size: 14px;
    line-height: 24px;
  }
  @media screen and (min-device-width: $mobile-media-query) {
    &--large {
      font-size: 18px;
      line-height: 24px;
    }
  }
  @media screen and (min-device-width: $tablet-media-query) {
    &--large {
      font-size: 28px;
      line-height: 40px;
    }
  }
}
</style>
