function fetchSection5() {
    // Retrieve from local storage
    const inputString = sessionStorage.getItem('section5');

    if (!inputString) {
        console.error('No data found in localStorage for section3');
        return;
    }

    // Split the input string into an array of values
    const section5values = inputString.split('|').map(value => value.trim()).filter(value => value !== '');

    // Extract relevant information and store them in an array
    const section5Array = section5values.map(value => {
        const parts = value.match(/(.{1,20}):\s*(.+)/); // Adjusted regular expression for better key capturing
        if (parts) {
            const key = parts[1].trim();
            const data = parts[2].trim();

            return { key, data };
        }
        return null;
    }).filter(item => item !== null);

    // Convert array to object for easier access
    const section5Object = section5Array.reduce((acc, { key, data }) => {
        acc[key] = data;
        return acc;
    }, {});

    //console.log('Section5', section5Object);

    fillFormsection5(section5Object);
}
/*
"Eff Hi-Lo ElecSpan": "12.000 mm"
​
"HV Fixed Gap......": "0.000 mm"
​
"HV-Ends...........": "40.000 mm"
​
"HV-HSide/HV-LSide.": "40.00 / 40.00 mm"
​
"LV Cond to Yoke...": "22.000 mm"
​
"LV to Core Leg(mm)": "5.50x  5.50x  6.00"
​
"Max LV Sup Span...": "81.000 mm"
​
"Ph-Ph Elec Spacing": "15.000 mm"
​
"Total HV-LV Offset": "0.000 mm"
​
"Yoke-Case Top/Bot.": "196.00 / 31.00 mm"
*/

function fillFormsection5(data) {
    const fields = {
        's5-Eff-Hi-Lo-ElecSpan': 'Eff Hi-Lo ElecSpan',
        's5-HV-Fixed-Gap': 'HV Fixed Gap......',
        's5-HV-Ends': 'HV-Ends...........',
        's5-HV-HSide-HV-LSide': 'HV-HSide/HV-LSide.',
        's5-LV-Cond-to-Yoke': 'LV Cond to Yoke...',
        's5-LV-to-Core-Leg': 'LV to Core Leg(mm)',
        's5-Max-LV-Sup-Span': 'Max LV Sup Span...',
        's5-Ph-Ph-Elec-Spacing': 'Ph-Ph Elec Spacing',
        's5-Total-HV-LV-Offset': 'Total HV-LV Offset',
        's5-Yoke-Case-Top-Bot': 'Yoke-Case Top/Bot.'
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
