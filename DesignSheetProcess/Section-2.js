function fetchSection2() {
    // Retrieve the string from session storage
    const inputString = sessionStorage.getItem('section2');

    if (!inputString) {
        console.error('No data found in sessionStorage for section2');
        return;
    }

    // Split the input string into an array of values
    const values1 = inputString.split('|').map(value => value.trim()).filter(value => value !== '');

    // Extract relevant information and store it in an array
    const s2Array = values1.map(value => {
        const parts = value.match(/(.{1,20}):\s*(.+)/); // Adjusted regular expression for better key capturing
        if (parts) {
            const key = parts[1].trim();
            const data = parts[2].trim();
            return { key, data };
        }
        return null;
    }).filter(item => item !== null);

    // Convert array to an object for easier access
    const s2Object = s2Array.reduce((acc, { key, data }) => {
        acc[key] = data;
        return acc;
    }, {});

    // Log the extracted object for debugging
    console.log('Parsed s2Object:', s2Object);

    // Extract Gross/Net CSA values
    const grossNetCsaPattern = /Gross\/Net CSA.....:\s+([\d.]+)\s+\/\s+([\d.]+)\s+cm2/;
    const grossNetCsaMatch = inputString.match(grossNetCsaPattern);

    if (grossNetCsaMatch) {
        s2Object['Gross CSA'] = parseFloat(grossNetCsaMatch[1]);
        s2Object['Net CSA'] = parseFloat(grossNetCsaMatch[2]);
    }

    // Extract step widths
    const stepPattern = /Step (\d+):\s+([\d.]+),/g;
    let stepMatch;
    while ((stepMatch = stepPattern.exec(inputString)) !== null) {
        s2Object[`Step ${stepMatch[1]} Width`] = parseFloat(stepMatch[2]);
    }



    // Fill the form with extracted data
    fillFormSection2(s2Object);
}

function fillFormSection2(data) {
    const fields = {
        's2-exc-current': '100 % Exc Current',
        's2-center-to-center': 'Center to Center',
        's2-core-design': 'Core Design',
        's2-core-gross-weight': 'Core Gross Weight',
        's2-core-net-weight': 'Core Net Weight',
        's2-core-perimeter': 'Core Perimeter',
        's2-core-scrap-weight': 'Core Scrap Weight',
        's2-delta-build': 'Delta Build',
        's2-diagonal-dimension': 'Diagonal Dimension',
        's2-grade-frame-type': 'Grade/Frame Type',
        's2-gross-csa': 'Gross CSA',
        's2-net-csa': 'Net CSA',
        's2-induction': 'INDUCTION',
        's2-ovality-factor': 'Ovality Factor',
        's2-peak-hv-inrush-cur': 'Peak HV Inrush Cur',
        's2-sound-natural-freq': 'Sound/Natural Freq',
        's2-standard-core-no': 'Standard Core No',
        's2-step1-width': 'Step 1 Width',
        's2-step2-width': 'Step 2 Width',
        's2-step3-width': 'Step 3 Width',
        's2-step4-width': 'Step 4 Width',
        's2-step5-width': 'Step 5 Width',
        's2-step6-width': 'Step 6 Width',
        's2-step7-width': 'Step 7 Width',
        's2-step8-width': 'Step 8 Width',
        's2-step9-width': 'Step 9 Width',
        's2-step10-width': 'Step 10 Width',
        's2-utilization-factor': 'Utilization Factor',
        's2-vpt': 'VPT',
        's2-weight-of-core-leg': 'Weight of Core-Leg',
        's2-weight-of-yoke': 'Weight of Yoke',
        's2-window-height': 'Window Height'
    };

    for (const [elementId, keyword] of Object.entries(fields)) {
        let value = 'Error: Section 2';
        for (const key in data) {
            if (key.includes(keyword)) {
                value = data[key];
                break;
            }
        }

        // Store the value in session storage
        sessionStorage.setItem(elementId, value);

        const element = document.getElementById(elementId);
        if (element) {
            element.value = value;
        } else {
            console.error(`Element with ID ${elementId} not found`);
        }
    }
}
