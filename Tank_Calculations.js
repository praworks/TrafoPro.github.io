function calculateOverallDimensions() {
    const lvSideSelect = document.getElementById('lvSide');
    const hvSideSelect = document.getElementById('hvSide');
    const LVsurgeArresterMountingSelect = document.getElementById('LvSurgeArresterMount'); // this works
    const HVsurgeArresterMountingSelect = document.getElementById('HvSurgeArresterMount'); // this works
    const ribPanWidth1 = parseFloat(document.getElementById('rib-pan-wd-1').value);
    const ribPanWidth2 = parseFloat(document.getElementById('rib-pan-wd-2').value);
    const ribDepth1 = parseFloat(document.getElementById('rib-depth-1').value);
    const radiatorRod = materialProperties.radiatorRod.dia;
    const radiatorAdjustment = materialProperties.radiatorAdjustment.length;
    const phaseMarkingPlate = materialProperties.phaseMarkingPlate.length;
    const radiatorThickness = parseFloat(document.getElementById('radiatorThickness').value);
    const coverPlateThickness = parseFloat(document.getElementById('cover-plate-thickness').value);
    const gasketThickness = parseFloat(document.getElementById('gasketThickness').value);
    const basePlateThickness = parseFloat(document.getElementById('base-plate-thickness').value);
    const ribWeight = parseFloat(document.getElementById('ribWeight').value);
    const ribHeight = parseFloat(document.getElementById('rib-height').value);
    const ribDepth2 = parseFloat(document.getElementById('rib-depth-2').value);
    const caseHeight = parseFloat(document.getElementById('case-height').value);
    const baseSkid = document.getElementById('baseSkid').value;
    const flange = document.getElementById('flange').value;
    const wheels = document.getElementById('wheels').value;
    const integratedSafetyDetector = document.getElementById('integratedSafetyDetector').checked;
    const oilTemperatureIndicator = document.getElementById('oilTemperatureIndicator').checked;
    const magneticOilLevelIndicator = document.getElementById('magneticOilLevelIndicator').checked;
    const floatOilLevelIndicator = document.getElementById('floatOilLevelIndicator').checked;
    const windingTemperatureIndicator = document.getElementById('windingTemperatureIndicator').checked;
    const marshallingBox = document.getElementById('marshallingBox').checked;
    const currentTransformer = document.getElementById('currentTransformer').checked;
    const PRV = document.getElementById('PRV').checked;
    const drainValve = document.getElementById('DrainValve').checked;
    const oilWeight = parseFloat(document.getElementById('oilWeight').value);
    const activePartWeight = parseFloat(document.getElementById('activePartWeight').value);
    const selectedTapChanger = document.getElementById('tapChanger').value;

    // Get the selected values
    const selectedFlange = flange;
    const selectedBaseSkid = baseSkid;
    const selectedWheel = wheels;
    const selectedLvSideValue = lvSideSelect.value;

    // Determine the selected HV side value based on the value of hvSideSelect
    const hvEpoxyCbL510Options = [
        "hvEpoxy12_24KV250AinterfaceAcbL510",
        "hvEpoxy12kV630AinterfaceCcbL510",
        "hvEpoxy36kV250AinterfaceBcbL510",
        "hvEpoxy36kV400AinterfaceBcbL510",
        "hvEpoxy36kV630AinterfaceCcbL510"
    ];

    const hvEpoxyCbL610Options = [
        "hvEpoxy12kV630AinterfaceCcbL610",
        "hvEpoxy36kV250AinterfaceBcbL610",
        "hvEpoxy36kV400AinterfaceBcbL610",
        "hvEpoxy36kV630AinterfaceCcbL610",
        "hvEpoxy12_24KV250AinterfaceAcbL610"
    ];

    const selectedHvSideValue = hvEpoxyCbL510Options.includes(hvSideSelect.value) ? "hvEpoxyCbL510" :
        hvEpoxyCbL610Options.includes(hvSideSelect.value) ? "hvEpoxyCbL610" : hvSideSelect.value;

    // Check if the selected values exist in the materialProperties object key
    // height key
    const selectedLvSideHeight = materialProperties[selectedLvSideValue]
        ? materialProperties[selectedLvSideValue].height
        : "Error: Not found!";

    const selectedHvSideHeight = materialProperties[selectedHvSideValue]
        ? materialProperties[selectedHvSideValue].height
        : "Error: Not found!";

    // length key
    const selectedLvSideLength = materialProperties[selectedLvSideValue]
        ? materialProperties[selectedLvSideValue].length
        : "Error: Not found!";

    const selectedHvSideLength = materialProperties[selectedHvSideValue]
        ? materialProperties[selectedHvSideValue].length
        : "Error: Not found!";

    const selectedLVsurgeArresterMountingValue = LVsurgeArresterMountingSelect.value;
    const selectedLVsurgeArresterMountingLength = materialProperties[selectedLVsurgeArresterMountingValue]?.length || 0;
    const selectedLVsurgeArresterMountingWeight = materialProperties[selectedLVsurgeArresterMountingValue]?.weight || 0;

    const selectedHVsurgeArresterMountingValue = HVsurgeArresterMountingSelect.value;
    const selectedHVsurgeArresterMountingLength = materialProperties[selectedHVsurgeArresterMountingValue]?.length || 0;
    const selectedHVsurgeArresterMountingWeight = materialProperties[selectedHVsurgeArresterMountingValue]?.weight || 0;

    const selectedSurgeArresters = document.getElementById('HvSurgeArresters').value;
    const selectedSurgeArrestersLength = materialProperties[selectedSurgeArresters]?.length || 0;

    // VALIDATE USER INPUTS
    // Prevent user from selecting lv side Cable box and surge arrester mounting bracket, add alert to alert list
    if (selectedLvSideValue.includes('Cable box') && LVsurgeArresterMountingValue !== 'Surge Arrester Mounting Bracket NA') {
        addAlertToList('Error: Surge Arrester Mounting Bracket & Cable box cannot be selected together for LV side!');
    }

    // Prevent user from selecting hv side Cable box and surge arrester mounting bracket together
    if (selectedHvSideValue.includes('Cable box') && HVsurgeArresterMountingValue !== 'Surge Arrester Mounting Bracket NA') {
        addAlertToList('Error: Surge Arrester Mounting Bracket & Cable box cannot be selected together for HV side!');
    }

    // Validate case height: if case height < rib height + drain valve top allowance + drain valve bottom allowance + selected flange height - radiatorFlangeOverlap, then alert
    if (caseHeight < ribHeight + materialProperties.drainValveTopAllowance.height + materialProperties.drainValveBottomAllowance.height + materialProperties[selectedFlange].height - materialProperties.radiatorFlangeOverlap.length) {
        addAlertToList('Case height is too small');
        return;
    }

    // Validate compatible Baseskid for selected wheels
    // If base selected is C 75x40x6 or H 150x150x10, then wheels can't be selected
    if ((selectedBaseSkid === 'C75x40x4_8' || selectedBaseSkid === 'H150x150x10') && selectedWheel !== 'Not required') {
        addAlertToList(`Error: Wheels cannot be mounted to ${selectedBaseSkid}, Please select another base skid!`);
        return;
    }

    // Calculate the distance from case to cover plate edge
    var getDistanceToCoverPlateEdge = materialProperties[selectedFlange].width - materialProperties[selectedFlange].thickness + 10;

    // Validate rib depth 1: if rib depth 1 is less than the sum of radiator rod, phase marking plate, radiator thickness, and radiator adjustment, then trigger an alert.
    function getLongSide() {
        // Initialize variables with default values
        let tempLongSide = 0;
        var selectedLongFin = ribDepth2 + radiatorRod + radiatorThickness + radiatorAdjustment;
        var marshallingBoxChecked = document.getElementById("marshallingBox").checked;

        // Check if marshalling box is checked
        if (marshallingBoxChecked) {
            // Calculate long side length with marshalling box
            tempLongSide = ribPanWidth1 + selectedLongFin + materialProperties.marshallingBox.length + materialProperties.marshallingBox.toFinGap;
        } else {
            // Calculate long side length without marshalling box
            tempLongSide = ribPanWidth1 + Math.max(selectedLongFin, materialProperties.ratingPlateDistanceToCase.length, getDistanceToCoverPlateEdge) + Math.max(selectedLongFin, getDistanceToCoverPlateEdge);
        }
        return tempLongSide;
    }

    // Calculate the overall length of LV side
    function getLvSideLength() {
        let getLvSideFinDepth = ribDepth1 + radiatorRod + phaseMarkingPlate + radiatorThickness + radiatorAdjustment;
        const lvSideDistanceToCase = Math.max(getLvSideFinDepth, selectedLvSideLength, selectedLVsurgeArresterMountingLength, getDistanceToCoverPlateEdge);
        return lvSideDistanceToCase;
    }

    // Calculate the overall length of HV side
    function getHvSideLength() {
        return Math.max(ribDepth1 + radiatorRod + phaseMarkingPlate + radiatorThickness + radiatorAdjustment, selectedHvSideLength, selectedHVsurgeArresterMountingLength + selectedSurgeArrestersLength, getDistanceToCoverPlateEdge);
    }

    // Calculate height from ground to cover top
    function getHeightGroundToCoverTop() {
        let heightGroundToCoverTop = 0; // Default value
        let heightBaseToCoverPlateTop = caseHeight + coverPlateThickness + gasketThickness + basePlateThickness;

        if (document.getElementById("wheels").value === "Not required") {
            heightGroundToCoverTop = heightBaseToCoverPlateTop + materialProperties[selectedBaseSkid].height;
        } else {
            heightGroundToCoverTop = heightBaseToCoverPlateTop + materialProperties[selectedBaseSkid].thickness + materialProperties[selectedWheel].height;
        }

        console.log('selectedBaseSkid height ',   materialProperties[selectedBaseSkid].height);
        console.log('heightGroundToCoverTop: ' + heightGroundToCoverTop);
        return heightGroundToCoverTop;
    }

    function getHeightWithISD() {
        let heightWithISD = materialProperties.ISD.height; // Initialize with ISD height
    
        if (integratedSafetyDetector === true) {
            const selectedHeight = materialProperties[selectedHvSideValue]?.height || 0;
    
            if (selectedHvSideValue === "hvEpoxyBushing1M100_630cb" || selectedHvSideValue === "hvEpoxyBushing1M800_1000cb") {
                // Reduce height by 115mm if selectedHvSideValue is one of these values
                heightWithISD += selectedHeight - 115; 
            } else if (selectedHvSideValue === "hvEpoxyCbL510" || selectedHvSideValue === "hvEpoxyCbL610") {
                // Reduce height by 55mm if selectedHvSideValue is one of these values
                heightWithISD += selectedHeight - 55; 
            }
        }
        return heightWithISD;
    }
    
    // Calculate steel weight
    // Flange weight // Validated!
    const flangeLongSide = ribPanWidth1 + (materialProperties[selectedFlange].width - materialProperties[selectedFlange].thickness) * 2;
    const flangeShortSide = ribPanWidth2 - materialProperties[selectedFlange].thickness * 2 - 2;
    const flangeWeight = (2 * (flangeLongSide + flangeShortSide)) * materialProperties[selectedFlange].weight / 1000;

    // Cover plate weight // Validated!
    const coverPlateLongSide = flangeLongSide + 10 * 2; // 10 is the distance from cover plate edge to case
    const coverPlateLongStiffner = ribDepth1 - materialProperties[selectedFlange].thickness * 2 - 8;
    const coverPlateShortSide = flangeShortSide + materialProperties[selectedFlange].width * 2 + 2 + 10 * 2;
    const coverPlateShortStiffner = ribDepth2 - materialProperties[selectedFlange].thickness * 2 - 8;
    const coverPlateStiffnerWeight = 2 * (coverPlateLongStiffner * 50 * 6 + coverPlateShortStiffner * 50 * 6) * materialProperties.EN10025S235JR.density;
    const coverPlateWeight = coverPlateLongSide * coverPlateShortSide * coverPlateThickness * materialProperties.EN10025S235JR.density + coverPlateStiffnerWeight;

    // Base plate weight // Validated! 
    const baseHeight = caseHeight - (ribHeight + materialProperties[selectedFlange].height - 10) + 10 + basePlateThickness;
    const baseLongSide = ribPanWidth1 - basePlateThickness * 2;
    const baseShortSide = ribPanWidth2 + baseHeight * 2 - basePlateThickness * 6;
    const baseBottom = baseLongSide * baseShortSide * basePlateThickness * materialProperties.EN10025S235JR.density;
    const baseSide = ribPanWidth2 * baseHeight * basePlateThickness * materialProperties.EN10025S235JR.density; // Approximate calculation
    const baseWeight = baseBottom + baseSide * 2;

    // Base skid weight
    const selectedBaseDimension = document.getElementById('kvaBaseDimension').value;
    const baseSkidWeight = 2 * (materialProperties[selectedBaseDimension].shortSideDimension + 100) * materialProperties[selectedBaseSkid].weight / 1000;

    // totalTankSteelWeight = ribWeight + coverPlateWeight + flangeWeight + baseWeight + baseSkidWeight + drain valve weight + prv boss + Oli boss + thermometer pocket
    const totalTankSteelWeight = 
    ribWeight + 
    coverPlateWeight + 
    flangeWeight + 
    baseWeight + 
    baseSkidWeight + 
    materialProperties.drainValve.weight + 
    materialProperties.bossPrv.weight + 
    materialProperties.bossMagOli.weight + 
    materialProperties.thermometerPocket.weight;

    // Calculate the overall dimensions
    const lvSideDistanceToCase = getLvSideLength();
    console.log('lvSideDistanceToCase: ' + lvSideDistanceToCase);
    const hvSideDistanceToCase = getHvSideLength();
    console.log('hvSideDistanceToCase: ' + hvSideDistanceToCase);
    const heightGroundToCoverTop = getHeightGroundToCoverTop();
    const calculateHeightWithISD = getHeightWithISD();

    const overallLength = getLongSide();
    const overallWidth = ribPanWidth2 + hvSideDistanceToCase + lvSideDistanceToCase;
    const overallHeight = heightGroundToCoverTop + Math.max(selectedLvSideHeight, selectedHvSideHeight, calculateHeightWithISD);
    console.log('selectedLvSideHeight: ' + selectedLvSideHeight);
    console.log('selectedHvSideHeight: ' + selectedHvSideHeight);
    console.log('calculateHeightWithISD: ' + calculateHeightWithISD);

    // Display the calculated values if you have corresponding elements in HTML
    if (document.getElementById('overallLength')) {
        document.getElementById('overallLength').textContent = overallLength.toFixed(0);
    }

    if (document.getElementById('overallWidth')) {
        document.getElementById('overallWidth').textContent = overallWidth.toFixed(0);
    }

    if (document.getElementById('overallHeight')) {
        document.getElementById('overallHeight').textContent = overallHeight.toFixed(0);
    }

    if (document.getElementById('SelectedRibWeight')) {
        document.getElementById('SelectedRibWeight').textContent = ribWeight.toFixed(1);
    }

    if (document.getElementById('coverPlateWeight')) {
        document.getElementById('coverPlateWeight').textContent = coverPlateWeight.toFixed(1);
    }

    if (document.getElementById('flangeWeight')) {
        document.getElementById('flangeWeight').textContent = flangeWeight.toFixed(1);
    }

    if (document.getElementById('baseWeight')) {
        document.getElementById('baseWeight').textContent = baseWeight.toFixed(1);
    }

    if (document.getElementById('baseSkidWeight')) {
        document.getElementById('baseSkidWeight').textContent = baseSkidWeight.toFixed(1);
    }

    // HV box weight
    if (document.getElementById('selectedHVBoxWeight')) {
        let weight = 0;
        switch (selectedHvSideValue) {
            case 'hvEpoxy12_24KV250AinterfaceAcbL510':
                weight = materialProperties.hvEpoxyCbL510.weight;
                break;
            case 'hvEpoxy12kV630AinterfaceCcbL510':
                weight = materialProperties.hvEpoxyCbL510.weight;
                break;
            case 'hvEpoxy36kV250AinterfaceBcbL510':
                weight = materialProperties.hvEpoxyCbL510.weight;
                break;
            case 'hvEpoxy36kV400AinterfaceBcbL510':
                weight = materialProperties.hvEpoxyCbL510.weight;
                break;
            case 'hvEpoxy36kV630AinterfaceCcbL510':
                weight = materialProperties.hvEpoxyCbL510.weight;
                break;
            case 'hvEpoxy12_24KV250AinterfaceAcbL610':
                weight = materialProperties.hvEpoxyCbL610.weight;
                break;
            case 'hvEpoxy12kV630AinterfaceCcbL610':
                weight = materialProperties.hvEpoxyCbL610.weight;
                break;
            case 'hvEpoxy36kV250AinterfaceBcbL610':
                weight = materialProperties.hvEpoxyCbL610.weight;
                break;
            case 'hvEpoxy36kV400AinterfaceBcbL610':
                weight = materialProperties.hvEpoxyCbL610.weight;
                break;
            case 'hvEpoxy36kV630AinterfaceCcbL610':
                weight = materialProperties.hvEpoxyCbL610.weight;
                break;
            case 'hvEpoxyBushing1M100_630cb':
                weight = materialProperties.hvEpoxyBushing1M100_630cb.weight;
                break;
            case 'hvEpoxyBushing1M800_1000cb':
                weight = materialProperties.hvEpoxyBushing1M800_1000cb.weight;
                break;
            default:
                weight = 0;
                break;
        }
        document.getElementById('selectedHVBoxWeight').textContent = weight;
    }

    // LV Box Weight
    if (document.getElementById('selectedLVBoxWeight')) {
        let weight = 0;
        switch (selectedLvSideValue) {
            case 'lvPorcelain1kV250Acb':
                weight = materialProperties.lvPorcelain1kV250Acb.weight;
                break;
            case 'lvPorcelain1kV630Acb':
                weight = materialProperties.lvPorcelain1kV630Acb.weight;
                break;
            case 'lvPorcelain1kV1250Acb':
                weight = materialProperties.lvPorcelain1kV1250Acb.weight;
                break;
            case 'lvPorcelain1x1kV2000Acb':
                weight = materialProperties.lvPorcelain1x1kV2000Acb.weight;
                break;
            case 'lvPorcelain2x1kV2000Acb':
                weight = materialProperties.lvPorcelain2x1kV2000Acb.weight;
                break;
            case 'lvPorcelain1x1kV3150Acb':
                weight = materialProperties.lvPorcelain1x1kV3150Acb.weight;
                break;
            case 'lvPorcelain2x1kV3150Acb':
                weight = materialProperties.lvPorcelain2x1kV3150Acb.weight;
                break;
            case 'lvCastResinMonoblock1700Acb':
                weight = materialProperties.lvCastResinMonoblock1700Acb.weight;
                break;
            case 'hvEpoxyBushing1M100_630cb':
                weight = materialProperties.hvEpoxyBushing1M100_630cb.weight;
                break;
            case 'hvEpoxyBushing1M800_1000cb':
                weight = materialProperties.hvEpoxyBushing1M800_1000cb.weight;
                break;
            default:
                weight = 0;
                break;
        }
        document.getElementById('selectedLVBoxWeight').textContent = weight;
    }

    // Marshalling box weight
    if (document.getElementById('marshalingBoxWeight')) {
        document.getElementById('marshalingBoxWeight').textContent = marshallingBox ? materialProperties.marshallingBox.weight : 0;
    }

    // LV surge arrester weight
    if (document.getElementById('lvSurgeArrestingMountWeight')) {
        document.getElementById('lvSurgeArrestingMountWeight').textContent =
            LVsurgeArresterMountingSelect.value !== 'lvSurgeArresterMountingNA'
                ? materialProperties[selectedLVsurgeArresterMountingValue].weight
                : 0;
    }

    // HV surge arrester weight
    if (document.getElementById('hvSurgeArrestingMountWeight')) {
        document.getElementById('hvSurgeArrestingMountWeight').textContent =
            HVsurgeArresterMountingSelect.value !== 'hvSurgeArresterMountingNA'
                ? materialProperties[selectedHVsurgeArresterMountingValue].weight
                : 0;
    }

    // Drain valve weight
    if (document.getElementById('drainValveWeight')) {
        document.getElementById('drainValveWeight').textContent = drainValve ? materialProperties.drainValve.weight : 0;
    }

    // if prv is checked phrase bossPrvWeight to bossPrvWeight
    if (document.getElementById('bossPrvWeight')) {
        document.getElementById('bossPrvWeight').textContent = PRV ? materialProperties.bossPrv.weight : 0;
    }

    // if any oli is checked phrase selected bossOliWeight to bossOliWeight
    if (document.getElementById('bossOliWeight')) {
        document.getElementById('bossOliWeight').textContent = magneticOilLevelIndicator || floatOilLevelIndicator ? materialProperties.bossMagOli.weight : materialProperties.bossNonMagOli.weight;
    }

    // phrase thermometerPocketWeight directly to thermometerPocketWeight
    if (document.getElementById('thermometerPocketWeight')) {
        document.getElementById('thermometerPocketWeight').textContent = materialProperties.thermometerPocket.weight;
    }

    // Either WTI or OTI is selected phrase thermowellWeight * 2 to thermowellWeight, if both Wti & Oti are selected phrase thermowellWeight * 2 to thermowellWeight
    if (document.getElementById('thermowellWeight')) {
        document.getElementById('thermowellWeight').textContent = oilTemperatureIndicator || windingTemperatureIndicator ? materialProperties.Thermowell.weight * 2 : 0;
    }

    // totalTankSteelWeight
    if (document.getElementById('totalTankSteelWeight')) {
        document.getElementById('totalTankSteelWeight').textContent = totalTankSteelWeight.toFixed(1);
    }

    // LV Bushing Weight
    if (document.getElementById('lvBushingWeight')) {
        let weight = 0;
        switch (selectedLvSideValue) {
            case 'lvPorcelain1kV250A':
                weight = materialProperties.lvPorcelain1kV250A.weight;
                break;
            case 'lvPorcelain1kV630A':
                weight = materialProperties.lvPorcelain1kV630A.weight;
                break;
            case 'lvPorcelain1kV1250A':
                weight = materialProperties.lvPorcelain1kV1250A.weight;
                break;
            case 'lvPorcelain1x1kV2000A':
                weight = materialProperties.lvPorcelain1x1kV2000A.weight;
                break;
            case 'lvPorcelain2x1kV2000A':
                weight = materialProperties.lvPorcelain2x1kV2000A.weight;
                break;
            case 'lvPorcelain1x1kV3150A':
                weight = materialProperties.lvPorcelain1x1kV3150A.weight;
                break;
            case 'lvPorcelain2x1kV3150A':
                weight = materialProperties.lvPorcelain2x1kV3150A.weight;
                break;
            case 'lvCastResinMonoblock1700A':
                weight = materialProperties.lvCastResinMonoblock1700A.weight;
                break;
            case 'hvPorcelain12kV250AP4':
                weight = materialProperties.hvPorcelain12kV250AP4.weight;
                break;
            case 'lvPorcelain1kV250Acb':
                weight = materialProperties.lvPorcelain1kV250A.weight;
                break;
            case 'lvPorcelain1kV630Acb':
                weight = materialProperties.lvPorcelain1kV630A.weight;
                break;
            case 'lvPorcelain1kV1250Acb':
                weight = materialProperties.lvPorcelain1kV1250A.weight;
                break;
            case 'lvPorcelain1x1kV2000Acb':
                weight = materialProperties.lvPorcelain1x1kV2000A.weight;
                break;
            case 'lvPorcelain2x1kV2000Acb':
                weight = materialProperties.lvPorcelain2x1kV2000A.weight;
                break;
            case 'lvPorcelain1x1kV3150Acb':
                weight = materialProperties.lvPorcelain1x1kV3150A.weight;
                break;
            case 'lvPorcelain2x1kV3150Acb':
                weight = materialProperties.lvPorcelain2x1kV3150A.weight;
                break;
            case 'lvCastResinMonoblock1700Acb':
                weight = materialProperties.lvCastResinMonoblock1700A.weight;
                break;
            default:
                weight = 0;
                break;
        }
        document.getElementById('lvBushingWeight').textContent = weight.toFixed(1);
    }

    // HV Bushing Weight
    if (document.getElementById('hvBushingWeight')) {
        let weight = 0;
        switch (selectedHvSideValue) {
            case 'hvEpoxy12_24KV250AinterfaceAcbL510':
                weight = materialProperties.hvEpoxy12_24KV250AinterfaceA.weight;
                break;
            case 'hvEpoxy12kV630AinterfaceCcbL510':
                weight = materialProperties.hvEpoxy12kV630AinterfaceC.weight;
                break;
            case 'hvEpoxy36kV250AinterfaceBcbL510':
                weight = materialProperties.hvEpoxy36kV250AinterfaceB.weight;
                break;
            case 'hvEpoxy36kV400AinterfaceBcbL510':
                weight = materialProperties.hvEpoxy36kV400AinterfaceB.weight;
                break;
            case 'hvEpoxy36kV630AinterfaceCcbL510':
                weight = materialProperties.hvEpoxy36kV630AinterfaceC.weight;
                break;
            case 'hvEpoxy12_24KV250AinterfaceAcbL610':
                weight = materialProperties.hvEpoxy12_24KV250AinterfaceA.weight;
                break;
            case 'hvEpoxy12kV630AinterfaceCcbL610':
                weight = materialProperties.hvEpoxy12kV630AinterfaceC.weight;
                break;
            case 'hvEpoxy36kV250AinterfaceBcbL610':
                weight = materialProperties.hvEpoxy36kV250AinterfaceB.weight;
                break;
            case 'hvEpoxy36kV400AinterfaceBcbL610':
                weight = materialProperties.hvEpoxy36kV400AinterfaceB.weight;
                break;
            case 'hvEpoxy36kV630AinterfaceCcbL610':
                weight = materialProperties.hvEpoxy36kV630AinterfaceC.weight;
                break;
            case 'hvEpoxyBushing1M100_630cb':
                weight = materialProperties.hvEpoxyBushing1M.weight;
                break;
            case 'hvEpoxyBushing1M800_1000cb':
                weight = materialProperties.hvEpoxyBushing1M.weight;
                break;
            default:
                weight = materialProperties[selectedHvSideValue].weight;
                break;
        }
        document.getElementById('hvBushingWeight').textContent = weight.toFixed(1);
    }

    // selected Tap changer weight
    if (document.getElementById('tapChangerWeight')) {
        document.getElementById('tapChangerWeight').textContent = materialProperties[selectedTapChanger].weight;
    }

    // ISD
    if (document.getElementById('isdWeight')) {
        document.getElementById('isdWeight').textContent = integratedSafetyDetector ? materialProperties.ISD.weight : 0;
    }

    // OTI
    if (document.getElementById('otiWeight')) {
        document.getElementById('otiWeight').textContent = oilTemperatureIndicator ? materialProperties.OTI.weight : 0;
    }

    // WTI
    if (document.getElementById('wtiWeight')) {
        document.getElementById('wtiWeight').textContent = windingTemperatureIndicator ? materialProperties.WTI.weight : 0;
    }

    // CT
    if (document.getElementById('ctWeight')) {
        document.getElementById('ctWeight').textContent = currentTransformer ? materialProperties.CT.weight : 0;
    }

    // OLI
    if (document.getElementById('oliWeight')) {
        document.getElementById('oliWeight').textContent = magneticOilLevelIndicator || floatOilLevelIndicator ? materialProperties.MagOLI.weight : materialProperties.NonMagOLI.weight;
    }

    // PRV
    if (document.getElementById('prvWeight')) {
        document.getElementById('prvWeight').textContent = PRV ? materialProperties.PRV.weight : 0;
    }

    // OIL
    if (document.getElementById('oilWeightDisplay')) {
        document.getElementById('oilWeightDisplay').textContent = oilWeight;
    }

    // Active part weight
    if (document.getElementById('activePartWeightDispaly')) {
        document.getElementById('activePartWeightDispaly').textContent = activePartWeight;
    }

    // Wheel
    if (document.getElementById('wheelWeight')) {
        document.getElementById('wheelWeight').textContent = selectedWheel === 'Not required' ? 0 : materialProperties[selectedWheel].weight;
    }

    // Pallet
    if (document.getElementById('palletWeight')) {
        document.getElementById('palletWeight').textContent = materialProperties.palletWeight.weight;
    }
}

