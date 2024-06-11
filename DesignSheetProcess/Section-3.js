/** @format */

function fetchSection3() {
  // Retrieve from local storage
  const inputString = sessionStorage.getItem("section3");

  if (!inputString) {
    console.error("No data found in localStorage for section3");
    return;
  }

  // Split the input string into an array of values
  const values1 = inputString
    .split("|")
    .map((value) => value.trim())
    .filter((value) => value !== "");

  // Extract relevant information and store them in an array
  const coilInfoArray = values1
    .map((value) => {
      const parts = value.match(/(.{1,20}):\s*(.+)/); // Adjusted regular expression for better key capturing
      if (parts) {
        const key = parts[1].trim();
        const data = parts[2].trim();

        return { key, data };
      }
      return null;
    })
    .filter((item) => item !== null);

  // Convert array to object for easier access
  const coilInfoObject = coilInfoArray.reduce((acc, { key, data }) => {
    acc[key] = data;
    return acc;
  }, {});
  //console.log(coilInfoObject);

  fillFormSection3(coilInfoObject);
}

function fillFormSection3(data) {
  const fields = {
    "s3-AxialAllowance": "Axial Allowance",
    "s3-BusBar": "Bus Bar",
    "s3-CoilLength": "Coil-Length",
    "s3-CoolingDuctsTk": "Cooling Ducts Tk/#",
    "s3-CondDimRadAx": "Cond Dim",
    "s3-CondLeadWeight": "Cond/Lead Weight",
    "s3-CondMecLGTH": "Cond Mec/ELEC LGTH", // Value = 292.000 // input "Cond Mec/ELEC LGTH": "292.000 x  280.800"
    "s3-CondELECLGTH": "Cond Mec/ELEC LGTH", // Value = 280.800 // input "Cond Mec/ELEC LGTH": "292.000 x  280.800"
    "s3-ConductorDims": "Conductor Dims",
    "s3-CURRENTDENSITY": "CURRENT DENSITY",
    "s3-EffNoCoolDucts": "Eff No Cool Ducts",
    "s3-InsideDimensions": "Inside Dimensions",
    "s3-InnerPerimeter": "Inner Perimeter",
    "s3-Lay": "# Lay: Max/Min tpl",
    "s3-LayTrnDucWts": "Lay/Trn/Duc Wts",
    "s3-LayerTurnInsBd": "Layer/Turn Ins Bd",
    "s3-LeadWxT": "Lead:    Wd / Tk",
    "s3-MaxTurnLthBuckl": "Max Turn Lth Buckl",
    "s3-MeanTurnLength": "Mean Turn Length",
    "s3-NoStrsRadxAx": "No Strs-Rad x Ax",
    "s3-NumSupportSticks": "Num Support Sticks",
    "s3-OutsideDimensions": "Outside Dimensions",
    "s3-RadBldsHLegL": "Rad Blds (H,Leg,L)",
    "s3-ResistanceCoil": "Resistance (Coil)",
    "s3-ShortCircuitCurr": "Short-Circuit Curr",
    "s3-TotalCoilWeight": "Total Coil Weight",
    "s3-TotalInsulWeight": "Total Insul Weight",
    "s3-TRISEGRADIENT": "T-RISE/GRADIENT",
    "s3-TurnCSA": "Turn CSA",
    "s3-TURNSPERCOIL": "TURNS PER COIL",
    "s3-TypeofCoil": "Type of Coil",
    "s3-Wattssqm": "Watts/sq m"
  };

  for (const [elementId, keyword] of Object.entries(fields)) {
    let value = "Error: Section 3";
    for (const key in data) {
      if (key.includes(keyword)) {
        value = data[key];
        break;
      }
    }

    const element = document.getElementById(elementId);
    if (element) {
      element.value = value;
    } else {
      console.error(`Element with ID ${elementId} not found`);
    }

    // Store the value in session storage
    sessionStorage.setItem(elementId, value);
  }
}
