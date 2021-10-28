function Open_Registration() {
  //get group name
  var ui = SpreadsheetApp.getUi();
  var gname = ui.prompt('Enter Group Name').getResponseText();
  var Courses = [];
  var col = index('Courses', 1, gname, false);

  for (let i = 2; i <= COURSES.getLastRow(); i++) {
    if (COURSES.getRange(i, col).getValue() == true) {
      //here i am in the checked cell

      Courses.push(COURSES.getRange(`B${i}`).getValue());
    }
  }

  ff.addCheckboxItem().setTitle(gname).setChoiceValues(Courses);

}

function Close_Registration() {
  //what is the group name ?
  //get all items
  //seach if item[i].title == gname {return id}
  //->Form then delet item by this id

  var ui = SpreadsheetApp.getUi();
  var gname = ui.prompt('Enter Group Name').getResponseText();
  var items = ff.getItems();
  var k ;//id of item
  for (let i = 0; i < items.length; i++) {
    if(items[i].getTitle() == gname){
      k =items[i].getId();

    }
  }
  var ditem = ff.getItemById(k);
  ff.deleteItem(ditem);
}

function Enroll(){
  //go to From response
  var gname = 'Group1';

  for(let i=2;i<=FORM.getLastRow();i++){
    if(FORM.getRange(`A${i}`).isChecked()){
      //getting user data
      var name = FORM.getRange(i,3).getValue();
      var date = FORM.getRange(i,2).getValue();
      var email =  FORM.getRange(i,4).getValue();
      var course_name = FORM.getRange(i,index('FORM',1,gname,false)).getValue();

      //set data in sheets
      var sheet = ss.getSheetByName(gname);
      sheet.getRange(sheet.getLastRow()+1,2).setValue(date);
      sheet.getRange(sheet.getLastRow(),4).setValue(name);
      sheet.getRange(sheet.getLastRow(),5).setValue(email);
      sheet.getRange(sheet.getLastRow(),7).setValue(course_name);

      //send email
      if(MailApp.getRemainingDailyQuota()){
        var message = `
        Check your Course
        Course name = ${course_name}

        thank u.

        `;
        MailApp.sendEmail(email,AcademyName,message);

      }


    }
  }
}

