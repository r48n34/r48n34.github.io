// get current time, format to a readable text format, then return
function getToday(){
    const d = new Date(); // get date
    const date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate(); // fix format

    return date; //return
}