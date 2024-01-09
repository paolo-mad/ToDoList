
(function(){
    const currentDate = new Date();
    const year = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - year) / (24 * 60 * 60 * 1000));
    
    const weekNumber = Math.ceil(( currentDate.getDay() + 1 + days) / 7)
    const week = document.querySelector("#week");
    week.textContent = weekNumber;
})();


  