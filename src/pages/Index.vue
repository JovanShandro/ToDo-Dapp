<template>
  <q-page
    :class="{
      'cursor-wait': isWriting,
      'styled-background': stats.metamask
    }"
    class="flex flex-column"
  >
    <!-- tasks to do  -->
    <div class="row" v-if="stats.metamask">
      <div id="tasks" class="col-12 col-md q-pb-lg q-mt-md">
        <div style="height: 200px"></div>
        <tasks
          :completed="false"
          :tasks="todoTasks"
          v-if="!R.isEmpty(todoTasks)"
        >
          To do
        </tasks>
      </div>

      <!-- user info block 1 -->
      <div
        id="block1"
        class="block overflow-hidden q-mt-xl q-ma-sm col-12 col-md q-pt-xl"
        style="height: 280px !important"
      >
        <div class="text-center text-white">
          <div>
            <img src="../assets/user.png" id="userIcon" alt="" />
          </div>
          <span class="text-bold"> Network:</span>
          {{ util.NETWORKS[stats.netId] }} <br /><br />
          <span class="text-bold">Active account: </span
          >{{ stats.activeAccount }} <br /><br />
          <span class="text-bold">Balance of account: </span
          >{{ stats.web3().utils.fromWei(stats.balance, "ether") }} <br /><br />
        </div>
      </div>

      <!-- user info block -->
      <div
        id="block2"
        class="overflow-hidden q-mt-xl q-ma-sm col-12 order-first q-pt-xl"
        style="height: 280px !important"
        :breakpoint="1023"
      >
        <div class="text-center text-white">
          <div>
            <img src="../assets/user.png" id="userIcon" alt="" />
          </div>
          <span class="text-bold"> Network:</span>
          {{ util.NETWORKS[stats.netId] }} <br /><br />
          <span class="text-bold">Active account: </span
          >{{ stats.activeAccount }} <br /><br />
          <span class="text-bold">Balance of account: </span
          >{{ stats.web3().utils.fromWei(stats.balance, "ether") }} <br /><br />
        </div>
      </div>

      <!-- completed tasks -->
      <div id="completed" class="col-12 col-md  q-pb-lg q-mt-md ">
        <div style="height: 200px"></div>
        <tasks
          :completed="true"
          :tasks="completedTasks"
          v-if="!R.isEmpty(completedTasks)"
        >
          Completed
        </tasks>
      </div>

      <!-- add task button -->
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

    <!-- No metamask banner -->
    <q-banner style="height: 200px" v-else class=" absolute-center">
      <div class="row q-pb-md">
        <img src="../assets/metamask.png" id="metamask" alt="" />
      </div>
      <div class="column" style="font-size: 18px">
        <p class="text-center">
          Could not detect Metamask.
          <br />
          Please make sure to connect to the Metamask extension and refresh the
          page.
        </p>
      </div>
    </q-banner>

    <!-- add task dialog  -->
    <q-dialog v-model="showAddTask">
      <add-task-dialog @close="showAddTask = false" />
    </q-dialog>

    <!-- Info dialog -->
    <q-dialog v-if="stats.metamask" v-model="showInfoDialog" persistent>
      <q-card id="infoCard">
        <q-card-section class="row items-center">
          <q-avatar icon="info" flat text-color="primary" />
          <span class="q-ml-md">
            Do not panic if transaction confirmation immediately pops up!
          </span>
        </q-card-section>
        <q-card-section class="q-mx-md">
          You will be asked only the first time so that a contract is initiated
          to store your tasks!
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Ok" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
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
      flag: true,
      R,
      showAddTask: false,
      showInfoDialog: true
    };
  },
  computed: {
    ...mapState("todo", ["stats", "listAddress", "isLoaded", "isWriting"]),
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
@media screen and (min-width: 1024px) {
  #block2 {
    display: none !important;
  }
}

@media screen and (max-width: 1023px) {
  #block1 {
    display: none !important;
  }
  #tasks,
  #completed {
    transform: translateY(-150px);
  }
}
.flex-column {
  flex-direction: column;
}

#metamask {
  margin: 0 auto;
  width: 200px;
}

#userIcon {
  margin: 0 auto;
  width: 100px;
}

#infoCard {
  max-width: 800px !important;
  font-size: 17px;
}

#infoCard span {
  font-weight: 500;
}

p.text-center {
  margin-top: 10px;
  font-size: 20px;
  font-family: monospace;
  font-weight: 500;
}

.q-banner.absolute-center {
  top: 40%;
}

.q-avatar {
  transform: scale(1.7);
}

.block {
  border-radius: 20%;
}
</style>
