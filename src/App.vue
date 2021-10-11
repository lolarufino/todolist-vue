<template>
  <div class="wrapper">
    <h1 class="title">To Do List</h1>
    <img
      class="animation"
      src="https://i.ibb.co/6vdyf8J/39019-completing-taskscompressed.gif"
      alt="Girl working"
    />
    <div class="inputs-wrapper">
      <input
        type="text"
        v-model="inputValue"
        class="input"
        placeholder="Write your next task"
      />
      <div class="button-wrapper">
        <button @click="saveValue()" class="button">
          <img
            class="button-image"
            src="https://i.ibb.co/PtRvP47/round-add-button.png"
            alt="Plus icon to
          add task"
          />
        </button>
        <button
          @click="updateValue(this.inputValue, this.index, this.completed)"
          class="button"
        >
          <img
            class="button-image"
            src="https://i.ibb.co/zxJ9Z5Y/update.png"
            alt="Arrows icon to update task"
          />
        </button>
      </div>
    </div>
    <div class="filter-wrapper">
      <button class="filter-button" @click="showAll()">
        Show All ({{ this.toDos.length }})</button
      ><button class="filter-button" @click="showNotCompleted()">
        Not completed ({{ this.toDos.filter((toDo: any) => toDo.completed !== true).length

        }})</button
      ><button class="filter-button" @click="showCompleted()">
        Completed ({{ this.toDos.filter((toDo: any) => toDo.completed === true).length

        }})
      </button>
    </div>
    <ul class="list">
      <li v-for="toDo in componentToDos" class="element-list">
        <input type="checkbox" @change="completeToDo(toDo)" />
        <button
          class="update-button"
          @click="
            setInputValue({ title: toDo.title }),
              setIndex({ id: toDo.id }),
              setStatus({ completed: toDo.completed })
          "
          :style="getTextDecoration(toDo)"
        >
          {{ toDo.title }}</button
        ><button
          @click="deleteToDoChosen({ title: toDo.title })"
          class="delete-button"
        >
          <img
            class="button-image"
            src="https://i.ibb.co/Qr9TTcq/delete.png"
            alt="Garbage container icon to delete task"
          />
        </button>
      </li>
    </ul>
  </div>
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
    ...mapActions([
      "saveToDo",
      "deleteToDoChosen",
      "updateToDoChosen",
      "changeStatus",
    ]),
    saveValue() {
      if (this.inputValue !== "") {
        this.saveToDo(this.inputValue);
        this.inputValue = "";
      }
    },
    setInputValue(toDoToUpdate: any) {
      this.inputValue = toDoToUpdate.title;
    },
    setIndex(toDoIndex: any) {
      this.index = toDoIndex.id;
    },
    setStatus(toDoStatus: any) {
      this.completed = toDoStatus.completed;
    },
    updateValue(inputValue: string, index: number, completed: boolean) {
      this.updateToDoChosen({ inputValue, index, completed });
      this.inputValue = "";
      this.index = null;
      this.completed = null;
    },
    completeToDo(toDo: any) {
      this.changeStatus({
        title: toDo.title,
        completed: toDo.completed,
        index: toDo.id,
      });
    },
    getTextDecoration(toDo: any) {
      const textDecoration = toDo.completed === false ? "none" : "line-through";
      return { textDecoration };
    },
    showAll() {
      this.componentToDos = this.toDos;
    },
    showNotCompleted() {
      this.componentToDos = this.toDos;
      this.componentToDos = this.componentToDos.filter(
        (toDo: any) => toDo.completed !== true
      );
    },
    showCompleted() {
      this.componentToDos = this.toDos;
      this.componentToDos = this.componentToDos.filter(
        (toDo: any) => toDo.completed === true
      );
    },
  },
  data() {
    return {
      inputValue: "",
      index: null,
      completed: null,
      componentToDos: [],
    };
  },
  mounted() {
    this.toDos;
    this.componentToDos = this.toDos;
  },
});
</script>


<style lang="scss">
body {
  background-color: #fdeeea;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    color: #7392ff;
    font-family: "Exo 2", sans-serif;
    text-align: center;
    font-size: 60px;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    margin: 0;
    border-radius: 50px;
  }
  .animation {
    width: 425px;
  }
  .inputs-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    background-color: #7392ff;
    border-radius: 5px;
    padding: 20px;
    width: 300px;
    margin: 20px;
    .input {
      background-color: #7392ff;
      border: 0;
      border-bottom: 2px solid #fdeeea;
      margin: 20px;
      font-family: "Exo 2", sans-serif;
      font-size: 15px;
      color: white;
      &::placeholder {
        color: white;
      }
      &:focus {
        outline: none;
      }
    }
    .button-wrapper {
      .button {
        background-color: transparent;
        border: 0;
        cursor: pointer;
        .button-image {
          width: 30px;
        }
      }
    }
  }
  .filter-wrapper {
    display: flex;
    .filter-button {
      font-family: "Exo 2", sans-serif;
      background-color: #7392ff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      padding: 10px;
      margin: 10px;
      &:hover {
        background-color: white;
        color: #7392ff;
      }
    }
  }
  .list {
    font-family: "Exo 2", sans-serif;
    font-size: 15px;
    width: 70%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .element-list {
      display: flex;
      align-items: center;
      list-style-type: none;
      justify-content: space-between;
      background-color: white;
      width: 350px;
      margin: 10px;
      padding: 20px;
      color: black;
      border-radius: 5px;
      &:hover {
        background-color: rgb(247, 247, 247);
      }
      .update-button {
        background-color: transparent;
        border: 0;
        cursor: pointer;
      }
      .delete-button {
        background-color: transparent;
        border: 0;
        cursor: pointer;
        .button-image {
          width: 30px;
        }
      }
    }
  }
}
</style>
