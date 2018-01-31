function getAge(dateString) {
    
      var birthdate = new Date(dateString).getTime();
      var now = new Date().getTime();
      // now find the difference between now and the birthdate
      var n = (now - birthdate)/1000;
    
      if (n < 604800) { // less than a week
        var day_n = Math.floor(n/86400);
        return day_n + ' day' + (day_n > 1 ? 's' : '');
      } else if (n < 2629743) {  // less than a month
        var week_n = Math.floor(n/604800);
        return week_n + ' week' + (week_n > 1 ? 's' : '');
      } else if (n < 63113852) { // less than 24 months
        var month_n = Math.floor(n/2629743);
        return month_n + ' month' + (month_n > 1 ? 's' : '');
      } else { 
        var year_n = Math.floor(n/31556926);
        return year_n + ' year' + (year_n > 1 ? 's' : '');
      }
    }
    
    
    var age = getAge("01/20/2011");
    console.log(age);