document.getElementById('accordion-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const response = await fetch('/api/accordion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
    });

    const result = await response.json();
    alert(result.message);

    document.getElementById('accordion-form').reset();
});
