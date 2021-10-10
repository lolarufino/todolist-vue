import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    toDos: [{}],
  },
  mutations: {
    loadToDos(state, payload){
      state.toDos = payload;
    },
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
      state.toDos[payload.id-1] = payload;
    }
  },
  actions: {
    async fetchToDos ({commit}): Promise<void>{
      let {data}:any = await axios.get('https://jsonplaceholder.typicode.com/todos');
      data = data.splice(0, 3);

      commit('loadToDos', data);
    },
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
