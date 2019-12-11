//  input = "Thu, 12 Dec 2019 00:00:00 GMT"
//  output = "Dec 12, 2019 "
export const formatDate = date => {
  let dateStr = new Date(date).toUTCString();
  let dateArr = dateStr.split(" ");
  return `${dateArr[2]} ${dateArr[1]}, ${dateArr[3]}`;
};