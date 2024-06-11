function fetchSection9() {
    // Retrieve from local storage
    const inputString = sessionStorage.getItem('section9');

    if (!inputString) {
        console.error('No data found in localStorage for section9');
        return;
    }

    // Split the input string into an array of values
    const section9values = inputString.split('|').map(value => value.trim()).filter(value => value !== '');

    // Extract relevant information and store them in an array
    const section9Array = section9values.map(value => {
        const parts = value.match(/(.{1,20}):\s*(.+)/); // Adjusted regular expression for better key capturing
        if (parts) {
            const key = parts[1].trim();
            const data = parts[2].trim();

            return { key, data };
        }
        return null;
    }).filter(item => item !== null);

    // Convert array to object for easier access
    const section9Object = section9Array.reduce((acc, { key, data }) => {
        acc[key] = data;
        return acc;
    }, {});

    // console.log('section9', section9Object);

    fillFormsection9(section9Object);
}
/*
    | HV Wdg DC Losses..:        245  Watts   | LV Wdg DC Losses..:        398  Watts   |                                         |
     | HV Watts (% Eddy).:        246 ( 0.7)   | LV Watts (% Eddy).:        409 ( 1.5)   | LV Bus Bar / Stray:          3 /     30 |
     | No Load Losses....:         88  Watts   | Tot-Ld Watts(%Ed).:        689 ( 6.0)   | Total Losses(ONAN):        777 @  75 C  |
     | % X / % R / % Lead:   3.78/1.38/0.00 %  | % Z (HV-LV-Lead)..:         4.030 %     | TOP OIL RISE......:       20.2 deg C    |
     |                                         | % Z Guaranteed....:         4.000 %     |                                         |
     |-----------------------------------------------------------------------------------------------------------------------------|
*/

function fillFormsection9(data) {
    const fields = {
        's9-XRLead': '% X / % R / % Lead',
        's9-ZHV-LV-Lead': '% Z (HV-LV-Lead)',
        's9-ZGuaranteed': '% Z Guaranteed',
        's9-HVWatts-Eddy': 'HV Watts (% Eddy)',
        's9-LVWatts-Eddy': 'LV Watts (% Eddy)',
        's9-HVWdgDCLosses': 'HV Wdg DC Losses',
        's9-LVWdgDCLosses': 'LV Wdg DC Losses',
        's9-LVBusBar-Stray': 'LV Bus Bar / Stray',
        's9-NoLoadLosses': 'No Load Losses',
        's9-Tot-LdWatts-Ed': 'Tot-Ld Watts(%Ed)',
        's9-TotalLosses': 'Total Losses(ONAN)',
        's9-TopOilRise': 'TOP OIL RISE',
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
