export class Months {
    public static 1 = {
        monthName: 'January',
        numberOfDays: 31
    }

    public static 2 = {
        monthName: 'February',
        numberOfDays: 28
    }

    public static 3 = {
        monthName: 'March',
        numberOfDays: 31
    }

    public static 4 = {
        monthName: 'April',
        numberOfDays: 31
    }

    public static 5 = {
        monthName: 'May',
        numberOfDays: 31
    }

    public static 6 = {
        monthName: 'June',
        numberOfDays: 31
    }

    public static 7 = {
        monthName: 'July',
        numberOfDays: 31
    }

    public static 8 = {
        monthName: 'August',
        numberOfDays: 31
    }

    public static 9 = {
        monthName: 'September',
        numberOfDays: 31
    }

    public static 10 = {
        monthName: 'October',
        numberOfDays: 31
    }

    public static 11 = {
        monthName: 'November',
        numberOfDays: 31
    }

    public static 12 = {
        monthName: 'December',
        numberOfDays: 31
    }

    public checkLeapYear(year:number){
        if(year % 4 == 0){
            this[2].numberOfDays = 29;
        }else{
            return 28;
        }
    }

}