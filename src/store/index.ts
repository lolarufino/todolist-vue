import { createStore } from 'vuex';

export default createStore({
  state: {
    toDos: [
      {
      id: 1,
      title: "Do laundry",
      completed: false,
      checked: false
    },
    {
      id: 2,
      title: "Clean kitchen",
      completed: false,
      checked: false
    },
    {
      id: 3,
      title: "Meal preparation",
      completed: false,
      checked: false
    },
    {
      id: 4,
      title: "Sweeping and mopping the floor",
      completed: false,
      checked: false
    },
    {
      id: 5,
      title: "Dusting surfaces",
      completed: false,
      checked: false
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
      const index = state.toDos.findIndex((toDo) => toDo.id === payload.id);
      state.toDos[index] = payload;
    }
  },
  actions: {
    saveToDo ({commit}, inputValue): void{
      const data = {title: inputValue};
      commit("addNewToDo", data);
    },
    deleteToDoChosen ({commit}, {title}): void{
      const chosenToDo = title;
      commit("updateToDos", chosenToDo);
    },
    updateToDoChosen ({commit}, {inputValue, index, completed}): void{
      const toDoToUpdate = {title: inputValue, id: index, completed: completed};
      commit("updateOneToDo", toDoToUpdate);
    },
    changeStatus ({commit}, {title, completed, index, checked}): void{
      const toDoToUpdate = {title: title, completed: !completed, id: index, checked: !checked};
      commit("updateStatus", toDoToUpdate);
    }
  },
});
