import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    toDos: [{}],
  },
  mutations: {
    loadToDos(state, payload){
      state.toDos = payload.splice(0, 20);
    },
    addNewToDo(state, payload){
      state.toDos.push(payload);
    },
    updateToDos(state, payload){
      state.toDos = state.toDos.filter((toDo: any) => toDo.title !== payload);
    }
  },
  actions: {
    async fetchToDos ({commit}): Promise<void>{
      const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos')

      commit('loadToDos', data);
    },
    async saveToDo ({commit}, inputValue): Promise<void>{
      const data = {title: inputValue};
      commit("addNewToDo", data);
    },
    async deleteToDoChosen ({commit}, {title}):Promise<void>{
      const chosenToDo = title;
      commit("updateToDos", chosenToDo);
    }
  },
  modules: {
  },
});
