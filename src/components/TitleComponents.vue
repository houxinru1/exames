<template>
  <div class="title">
    <span :class="icon"></span>
    <span class="title-text">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: ["title", "icon"],
  name: "titleComponents",
};
</script>

<style scoped lang="scss">
.title-text {
  font-size: 22px;
  margin-left: 5px;
}
.title {
  padding: 15px 0;
}
</style>
