export default function(value) {
  let val_lc, val_th, val_hund;
  if (value >= 1000000) {
    val_lc = Math.floor(value / 1000000);
    val_th = Math.floor((value % 1000000) / 1000);
    if(val_th < 10) 
    val_th = `00${val_th}`
    else 
    if(val_th < 100 & val_th >= 10) val_th = `0${val_th}`
    val_hund = value % 1000
    if(val_hund < 10) 
    val_hund = `00${val_hund}`
    else 
    if(val_hund < 100 & val_hund >= 10) val_hund = `0${val_hund}`
    return (`${val_lc} ${val_th} ${val_hund}`)
  } 
  else {
    val_th = Math.floor((value % 1000000) / 1000);
    if(val_th < 10) val_th = `0${val_th}`
    val_hund = value % 1000
    if(val_hund < 10) 
    val_hund = `00${val_hund}`
    else 
    if(val_hund < 100 & val_hund >= 10) val_hund = `0${val_hund}`
    return (`${val_th} ${val_hund}`)
  }
}