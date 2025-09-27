// Function to update receipt from form
function updateReceipt() {
    document.getElementById('date').textContent = document.getElementById('date-input').value;
    document.getElementById('header').textContent = document.getElementById('header-input').value;
    document.getElementById('title').textContent = document.getElementById('title-input').value;
    document.getElementById('subtitle').textContent = document.getElementById('subtitle-input').value;
    document.getElementById('total').textContent = document.getElementById('total-input').value;
    document.getElementById('trip-charge').textContent = document.getElementById('trip-charge-input').value;
    document.getElementById('subtotal').textContent = document.getElementById('subtotal-input').value;
    document.getElementById('payment-method').textContent = document.getElementById('payment-method-input').value;
    document.getElementById('payment-date').textContent = document.getElementById('payment-date-input').value;
    document.getElementById('gst').textContent = `The total of ${document.getElementById('total-input').value} has a GST of ${document.getElementById('gst-input').value} included.`;
    document.getElementById('payment-total').textContent = document.getElementById('total-input').value;
}

// Add event listeners to form inputs
document.querySelectorAll('.form input').forEach(input => {
    input.addEventListener('input', updateReceipt);
});

// Download PDF (export the inner .container as A4 with tight margins)
document.getElementById('download-pdf').addEventListener('click', async function() {
    const container = document.querySelector('.container');

    // Temporarily apply inline styles to force a centered, narrow container for capture
    const origInline = container.getAttribute('style') || '';
    container.classList.add('pdf-export');
    container.style.boxSizing = 'border-box';
    // use a comfortable max width when exporting
    container.style.maxWidth = '700px';
    container.style.width = '100%';
    // moderate top margin so the content has comfortable breathing room on the page
    container.style.margin = '0.18in auto';
    // moderate top padding for a comfortable look in PDF
    container.style.padding = '8px 28px 12px 28px';

    // small delay to ensure styles reflow
    await new Promise(r => setTimeout(r, 100));

    const opt = {
    // moderate top margin (in inches) for PDF output, keep comfortable sides
    margin: [0.18, 0.6, 0.5, 0.6], // top, left, bottom, right in inches
        filename: 'uber-receipt.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF from the container element
    await html2pdf().set(opt).from(container).save();

    // restore original inline styles and remove temporary class after export
    if (origInline) {
        container.setAttribute('style', origInline);
    } else {
        container.removeAttribute('style');
    }
    container.classList.remove('pdf-export');
});
