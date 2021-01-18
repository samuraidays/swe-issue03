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
  row.appendChild(fragment);
  document.getElementById('tb').appendChild(row);
}

function removeTr(){
  const td = event.target.parentNode; 
  const tr = td.parentNode;
//  console.log(tr);
  let nextTr = tr.nextElementSibling;
  while(nextTr !== null){
    const childTd = nextTr.childNodes[0];
//    console.log(childTd);
    const newRow = childTd.textContent - 1;
    childTd.textContent = newRow;
    nextTr = nextTr.nextElementSibling;
//    console.log(nextTr);
  }
  tr.parentNode.removeChild(tr);

}

const btnAdd = document.getElementById("btnadd");
btnAdd.addEventListener( "click" , addTask);

//このパターンは動かない
//const btnDel = document.getElementById("td");
//btnDel.addEventListener("click",removeTr());