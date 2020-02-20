<template>
  <div>
    <q-banner
      dense
      :class="{
        'bg-green-4': completed,
        'bg-orange-4': !completed,
        'text-center': true
      }"
    >
      <span class="text-bold text-subtitle1"> <slot></slot> </span>
      <q-list separator bordered>
        <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key" />
      </q-list>
    </q-banner>
  </div>
</template>

<script>
export default {
  props: ["tasks", "completed"],
  components: {
    task: require("./task").default
  }
};
</script>

<style></style>
