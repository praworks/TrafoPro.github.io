document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.getElementById('form-container');
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');

    // Load each form section
    loadFormSection('DesignSheetProcess/DesignSheetProcess.html');
    loadFormSection('DesignhseetProcess/Section-1.html');
    loadFormSection('Section-2.html');
    loadFormSection('Section-3.html');
    loadFormSection('Section-4.html');
    loadFormSection('Section-5.html');
    loadFormSection('Section-6.html');
    loadFormSection('Section-7.html');
    loadFormSection('Section-8.html');
    loadFormSection('Section-9.html');
    loadFormSection('Section-10.html');

    function loadFormSection(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const temp = document.createElement('div');
                temp.innerHTML = html;
                formContainer.appendChild(temp.firstElementChild);
            });
    }

    // Submit and Reset actions
    submitBtn.addEventListener('click', function () {
        const form = document.getElementById('data-form');
    });

    resetBtn.addEventListener('click', function () {
        formContainer.innerHTML = '';
        // Reload all form sections
        loadFormSection('DesignSheetProcess/DesignSheetProcess.html');
        loadFormSection('DesignhseetProcess/Section-1.html');
        loadFormSection('Section-2.html');
        loadFormSection('Section-3.html');
        loadFormSection('Section-4.html');
        loadFormSection('Section-5.html');
        loadFormSection('Section-6.html');
        loadFormSection('Section-7.html');
        loadFormSection('Section-8.html');
        loadFormSection('Section-9.html');
        loadFormSection('Section-10.html');
    });
});
