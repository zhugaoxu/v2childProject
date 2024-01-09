export function initData(that) {
  let { currentPage, pageSize } = that.paginationObj;
  let arr = [];
  for (let i = 0; i < that.paginationObj.pageSize; i++) {
    let obj = { id: i + 11 };
    that.tableColumn.map((item) => {
      obj[item.prop] = "猪猪" + (i + 1 + (currentPage - 1) * pageSize);
    });
    arr.push(obj);
  }
  that.tableData = arr;
}
export function searchMethod(that,value) {
  that.initData = value;
  let { age = "", name = "" } = value;
  that.initTableData();
  that.tableData = that.tableData.filter(
    (item) => item.age.indexOf(age) > -1 && item.name.indexOf(name) > -1
  );
}
