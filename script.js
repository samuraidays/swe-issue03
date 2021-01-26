function addTask() {
  // オブジェクト用意
  const newtask = {
    content: document.forms['form'].elements['task'].value,
    status: "作業中",
  };

  // オブジェクトを配列に入れる
  let tasks = [];
  tasks.push(newtask);

  // テキストボックスクリア
  document.forms['form'].elements['task'].value = '';

  let fragment = document.createDocumentFragment();

  // id, comment設定
  fragment = createIdComment(fragment, tasks[0].content);

  // statusボタン設定
  fragment = createStatusButton(fragment, tasks[0].status);

  // 削除ボタン設定
  fragment = delButton(fragment);

  // 1行分HTML表示
  displayHTML(fragment);

}

function createIdComment(row, content){
  const tbl = document.getElementById('tbl');
  const rowNum = tbl.rows.length;

  // ID
  const idCell = document.createElement("td");
  const idCellText = document.createTextNode(rowNum - 1);
  idCell.appendChild(idCellText);
  row.appendChild(idCell);

  // comment
  const commentCell = document.createElement("td");
  const commentCellText = document.createTextNode(content);
  commentCell.appendChild(commentCellText);
  row.appendChild(commentCell);

  return row
}

function createStatusButton(row, status){
  const statusCell = document.createElement("td");
  const statusCellInput = document.createElement("input");
  statusCellInput.setAttribute("type","button");
  statusCellInput.setAttribute("onclick","changeStatus()");
  statusCellInput.setAttribute("value",status);
  statusCell.appendChild(statusCellInput);
  row.appendChild(statusCell);

  return row
}

function delButton(row) {
  const delCell = document.createElement("td");
  const delCellIput = document.createElement("input");
  delCellIput.setAttribute("type","button"); 
  delCellIput.setAttribute("id","td"); 
  delCellIput.setAttribute("onclick","removeTr()");
  delCellIput.setAttribute("value","削除");
  delCell.appendChild(delCellIput);
  row.appendChild(delCell);

  return row
}

function displayHTML(fragment) {
  const row = document.createElement("tr");
  row.setAttribute("id","addtr");
  row.appendChild(fragment);
  document.getElementById('tb').appendChild(row);
  const form = document.getElementById('form');
  if(form.childNodes[7].checked === true){
    let tb = document.getElementById('tb')
    tb.lastElementChild.style.display ="none";
  }
}

function removeTr(){
  const td = event.target.parentNode; 
  const tr = td.parentNode;
  let nextTr = tr.nextElementSibling;
  while(nextTr !== null){
    const childTd = nextTr.childNodes[0];
    const newRow = childTd.textContent - 1;
    childTd.textContent = newRow;
    nextTr = nextTr.nextElementSibling;
  }
  tr.parentNode.removeChild(tr);

}

function changeStatus(){
  const td = event.target.parentNode;
  if(td.firstChild.value === '作業中'){
    td.firstChild.value = "完了";
  } else if (td.firstChild.value === "完了"){
    td.firstChild.value = "作業中";
  }
  const form = document.getElementById('form');
  if(form.childNodes[5].checked === true){
    displayStatus('doing');
  } else if(form.childNodes[7].checked === true){
    displayStatus('done');
  }
}

function displayStatus(status){
  let addTr = document.getElementById('addtr')
  while(addTr !== null){
    switch(status){
      case 'all':
        addTr.style.display ="table-row";
        break;
      case 'doing':
        if(addTr.childNodes[2].firstChild.value !== "作業中"){
          addTr.style.display ="none";
        } else {
          addTr.style.display ="table-row";
        }
        break;
      case 'done':
        if(addTr.childNodes[2].firstChild.value !== "完了"){
          addTr.style.display ="none";
        } else {
          addTr.style.display ="table-row";
        }
        break;
      default:
        console.log("エラー:想定外の値です")
    }
    addTr = addTr.nextElementSibling;
  }
}

const all = document.getElementById("all");
all.addEventListener( "click" , () => {
  displayStatus(all.value)
});

const doing = document.getElementById("doing");
doing.addEventListener( "click" , () => {
  displayStatus(doing.value)
});

const done = document.getElementById("done");
done.addEventListener( "click" , () => {
  displayStatus(done.value)
});

const btnAdd = document.getElementById("btnadd");
btnAdd.addEventListener( "click" , addTask);

