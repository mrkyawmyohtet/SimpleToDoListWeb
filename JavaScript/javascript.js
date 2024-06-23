const inputTasks = document.getElementById('input_tasks');
const lists = document.getElementById('lists');

function addNewTask(){
    if(inputTasks.value === ''){
        alert("Please Enter something first, Bby :3");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputTasks.value;
        lists.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputTasks.value = "";
    storeData();
    checkAllTasksCompleted();
}

lists.addEventListener("click", function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
        storeData();
        checkAllTasksCompleted();
    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        storeData();
        checkAllTasksCompleted();        
    }
}, false);

function storeData() {
    let currentDate = new Date().toDateString();
    let data = {
        tasks: lists.innerHTML,
        date: currentDate,
    };
    localStorage.setItem("data", JSON.stringify(data));
}

function showData() {
    let storedData = JSON.parse(localStorage.getItem("data"));
    let currentDate = new Date().toDateString();

    if (storedData && storedData.date === currentDate) {
        lists.innerHTML = storedData.tasks;
    } else {
        localStorage.removeItem("data"); // Clear old data if date has changed
    }
    checkAllTasksCompleted();
}

function checkAllTasksCompleted() {
    let allTasks = document.querySelectorAll('li');
    let allCompleted = true;

    allTasks.forEach(task => {
        if (!task.classList.contains('checked')) {
            allCompleted = false;
        }
    });

    if (allTasks.length > 0 && allCompleted) {       
        let modal = new bootstrap.Modal(document.getElementById('congrat_modal'));
        modal.show();      
    }
}

document.getElementById('congrat_modal').addEventListener('shown.bs.modal', function () {
    audioPlays(); // Start audio when modal is shown
});

function audioPlays(){
    let audio = document.getElementById('modal_audio');
        if (audio) {
            audio.currentTime = 0; // Rewind audio to start
            audio.play().catch(error => {
                console.error('Failed to play audio:', error);
            });
        }
}

showData();