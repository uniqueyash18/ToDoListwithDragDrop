showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");

addtaskbtn.addEventListener("click", function(){
    addtaskinputval = addtaskinput.value;
    if(addtaskinputval.trim()!=0){
        let webtask = localStorage.getItem("localtask");
        if(webtask == null){
            taskObj = [];
        }
        else{
            taskObj = JSON.parse(webtask);
        }
        taskObj.push({'task_name':addtaskinputval});
		// console.log(taskObj, 'Ashendra');
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        addtaskinput.value = '';
    }
    showtask();
})

// showtask
function showtask(){
    let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
    }
    let html = '<tr><th>Sr No</th><th>Task Name</th><th>Status</th><th>Start</th><th>Pause</th><th>Complete</th><th>Delete</th></tr> ';
    let addedtasklist = document.getElementById("addedtasklist");
    taskObj.slice().reverse().forEach((item, index) => {
        taskCompleteValue = `<td>${item.task_name}</td>`;
        // if(item.completeStatus==true){
        //     taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
        // }else{
        //     taskCompleteValue = `<td>${item.task_name}</td>`;
        // }
        html += `<tr draggable="true" ondragstart="start()" ondragover="dragover()">
        <th scope="row" >${index + 1}</th>
        ${taskCompleteValue}
        <td> <p id="disStatus">Not started</p></td>
        <td><button id="start" type="button" onclick="startStatus(${index})" class="text-primary"><i class="fa fa-check-square-o"></i>Start</button></td>
        <td><button id="pause" type="button" onclick="pauseStatus(${index})"><i class="fa fa-check-square-o"></i>Pause</button></td>
        <td><button id="complete"type="button" onclick="completeStatus(${index})" class="text-success"><i class="fa fa-check-square-o"></i>Complete</button></td>
        <td><button id="delete" type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i> Delete</button></td>
    </tr>`;
    
    });
    addedtasklist.innerHTML = html;
}


// deleteitem
function deleteitem(index){
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
}



// deleteall
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function () {
    let allTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(allTask);
    if (allTask == null) {
        taskObj = [];
    }
    else {
        taskObj = JSON.parse(allTask);
        taskObj = [];
    }

    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();

})




function startStatus(index) {
    document.getElementById("addedtasklist").rows[index + 1].cells[2].innerHTML = "Task Started"
    console.log(addedtasklist)

}
function pauseStatus(index) {
    document.getElementById("addedtasklist").rows[index + 1].cells[2].innerHTML = "Task Paused"

}
function completeStatus(index) {

    document.getElementById("addedtasklist").rows[index + 1].cells[2].innerHTML = "Task Completed"
}




// //drag drop


var row;
function start() {
    row = event.target;
}
function dragover() {
    var e = event;
    e.preventDefault();

    let children = Array.from(e.target.parentNode.parentNode.children);
    if (children.indexOf(e.target.parentNode) > children.indexOf(row))
        e.target.parentNode.after(row);

    else
        e.target.parentNode.before(row);
}






















