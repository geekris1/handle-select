interface Box {
  max: number;
  min: number;
}

function handleSelect(
  selectArea: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  },
  // element.getBoundingClientRect return value
  nodeArea: { top: number; bottom: number; left: number; right: number }
) {
  let { top, left, bottom, right } = nodeArea;
  // default select
  let flag = true;
  const computed = (a: Box, b: Box) => {
    if (a.max < b.max || a.min > b.min) {
      flag = false;
    }
  };
  const nodeCols = { max: right, min: left };
  const nodeRows = { max: bottom, min: top };
  const { start, end } = selectArea;
  // compare col
  if (start.x >= end.x) computed({ max: start.x, min: end.x }, nodeCols);
  else computed({ max: end.x, min: start.x }, nodeCols);
  // compare row
  if (start.y >= end.y) computed({ max: start.y, min: end.x }, nodeRows);
  else computed({ max: start.x, min: end.y }, nodeRows);
  return flag;
}
let test = handleSelect(
  { start: { x: 200, y: 200 }, end: { x: 100, y: 100 } },
  { top: 100, bottom: 150, left: 100, right: 150 }
);

const app = document.getElementById('app');
app.appendChild(document.createTextNode(String(test)));
