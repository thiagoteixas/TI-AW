import {mockData} from './mockData.js';

const taskTable = document.querySelector("table");
const createTaskButton = document.getElementById('criar-tarefa');
const deleteAllTasksButton = document.getElementById('apaga-tudo');
const deleteCompletedTasksButton = document.getElementById(
  'remover-finalizados'
);
const placeBox = document.getElementById('local');
const dateBox = document.getElementById('prazo');
const reminderBox = document.getElementById('lembrete');
const editSelected = document.getElementById('editar-selecionado');
const confirmEdit = document.getElementById('confirmar-edicao');
const completeSelected = document.getElementById('completar-selecionado');
const taskToBeCreated = document.getElementById('texto-tarefa');
const taskDescription = document.getElementById('descricao');
const taskList = document.getElementById('lista-tarefas');
const mockButton = document.getElementById('inserir-mock');
const editInTable = document.getElementById('editar-em-tabela');

let tableTasks = [];
let toBeEdited;

let hasName = false;
let hasDescription = false;
let hasDate = false;
let hasReminder = false;

const dataStructure = document.getElementById('structure');
const structureButton = document.getElementById('structure-button');

getTableFromLocalStorage();

function addToTableLocalStorage() {
  localStorage.setItem('table-todos', JSON.stringify(tableTasks));
}

function getTableFromLocalStorage() {
  const reference = localStorage.getItem('table-todos');
  console.log(reference);
  if (reference) {
    tableTasks = JSON.parse(reference);
    renderTable();
  }
}

function insertMockData() {
  console.log(allTasks);
  console.log(mockData.tarefas);
  tableTasks = mockData.tarefas;
  addToTableLocalStorage();
  location.reload();
}

function renderTable() {
  tableTasks.forEach((task) => {
    const row = document.createElement('tr');
    const element = document.createElement('td');
    const description = document.createElement('td');
    const deadLine = document.createElement('td');
    const reminder = document.createElement('td');
    const place = document.createElement('td');
    const done = document.createElement('td');
    element.innerText = task.nome;
    //element.style.pointerEvents = 'none';
    description.innerText = task.info;
    //description.style.pointerEvents = 'none';
    deadLine.innerText = task.date;
    //deadLine.style.pointerEvents = 'none';
    reminder.innerText = task.reminder;
    //reminder.style.pointerEvents = 'none';
    place.innerText = task.place;
    //place.style.pointerEvents = 'none';
    if (task.done === 1) {
      done.innerHTML = '<strong>CONCLUÍDO</strong>'
      row.classList.add('completed');
      //done.style.pointerEvents = 'none';
    }
    row.appendChild(element);
    row.appendChild(description);
    row.appendChild(deadLine);
    row.appendChild(reminder);
    row.appendChild(place);
    row.appendChild(done);
    taskTable.appendChild(row)
  });
  console.log(taskTable.children);
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
function addToTableTasks() {
  let listLength = tableTasks.length;
  let taskToBeAdded = {
    id: listLength,
    nome: taskToBeCreated.value,
    info: taskDescription.value,
    date: dateBox.value,
    reminder: reminderBox.value,
    place: placeBox.value,
    done: 0,
  };
  tableTasks.push(taskToBeAdded);
  console.log(tableTasks);
}

function createTask() {
  const tableValues = createTableValuesArray();
  let row = taskTable.insertRow();

  for (let element of tableValues) {
    let cell = row.insertCell();
    let text = document.createTextNode(element);
    cell.appendChild(text);
  }
  addToTableTasks();
  addToTableLocalStorage();
  eraseFields();
}

function stopEventPropagation(e) {
  e.stopPropagation();
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

function changeBackgroundColorTable(event) {
  const selected = document.getElementsByClassName('selected');
  const targetedEvent = event.target.parentElement;
  if (targetedEvent.id !== 'task-table' && targetedEvent.tagName !== 'TH' && !targetedEvent.classList.contains("head") && targetedEvent.tagName !== 'MAIN') {
    if (selected.length === 1) {
      selected[0].style.backgroundColor = '';
      selected[0].classList.remove('selected');
    }
    targetedEvent.style.backgroundColor = 'rgb(128, 128, 128)';
    targetedEvent.classList.add('selected');
  }
  editSelected.disabled = false;
}

function editTaskTable(event) {
  const selected = document.getElementsByClassName('selected');
  console.log(selected[0].children);
  taskToBeCreated.value = selected[0].children[0].innerText;
  taskDescription.value = selected[0].children[1].innerText;
  dateBox.value = selected[0].children[2].innerText;
  reminderBox.value = selected[0].children[3].innerText;
  placeBox.value = selected[0].children[4].innerText;

  toBeEdited = document.getElementsByClassName('selected');

  confirmEdit.disabled = false;
}

function editTask(event) {
  const selected = document.getElementsByClassName('selected');
  console.log(selected[0].children[0]);
  taskToBeCreated.value = selected[0].children[0].innerText;
  taskDescription.value = selected[0].children[1].innerText;

  toBeEdited = document.getElementsByClassName('selected');

  confirmEdit.disabled = false;
}

function finishEdite(event) {
  const currentName = document.getElementById('texto-tarefa').value;
  const currentDescription = document.getElementById('descricao').value;
  const currentDate = document.getElementById('prazo').value;
  const currentReminder = document.getElementById('lembrete').value;
  const currentPlace = document.getElementById('local').value;

  for (let i = 1; i < taskTable.childElementCount; i += 1) {
    if (taskTable.children[i].classList.contains('selected')) {
      tableTasks[i - 1].nome = currentName;
      tableTasks[i - 1].info = currentDescription;
      tableTasks[i - 1].date = currentDate;
      tableTasks[i - 1].reminder = currentReminder;
      tableTasks[i - 1].place = currentPlace;
      addToTableLocalStorage();
    }
  }
  location.reload();
}

function finishEdit(event) {
  const currentName = document.getElementById('texto-tarefa').value;
  const currentDescription = document.getElementById('descricao').value;
  const currentDate = document.getElementById('prazo').value;
  const currentReminder = document.getElementById('lembrete').value;
  const currentPlace = document.getElementById('local').value;
  
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
  while (taskTable.hasChildNodes()) {
    taskTable.removeChild(taskTable.firstChild);
    tableTasks = [];
    addToTableLocalStorage();
  }
  location.reload();
}

function changeIndex(tasks) {
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].id = i;
  }
  tableTasks = tasks;
}

