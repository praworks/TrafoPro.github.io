// Function to calculate thickness
function calculateThickness() {
    var coreMaterial = document.getElementById("coreMaterial");
    var stepCount = parseInt(document.getElementById("stepCount").value);
    var coreRequiredArea = parseFloat(document.getElementById("coreRequiredArea").value);
    var minGapCoreToLead = parseFloat(document.getElementById("minGapCoreToLead").value);
    var leadSize = document.getElementById("leadSize");
    var lead = leadSize.options[leadSize.selectedIndex];
    var lead_thickness = parseFloat(lead.getAttribute("lead_thick"));
    var lead_width = parseFloat(lead.getAttribute("lead_width"));
    var resultsDiv = document.getElementById("results");
    var coreSheetThk = 5 * parseFloat(coreMaterial.options[coreMaterial.selectedIndex].getAttribute("coreSheetThk"));
    var centerToCenter = parseFloat(document.getElementById("centerToCenter").value);
    var windowHeight = parseFloat(document.getElementById("windowHeight").value);
    console.log(centerToCenter);
    console.log(windowHeight);
    resultsDiv.innerHTML = ""; // Clear previous results

    if (stepCount === 2) {
        var step1Width = parseFloat(document.getElementById("step1Width").value);
        var step2Width = parseFloat(document.getElementById("step2Width").value);
        var distanceToLeadOtherSide = Math.sqrt(Math.pow(step1Width / 2, 2) - Math.pow(lead_width / 2, 2));
        var coreSheetThk = 5 * parseFloat(coreMaterial.options[coreMaterial.selectedIndex].getAttribute("coreSheetThk"));
        var step2thicknessHv = Math.floor(Math.sqrt(Math.pow(step1Width / 2, 2) - Math.pow(step2Width / 2, 2)) / coreSheetThk) * coreSheetThk;
        var step2thicknessLv = Math.min(Math.floor(((distanceToLeadOtherSide - lead_thickness - minGapCoreToLead) / coreSheetThk)) * coreSheetThk, step2thicknessHv);
        var yieldArea = step2Width * (step2thicknessLv + step2thicknessHv);
        var step1Thickness = Math.ceil((coreRequiredArea - yieldArea) / (step1Width * coreSheetThk)) * coreSheetThk;
        var totalArea = step1Width * step1Thickness + step2Width * (step2thicknessHv + step2thicknessLv);
        var Step1YokeCenterDistance = centerToCenter * 2;
        var Step1LimbCenterDistance = windowHeight + step1Width;
        var Step2YokeCenterDistance = centerToCenter * 2;
        var Step2LimbCenterDistance = windowHeight + step1Width;

        resultsDiv.innerHTML += "Step 1 Thickness: " + step1Thickness.toFixed(2) + " mm / Packets: " + Math.ceil(step1Thickness / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "Step 2 Thickness Hv: " + step2thicknessHv.toFixed(2) + " mm / Packets: " + Math.ceil(step2thicknessHv / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "Step 2 Thickness Lv: " + step2thicknessLv.toFixed(2) + " mm / Packets: " + Math.ceil(step2thicknessLv / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "<br>Total Area: " + totalArea.toFixed(2) + " mm²" + "<br>";
        resultsDiv.innerHTML += "Step 1 Yoke Center Distance: " + Step1YokeCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 1 Limb Center Distance: " + Step1LimbCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 2 Yoke Center Distance: " + Step2YokeCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 2 Limb Center Distance: " + Step2LimbCenterDistance.toFixed(2) + " mm <br>";

    } else if (stepCount === 3) {
        var step1Width = parseFloat(document.getElementById("step1Width").value);
        var step2Width = parseFloat(document.getElementById("step2Width").value);
        var step3Width = parseFloat(document.getElementById("step3Width").value);
        var distanceToLeadOtherSide = Math.sqrt(Math.pow(step1Width / 2, 2) - Math.pow(lead_width / 2, 2));
        var coreSheetThk = 5 * parseFloat(coreMaterial.options[coreMaterial.selectedIndex].getAttribute("coreSheetThk"));
        var step2thickness = Math.floor(Math.sqrt(Math.pow(step1Width / 2, 2) - Math.pow(step2Width / 2, 2)) / coreSheetThk) * coreSheetThk;
        var step3thicknessHv = Math.floor(Math.sqrt(Math.pow(step1Width / 2, 2) - Math.pow(step3Width / 2, 2)) / coreSheetThk) * coreSheetThk - step2thickness;
        var step3thicknessLv = Math.min(Math.floor((distanceToLeadOtherSide - step2thickness - lead_thickness - minGapCoreToLead) / coreSheetThk) * coreSheetThk, step3thicknessHv);
        var yieldArea = step2Width * step2thickness * 2 + step3Width * (step3thicknessLv + step3thicknessHv);
        var step1Thickness = Math.ceil((coreRequiredArea - yieldArea) / (step1Width * coreSheetThk)) * coreSheetThk;
        var totalArea = step1Width * step1Thickness + yieldArea;
        var Step1YokeCenterDistance = centerToCenter * 2;
        var Step1LimbCenterDistance = windowHeight + step1Width;
        var Step2YokeCenterDistance = centerToCenter * 2;
        var Step2LimbCenterDistance = windowHeight + step2Width;
        var Step3YokeCenterDistance = centerToCenter * 2;
        var Step3LimbCenterDistance = windowHeight + step2Width;

        resultsDiv.innerHTML += "Step 1 Thickness: " + step1Thickness.toFixed(2) + " mm / Packets: " + Math.ceil(step1Thickness / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "Step 2 Thickness: " + step2thickness.toFixed(2) + " mm / Packets: " + Math.ceil(step2thickness / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "Step 3 Thickness Hv: " + step3thicknessHv.toFixed(2) + " mm / Packets: " + Math.ceil(step3thicknessHv / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "Step 3 Thickness Lv: " + step3thicknessLv.toFixed(2) + " mm / Packets: " + Math.ceil(step3thicknessLv / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "<br>Total Area: " + totalArea.toFixed(2) + " mm²" + "<br>";
        resultsDiv.innerHTML += "Step 1 Yoke Center Distance: " + Step1YokeCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 1 Limb Center Distance: " + Step1LimbCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 2 Yoke Center Distance: " + Step2YokeCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 2 Limb Center Distance: " + Step2LimbCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 3 Yoke Center Distance: " + Step3YokeCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 3 Limb Center Distance: " + Step3LimbCenterDistance.toFixed(2) + " mm <br>";
        
    } else if (stepCount === 4) {
        var step1Width = parseFloat(document.getElementById("step1Width").value);
        var step2Width = parseFloat(document.getElementById("step2Width").value);
        var step3Width = parseFloat(document.getElementById("step3Width").value);
        var step4Width = parseFloat(document.getElementById("step4Width").value);
        var distanceToLeadOtherSide = Math.sqrt(Math.pow(step1Width / 2, 2) - Math.pow(lead_width / 2, 2));
        var coreSheetThk = 5 * parseFloat(coreMaterial.options[coreMaterial.selectedIndex].getAttribute("coreSheetThk"));
        var step2thickness = Math.floor(Math.sqrt(Math.pow(step1Width / 2, 2) - Math.pow(step2Width / 2, 2)) / coreSheetThk) * coreSheetThk;
        var step3thickness = Math.floor(Math.sqrt(Math.pow(step1Width / 2, 2) - Math.pow(step3Width / 2, 2)) / coreSheetThk) * coreSheetThk - step2thickness;
        var step4thicknessHv = Math.floor(Math.sqrt(Math.pow(step1Width / 2, 2) - Math.pow(step4Width / 2, 2)) / coreSheetThk) * coreSheetThk - step2thickness - step3thickness;
        var step4thicknessLv = Math.min(Math.floor((distanceToLeadOtherSide - step3thickness - step2thickness - lead_thickness - minGapCoreToLead) / coreSheetThk) * coreSheetThk, step4thicknessHv);
        var yieldArea = step2Width * step2thickness * 2 + step3Width * step3thickness * 2 + step4Width * (step4thicknessLv + step4thicknessHv);
        var step1Thickness = Math.ceil((coreRequiredArea - yieldArea) / step1Width / coreSheetThk) * coreSheetThk;
        var totalArea = step1Width * step1Thickness + yieldArea;
        var Step1YokeCenterDistance = centerToCenter * 2;
        var Step1LimbCenterDistance = windowHeight + step1Width;
        var Step2YokeCenterDistance = centerToCenter * 2;
        var Step2LimbCenterDistance = windowHeight + step2Width;
        var Step3YokeCenterDistance = centerToCenter * 2;
        var Step3LimbCenterDistance = windowHeight + step3Width;
        var Step4YokeCenterDistance = centerToCenter * 2;
        var Step4LimbCenterDistance = windowHeight + step3Width;

        resultsDiv.innerHTML += "Step 1 Thickness: " + step1Thickness.toFixed(2) + " mm / Packets: " + Math.ceil(step1Thickness / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "Step 2 Thickness: " + step2thickness.toFixed(2) + " mm / Packets: " + Math.ceil(step2thickness / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "Step 3 Thickness: " + step3thickness.toFixed(2) + " mm / Packets: " + Math.ceil(step3thickness / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "Step 4 Thickness Hv: " + step4thicknessHv.toFixed(2) + " mm / Packets: " + Math.ceil(step4thicknessHv / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "Step 4 Thickness Lv: " + step4thicknessLv.toFixed(2) + " mm / Packets: " + Math.ceil(step4thicknessLv / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "<br>Total Area: " + totalArea.toFixed(2) + " mm²";
        resultsDiv.innerHTML += "Step 1 Yoke Center Distance: " + Step1YokeCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 1 Limb Center Distance: " + Step1LimbCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 2 Yoke Center Distance: " + Step2YokeCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 2 Limb Center Distance: " + Step2LimbCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 3 Yoke Center Distance: " + Step3YokeCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 3 Limb Center Distance: " + Step3LimbCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 4 Yoke Center Distance: " + Step4YokeCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 4 Limb Center Distance: " + Step4LimbCenterDistance.toFixed(2) + " mm <br>";

    } else if (stepCount === 5) {
        var step1Width = parseFloat(document.getElementById("step1Width").value);
        var step2Width = parseFloat(document.getElementById("step2Width").value);
        var step3Width = parseFloat(document.getElementById("step3Width").value);
        var step4Width = parseFloat(document.getElementById("step4Width").value);
        var step5Width = parseFloat(document.getElementById("step5Width").value);
        var distanceToLeadOtherSide = Math.sqrt(Math.pow(step1Width / 2, 2) - Math.pow(lead_width / 2, 2));
        var coreSheetThk = 5 * parseFloat(coreMaterial.options[coreMaterial.selectedIndex].getAttribute("coreSheetThk"));
        var step2thickness = Math.floor(Math.sqrt(Math.pow(step1Width / 2, 2) - Math.pow(step2Width / 2, 2)) / coreSheetThk) * coreSheetThk;
        var step3thickness = Math.floor(Math.sqrt(Math.pow(step1Width / 2, 2) - Math.pow(step3Width / 2, 2)) / coreSheetThk) * coreSheetThk - step2thickness;
        var step4thickness = Math.floor(Math.sqrt(Math.pow(step1Width / 2, 2) - Math.pow(step4Width / 2, 2)) / coreSheetThk) * coreSheetThk - step2thickness - step3thickness;
        var step5thicknessHv = Math.floor(Math.sqrt(Math.pow(step1Width / 2, 2) - Math.pow(step5Width / 2, 2)) / coreSheetThk) * coreSheetThk - step2thickness - step3thickness - step4thickness;
        var step5thicknessLv = Math.min(Math.floor((distanceToLeadOtherSide - step4thickness - step3thickness - step2thickness - lead_thickness - minGapCoreToLead) / coreSheetThk) * coreSheetThk, step5thicknessHv);
        var yieldArea = step2Width * step2thickness * 2 + step3Width * step3thickness * 2 + step4Width * step4thickness * 2 + step5Width * (step5thicknessLv + step5thicknessHv);
        var step1Thickness = Math.ceil((coreRequiredArea - yieldArea) / step1Width / coreSheetThk) * coreSheetThk;
        var totalArea = step1Width * step1Thickness + yieldArea;
        var Step1YokeCenterDistance = centerToCenter * 2;
        var Step1LimbCenterDistance = windowHeight + step1Width;
        var Step2YokeCenterDistance = centerToCenter * 2;
        var Step2LimbCenterDistance = windowHeight + step2Width;
        var Step3YokeCenterDistance = centerToCenter * 2;
        var Step3LimbCenterDistance = windowHeight + step3Width;
        var Step4YokeCenterDistance = centerToCenter * 2;
        var Step4LimbCenterDistance = windowHeight + step4Width;
        var Step5YokeCenterDistance = centerToCenter * 2;
        var Step5LimbCenterDistance = windowHeight + step4Width;

        resultsDiv.innerHTML += "Step 1 Thickness: " + step1Thickness.toFixed(2) + " mm / Packets: " + Math.ceil(step1Thickness / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "Step 2 Thickness: " + step2thickness.toFixed(2) + " mm / Packets: " + Math.ceil(step2thickness / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "Step 3 Thickness: " + step3thickness.toFixed(2) + " mm / Packets: " + Math.ceil(step3thickness / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "Step 4 Thickness: " + step4thickness.toFixed(2) + " mm / Packets: " + Math.ceil(step4thickness / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "Step 5 Thickness Hv: " + step5thicknessHv.toFixed(2) + " mm / Packets: " + Math.ceil(step5thicknessHv / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "Step 5 Thickness Lv: " + step5thicknessLv.toFixed(2) + " mm / Packets: " + Math.ceil(step5thicknessLv / coreSheetThk) + "<br>";
        resultsDiv.innerHTML += "<br>Total Area: " + totalArea.toFixed(2) + " mm²" + "<br>";
        resultsDiv.innerHTML += "Step 1 Yoke Center Distance: " + Step1YokeCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 1 Limb Center Distance: " + Step1LimbCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 2 Yoke Center Distance: " + Step2YokeCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 2 Limb Center Distance: " + Step2LimbCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 3 Yoke Center Distance: " + Step3YokeCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 3 Limb Center Distance: " + Step3LimbCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 4 Yoke Center Distance: " + Step4YokeCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 4 Limb Center Distance: " + Step4LimbCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 5 Yoke Center Distance: " + Step5YokeCenterDistance.toFixed(2) + " mm <br>";
        resultsDiv.innerHTML += "Step 5 Limb Center Distance: " + Step5LimbCenterDistance.toFixed(2) + " mm <br>";

    } else {
        resultsDiv.innerHTML = "Program does not support more than 5 steps. Please contact the developer.";
    }
}
