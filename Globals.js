
var sheetID = '1rl374u_cHv6WxTaC7A8HBEtrAra2SjhyvMa7iBBVSJY';
var formID = '1fH-r6YUVj87te9NxHyYTAnHkzd8jlRhNmMuT9PcjRB0';
var AcademyName = 'My Academy';

var ss = SpreadsheetApp.openById(sheetID);
var ff = FormApp.openById(formID);
var COURSES = ss.getSheetByName('Courses');
var FORM = ss.getSheetByName('FORM');


function index(sheet, line, value, mode) {
  //sheet : "sheet name"
  //line : number column or row 
  // if mode is true then line represent the rows
  //else it represent the columns
  //will search for the value and return its line bar row or col
  /*var sheet = 'Courses'
  var line = 1;
  var value = 'Group5'
  var mode = false;*/

  var s = ss.getSheetByName(sheet);
  var lr = s.getLastRow();
  var lc = s.getLastColumn();


  if (mode) {
    //return row index
    for (let i = 2; i <= lr; i++) {
      if (value == s.getRange(i, line).getValue()) {
        //Logger.log(i);
        return i;
      }
    }

  }

  else {
    //return col index
    for (let i = 1; i <= lc; i++) {
      if (value == s.getRange(line, i).getValue()) {
        //Logger.log(i);
        return i;
      }
    }
  }

  return false;//case not found


}

function LoadMenu() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu(AcademyName);
  menu.addItem('Open Registration', 'Open_Registration');
  menu.addItem('Close Registration', 'Close_Registration');
  menu.addItem('Enroll Students', 'Enroll');
  menu.addToUi();
}







