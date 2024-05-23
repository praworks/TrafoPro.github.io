function updateStepOptions() {
  // Retrieve the step count from the input field
  var stepCount = parseInt(document.getElementById("stepCount").value);
  
  // Get the div where step options will be displayed
  var stepOptionsDiv = document.getElementById("stepOptions");
  
  // Clear previous options
  stepOptionsDiv.innerHTML = ""; 
  
  // Initialize the previous width variable
  var previousWidth = 0;
  
  // Loop through each step
  for (var i = 1; i <= stepCount; i++) {
    // Create label for step width
    var label = document.createElement("label");
    label.textContent = "Step " + i + " Width:";
    
    // Create select element for choosing width
    var select = document.createElement("select");
    select.setAttribute("id", "step" + i + "Width");
    
    // Loop to generate options for step width
    for (var j = previousWidth + 10; j <= 350; j += 10) {
      var option = document.createElement("option");
      option.setAttribute("value", j);
      option.textContent = j;
      select.appendChild(option);
    }
    
    // Event listener to update subsequent step widths when this one changes
    select.addEventListener('change', function(event) {
      var currentSelect = event.target;
      var currentStep = parseInt(currentSelect.id.replace('step', '').replace('Width', ''));
      var currentValue = parseInt(currentSelect.value);
      
      // Update subsequent step widths
      for (var k = currentStep + 1; k <= stepCount; k++) {
        var nextSelect = document.getElementById('step' + k + 'Width');
        var nextValue = currentValue - 10; // Set to next minimum value
        nextSelect.value = nextValue;
        currentValue = nextValue;
      }
    });
    
    // Set the option for the current step width
    var option = document.createElement("option");
    option.setAttribute("value", previousWidth - 10);
    option.textContent = previousWidth - 10;
    select.appendChild(option);
    
    // Update the previousWidth for the next iteration
    previousWidth += 10;

    // Append elements to stepOptionsDiv
    stepOptionsDiv.appendChild(label);
    stepOptionsDiv.appendChild(select);
    stepOptionsDiv.appendChild(document.createElement("br"));
  }
}
