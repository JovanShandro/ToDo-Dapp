<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">
        Add Task
      </div>
      <q-space></q-space>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-card-section>

    <q-form @submit.prevent="onSubmit">
      <q-card-section>
        <div class="row q-mb-sm">
          <q-input
            v-model="text"
            outlined
            label="Task Text"
            class="col"
            autofocus
            lazy-rules
            clearable
            :rules="[val => !!val || 'Text cannot be empty!']"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Save" color="primary" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("todo/addTask", this.text);
      this.$emit("close");
    }
  }
};
</script>

<style></style>