// calculate outline weight // Tank steel weight + lv box weight + hv box weight + lv surge arrester weight + hv surge arrester weight + drain valve weight + bossPrvWeight + bossOliWeight + thermometerPocketWeight + thermowellWeight + totalTapChangerWeight + ISD + OTI + WTI + CT + OLI + PRV + oilWeight + wheelWeight + palletWeight
function calculateOutlineWeight() {
    const tankSteelWeight = parseFloat(document.getElementById('totalTankSteelWeight').textContent);
    const lvBoxWeight = parseFloat(document.getElementById('selectedLVBoxWeight').textContent);
    const hvBoxWeight = parseFloat(document.getElementById('selectedHVBoxWeight').textContent);
    const lvSurgeArresterWeight = parseFloat(document.getElementById('lvSurgeArrestingMountWeight').textContent);
    const hvSurgeArresterWeight = parseFloat(document.getElementById('hvSurgeArrestingMountWeight').textContent);
    const tapChangerWeight = parseFloat(document.getElementById('tapChangerWeight').textContent);
    const isdWeight = parseFloat(document.getElementById('isdWeight').textContent);
    const otiWeight = parseFloat(document.getElementById('otiWeight').textContent);
    const wtiWeight = parseFloat(document.getElementById('wtiWeight').textContent);
    const ctWeight = parseFloat(document.getElementById('ctWeight').textContent);
    const oliWeight = parseFloat(document.getElementById('oliWeight').textContent);
    const prvWeight = parseFloat(document.getElementById('prvWeight').textContent);
    const oilWeight = parseFloat(document.getElementById('oilWeightDisplay').textContent);
    const wheelWeight = parseFloat(document.getElementById('wheelWeight').textContent);
    const ribWeight = parseFloat(document.getElementById('SelectedRibWeight').textContent);
    const activePartWeight = parseFloat(document.getElementById('activePartWeightDispaly').textContent);
    const lvBushingWeight = parseFloat(document.getElementById('lvBushingWeight').textContent);
    const hvBushingWeight = parseFloat(document.getElementById('hvBushingWeight').textContent);

    const outlineWeight = tankSteelWeight + lvBoxWeight + hvBoxWeight + lvSurgeArresterWeight + hvSurgeArresterWeight + tapChangerWeight + isdWeight + otiWeight + wtiWeight + ctWeight + oliWeight + prvWeight + oilWeight + wheelWeight + activePartWeight + lvBushingWeight + hvBushingWeight;

    if (document.getElementById('outlineWeight')) {
        document.getElementById('outlineWeight').textContent = outlineWeight.toFixed(1);
    }
}

function addAlertToList(message) {
    const alertList = document.getElementById('alertList');
    const listItem = document.createElement('li');
    listItem.textContent = message;
    alertList.appendChild(listItem);
}

// Function to clear and reset the alerts
function resetAlerts() {
    const alertList = document.getElementById('alertList');
    alertList.innerHTML = ''; // Clear the existing alerts
}

// Add an event listener to the "calculateButton" to trigger calculations
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calculateButton').addEventListener('click', function () {
        resetAlerts(); // Reset alert messages when the button is pressed
        calculateOverallDimensions(); // Calculate overall dimensions when the button is pressed
        calculateOutlineWeight(); // Calculate outline weight when the button is pressed
    });
});