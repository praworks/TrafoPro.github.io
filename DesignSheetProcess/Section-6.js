function fetchSection6() {
    // Retrieve from local storage
    const inputString = sessionStorage.getItem('section6');

    if (!inputString) {
        console.error('No data found in localStorage for section6');
        return;
    }

    // Split the input string into an array of values
    const section6values = inputString.split('|').map(value => value.trim()).filter(value => value !== '');

    // Extract relevant information and store them in an array
    const section6Array = section6values.map(value => {
        const parts = value.match(/(.{1,20}):\s*(.+)/); // Adjusted regular expression for better key capturing
        if (parts) {
            const key = parts[1].trim();
            const data = parts[2].trim();

            return { key, data };
        }
        return null;
    }).filter(item => item !== null);

    // Convert array to object for easier access
    const section6Object = section6Array.reduce((acc, { key, data }) => {
        acc[key] = data;
        return acc;
    }, {});

    // console.log('section6', section6Object);

    fillFormsection6(section6Object);
}
/*
"Case Steel/Cooling": "0.78 /  1.71"
​
"Core Cost.........": "3.88"
​
"E Rnd Wire: AL/CU.": "4.56 / 11.73"
​
"Foil Cond: AL/CU..": "3.59 / 11.73"
​
"LME/1000 (CU/AL)..": "0 /        0"
​
"Max No Load/Load..": "90 /     714"
​
"Mineral/Silicone..": "0.98 /  6.12"
​
"Netw.Short Cir.Cap": "500.0  MVA"
​
"Rect Wire : Al/Cu.": "5.63 /  7.37"
​
"Top Oil Rise Limit": "47.0 deg C"
​
"Turn/Lay/DD Insul.": "2.18 /  3.28 / 4.14"
​
"Wdg Rise Limit....": "52.0 deg C"
*/

function fillFormsection6(data) {
    const fields = {
        's6-Case-Steel-Cooling': 'Case Steel/Cooling',
        's6-Core-Cost': 'Core Cost.........',
        's6-E-Rnd-Wire-AL-CU': 'E Rnd Wire: AL/CU.',
        's6-Foil-Cond-AL-CU': 'Foil Cond: AL/CU..',
        's6-LME-1000-CU-AL': 'LME/1000 (CU/AL)..',
        's6-Max-No-Load-Load': 'Max No Load/Load..',
        's6-Mineral-Silicone': 'Mineral/Silicone..',
        's6-Netw-Short-Cir-Cap': 'Netw.Short Cir.Cap',
        's6-Rect-Wire-Al-Cu': 'Rect Wire : Al/Cu.',
        's6-Top-Oil-Rise-Limit': 'Top Oil Rise Limit',
        's6-Turn-Lay-DD-Insul': 'Turn/Lay/DD Insul.',
        's6-Wdg-Rise-Limit': 'Wdg Rise Limit....'
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
