<template>
  <q-page class="flex flex-center flex-column">
    <div v-if="stats.metamask">
      <tasks
        class="q-pb-lg"
        :completed="false"
        :tasks="todoTasks"
        v-if="!R.isEmpty(todoTasks)"
        >To do</tasks
      >
      <tasks
        class="q-pb-lg"
        :completed="true"
        :tasks="completedTasks"
        v-if="!R.isEmpty(completedTasks)"
        >Completed</tasks
      >
      <div class="q-mt-xl q-pt-xl">
        <p>Metamask detected: {{ stats.metamask }}</p>
        <p>Network: {{ util.NETWORKS[stats.netId] }}</p>
        <p>Active account: {{ stats.activeAccount }}</p>
        <p>Balance of account: {{ stats.balance }}</p>
        <p>Todo List address: {{ listAddress }}</p>
      </div>
      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
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
          Please make sure to connect to the Metamask extension and refresh the
          page.
        </p>
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
</style>
