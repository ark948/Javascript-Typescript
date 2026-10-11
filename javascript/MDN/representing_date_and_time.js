// the Date object is considered legacy and should be avoided in new code

// Javascript does not have a date data type, the Date object can be used


const dateObjectName = new Date(); // creates today's date and time

xmas95 = new Date("1995-12-25"); // christmas of 1995
xmas95.getMonth(); // 11
xmas95.getFullYear(); // 1995

const today = new Date();
const endYear = new Date(1995, 11, 31, 23, 59, 59, 999); // Set day and month
endYear.setFullYear(today.getFullYear()); // Set year to this year
const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
let daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;
daysLeft = Math.round(daysLeft); // Returns days left in the year


function JSClock() {
    const time = new Date();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    let temp = String(hour % 12);
    if (temp === "0") {
        temp = "12";
    }
    temp += (minute < 10 ? ":0" : ":") + minute;
    temp += (second < 10 ? ":0" : ":") + second;
    temp += hour >= 12 ? " P.M." : " A.M.";
    return temp;
}


