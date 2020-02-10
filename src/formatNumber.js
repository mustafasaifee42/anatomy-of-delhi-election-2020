export default function(value) {
  let val_cr, val_lc, val_th, val_hund;
  if (value >= 10000000) {
    val_cr = Math.floor(value / 10000000);
    val_lc = Math.floor((value % 10000000) / 100000);
    if(val_lc < 10) val_lc = `0${val_lc}`
    val_th = Math.floor(((value % 10000000) % 100000) / 1000);
    if(val_th < 10) val_th = `0${val_th}`
    val_hund = value % 1000
    if(val_hund < 10) 
    val_hund = `00${val_hund}`
    else
    if(val_hund < 100 & val_hund >= 10) val_hund = `0${val_hund}`
    return (`${val_cr} ${val_lc} ${val_th} ${val_hund}`)
  } 
  else {
    val_lc = Math.floor(value / 100000);
    val_th = Math.floor((value % 100000) / 1000);
    if(val_th < 10) val_th = `0${val_th}`
    val_hund = value % 1000
    if(val_hund < 10) 
    val_hund = `00${val_hund}`
    else 
    if(val_hund < 100 & val_hund >= 10) val_hund = `0${val_hund}`
    return (`${val_lc} ${val_th} ${val_hund}`)
  }
}