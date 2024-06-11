function fetchSection7() {
    // Retrieve from local storage
    const inputString = sessionStorage.getItem('section7');
    //console.log(inputString);

    if (!inputString) {
        console.error('No data found in localStorage for section7');
        return;
    }

    // Split the input string into an array of values
    const section7values = inputString.split('|').map(value => value.trim()).filter(value => value !== '');

    // Extract relevant information and store them in an array
    const section7Array = section7values.map(value => {
        const parts = value.match(/(.{1,20}):\s*(.+)/); // Adjusted regular expression for better key capturing
        if (parts) {
            const key = parts[1].trim();
            const data = parts[2].trim();
            return { key, data };
        }
        return null;
    }).filter(item => item !== null);

    // Convert array to object for easier access
    const section7Object = section7Array.reduce((acc, { key, data }) => {
        acc[key] = data;
        return acc;
    }, {});

    fillFormsection7(section7Object);
}

/*
     | Active Part Weight:              404 kg |                                         | C&C Dim: Ht/Lgth..:   576.00/ 781.92 mm |
     | Clamp & Brace Wt..:               40 kg | H-L Barrier Weight:             4.91 kg |                                         |
     | Mineral Oil Weight:              188 kg | Ribs-Press/Weight.:   0.18 kp/cm2    59 | Rib Height:1,2,3,4:  600/ 600/ 600/ 600 |
     | Bus bar/TC Weight.:         0/     0 kg | Rib Pitch: 1,2,3,4:  100/ 100/ 100/ 100 | No of Ribs:1,2,3,4:    9/   4/   9/   4 |
     | Cov/Case & Cooling:        16/    79 kg | Rib Depth: 1,2,3,4:  200/  50/ 200/  50 | Rib Pan Wd:1,2,3,4:  862/ 393/ 862/ 393 |
     | Total Weight......:              728 kg | Rib Thick: 1,2,3,4: 1.20/1.20/1.20/1.20 | Case: Lt/Wd/Ht(mm): 861.9x 392.9x 803.0 |
*/

function fillFormsection7(data) {
    const fields = {
        's7-Active-Part-Weight': 'Active Part Weight',
        's7-Clamp-Brace-Wt': 'Clamp & Brace Wt..',
        's7-H-L-Barrier-Weight': 'H-L Barrier Weight',
        's7-Mineral-Oil-Weight': 'Mineral Oil Weight',
        's7-Ribs-Press-Weight': 'Ribs-Press/Weight.',
        's7-Rib-Height': 'Rib Height:1,2,3,4',
        's7-Rib-Pitch-1': 'Rib Pitch: 1,2,3,4',
        's7-Rib-Pitch-2': 'Rib Pitch: 1,2,3,4',
        's7-Rib-Pitch-3': 'Rib Pitch: 1,2,3,4',
        's7-Rib-Pitch-4': 'Rib Pitch: 1,2,3,4',
        's7-No-of-Ribs-1': 'No of Ribs:1,2,3,4',
        's7-No-of-Ribs-2': 'No of Ribs:1,2,3,4',
        's7-No-of-Ribs-3': 'No of Ribs:1,2,3,4',
        's7-No-of-Ribs-4': 'No of Ribs:1,2,3,4',
        's7-Rib-Pan-Wd-1': 'Rib Pan Wd:1,2,3,4',
        's7-Rib-Pan-Wd-2': 'Rib Pan Wd:1,2,3,4',
        's7-Rib-Pan-Wd-3': 'Rib Pan Wd:1,2,3,4',
        's7-Rib-Pan-Wd-4': 'Rib Pan Wd:1,2,3,4',
        's7-Rib-Thick': 'Rib Thick: 1,2,3,4',
        's7-Case-Lt-Wd-Ht': 'Case: Lt/Wd/Ht(mm)',
        's7-Bus-bar-TC-Weight': 'Bus bar/TC Weight.',
        's7-Cov-Case-Cooling': 'Cov/Case & Cooling',
        's7-Total-Weight': 'Total Weight',
        's7-C-C-Dim-Ht-Lgth': 'C&C Dim: Ht/Lgth', 
        's7-Rib-Depth-1': 'Rib Depth: 1,2,3,4', 
        's7-Rib-Depth-2': 'Rib Depth: 1,2,3,4', 
        's7-Rib-Depth-3': 'Rib Depth: 1,2,3,4', 
        's7-Rib-Depth-4': 'Rib Depth: 1,2,3,4' 
    }

    for (const [elementId, keyword] of Object.entries(fields)) {
        let value = 'Error: Section 3';
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
