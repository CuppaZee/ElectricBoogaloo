let string = "";
process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", function (data) {
  string += data;
});
process.stdin.on('end', function () {
  const array = string.split("\n").filter(i => i.trim());
  console.log(array[array.length - 1])
})
