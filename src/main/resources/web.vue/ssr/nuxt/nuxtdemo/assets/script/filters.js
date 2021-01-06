export function fillzero(n) {
  return n<10? '0' + n: '' + n;
}


export  const date = time => {
  let d = new Date();
  d.setTime(time);
  let year = d.getYear();
  let month = d.getMonth()+1;
  let day = d.getDay();
  return `${year}年${fillzero(month)}月${fillzero(day)}日`;
}
