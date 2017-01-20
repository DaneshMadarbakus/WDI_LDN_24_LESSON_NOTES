angular
  .module('todoApp')
  .controller('ToDosCtrl', ToDosCtrl);

ToDosCtrl.$inject = [];
function ToDosCtrl(){
  const vm = this;

  vm.todos = [
    { task: 'build an awesome todo app', done: false },
    { task: 'get super good at Angular', done: false },
    { task: 'party on code', done: false },
    { task: 'tackle the bonus challenges for this lesson', done: false },
    { task: 'take a nap', done: false }
  ];

  vm.todosCreate    = todosCreate;
  vm.todosDelete    = todosDelete;
  vm.todosCompleted = todosCompleted;
  vm.todosRemaining = todosRemaining;

  // Function that allows us to add new todos to our todos
  function todosCreate(){
    vm.todos.push({ task: vm.text, done: false });
    vm.text = null;
  }

  // Function that allows us to delete specific todos from our todos
  function todosDelete(todo){
    vm.todos = vm.todos.filter(x => x.task !== todo.task);
  }

  // Returns a count of the tasks that have been marked as done
  function todosCompleted(){
    return vm.todos.filter(x => x.done === true);
  }

  // Returns a count of the tasks that have not been marked as done
  function todosRemaining(){
    return vm.todos.filter(x => x.done === false);
  }

}
