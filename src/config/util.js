/**
 * 全局函数
 */
export default {
  timeFormat: t => {
    // ~~  两次位运算，去小数
    if (~~t || t < 1) {
      var tt = Math.round(t)
      var m = Math.floor(t / 60)
      var s = tt % 60
      m = m >= 10 ? m : '0' + m
      s = s >= 10 ? s : '0' + s
      return m + ':' + s
    } else {
      // 当时间等于0的时候，如果不返回的话，currentTime一开始时间等于0，则无法使用timeFormat返回一个值而现实空
      return t
    }
  },
  // 详情页随机推荐
  getArrayItems: (arr, num) => {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
      temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i < num; i++) {
      //判断如果数组还有可以取出的元素,以防下标越界
      if (temp_array.length > 0) {
        //在数组中产生一个随机索引
        var arrIndex = Math.floor(Math.random() * temp_array.length);
        //将此随机索引的对应的数组元素值复制出来
        return_array[i] = temp_array[arrIndex];
        //然后删掉此索引的数组元素,这时候temp_array变为新的数组
        temp_array.splice(arrIndex, 1);
      } else {
        //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
        break;
      }
    }
    return return_array;
  }


}
