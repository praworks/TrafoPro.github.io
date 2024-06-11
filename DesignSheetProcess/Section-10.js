function fetchSection10() {
    // Retrieve from local storage
    const inputString = sessionStorage.getItem('section10');
    //console.log('inputString', inputString);

    if (!inputString) {
        console.error('No data found in localStorage for section10');
        return;
    }

    // Initialize the data object to hold the extracted values
    const data = {};

    // Extract key-value pairs with pattern key=value
    const keyValuePattern = /(\w+)\s*=\s*([\w.]+)/g;
    let match;
    while ((match = keyValuePattern.exec(inputString)) !== null) {
        data[match[1]] = match[2].trim();
    }

    // Extract key-value pairs with pattern key(YES|NO)
    const yesNoPattern = /(\w+)\s*\((YES|NO)\)/g;
    while ((match = yesNoPattern.exec(inputString)) !== null) {
        data[match[1]] = match[2].trim();
    }

    // Extract key-value pairs with pattern key: value
    const keyColonValuePattern = /(\w+)\s*:\s*(.*?)(?=\s+\w+\s*:|$)/g;
    while ((match = keyColonValuePattern.exec(inputString)) !== null) {
        data[match[1]] = match[2].trim();
    }

    // Extract Tapping Turns
    const tappingTurnsMatch = inputString.match(/Tapping Turns @.......:\s*(.*)/);
    if (tappingTurnsMatch) {
        const tappingTurns = tappingTurnsMatch[1].split(',').reduce((acc, curr) => {
            const [tap, value] = curr.split('-').map(str => str.trim());
            acc[`Tap ${tap}`] = value;
            return acc;
        }, {});
        data['Tapping Turns'] = tappingTurns;
    }

    fillFormSection10(data); // Call the fillFormSection10 function with the extracted data
}

function fillFormSection10(data) {
    const tappingTurns = data['Tapping Turns'] || {};
    document.getElementById('notes-Tap-1').value = tappingTurns['Tap 1'] || '';
    document.getElementById('notes-Tap-2').value = tappingTurns['Tap 2'] || '';
    document.getElementById('notes-Tap-3').value = tappingTurns['Tap 3'] || '';
    document.getElementById('notes-Tap-4').value = tappingTurns['Tap 4'] || '';
    document.getElementById('notes-Tap-5').value = tappingTurns['Tap 5'] || '';
    document.getElementById('notes-Tap-6').value = tappingTurns['Tap 6'] || '';
    document.getElementById('notes-Tap-7').value = tappingTurns['Tap 7'] || '';
    document.getElementById('notes-Tap-8').value = tappingTurns['Tap 8'] || '';
    document.getElementById('notes-Tap-9').value = tappingTurns['Tap 9'] || '';
    document.getElementById('notes-Tap-10').value = tappingTurns['Tap 10'] || '';
}
