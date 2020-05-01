// Your code here
function createEmployeeRecord ([firstname, familyname, title, pph]) {
    return {
        firstName: firstname,
        familyName: familyname,
        title: title,
        payPerHour: pph,
        timeInEvents: [],
        timeOutEvents: []}
}

function createEmployeeRecords (AoA){
    return AoA.map(createEmployeeRecord)
}

function createTimeInEvent (employeeObj, date){
    let timeObject= {
        type: "TimeIn",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    }
    employeeObj.timeInEvents.push(timeObject)
    return employeeObj
}

function createTimeOutEvent (employeeObj, date){
    let timeObject= {
        type: "TimeOut",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    }
    employeeObj.timeOutEvents.push(timeObject)
    return employeeObj
}

function hoursWorkedOnDate(employeeObj, date) {
    let timein= employeeObj.timeInEvents.find(timeObject=> timeObject.date==date)
    let timeout= employeeObj.timeOutEvents.find(timeObject=> timeObject.date==date)
    return (timeout.hour-timein.hour)/100
}

function wagesEarnedOnDate(employeeObj, date) {
    return hoursWorkedOnDate(employeeObj, date)*employeeObj.payPerHour
}

function allWagesFor (employeeObj) {
    let dates= employeeObj.timeInEvents.map(timeObject=> timeObject.date)
    return dates.reduce((sum, date)=> sum+wagesEarnedOnDate(employeeObj, date),0)
}

function findEmployeeByFirstName (srcArray, firstName){
    return srcArray.find(emp=> emp.firstName===firstName)
}

function calculatePayroll (srcArray){
    return srcArray.reduce((sum, emp)=> sum+allWagesFor(emp),0)
}

// Sum of pay owed to all employees for all dates, as a number
// Behavior
// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.