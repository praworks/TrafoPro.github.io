function changeColor(element) {
    // Remove 'active' class from all links
    var links = document.querySelectorAll('.sidenav a');
    links.forEach(link => {
      link.classList.remove('active');
    });
  
    // Add 'active' class to the clicked link
    element.classList.add('active');
  }
  