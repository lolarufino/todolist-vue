<template>
  <h1>To Do List</h1>
  <input type="text" v-model="inputValue" />
  <button @click="saveValue()">Create task</button>
  <button>Update task</button>
  <ul>
    <li v-for="toDo in toDos">
      {{ toDo.title
      }}<button @click="deleteToDoChosen({ title: toDo.title })">X</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "App",
  computed: {
    ...mapState(["toDos"]),
  },
  methods: {
    ...mapActions(["fetchToDos", "saveToDo", "deleteToDoChosen"]),
    saveValue() {
      if (this.inputValue !== "") {
        this.saveToDo(this.inputValue);
      }
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
  mounted() {
    this.fetchToDos();
  },
});
</script>


<style lang="scss">
</style>
