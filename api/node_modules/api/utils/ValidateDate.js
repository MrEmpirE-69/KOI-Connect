export class ValidateDate {
    static isDateInPast(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const inputDate = new Date(date);
  
      return inputDate < today;
    }

    static isDateInFuture(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const inputDate = new Date(date);
  
      return today < inputDate;
    }
  }
  