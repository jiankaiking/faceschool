<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <schllo-select />
  </div>
</template>

<script>
import schlloSelect from "../components/select/schlloSelect";

export default {
  name: "Home",
  components: {
    schlloSelect
  }
};
</script>
