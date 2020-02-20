<template>
  <q-page class="flex flex-center flex-column">
    <div v-if="stats.metamask">
      <p>Metamask detected: {{ stats.metamask }}</p>
      <p>Network: {{ util.NETWORKS[stats.netId] }}</p>
      <p>Active account: {{ stats.activeAccount }}</p>
      <p>Balance of account: {{ stats.balance }}</p>
      <p>Todo List address: {{ listAddress }}</p>
    </div>
    <q-banner style="height: 200px" v-else class="bg-orange-3">
      <div class="row q-pb-md">
        <i
          class="col-4 offset-4 text-center fab fa-wolf-pack-battalion fa-4x"
        ></i>
      </div>
      <div class="column" style="font-size: 18px">
        <p class="text-center">
          Could not detect Metamask.
        </p>
        <p class="text-center">
          Please make sure to connect to the Metamask extension
        </p>
      </div>
    </q-banner>
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
    ...mapState("todo", ["stats", "listAddress", "isLoaded"])
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
