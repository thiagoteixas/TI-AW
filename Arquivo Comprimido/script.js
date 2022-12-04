import {mockData} from './mockData.js';

const createTaskButton = document.getElementById('criar-tarefa');
const deleteAllTasksButton = document.getElementById('apaga-tudo');
const deleteCompletedTasksButton = document.getElementById(
  'remover-finalizados'
);
const editSelected = document.getElementById('editar-selecionado');
const confirmEdit = document.getElementById('confirmar-edicao');
const completeSelected = document.getElementById('completar-selecionado');
const taskToBeCreated = document.getElementById('texto-tarefa');
const taskDescription = document.getElementById('descricao');
const taskList = document.getElementById('lista-tarefas');
const mockButton = document.getElementById('inserir-mock');
let allTasks = [];
let toBeEdited;

const dataStructure = document.getElementById('structure');
const structureButton = document.getElementById('structure-button');

getFromLocalStorage();

function addToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(allTasks));
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  console.log(reference);
  if (reference) {
    allTasks = JSON.parse(reference);
    renderTodos();
  }
}

function insertMockData() {
  console.log(allTasks);
  console.log(mockData.tarefas);
  allTasks = mockData.tarefas;
  addToLocalStorage();
}

function renderTodos() {
  allTasks.forEach((task) => {
    const container = document.createElement('div');
    const element = document.createElement('dt');
    const description = document.createElement('dd');
    element.innerText = task.nome;
    element.style.pointerEvents = 'none';
    description.innerText = task.info;
    description.style.pointerEvents = 'none';
    if (task.done === 1) {
      container.classList.add('completed');
    }
    container.appendChild(element);
    container.appendChild(description);
    taskList.appendChild(container);
  });
  console.log(taskList.children);
}

function addToAllTasks() {
  let listLength = allTasks.length
  let taskToBeAdded = {
    id: listLength,
    nome: taskToBeCreated.value,
    info: taskDescription.value,
    done: 0,
  }
  allTasks.push(taskToBeAdded);
  console.log(allTasks);
}

function createTask() {
  const container = document.createElement('div');
  const task = document.createElement('dt');
  const taskInfo = document.createElement('dd');
  task.innerText = taskToBeCreated.value;
  task.style.pointerEvents = "none";
  taskInfo.innerText = taskDescription.value;
  taskInfo.style.pointerEvents = "none";
  addToAllTasks();
  taskToBeCreated.value = '';
  taskDescription.value = '';
  container.appendChild(task);
  container.appendChild(taskInfo);
  taskList.appendChild(container);
  addToLocalStorage(allTasks);
}

function changeBackgroundColor(event) {
  const selected = document.getElementsByClassName('selected');
  const targetedEvent = event.target;
  console.log(targetedEvent);
  if (targetedEvent.id !== 'lista-tarefas' && targetedEvent.tagName !== 'DD') {
     if (selected.length === 1) {
       selected[0].style.backgroundColor = '';
       selected[0].classList.remove('selected');
     }
     targetedEvent.style.backgroundColor = 'rgb(128, 128, 128)';
     targetedEvent.classList.add('selected');
  }
  editSelected.disabled = false;
 
}

function editTask(event) {
  const selected = document.getElementsByClassName('selected');
  console.log(selected[0].children[0]);
  taskToBeCreated.value = selected[0].children[0].innerText;
  taskDescription.value = selected[0].children[1].innerText;

  toBeEdited = document.getElementsByClassName('selected');

  confirmEdit.disabled = false;
}

function finishEdit(event) {
  const currentName = document.getElementById('texto-tarefa').value;
  const currentDescription = document.getElementById('descricao').value;
  
  for (let i = 0; i < taskList.childElementCount; i += 1) {
    if (taskList.children[i].classList.contains('selected')) {
      allTasks[i].nome = currentName;
      allTasks[i].info = currentDescription;
      addToLocalStorage();
    }
  }
  location.reload()
}

function deleteAllTasks() {
  while (taskList.hasChildNodes()) {
    taskList.removeChild(taskList.firstChild);
    allTasks = [];
    addToLocalStorage();
  }
  location.reload();
}

function changeIndex(tasks) {
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].id = i;
  }
  allTasks = tasks;
}

function deleteCompletedTasks() {
  // remover completados da lista
  // adicionar lista ao localStorage
  let tasks = taskList.children;
  let newTasks = [];
  for (let i = 0; i < tasks.length; i += 1) {
    if (!tasks[i].classList.contains('completed')) {
      newTasks.push(allTasks[i]);
    }
  }
  changeIndex(newTasks);
  addToLocalStorage();
  location.reload();
}

function completeCurrentSelected(e) {
  let tasks = taskList.children;
  for (let index = 0; index < tasks.length; index += 1) {
    //console.log(tasks[index]);
    if (tasks[index].classList.contains('selected')) {
      if (tasks[index].classList.contains('completed')) {
        tasks[index].classList.remove('completed');
        allTasks[index].done = 0;
      } else {
        tasks[index].classList.add('completed');
        allTasks[index].done = 1;
      }
      console.log(index);
      changeInLocalStorage(index);
    }
  }
}

function changeInLocalStorage(id) {
  let tasks = JSON.parse(localStorage.getItem('todos'));
  for (let i = 0; i < allTasks.length; i += 1) {
    if (i == id) {
      if (tasks[i].done == 0) tasks[i].done = 1;
      else tasks[i].done = 0;
    }
  }
  localStorage.setItem('todos', JSON.stringify(tasks));
}

function toggleCreateButton(e) {
  if (e.target.value !== '') {
    createTaskButton.disabled = false;
  } else createTaskButton.disabled = true;
}

function toggleStructure() {
  if (dataStructure.style.display == 'none') {
    dataStructure.style.display = 'block';
  } else {
    dataStructure.style.display = 'none';
  }
}

// Eventos dos elementos
createTaskButton.addEventListener('click', createTask);
deleteAllTasksButton.addEventListener('click', deleteAllTasks);
deleteCompletedTasksButton.addEventListener('click', deleteCompletedTasks);
completeSelected.addEventListener('click', completeCurrentSelected);
taskList.addEventListener('click', changeBackgroundColor);
taskToBeCreated.addEventListener('keyup', toggleCreateButton);
editSelected.addEventListener('click', editTask);
confirmEdit.addEventListener('click', finishEdit);
mockButton.addEventListener('click', insertMockData);
structureButton.addEventListener('click', toggleStructure);


