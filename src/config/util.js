export default {
  timeFormat: s => {
    // ~~t  两次位运算，去小数
    if (~~s || s > 1) {
      let min = Math.floor(s / 60)
      let sec = s % 60
      min = min < 10 ? '0' + min : min
      sec = sec < 10 ? '0' + sec : sec
      return min + ':' + sec
    }
  }
}
