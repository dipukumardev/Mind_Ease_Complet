document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.BUTTON');

    // Set the default button color based on the current page
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];
    const defaultButtonId = currentPage + 'Btn';
    document.getElementById(defaultButtonId).classList.add('clicked');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('clicked', 'hovered'));
            button.classList.add('clicked');
        });

        button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('clicked')) {
                document.getElementById(defaultButtonId).classList.add('hovered');
            }
        });

        button.addEventListener('mouseleave', () => {
            if (!button.classList.contains('clicked')) {
                document.getElementById(defaultButtonId).classList.remove('hovered');
            }
        });
    });
});

// Set the default page to the dashboard when the page is reloaded
window.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'dashboard.html') {
        window.location.href = 'dashboard.html';
    }
});



// JavaScript

