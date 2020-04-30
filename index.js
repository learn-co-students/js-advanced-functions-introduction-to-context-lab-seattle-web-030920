// Your code here
function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, dateString) {
    let timeOut = {
        type: "TimeIn",
        date: dateString.split(" ")[0],
        hour: parseInt(dateString.split(" ")[1], 10)
    }
    employee.timeInEvents.push(timeOut)
    return employee
}

function createTimeOutEvent(employee, dateString) {
    let [date, hour] = dateString.split(" ")
    employee.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    })
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date)
    let timeOut = employee.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)
    return hours * employee.payPerHour
}

function allWagesFor(employee) {
    let dateArr = employee.timeOutEvents.map(event => event.date)
    return dateArr.reduce((memo, date) => memo + wagesEarnedOnDate(employee, date), 0)
}

function calculatePayroll(employees) {
    return employees.reduce((memo, employee) => memo + allWagesFor(employee), 0)
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName)
}
