 function switchCalendar()
 {
  var frm = document.getElementById("convert");
  var today = new Date();

  while (frm.year.options.length<100) frm.year.options.add(document.createElement("OPTION"));

  while (frm.month.options.length<12) {
   var newMonth = document.createElement("OPTION");
   newMonth.value=frm.month.options.length+1;
   frm.month.options.add(newMonth);
   }

  while (frm.day.options.length<31) {
   var newDay = document.createElement("OPTION");
   newDay.value=frm.day.options.length+1;
   newDay.text=frm.day.options.length+1;
   frm.day.options.add(newDay);
   }

  if (frm.calendar[0].checked) {
   for (var i=0; i<100; i++) {
    frm.year.options[i].text=i+1300;
    frm.year.options[i].value=i+1300;
    }

   for (var i=0; i<12; i++) frm.month.options[i].text = calNames("hf", i);

   var shToday = ToShamsi(today.getFullYear(), today.getMonth()+1, today.getDate(),'short');
   frm.year.value=Number(shToday.split('/')[0]);
   frm.month.value=Number(shToday.split('/')[1]);
   frm.day.value=Number(shToday.split('/')[2]);
   }
  else {
   for (var i=0; i<100; i++) {
    frm.year.options[i].text=i+1930;
    frm.year.options[i].value=i+1930;
    }

   for (var i=0; i<12; i++) frm.month.options[i].text = calNames("ge", i);

   frm.year.value=today.getFullYear();
   frm.month.value=today.getMonth()+1;
   frm.day.value=today.getDate();
   }

  convertDate();
  }


 function convertDate() {
  frm = document.getElementById("convert");

  if (frm.calendar[0].checked) {
   var grg=ToGregorian(parseInt(frm.year.value), parseInt(frm.month.value), parseInt(frm.day.value));
   document.getElementById("resultDate").innerHTML = calNames("df", hshDayOfWeek(parseInt(frm.year.value), parseInt(frm.month.value), parseInt(frm.day.value)))+" "+grg.split("-")[2]+" "+calNames("gf", grg.split("-")[1]-1)+" ("+grg.split("-")[1]+") "+grg.split("-")[0];
   document.getElementById("resultDate").innerHTML += "<br><font face='tahoma' size=3>"+calNames("de",hshDayOfWeek(parseInt(frm.year.value), parseInt(frm.month.value), parseInt(frm.day.value)))+", "+calNames("ge", grg.split("-")[1]-1)+" "+grg.split("-")[2]+", "+grg.split("-")[0]+"</font>";
   }
  else {
   var hsh=ToShamsi(parseInt(frm.year.value), parseInt(frm.month.value), parseInt(frm.day.value), "Long");
   document.getElementById("resultDate").innerHTML=hsh;
   }
  }