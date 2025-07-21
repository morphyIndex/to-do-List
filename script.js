const addButtons = document.querySelectorAll('.add-new-task');
const submitButton = document.getElementsByClassName('submit')[0]
const overlayCard = document.getElementsByClassName('overlay-input')[0]
const textArea = document.getElementsByClassName('task')[0]
const toggle = document.getElementsByClassName('toggle')[0]
const image = document.querySelector('img')
let newTask
const importantTaskList = document.getElementsByClassName('important-task-list')[0]
const todayTaskList = document.getElementsByClassName('today-task-list')[0]
const personalButton = document.getElementsByClassName('personal-task')[0]
const todayTaskButton = document.getElementsByClassName('today-task')[0]

// Remove card
function removeToggle() {
    overlayCard.style.display = 'none'
}

// Show Card
function showCard() {
    overlayCard.style.display = 'block'
}

// Show Cancel Button
function showCancelButton(button) {
    button.style.display = 'block'
}

// Hide Cancel Button
function hideCancelButton(button) {
    button.style.display = 'none'
}

// Card removed by submit button
submitButton.addEventListener('click', () => {
    newTask = textArea.value
    if(newTask) {
        removeToggle()
    }  
})

// Card removed by the cancel button
toggle.addEventListener('click', () => {
    removeToggle()
})

// Show the card by add buttons
addButtons.forEach(button => {
    button.addEventListener('click', () => {
       showCard()
    }) 
});

// Hover Effect
submitButton.addEventListener('mouseenter', () => {
    image.src = 'images/output-onlinegiftools.gif'
})

submitButton.addEventListener('mouseleave', () => {
    image.src = 'images/output-onlinegiftools (1) (1).png'
})

const listArea = document.getElementsByClassName('list-area')[0]
let todayTasks = []
let personalTask = []

// To make a list
function createList(list, taskList) {
    const taskText = newTask
    list.push(newTask)
    let addedTask = document.createElement('li')
    let checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    checkBox.classList.add('checkBox')
    let text = document.createTextNode(newTask)
    let cancelButton = document.createElement('span')
    cancelButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    cancelButton.classList.add('hover-cancel-button')
    addedTask.appendChild(checkBox)
    addedTask.appendChild(text)
    taskList.appendChild(addedTask)
    addedTask.appendChild(cancelButton)


    addedTask.addEventListener('click', (e) => {
        if (e.target === checkBox) return;
        if(!checkBox.checked) {
            checkBox.checked = true
            addedTask.style.textDecoration = 'line-through'
        } else {
            checkBox.checked = false
            addedTask.style.textDecoration = 'none'
        }
    })

    addedTask.addEventListener('mouseenter', () => {
        showCancelButton(cancelButton)
    })

    addedTask.addEventListener('mouseleave', () => {
        hideCancelButton(cancelButton)
    })

    checkBox.addEventListener('click', () => {
        if(checkBox.checked) {
            addedTask.style.textDecoration = 'line-through'
        } else {
            addedTask.style.textDecoration = 'none'
        }
    })

    cancelButton.addEventListener('click', () => {
        addedTask.remove()

        const index = list.indexOf(taskText)
        if(index !== -1) {
            list.splice(index, 1)
        }
    })
}

let currentList = null;
let activeTaskList = null;

personalButton.addEventListener('click', () => {
    currentList = personalTask
    activeTaskList = importantTaskList
    showCard()
})

todayTaskButton.addEventListener('click', () => {
    currentList = todayTasks
    activeTaskList = todayTaskList
    showCard()
})

submitButton.addEventListener('click', () => {
    newTask = textArea.value.trim()
    if (newTask && currentList && activeTaskList) {
        createList(currentList, activeTaskList)
        removeToggle()
        textArea.value = ''
    }
    console.log(currentList)
})
