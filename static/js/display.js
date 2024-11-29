async function fetchAccordions() {
    try {
        const response = await fetch('/api/accordion');
        if (!response.ok) throw new Error('Failed to fetch accordions');
        const accordions = await response.json();
        
        const container = document.getElementById('accordion');
        container.innerHTML = '';

        accordions.forEach((item) => {
            const accordionItem = document.createElement('div');
            accordionItem.className = 'accordion-item';

            accordionItem.innerHTML = `
                <div class="accordion-button">${item.title}</div>
                <div class="accordion-content">${item.content}</div>
            `;

            container.appendChild(accordionItem);
        });
    } catch (error) {
        console.error('Error loading accordions:', error);
        const container = document.getElementById('accordionContainer');
        container.innerHTML = '<p>Error loading accordions. Please try again later.</p>';
    }
}

fetchAccordions();

document.getElementById('accordion').addEventListener('click', (event) => {
    if (event.target.classList.contains('accordion-button')) {
        const content = event.target.nextElementSibling;

        if (content.classList.contains('open')) {
            content.classList.remove('open');
        } else {
            document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
            content.classList.add('open');
        }
    }
});

setInterval(fetchAccordions, 60 * 1000);
