function fetchSection8() {
    // Retrieve from local storage
    const inputString = sessionStorage.getItem('section8');

    if (!inputString) {
        console.error('No data found in localStorage for section8');
        return;
    }

    // Split the input string into an array of values
    const section8values = inputString.split('|').map(value => value.trim()).filter(value => value !== '');

    // Extract relevant information and store them in an array
    const section8Array = section8values.map(value => {
        const parts = value.match(/(.{1,20}):\s*(.+)/); // Adjusted regular expression for better key capturing
        if (parts) {
            const key = parts[1].trim();
            const data = parts[2].trim();

            return { key, data };
        }
        return null;
    }).filter(item => item !== null);

    // Convert array to object for easier access
    const section8Object = section8Array.reduce((acc, { key, data }) => {
        acc[key] = data;
        return acc;
    }, {});

    // console.log('section8', section8Object);

    fillFormsection8(section8Object);
}
/*
     | Core Cost.........:         1026        | HV / LV Coil Cost.:      1379/       99 | Labor & VOH/Hours.:            0 /   0  |
     | Case/Cooling Cost.:        16/     101  | Bracing Cost......:           32        | Design Matl-Cost..:         2984        |
     | Mineral Oil.......:          184        | Assy and Misc.....:          148        | Variable Cost.....:         2984        |
     | EVALUATED LOSSES..:            0        | EVALUATED COST....:         2984        | RECOMMENDED PRICE.:         5967        |
*/

function fillFormsection8(data) {
    const fields = {
        's8-Assy-and-Misc': 'Assy and Misc',
        's8-Bracing-Cost': 'Bracing Cost',
        's8-Case-Cooling-Cost': 'Case/Cooling Cost',
        's8-Core-Cost': 'Core Cost',
        's8-Design-Matl-Cost': 'Design Matl-Cost',
        's8-EVALUATED-COST': 'EVALUATED COST',
        's8-EVALUATED-LOSSES': 'EVALUATED LOSSES',
        's8-HV-LV-Coil-Cost': 'HV / LV Coil Cost',
        's8-Labor-VOH-Hours': 'Labor & VOH/Hours',
        's8-Mineral-Oil': 'Mineral Oil',
        's8-RECOMMENDED-PRICE': 'RECOMMENDED PRICE',
        's8-Variable-Cost': 'Variable Cost',
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
