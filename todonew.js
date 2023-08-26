showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");
addtaskbtn.addEventListener("click", function () {
    addtaskinputval = addtaskinput.value;
    if (addtaskinputval.trim() != 0) {
        let myTask = localStorage.getItem("localtask");
        taskObj = [];
        taskObj = JSON.parse(myTask);
        taskObj.push({ 'task_name': addtaskinputval, 'status': "Not Started" });

        localStorage.setItem("localtask", JSON.stringify(taskObj));
        addtaskinput.value = '';
    }
    showtask();
})

// showtask
function showtask() {
    let myTask = localStorage.getItem("localtask");
    taskObj = [];
    taskObj = JSON.parse(myTask);
    let html = '';

    let addedtasklist = document.getElementById("addedtasklist");
    taskObj.forEach((item, index) => {
        html += `<tr draggable="true" ondragstart="start()" ondragover="dragover()">
        <th scope="row">${index + 1}</th>
        <td>${item.task_name}</td>
        <td> <p id="disStatus">${item.status}</p></td>
        <td id="tstart"><button id="start" type="button" onclick="startStatus(${index})" class="text-primary start"><i class="fa fa-check-square-o"></i>Start</button></td>
        <td id="tpause"><button class="pause"  id="pause"  type="button" onclick="pauseStatus(${index})"><i class="fa fa-check-square-o"></i>Pause</button></td>
        <td id="tcomplete"><button id="complete"type="button" onclick="completeStatus(${index})" class="complete"><i class="fa fa-check-square-o"></i>Complete</button></td>
        <td id="tdelete"><button id="delete" type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i> Delete </button></td>
    </tr>`;
    });
    addedtasklist.innerHTML = html;

    taskObj.forEach((item, index) => {
        switch (item.status) {
            case "InProgress": {
                document.getElementById("addedtasklist").rows[index].cells[4].style.visibility = "visible"//pause
                document.getElementById("addedtasklist").rows[index].cells[5].style.visibility = "visible"//complete
                document.getElementById("addedtasklist").rows[index].cells[3].style.visibility = "hidden"//start
                break;
            }
            case "Paused": {
                document.getElementById("addedtasklist").rows[index].cells[4].style.visibility = "hidden"//pause
                document.getElementById("addedtasklist").rows[index].cells[5].style.visibility = "hidden"//complete
                document.getElementById("addedtasklist").rows[index].cells[3].style.visibility = "visible"//start
                break;
            }
            case "Completed": {
                document.getElementById("addedtasklist").rows[index].cells[4].style.visibility = "hidden"//pause
                document.getElementById("addedtasklist").rows[index].cells[5].style.visibility = "hidden"//complete
                document.getElementById("addedtasklist").rows[index].cells[3].style.visibility = "hidden"//start
                break;
            }
        }
    })
}
// deleteitem
function deleteitem(index) {
    let myTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(myTask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
}
// deleteall
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function () {
    let allTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(allTask);
        taskObj = [];
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
})


function startStatus(index) {
    let e = event;
    let rows = Array.from(e.target.parentNode.parentNode.parentNode.children);
    let indexr = rows.indexOf(e.target.parentNode.parentNode)

    let allTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(allTask);

    document.getElementById("addedtasklist").rows[indexr].cells[2].innerHTML = "In Progress"

    document.getElementById("addedtasklist").rows[indexr].cells[4].style.visibility = "visible"//pause
    document.getElementById("addedtasklist").rows[indexr].cells[5].style.visibility = "visible"//complete
    document.getElementById("addedtasklist").rows[indexr].cells[3].style.visibility = "hidden"//start

    taskObj[index].status = "InProgress"
    localStorage.setItem("localtask", JSON.stringify(taskObj));
}
function pauseStatus(index) {
    let e = event;
    let rows = Array.from(e.target.parentNode.parentNode.parentNode.children);
    let indexr = rows.indexOf(e.target.parentNode.parentNode)
    document.getElementById("addedtasklist").rows[indexr].cells[4].style.visibility = "hidden"//pause
    document.getElementById("addedtasklist").rows[indexr].cells[5].style.visibility = "hidden"//complete
    document.getElementById("addedtasklist").rows[indexr].cells[3].style.visibility = "visible"//start
    document.getElementById("addedtasklist").rows[indexr].cells[2].innerHTML = "Paused"
    let allTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(allTask);
    taskObj[index].status = "Paused"
    localStorage.setItem("localtask", JSON.stringify(taskObj));
}
function completeStatus(index) {
    let e = event;
    let rows = Array.from(e.target.parentNode.parentNode.parentNode.children);
    let indexr = rows.indexOf(e.target.parentNode.parentNode)
    document.getElementById("addedtasklist").rows[indexr].cells[4].style.visibility = "hidden"//pause
    document.getElementById("addedtasklist").rows[indexr].cells[5].style.visibility = "hidden"//complete
    document.getElementById("addedtasklist").rows[indexr].cells[3].style.visibility = "hidden"//start
    document.getElementById("addedtasklist").rows[indexr].cells[2].innerHTML = "Completed"
    let allTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(allTask);
    taskObj[index].status = "Completed"
    localStorage.setItem("localtask", JSON.stringify(taskObj));
}
// //drag drop
var row;
function start() {
    row = event.target;
}
function dragover() {
    var e = event;
    e.preventDefault();
    let newplace = Array.from(e.target.parentNode.parentNode.children);
    let table = document.getElementById("addedtasklist");
    let rowindex = newplace.indexOf(row)
    table.rows[rowindex].cells[0].innerHTML = rowindex + 1
        if (newplace.indexOf(e.target.parentNode) > newplace.indexOf(row)) {
        e.target.parentNode.after(row);
        table.rows[rowindex].cells[0].innerHTML = rowindex + 1;
    }
    else {
        e.target.parentNode.before(row);
        table.rows[rowindex].cells[0].innerHTML = rowindex + 1
    }
}






















