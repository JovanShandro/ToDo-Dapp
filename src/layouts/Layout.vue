<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="stats.metamask" elevated>
      <q-toolbar>
        <q-toolbar-title>
          Todo App
        </q-toolbar-title>
        <div v-if="isWriting" class="q-toolbar-item">
          Please wait until the transaction finishes...
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Layout",
  computed: {
    ...mapState("todo", ["isWriting", "stats"])
  }
};
</script>
