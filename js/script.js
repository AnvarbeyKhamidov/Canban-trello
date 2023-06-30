
// Hamma doskalarni yig'ib turish uchun
let boards = [];

let selectedIndex = -1;

let selectedTaskIndex = -1;

// Karta ko'rsatish uchun funksiya

function showCard() {
    let card = document.getElementById("card");

    card.classList.toggle("d-none");
}

// Doska qo'shish uchun funksiya
function addBoard() {
    let board = document.getElementById("board-title").value;


    document.getElementById("board-title").value = "";

    let newBoard = {
      title: board,
      tasks: []
    };

    if (selectedIndex>=0){
        boards[selectedIndex].title = newBoard.title;
        selectedIndex = -1;
        document.getElementById("add").innerHTML = "Add";
        document.getElementById("add").classList.remove("btn-info");

    } else {
        boards.push(newBoard);
    }

    console.log(boards);
    drawBoard();
}

function drawBoard() {
    let result = "";

    for (let i = 0; i < boards.length; i++) {
        let result1 = "";
        for (let j = 0; j < boards[i].tasks.length; j++) {
            result1 += `
                <div class="alert alert-secondary mt-3" >
                <div class="d-block" onclick="editTask(${i},${j})"><strong>${j + 1}. </strong><span>${boards[i].tasks[j]}</span></div>
                    <div class="delete-task" onclick="deleteTask(${i},${j})">&times;</div>
                </div>
            `;
        }
        result += `
            <div class="col-4 mt-3">
                <div class="card">
                    <div class="close" onclick="deleteBoard(${i})">&times;</div>
                    <div class="card-header" onclick="editBoard(${i})">
                        <h3>${boards[i].title}</h3>
                    </div>
                    <div class="card-body">
                        ${result1}
                    </div>
                    <div class="card-footer">
                        <textarea name="" id="task-title${i}" class="form-control" placeholder="Add task..."></textarea>
                        <button class="btn btn-success d-block mt-3 ml-auto" onclick="addTask(${i})" id="add-one">Add</button>
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById("natija").innerHTML = result;
}


function addTask(index) {
    let taskTitle = document.getElementById("task-title"+index).value;
    if (selectedTaskIndex>=0){
        boards[index].tasks[selectedTaskIndex] = taskTitle;
        selectedTaskIndex = -1;
    } else {
        boards[index].tasks.push(taskTitle);
    }

    console.log(boards);
    drawBoard();
}

function editBoard(index) {
    let taskTitle = document.getElementById("task-title"+index).value;
    document.getElementById("board-title").value = boards[index].title;

    document.getElementById("add").innerHTML = "Save";
    document.getElementById("add").classList.add("btn-info");

    selectedIndex = index;
}

function deleteBoard(index) {
    boards.splice(index,1);
    drawBoard();
}

function deleteTask(index1,index2) {
    boards[index1].tasks.splice(index2,1);
    drawBoard();
}

function editTask(boardIndex,taskIndex) {
    let taskTitle = boards[boardIndex].tasks[taskIndex];

    document.getElementById("task-title"+boardIndex).value = taskTitle;

    selectedIndex = boardIndex;
    selectedTaskIndex = taskIndex;

    let addBtn = document.getElementById("add-one");
    addBtn.innerHTML = "Save";
    addBtn.classList.add("btn-info");

}

