document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scrolled State
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
                navbar.classList.remove('py-3');
            } else {
                navbar.classList.remove('navbar-scrolled');
                navbar.classList.add('py-3');
            }
        });
    }

    // 2. Smooth Scrolling for internal links (overriding Bootstrap for custom offset)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }

                // Scroll with offset due to fixed navbar
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update actice class on nav manually
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // 3. Counter Animation for Dashboard Cards using Intersection Observer
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const targetText = counter.innerText.replace(/,/g, '');
            const target = parseInt(targetText);
            const duration = 2000; // ms
            const step = Math.ceil(target / (duration / 16)); // 16ms per frame

            let current = 0;
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.innerText = current.toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };

            counter.innerText = '0';
            updateCounter();
        });
    };

    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animateCounters();
                animated = true;
            }
        }, { threshold: 0.3 });

        observer.observe(dashboardSection);
    }

    // 4. Patient Management Form Validation and Data Addition
    const addPatientForm = document.getElementById('addPatientForm');
    const patientTableBody = document.getElementById('patientTableBody');

    if (addPatientForm && patientTableBody) {
        addPatientForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            // Get form values
            const name = document.getElementById('patientName').value;
            const age = document.getElementById('patientAge').value;
            const gender = document.getElementById('patientGender').value;
            const contact = document.getElementById('patientContact').value;
            const condition = document.getElementById('patientCondition').value;

            // Generate a secure mock ID
            const ptId = '#PT-' + Math.floor(Math.random() * 900 + 100).toString().padStart(3, '0');
            const sexChar = gender.charAt(0).toUpperCase();

            // Create new row
            const newRow = document.createElement('tr');

            newRow.innerHTML = `
                <td class="text-muted fw-medium ps-3">${ptId}</td>
                <td class="fw-bold text-dark">${name}</td>
                <td class="text-muted">${age}/${sexChar}</td>
                <td class="text-muted">${contact}</td>
                <td class="text-muted">${condition}</td>
                <td class="pe-3"><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 border border-primary border-opacity-10 fw-medium">New Entry</span></td>
            `;

            // Inline styles for animation
            newRow.style.opacity = '0';
            newRow.style.transform = 'translateX(-20px)';
            newRow.style.transition = 'all 0.5s ease';

            // Prepend new patient to table top
            patientTableBody.insertBefore(newRow, patientTableBody.firstChild);

            // Trigger animation
            setTimeout(() => {
                newRow.style.opacity = '1';
                newRow.style.transform = 'translateX(0)';
            }, 50);

            // Change badge to admitted after 2 seconds
            setTimeout(() => {
                const badge = newRow.querySelector('.badge');
                badge.className = 'badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 border border-success border-opacity-10 fw-medium';
                badge.innerText = 'Admitted';
            }, 3000);

            // Reset form
            this.reset();
            this.classList.remove('was-validated');
        });
    }

    // 5. Appointment Booking Validation
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Visual feedback
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check-circle me-2"></i>Booking Confirmed!';
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-success');

                setTimeout(() => {
                    this.reset();
                    this.classList.remove('was-validated');
                    btn.innerHTML = originalText;
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-primary');
                    btn.disabled = false;
                }, 4000);
            }, 1200);
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scrolled State
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
                navbar.classList.remove('py-3');
            } else {
                navbar.classList.remove('navbar-scrolled');
                navbar.classList.add('py-3');
            }
        });
    }

    // 2. Smooth Scrolling for internal links (overriding Bootstrap for custom offset)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }

                // Scroll with offset due to fixed navbar
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update actice class on nav manually
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // 3. Counter Animation for Dashboard Cards using Intersection Observer
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const targetText = counter.innerText.replace(/,/g, '');
            const target = parseInt(targetText);
            const duration = 2000; // ms
            const step = Math.ceil(target / (duration / 16)); // 16ms per frame

            let current = 0;
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.innerText = current.toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };

            counter.innerText = '0';
            updateCounter();
        });
    };

    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animateCounters();
                animated = true;
            }
        }, { threshold: 0.3 });

        observer.observe(dashboardSection);
    }

    // 4. Patient Management Form Validation and Data Addition
    const addPatientForm = document.getElementById('addPatientForm');
    const patientTableBody = document.getElementById('patientTableBody');

    if (addPatientForm && patientTableBody) {
        addPatientForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            // Get form values
            const name = document.getElementById('patientName').value;
            const age = document.getElementById('patientAge').value;
            const gender = document.getElementById('patientGender').value;
            const contact = document.getElementById('patientContact').value;
            const condition = document.getElementById('patientCondition').value;

            // Generate a secure mock ID
            const ptId = '#PT-' + Math.floor(Math.random() * 900 + 100).toString().padStart(3, '0');
            const sexChar = gender.charAt(0).toUpperCase();

            // Create new row
            const newRow = document.createElement('tr');

            newRow.innerHTML = `
                <td class="text-muted fw-medium ps-3">${ptId}</td>
                <td class="fw-bold text-dark">${name}</td>
                <td class="text-muted">${age}/${sexChar}</td>
                <td class="text-muted">${contact}</td>
                <td class="text-muted">${condition}</td>
                <td class="pe-3"><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 border border-primary border-opacity-10 fw-medium">New Entry</span></td>
            `;

            // Inline styles for animation
            newRow.style.opacity = '0';
            newRow.style.transform = 'translateX(-20px)';
            newRow.style.transition = 'all 0.5s ease';

            // Prepend new patient to table top
            patientTableBody.insertBefore(newRow, patientTableBody.firstChild);

            // Trigger animation
            setTimeout(() => {
                newRow.style.opacity = '1';
                newRow.style.transform = 'translateX(0)';
            }, 50);

            // Change badge to admitted after 2 seconds
            setTimeout(() => {
                const badge = newRow.querySelector('.badge');
                badge.className = 'badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 border border-success border-opacity-10 fw-medium';
                badge.innerText = 'Admitted';
            }, 3000);

            // Reset form
            this.reset();
            this.classList.remove('was-validated');
        });
    }

    // 5. Appointment Booking Validation
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Visual feedback
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check-circle me-2"></i>Booking Confirmed!';
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-success');

                setTimeout(() => {
                    this.reset();
                    this.classList.remove('was-validated');
                    btn.innerHTML = originalText;
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-primary');
                    btn.disabled = false;
                }, 4000);
            }, 1200);
        });
    }
});
