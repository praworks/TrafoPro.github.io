function fetchSection4() {
    // Retrieve from local storage
    const inputString = sessionStorage.getItem('section4');

    if (!inputString) {
        console.error('No data found in localStorage for section3');
        return;
    }

    // Split the input string into an array of values
    const values1 = inputString.split('|').map(value => value.trim()).filter(value => value !== '');

    // Extract relevant information and store them in an array
    const s4Array = values1.map(value => {
        const parts = value.match(/(.{1,20}):\s*(.+)/); // Adjusted regular expression for better key capturing
        if (parts) {
            const key = parts[1].trim();
            const data = parts[2].trim();

            return { key, data };
        }
        return null;
    }).filter(item => item !== null);

    // Convert array to object for easier access
    const s4Object = s4Array.reduce((acc, { key, data }) => {
        acc[key] = data;
        return acc;
    }, {});

    //console.log(s4Object);

    fillFormsection4(s4Object);
}
/*
"# Lay: Max/Min tpl": "19# 183.00/135.00 *"
​
"# Sup Pts/Ax All..": "12 /  0.000 mm"
​
"Add Rad Allowance.": "0.000 mm"
​
"Average LayIns Tk.": "(Strip) 0.165 mm"
​
"Axial Sections....": "1"
​
"CURRENT DENSITY...": "0.984 A/mm2"
​
"Coil-Length.......": "316.000 mm"
​
"Cond Area Per Turn": "1.53938 mm2"
​
"Cond Mec/Elec Lgth": "280.800 /  279.276"
​
"Cond-Dim Per Turn.": "1x1x 1.400 x 1.400"
​
"Conductor Dims....": "Standard Size"
​
"Conductor.........": "CU-Round"
​
"Cooling Ducts Tk/#": "0.000 mm /  0.00"
​
"Eff No Cool Ducts.": "HV: 0 Leg: 0 LV: 0"
​
"HV Conductor Wt...": "113.29 kg"
​
"Inside Dimensions.": "184.814 x 242.546"
​
"Insulation Weight.": "3.41 kg"
​
"Lay/Trn/Duc Wts...": "3.41/  0.00/  0.00"
​
"LayIns RB W/OvBld.": "3.06 mm"
​
"LayIns Tk.........": "(18 Full)  0.200 mm"
​
"Layer-Layer Volts.": "1234.3"
​
"Layer/Turn Ins Bd.": "0.200/  0.124 mm"
​
"Mean Turn Length..": "798.5 mm"
​
"Outside Dimensions": "250.641 x 308.373"
​
"Rad Blds (H,Leg,L)": "32.91/ 32.91/ 32.91"
​
"Resistance (Coil).": "35.5077 @ 75 C"
​
"T-RISE/GRADIENT...": "22.2/ 6.0 deg C"
​
"Total Coil Weight.": "116.70 kg"
​
"Turns Tot./Nominal": "3429/   3266"
​
"Type of Coil......": "Layer-Wound Coil"
​
"Watts/sq m .......": "202.816"
*/

function fillFormsection4(data) {
    const fields = {
        's4-Lay-Max-Min-tpl': '# Lay: Max/Min tpl',
        's4-Sup-Pts-Ax-All': '# Sup Pts/Ax All',
        's4-Add-Rad-Allowance': 'Add Rad Allowance',
        's4-Average-LayIns-Tk': 'Average LayIns Tk.',
        's4-Axial-Sections': 'Axial Sections',
        's4-CURRENT-DENSITY': 'CURRENT DENSITY',
        's4-Coil-Length': 'Coil-Length',
        's4-Cond-Area-Per-Turn': 'Cond Area Per Turn',
        's4-Cond-Mec-Elec-Lgth': 'Cond Mec/Elec Lgth',
        's4-Cond-Dim-Per-Turn': 'Cond-Dim Per Turn',
        's4-Conductor-Dims': 'Conductor Dims....',
        's4-Conductor': 'Conductor',
        's4-Cooling-Ducts-Tk': 'Cooling Ducts Tk/#',
        's4-Eff-No-Cool-Ducts': 'Eff No Cool Ducts.',
        's4-HV-Conductor-Wt': 'HV Conductor Wt',
        's4-Inside-Dimensions': 'Inside Dimensions',
        's4-Insulation-Weight': 'Insulation Weight',
        's4-Lay-Trn-Duc-Wts': 'Lay/Trn/Duc Wts',
        's4-LayIns-RB-W/OvBld': 'LayIns RB W/OvBld',
        's4-LayIns-Tk': 'LayIns Tk',
        's4-Layer-Layer-Volts': 'Layer-Layer Volts',
        's4-Layer-Turn-Ins-Bd': 'Layer/Turn Ins Bd',
        's4-Mean-Turn-Length': 'Mean Turn Length',
        's4-Outside-Dimensions': 'Outside Dimensions',
        's4-Rad-Blds-H-Leg-L': 'Rad Blds (H,Leg,L)',
        's4-Resistance-Coil': 'Resistance (Coil)',
        's4-T-RISE-GRADIENT': 'T-RISE/GRADIENT',
        's4-Total-Coil-Weight': 'Total Coil Weight',
        's4-Turns-Tot-Nominal': 'Turns Tot./Nominal',
        's4-Type-of-Coil': 'Type of Coil',
        's4-Watts-sq-m': 'Watts/sq m'
    };

    for (const [elementId, keyword] of Object.entries(fields)) {
        let value = 'Error: Section 3';
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
    }   
}
