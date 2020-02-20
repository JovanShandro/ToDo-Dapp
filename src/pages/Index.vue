<template>
  <q-page class="flex flex-center flex-column">
    <p>Metamask detected: {{ stats.metamask }}</p>
    <p>Network: {{ util.NETWORKS[stats.netId] }}</p>
    <p>Active account: {{ stats.activeAccount }}</p>
    <p>Balance of account: {{ stats.balance }}</p>
    <p>Todo List address: {{ contract }}</p>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import * as util from "../lib/util";

export default {
  name: "PageIndex",
  data() {
    return {
      util
    };
  },

  computed: {
    ...mapState("todo", ["stats", "contract"])
  },
  beforeCreate() {
    this.$store.dispatch("todo/setWeb3");
  }
};
</script>

<style scoped>
.flex-column {
  flex-direction: column;
}
</style>
