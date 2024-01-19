const excelDateToJSDate = (date) => {
    const dates = new Date(Math.round((date - 25569) * 86400 * 1000));
    // formattedDate = dates.getDate() + '/' +  dates.getMonth() + '/' + dates.getFullYear();
    formattedDate = dates.getFullYear() + '-' +  dates.getMonth() + '-' + dates.getDate();
    return formattedDate;
  };
  // 2024-01-18
  const jsDateToExcelDate = (date) => {
    let returnDateTime =
      25569.0 + (date.getTime() - date.getTimezoneOffset() * 60 * 1000) / (1000 * 60 * 60 * 24);
    return Math.floor(returnDateTime);
  };
  
  const excelDateToStringDateFormat = (int, dateFormat) => {
    let jsDate = excelDateToJSDate(int);
    switch (dateFormat.toLowerCase()) {
      case 'yyyy-mm-dd':
        return (
          jsDate.getFullYear().toString() +
          '-' +
          ('0' + (jsDate.getMonth() + 1).toString()).slice(-2) +
          '-' +
          ('0' + jsDate.getDate().toString()).slice(-2)
        );
      case 'yyyy/mm/dd':
        return (
          jsDate.getFullYear().toString() +
          '/' +
          ('0' + (jsDate.getMonth() + 1).toString()).slice(-2) +
          '/' +
          ('0' + jsDate.getDate().toString()).slice(-2)
        );
      case 'mm-dd-yyyy':
        return (
          ('0' + (jsDate.getMonth() + 1).toString()).slice(-2) +
          '-' +
          ('0' + jsDate.getDate().toString()).slice(-2) +
          '-' +
          jsDate.getFullYear().toString()
        );
      case 'mm/dd/yyyy':
        return (
          ('0' + (jsDate.getMonth() + 1).toString()).slice(-2) +
          '/' +
          ('0' + jsDate.getDate().toString()).slice(-2) +
          '/' +
          jsDate.getFullYear().toString()
        );
      default:
        throw new Error('format not matching');
    }
  };
  
  const addDates = (dateInYYYYMMDDformatStringFormat, numberOfDate, dateFormat) => {
    let startingDateYYYYMMDDwithSlash = dateInYYYYMMDDformatStringFormat.replace(
      /(\d{4})(\d{2})(\d{2})/g,
      '$1-$2-$3'
    );
    let jsDate = new Date(startingDateYYYYMMDDwithSlash);
    let excelDate = jsDateToExcelDate(jsDate);
    let excelDatePlusOne = excelDate + numberOfDate;
    let jsDatePlusOne = excelDateToJSDate(excelDatePlusOne);
    switch (dateFormat) {
      case 'yyyy-mm-dd':
        return (
          jsDatePlusOne.getFullYear().toString() +
          '-' +
          ('0' + (jsDatePlusOne.getMonth() + 1).toString()).slice(-2) +
          '-' +
          ('0' + jsDatePlusOne.getDate().toString()).slice(-2)
        );
      case 'yyyymmdd':
        return (
          jsDatePlusOne.getFullYear().toString() +
          ('0' + (jsDatePlusOne.getMonth() + 1).toString()).slice(-2) +
          ('0' + jsDatePlusOne.getDate().toString()).slice(-2)
        );
      default:
        throw new Error('format not matching');
    }
  };
  
module.exports = { excelDateToJSDate }