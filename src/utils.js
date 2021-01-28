exports.formatCurrency = (num) => {
    var formattedNum =" " + "$" + num.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  
  return formattedNum;
}

// return no currency sign
exports.formatCurrency1 = (num) => {
  var formattedNum = '';
  formattedNum = num.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return formattedNum;
}


/** 
 * for Kyats currency format
 exports.formatCurrency = (num) => {
  var numLen = num.toString().length;
  var formattedNum = '';
  if(numLen < 6){
    formattedNum = "$ " + num.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }else {
    var lakh = (num/100000);
    formattedNum = "Lakh " + lakh.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ;
  }
  
  return formattedNum;
}
*/
