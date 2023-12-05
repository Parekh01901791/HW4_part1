// File: script.js
// GUI Assignment: Use JQuery Validation to error handle inputs within out webage
// Mihir Parekh, UMass Lowell Computer Science, Mihir_Parekh@student.uml.edu
// Copyright (c) 2023 by Mihir. All rights reserved. May be freely copied or
// excerpted for educational purposes with credit to the author.
// updated by MP on December, 2023 at 11:30 PM
// Description: In this assignment I learned about jquery validation and used it to check if 
// inputs are within -50 to 50 with rules and messages. Then I also added methods to check for specifics
// like if min is smaller than max and max is bigger than min, else don't make the table. 


$(document).ready(function () {
  $("#valueForm").validate({
      rules: {
          numMinColumn: {
              required: true,
              number: true,
              range: [-50, 50],
              lessThan_Col: "#inputMaxCol_val" //Gets the max value
          },
          numMaxColumn: {
              required: true,
              number: true,
              range: [-50, 50],
              greaterThan_Col: "#inputMinCol_val" // Gets the min value
          },
          numMinRow: {
              required: true,
              number: true,
              range: [-50, 50],
              lessThan_Row: "#inputMaxRow_val"
          },
          numMaxRow: {
              required: true,
              number: true,
              range: [-50, 50],
              greaterThan_Row: "#inputMinRow_val" 
          }
      },
      messages: {
          numMinColumn: {
              required: "Please enter a value for Minimum Column.",
              range: "Please enter a value between -50 and 50 for Minimum Column.",
              lessThan_Col: "Minimum Column value should be smaller than Maximum Column."
          },
          numMaxColumn: {
              required: "Please enter a value for Maximum Column.",
              range: "Please enter a value between -50 and 50 for Maximum Column.",
              greaterThan_Col: "Maximum Column value should be greater than Minimum Column."
          },
          numMinRow: {
              required: "Please enter a value for Minimum Row.",
              range: "Please enter a value between -50 and 50 for Minimum Row.",
              lessThan_Row: "Minimum Row value should be smaller than Maximum Row."
          },
          numMaxRow: {
              required: "Please enter a value for Maximum Row.",
              range: "Please enter a value between -50 and 50 for Maximum Row.",
              greaterThan_Row: "Maximum Row value should be greater than Minimum Row."
          }
      },
      errorClass: "text-danger",  // Makes text red to signify error
      errorElement: "span"
  });
  

  // Custom validation methods
  $.validator.addMethod("lessThan_Col", function (value, element, param) {
      var maxVal = $(param).val();  //get params value
      return parseInt(value) <= parseInt(maxVal); //current value is less than or equal and return
  });

  $.validator.addMethod("greaterThan_Col", function (value, element, param) {
      var minVal = $(param).val();
      return parseInt(value) >= parseInt(minVal);
  });

  $.validator.addMethod("lessThan_Row", function (value, element, param) {
      var maxVal = $(param).val();
      return parseInt(value) <= parseInt(maxVal);
  });

  $.validator.addMethod("greaterThan_Row", function (value, element, param) {
      var minVal = $(param).val();
      return parseInt(value) >= parseInt(minVal);
  });
});

function generateTable() {   

    if (!$('#valueForm').valid()) {
      return false; // Prevent form submission     
    }
   
  
    var display = document.getElementById('display');
    display.innerHTML = "";
  
    //This gets the input and converts them to integers
    var minCol = parseInt(document.getElementById('inputMinCol_val').value);
    var maxCol = parseInt(document.getElementById('inputMaxCol_val').value);
    var minRow = parseInt(document.getElementById('inputMinRow_val').value);
    var maxRow = parseInt(document.getElementById('inputMaxRow_val').value);

    //Makes table
    var table = document.createElement("table");

    var headerRow = table.insertRow();
    headerRow.appendChild(document.createElement("th"));

    for (var i = minCol; i <= maxCol; i++) {
      var top_header = document.createElement("th");
      top_header.textContent = i;
      headerRow.appendChild(top_header);
    }


    for (var i = minRow; i <= maxRow; i++) {
      
      // var rowData = tableData[i];
      var row = table.insertRow();

      var left_header = row.insertCell();
      left_header.textContent = i;

      for (var j = minCol; j <= maxCol; j++) {
        var cell = row.insertCell();
        cell.textContent = i * j;
      }
    }

    display.appendChild(table);


}  

