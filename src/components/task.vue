<template>
  <q-item
    @click="updateStatus(id)"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    clickable
  >
    <q-item-section side>
      <q-checkbox color="secondary" :value="task.completed" />
    </q-item-section>

    <q-item-section>
      <q-item-label> {{ task.text }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="deleteItemPopUp(id)"
          flat
          round
          dense
          color="red"
          icon="delete"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ["task", "id"],
  methods: {
    updateStatus(id) {
      this.$store.dispatch("todo/updateStatus", id);
    },
    deleteItemPopUp(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure you want to delete this item?",
          ok: {
            push: true
          },
          cancel: {
            color: "negative"
          },
          persistent: true
        })
        .onOk(() => {
          this.$store.dispatch("todo/deleteTask", id);
        });
    }
  }
};
</script>

<style></style>
