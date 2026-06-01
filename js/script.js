
  document.addEventListener('DOMContentLoaded', function() {

    const burger = document.querySelector('.burger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a'); 


    function closeMenu() {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    }

    function toggleMenu(e) {
      e.stopPropagation(); 
      navLinks.classList.toggle('open');
    }

    if (burger) {
      burger.addEventListener('click', toggleMenu);
    }

    if (navItems.length) {
      navItems.forEach(item => {
        item.addEventListener('click', closeMenu);
      });
    }

    document.addEventListener('click', function(event) {
      const isClickInsideNav = navLinks && navLinks.contains(event.target);
      const isClickOnBurger = burger && burger.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnBurger && navLinks && navLinks.classList.contains('open')) {
        closeMenu();
      }
    });

  });
