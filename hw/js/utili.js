function getToday(){
    const d = new Date();
    const date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();

    return date;
}