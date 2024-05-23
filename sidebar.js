// Description: This file contains the sidebar menu functionality.
function includeHTML() {
    const elements = document.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const file = element.getAttribute('include-html');
        if (file) {
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch: ' + file);
                    }
                    return response.text();
                })
                .then(data => {
                    element.innerHTML = data;
                    element.removeAttribute('include-html');
                    includeHTML();  // Call recursively to handle nested includes
                })
                .catch(error => console.error(error));
        }
    }
}
document.addEventListener('DOMContentLoaded', includeHTML);


function changeColor(element) {
    // Remove 'active' class from all links
    var links = document.querySelectorAll('.sidenav a');
    links.forEach(link => {
        link.classList.remove('active');
    });

    // Add 'active' class to the clicked link
    element.classList.add('active');
}