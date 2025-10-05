document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    // تحديد جميع روابط التنقل التي تبدأ بـ '#'
    const navLinks = navbar.querySelectorAll('a[href^="#"]'); 

    // فتح/إغلاق القائمة (mobile)
    function toggleMenu() {
        if (!menuToggle) return;
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    // إغلاق القائمة عند الضغط على رابط (لتحسين تجربة الموبايل)
    function closeMenuOnLinkClick() {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // إغلاق القائمة فقط إذا كانت في وضع النشط
                if (navbar.classList.contains('active')) { 
                    navbar.classList.remove('active');
                    menuToggle.classList.remove('open');
                }
            });
        });
    }

    // التمرير السلس (Smooth Scroll)
    function smoothScroll() {
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // التمرير مع تأثير سلس
                    target.scrollIntoView({ behavior: 'smooth' }); 
                }
            });
        });
    }

    // تمييز الرابط النشط أثناء التمرير (Active Link Highlighting)
    function highlightOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.querySelector('.header').offsetHeight; // ارتفاع الهيدر

        function onScroll() {
            let current = '';
            // تحديد القسم الحالي بناءً على موقعه من أعلى الصفحة
            sections.forEach(section => {
                // نطرح ارتفاع الهيدر لضبط التوقيت الصحيح
                const sectionTop = section.offsetTop - headerHeight - 20; 
                if (pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            // تحديث فئة 'active-link'
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active-link');
                }
            });
        }

        window.addEventListener('scroll', onScroll);
        // استدعاء مرة عند التحميل لتمييز أول قسم
        onScroll(); 
    }

    // استدعاء الدوال
    toggleMenu();
    closeMenuOnLinkClick();
    smoothScroll();
    highlightOnScroll();

});