function deleteCompletedTasks() {
  // remover completados da lista
  // adicionar lista ao localStorage
  let tasks = taskTable.children;
  console.log(tableTasks);
  console.log(tasks);
  let newTasks = [];
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].tagName === 'TR') {
      if (!tasks[i].classList.contains('completed')) {
        console.log(tableTasks[i - 1]);
        newTasks.push(tableTasks[i - 1]);
      }
    }
  }
  changeIndex(newTasks);
  tableTasks = newTasks;
  addToTableLocalStorage();
  location.reload();
}

function completeCurrentSelected(e) {
  let tasks = taskTable.children;
  console.log(tasks)
  for (let index = 0; index < tasks.length; index += 1) {
    //console.log(tasks[index]);
    if (tasks[index].classList.contains('selected')) {
      if (tasks[index].classList.contains('completed')) {
        tasks[index].classList.remove('completed');
        tableTasks[index - 1].done = 0;
      } else {
        tasks[index].classList.add('completed');
        tableTasks[index - 1].done = 1;
      }
      changeInLocalStorage(index);
    }
  }
}

function changeInLocalStorage(id) {
  let tasks = JSON.parse(localStorage.getItem('table-todos'));
  for (let i = 0; i < tableTasks.length; i += 1) {
    if (i == id - 1) {
      console.log(tasks[i]);
      if (tasks[i].done == 0) tasks[i].done = 1;
      else tasks[i].done = 0;
    }
  }
  localStorage.setItem('table-todos', JSON.stringify(tasks));
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

function eraseFields() {
  taskToBeCreated.value = "";
  taskDescription.value = "";
  dateBox.value = "";
  reminderBox.value = "";
  placeBox.value = "";
}



function createTableValuesArray(){
  const name = taskToBeCreated.value;
  const description = taskDescription.value;
  const date = dateBox.value;
  const reminder = reminderBox.value;
  const place = placeBox.value;

  return [name, description, date, reminder, place];
}

function insertInTableFunction() {
  const tableValues = createTableValuesArray();
  let row = taskTable.insertRow();

  for (let element of tableValues) {
    let cell = row.insertCell();
    let text = document.createTextNode(element);
    cell.appendChild(text);
  }
  addToTableTasks();
  addToTableLocalStorage();
  eraseFields();
}

function editInTableFunction() {

}

// Eventos dos elementos
createTaskButton.addEventListener('click', createTask);
deleteAllTasksButton.addEventListener('click', deleteAllTasks);
deleteCompletedTasksButton.addEventListener('click', deleteCompletedTasks);
completeSelected.addEventListener('click', completeCurrentSelected);
taskList.addEventListener('click', changeBackgroundColor);
taskTable.addEventListener('click', changeBackgroundColorTable);
taskToBeCreated.addEventListener('keyup', toggleCreateButton);
editSelected.addEventListener('click', editTaskTable);
mockButton.addEventListener('click', insertMockData);
structureButton.addEventListener('click', toggleStructure);
editInTable.addEventListener('click', finishEdite);
