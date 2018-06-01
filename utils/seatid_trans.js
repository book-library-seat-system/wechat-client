function seatid_to_seatPos(str) { 
  //22->1楼1区4G
  var seatid = parseInt(str)
  console.log("here")
  console.log(seatid)
  var floor = Math.floor(seatid / 360)+1
  var area = Math.floor(Math.floor(seatid%360)/120)+1
  var y = Math.floor(Math.floor(seatid%120)/8)+1
  var x = Math.floor(seatid%8)
  var letter = ['A','B','C','D','E','F','G','H']
  var s = floor.toString()+'楼'+area.toString()+'区'+y.toString()+letter[x]
  return s
}
module.exports = {
  seatid_to_seatPos: seatid_to_seatPos
}