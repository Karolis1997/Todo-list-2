const getBtt = document.querySelector('button');
const getInput = document.querySelector('input');
const getList = document.querySelector('.taskList');

const collectTasks = async function () {
    const output = await getAllTasks();
    getInput.value = '';
    getList.innerHTML = '';
    for (i = 0; i < output.length; i++) {
        placeTasks(output[i].description, output[i]._id);
    }
};

const collectSpecificTask = async function (idTask, textTask) {
    const output = await getSpecificTask(idTask);
    textTask.innerHTML = output.description;
};

const placeTasks = function (descript, idToDelete) {
    let newTaskContainer = document.createElement('div');
    let newTask = document.createElement('p');
    let newDelete = document.createElement('img');
    let newCheck = document.createElement(`input`);
    newCheck.type = 'checkbox';
    newDelete.src = './360_F_259544314_hCMIEJ5KJ7yRC8iA5MxySJEtUCkqKF7r.jpg';
    getList.appendChild(newTaskContainer);
    newTaskContainer.appendChild(newCheck);
    newTaskContainer.appendChild(newTask);
    newTaskContainer.appendChild(newDelete);
    newTask.innerHTML = descript;
    newDelete.id = idToDelete;
}

getBtt.addEventListener('click', () => {
    postTask(getInput.value);
    collectTasks();
})

getList.addEventListener('click', (event) => {
    if (event.path[1].localName === 'span') {
        getDiv = event.path[2];
    }
    else {
        getDiv = event.path[1];
    }
    getImg = getDiv.getElementsByTagName('img')[0];
    getID = getImg.id;
    if (event.path[0].localName === 'img') {
        getDiv = event.path[1];
        getImg = getDiv.getElementsByTagName('img')[0];
        deleteTask(getID);
        getList.removeChild(getDiv);
    }
    else if (event.path[0].localName === 'input' && event.path[0].type === 'checkbox') {
        if (event.path[0].checked) {
            checkTask(getID, true);
            text = getDiv.getElementsByTagName('p')[0];
            text.style.textDecoration = 'line-through'
        }
        else {
            text = getDiv.getElementsByTagName('p')[0];
            text.style.textDecoration = ''
        }
    }

})
