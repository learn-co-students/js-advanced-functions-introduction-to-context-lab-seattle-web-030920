function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName, 
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arraryOfArrays) {
    const arrayOfObjects = arraryOfArrays.map(employeeArray => 
        createEmployeeRecord(employeeArray));
    return arrayOfObjects
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const hour = parseInt(dateStamp.slice(11));
    const date = dateStamp.slice(0, 10);
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: hour,
        date: date
        })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const hour = parseInt(dateStamp.slice(11));
    const date = dateStamp.slice(0, 10);
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: hour,
        date: date
        })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    const startTime = employeeRecord.timeInEvents.find(timeInObject => timeInObject.date === dateStamp)
    const endTime = employeeRecord.timeOutEvents.find(timeOutObject => timeOutObject.date === dateStamp)
    const hoursWorked = (parseInt(endTime.hour) - parseInt(startTime.hour)) / 100;
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    const payOwed = parseInt(employeeRecord.payPerHour) * hoursWorkedOnDate(employeeRecord, dateStamp);
    return payOwed
}

function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
    let pay = 0;
    for (let i = 0; i < dates.length; i++) {
        pay += wagesEarnedOnDate(employeeRecord, dates[i]);
    }
    return pay
}

function findEmployeeByFirstName(srcArray, firstName) {
    let employee;
    employee = srcArray.find(employeeObject => employeeObject.firstName === firstName)
    return employee
}

function calculatePayroll(employeesArray) {
    function getSum(total, num) {
        return total + num;
      }
    const sumOfPay = employeesArray.map(employee => allWagesFor(employee))
    return sumOfPay.reduce(getSum)
}