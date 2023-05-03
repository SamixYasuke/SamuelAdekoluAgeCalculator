const btn = document.querySelector(".button");
const dayInput = document.querySelector(".dayInput");
const monthInput = document.querySelector(".monthInput");
const yearInput = document.querySelector(".yearInput");
var p1 = document.querySelector(".p-1");
var p2 = document.querySelector(".p-2");
var p3 = document.querySelector(".p-3");
var dayOutPut = document.querySelector(".dayResult");
var monthOutPut = document.querySelector(".monthResult");
var yearOutPut = document.querySelector(".yearResult");

btn.addEventListener("click", ()=>{
    var dayInputValue = Number(dayInput.value);
    var monthInputValue = Number(monthInput.value);
    var yearInputValue = Number(yearInput.value);

    if(dayInputValue >= 32){
            p1.textContent = "Must be a valid day"
            p1.classList.add("errorDisplay");
            console.log("Error in Day");
    }else if(monthInputValue >= 13){
        p2.textContent = "Must be a valid Month"
        p2.classList.add("errorDisplay");
        console.log("Error in Month");
    }else if(yearInputValue > new Date().getFullYear()){
        p3.textContent = "Must be a valid Year"
        p3.classList.add("errorDisplay");
        console.log("Error in Year");
    }else if(dayInputValue === 0 && monthInputValue === 0 && yearInputValue === 0){
        text = "This field is required";
        p1.textContent = text;
        p2.textContent = text;
        p3.textContent = text;
        p1.classList.add("errorDisplay");
        p2.classList.add("errorDisplay");
        p3.classList.add("errorDisplay");
        console.log(dayInputValue, monthInputValue, yearInputValue);
    }
    else{
        var getAge = calculateAge(dayInputValue, monthInputValue, yearInputValue);
        p1.classList.remove("errorDisplay");
        p2.classList.remove("errorDisplay");
        p3.classList.remove("errorDisplay");
        console.log(`Input = ${dayInputValue}, ${monthInputValue}, ${yearInputValue}`);
        console.log(`OutPut = ${getAge.days}, ${getAge.months}, ${getAge.years}`);
        // dayOutPut.textContent = getAge.days;
        // monthOutPut.textContent = getAge.months;
        // yearOutPut.textContent = getAge.years;
        var counterDay = 0;
        var counterMonth = 0;
        var counterYear= 0;
        var maxCountDay = getAge.days;
        var maxCountMonth = getAge.months;
        var maxCountYear = getAge.years; // the maximum value to count to
        var intervalId = setInterval(() => {
            if (counterDay < maxCountDay) {
              counterDay++;
              dayOutPut.textContent = counterDay;
            }
            if (counterMonth < maxCountMonth) {
              counterMonth++;
              monthOutPut.textContent = counterMonth;
            }
            if (counterYear < maxCountYear) {
              counterYear++;
              yearOutPut.textContent = counterYear;
            }
            if (counterDay === maxCountDay && counterMonth === maxCountMonth && counterYear === maxCountYear) {
              clearInterval(intervalId);
            }
          }, 50);
          
    }
});

function calculateAge(day, month, year){
    // get current date
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();

    // get birth date
    var birthDate = new Date(year, month - 1, day);
    var birthYear = birthDate.getFullYear();
    var birthMonth = birthDate.getMonth() + 1;
    var birthDay = birthDate.getDate();

    // calculate the age
    var ageYears = currentYear - birthYear;
    var ageMonths = currentMonth - birthMonth;
    var ageDays = currentDay - birthDay;

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths = 12 + ageMonths;
        if (ageDays < 0) {
            ageMonths--;
            ageDays = daysInMonth(birthMonth - 1, birthYear) + ageDays;
        }
    }

    function daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    return {years: ageYears, months: ageMonths, days: ageDays};
}
