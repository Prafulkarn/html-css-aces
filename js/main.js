const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const revealElements = document.querySelectorAll('.reveal');
const unavailableProjectLinks = document.querySelectorAll('[data-unavailable="true"]');
const toast = document.getElementById('toast');

let toastTimer;

function showToast(message) {
    if (!toast) {
        return;
    }

    toast.textContent = message;
    toast.classList.add('show');

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
        toast.classList.remove('show');
    }, 2400);
}

function setActiveNavLink() {
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                const isCurrent = link.getAttribute('href') === `#${sectionId}`;
                link.classList.toggle('active', isCurrent);
            });
        }
    });
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    {
        threshold: 0.2,
    }
);

revealElements.forEach((element) => revealObserver.observe(element));

unavailableProjectLinks.forEach((projectLink) => {
    projectLink.addEventListener('click', (event) => {
        event.preventDefault();
        showToast('This project is not hosted yet. Add your live URL or GitHub link here soon.');
    });
});

window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);
