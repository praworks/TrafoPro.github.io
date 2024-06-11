function fetchSection1() {
    // Retrieve from local storage
    const inputString = .getItem('section1');
    console.log('inputString', inputString);

    if (!inputString) {
        console.error('No data found in localStorage for section1');
        return;
    }

const data = {};

    const fileNameMatch = inputString.match(/Data File Name:\s*(.*)\r\n/);
    data.fileName = fileNameMatch ? fileNameMatch[1].trim() : null;

    const dateMatch = inputString.match(/DATE:\s*(\d{4}\.\d{2}\.\d{2})/);
    data.date = dateMatch ? dateMatch[1].trim() : null;

    const timeMatch = inputString.match(/Time:\s*(\d{2}:\d{2}:\d{2})/);
    data.time = timeMatch ? timeMatch[1].trim() : null;

    const orderMatch = inputString.match(/ORDER\s*:\s*(\d+)/);
    data.order = orderMatch ? orderMatch[1].trim() : null;

    const designMatch = inputString.match(/DESIGN:\s*([^\s]+)/);
    data.design = designMatch ? designMatch[1].trim() : null;

    const engineerMatch = inputString.match(/ENGINEER:\s*([^\s]+)/);
    data.engineer = engineerMatch ? engineerMatch[1].trim() : null;

    const customerNameMatch = inputString.match(/CUSTOMER NAME:\s*([^\s]+)/);
    data.customerName = customerNameMatch ? customerNameMatch[1].trim() : null;

    const kvaMatch = inputString.match(/KVA\s*-\s*(\d+)/);
    data.kva = kvaMatch ? kvaMatch[1].trim() : null;

    const liquidTypeMatch = inputString.match(/Liquid Type\s*([^\s]+)/);
    data.liquidType = liquidTypeMatch ? liquidTypeMatch[1].trim() : null;

    const coolingMatch = inputString.match(/Cooling\s*([^\s]+)/);
    data.cooling = coolingMatch ? coolingMatch[1].trim() : null;

    const riseMatch = inputString.match(/Rise\s*([^\s]+)/);
    data.rise = riseMatch ? riseMatch[1].trim() : null;

    const phaseMatch = inputString.match(/Three Phase/);
    data.phase = phaseMatch ? "Three Phase" : null;

    const frequencyMatch = inputString.match(/(\d+)\s*Hz/);
    data.frequency = frequencyMatch ? frequencyMatch[1].trim() : null;

    const styleNumberMatch = inputString.match(/Style Number:\s*([^\s]+)/);
    data.styleNumber = styleNumberMatch ? styleNumberMatch[1].trim() : null;

    const hvMatch = inputString.match(/HV\s*:\s*(\d+)/);
    data.hv = hvMatch ? hvMatch[1].trim() : null;

    const hvBILMatch = inputString.match(/BIL:\s*(\d+)\s*\(Delta\)/);
    data.hvBIL = hvBILMatch ? hvBILMatch[1].trim() : null;

    const hvLineCoilAmpsMatch = inputString.match(/Line\/Coil Amps:\s*([\d.]+)\/\s*([\d.]+)/);
    data.hvLineCoilAmps = hvLineCoilAmpsMatch ? { line: hvLineCoilAmpsMatch[1].trim(), coil: hvLineCoilAmpsMatch[2].trim() } : null;

    const lvMatch = inputString.match(/LV\s*:\s*(\d+)/);
    data.lv = lvMatch ? lvMatch[1].trim() : null;

    const lvBILMatch = inputString.match(/BIL:\s*(\d+)\s*\(Wye\)/);
    data.lvBIL = lvBILMatch ? lvBILMatch[1].trim() : null;

    // Line/Coil Amps:   68.732/  68.732
    const lvLineCoilAmpsMatch = inputString.match(/Line\/Coil Amps:\s*([\d.]+)\/\s*([\d.]+)/);
    data.lvLineCoilAmps = lvLineCoilAmpsMatch ? { line: lvLineCoilAmpsMatch[1].trim(), coil: lvLineCoilAmpsMatch[2].trim() } : null;
    console.log(data);
    
    fillFormSection1(data); // Call the fillFormSection1 function with the extracted data
}

function fillFormSection1(data) {
    document.getElementById('gen-info-order').value = data.order || '';
    document.getElementById('gen-info-design').value = data.design || '';
    document.getElementById('gen-info-engineer').value = data.engineer || '';
    document.getElementById('gen-info-customer-name').value = data.customerName || '';
    document.getElementById('gen-info-kva').value = data.kva || '';
    document.getElementById('gen-info-liquid-type').value = data.liquidType || '';
    document.getElementById('gen-info-cooling').value = data.cooling || '';
    document.getElementById('gen-info-rise').value = data.rise || '';
    document.getElementById('gen-info-phase').value = data.phase || '';
    document.getElementById('gen-info-frequency').value = data.frequency || '';
    document.getElementById('gen-info-style-number').value = data.styleNumber || '';
    document.getElementById('gen-info-hv').value = data.hv || '';
    document.getElementById('gen-info-bil-hv').value = data.hvBIL || '';
    document.getElementById('gen-info-lv').value = data.lv || '';
    document.getElementById('gen-info-bil-lv').value = data.lvBIL || '';
    document.getElementById('gen-info-date').value = data.date || '';
    document.getElementById('gen-info-time').value = data.time || '';
    document.getElementById('gen-info-connection-hv').value = data.bilTypeHv || '';
    document.getElementById('gen-info-connection-lv').value = data.bilTypeLv || '';
    //console.log('Filled general info');
}


