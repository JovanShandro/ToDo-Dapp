<template>
  <q-page>
    <div class="row" v-if="stats.metamask">
      <div class="col q-pb-lg q-ma-sm">
        <div style="height: 200px"></div>
        <tasks
          :completed="false"
          :tasks="todoTasks"
          v-if="!R.isEmpty(todoTasks)"
        >
          To do
        </tasks>
      </div>
      <div
        class="block overflow-hidden q-mt-xl q-ma-sm col q-pt-xl"
        style="height: 280px !important"
      >
        <div class="text-center">
          <span class="text-bold"> Network:</span>
          {{ util.NETWORKS[stats.netId] }} <br /><br />
          <span class="text-bold">Active account: </span
          >{{ stats.activeAccount }} <br /><br />
          <span class="text-bold">Balance of account: </span
          >{{ stats.web3().utils.fromWei(stats.balance, "ether") }} <br /><br />
          <span class="text-bold">List address: </span>{{ listAddress }} <br />
        </div>
      </div>
      <div class="col q-pb-lg col q-ma-sm">
        <div style="height: 200px"></div>
        <tasks
          :completed="true"
          :tasks="completedTasks"
          v-if="!R.isEmpty(completedTasks)"
        >
          Completed
        </tasks>
      </div>
      <div
        class="absolute-bottom q-ma-sm text-center q-mb-lg no-pointer-events"
      >
        <q-btn
          color="primary"
          round
          size="24px"
          icon="add"
          class="all-pointer-events"
          @click="showAddTask = true"
        />
      </div>
    </div>
    <q-banner style="height: 200px" v-else class="bg-orange-3 absolute-center">
      <div class="row q-pb-md">
        <i
          class="col-4 offset-4 text-center fab fa-wolf-pack-battalion fa-4x"
        ></i>
      </div>
      <div class="column" style="font-size: 18px">
        <p class="text-center">
          Could not detect Metamask.
        </p>
        <br />
        <p class="text-center">
          Please make sure to connect to the Metamask extension and refresh the
          page.
        </p>
        <br />
      </div>
    </q-banner>

    <q-dialog v-model="showAddTask">
      <add-task-dialog @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import * as util from "../lib/util";
import * as R from "ramda";

export default {
  name: "PageIndex",
  data() {
    return {
      util,
      R,
      showAddTask: false
    };
  },
  computed: {
    ...mapState("todo", ["stats", "listAddress", "isLoaded"]),
    ...mapGetters("todo", ["todoTasks", "completedTasks"])
  },
  beforeCreate() {
    this.$store.dispatch("todo/setWeb3");
  },
  components: {
    tasks: require("../components/tasksList").default,
    "add-task-dialog": require("../components/addTaskDialog").default
  }
};
</script>

<style scoped>
.flex-column {
  flex-direction: column;
}

.block {
  border-radius: 20%;
  background-color: rgb(26, 143, 190, 0.4);
}
</style>
