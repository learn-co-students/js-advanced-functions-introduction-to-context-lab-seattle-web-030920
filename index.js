function createEmployeeRecord( userData )
{
    return {firstName: userData[0], 
        familyName: userData[1], 
        title: userData[2], 
        payPerHour: userData[3], 
        timeInEvents: [], 
        timeOutEvents: [] 
        }
}

function createEmployeeRecords(employees)
{
    return employees.map(function(employee) { return new createEmployeeRecord(employee) } )    
}

function createTimeInEvent(employee, dateStamp)
{    
    let parsedDate = dateStamp.split(" ");
    let timeIn = {type: "TimeIn", hour: parseInt(parsedDate[1]), date: parsedDate[0]}
    employee.timeInEvents.push(timeIn);
    return employee
}

function createTimeOutEvent(employee, dateStamp)
{
    //"YYYY-MM-DD 800"
    let parsedDate = dateStamp.split(" ");
    let timeOut = {type: "TimeOut", hour: parseInt(parsedDate[1]), date: parsedDate[0]}
    employee.timeOutEvents.push(timeOut);
    return employee
}

function hoursWorkedOnDate(employee, dateStamp)
{   
    function dateToFind(date){ return date.date === dateStamp}
    let parsedDate = dateStamp.split(" ");
    let checkIn = employee.timeInEvents.find(dateToFind);
    let checkOut = employee.timeOutEvents.find(dateToFind);    
    return (checkOut.hour - checkIn.hour)/100
}

function wagesEarnedOnDate(employee, dateStamp)
{    
    return employee.payPerHour * hoursWorkedOnDate(employee,dateStamp)
}

function allWagesFor(employee)
{   
    function sum(total, date){        
        total = total + wagesEarnedOnDate(employee,date.date)        
        return total;
    }

    let total = employee.timeOutEvents.reduce(sum, 0)    
    return total;
}

function findEmployeeByFirstName(srcArray, firstName)
{
    return srcArray.find(employee => employee.firstName === firstName);    
}

function calculatePayroll(employees)
{
     function payroll(total, employee){
         total = total + allWagesFor(employee);
         return total
     }
     let payrollTotal = employees.reduce(payroll, 0);
     console.log(payrollTotal)
     return payrollTotal
}