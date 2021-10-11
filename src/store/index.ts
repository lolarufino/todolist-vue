import { createStore } from 'vuex';

export default createStore({
  state: {
    toDos: [
      {
      id: 1,
      title: "Do laundry",
      completed: false
    },
    {
      id: 2,
      title: "Clean kitchen",
      completed: false
    },
    {
      id: 3,
      title: "Meal preparation",
      completed: false
    },
    {
      id: 4,
      title: "Sweeping and mopping the floor",
      completed: false
    },
    {
      id: 5,
      title: "Dusting surfaces",
      completed: false
    },
  ],
  },
  mutations: {
    addNewToDo(state, payload){
      payload.id = state.toDos.length+1;
      payload.completed = false;
      state.toDos.push(payload);
    },
    updateToDos(state, payload){
      state.toDos = state.toDos.filter((toDo: any) => toDo.title !== payload);
    },
    updateOneToDo(state, payload){
      state.toDos[payload.id-1] = payload;
    },
    updateStatus(state, payload){
      let index = state.toDos.findIndex((toDo) => toDo.id === payload.id);
      state.toDos[index] = payload;
    }
  },
  actions: {
    async saveToDo ({commit}, inputValue): Promise<void>{
      const data = {title: inputValue};
      commit("addNewToDo", data);
    },
    async deleteToDoChosen ({commit}, {title}):Promise<void>{
      const chosenToDo = title;
      commit("updateToDos", chosenToDo);
    },
    async updateToDoChosen ({commit}, {inputValue, index, completed}):Promise<void>{
      const toDoToUpdate = {title: inputValue, id: index, completed: completed};
      commit("updateOneToDo", toDoToUpdate);
    },
    async changeStatus ({commit}, {title, completed, index}):Promise<void>{
      const toDoToUpdate = {title: title, completed: !completed, id: index};
      commit("updateStatus", toDoToUpdate);
    }
  },
});
