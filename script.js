function updateReceipt() {
    const name = document.getElementById('name-input').value;
    const tripCharge = document.getElementById('trip-charge-input').value;
    const driverName = document.getElementById('driver-name-input').value;
    const licensePlate = document.getElementById('license-plate-input').value;
    const serviceType = document.getElementById('service-type-input').value;
    const distance = document.getElementById('distance-input').value;
    const duration = document.getElementById('duration-input').value;
    const pickupTime = document.getElementById('pickup-time-input').value;
    const pickupAddress = document.getElementById('pickup-address-input').value;
    const dropTime = document.getElementById('drop-time-input').value;
    const dropAddress = document.getElementById('drop-address-input').value;
    const paymentTime = document.getElementById('payment-time-input').value;
    
    let timeOfDay = 'morning';
    const checkboxes = document.querySelectorAll('input[name="timeofday"]');
    checkboxes.forEach(cb => {
        if (cb.checked) {
            timeOfDay = cb.value;
        }
    });
    
    document.getElementById('date').textContent = document.getElementById('date-input').value;
    document.getElementById('title').textContent = `Here's your receipt for your ride, ${name}`;
    document.getElementById('subtitle').textContent = `We hope you enjoyed your ride this ${timeOfDay}.`;
    
    document.getElementById('driver-name').textContent = driverName;
    document.getElementById('license-plate').textContent = licensePlate;
    document.getElementById('service-type').textContent = serviceType;
    
    document.getElementById('distance').textContent = distance;
    document.getElementById('duration').textContent = duration;
    document.getElementById('duration-2').textContent = duration;
    
    document.getElementById('pickup-time').textContent = pickupTime;
    document.getElementById('pickup-address').textContent = pickupAddress;
    document.getElementById('drop-time').textContent = dropTime;
    document.getElementById('drop-address').textContent = dropAddress;
    
    document.getElementById('total').textContent = tripCharge;
    document.getElementById('trip-charge').textContent = tripCharge;
    document.getElementById('subtotal').textContent = tripCharge;
    document.getElementById('payment-total').textContent = tripCharge;
    
    document.getElementById('payment-method').textContent = document.getElementById('payment-method-input').value;
    document.getElementById('payment-date').textContent = paymentTime;
    document.getElementById('gst').textContent = `The total of ${tripCharge} has a GST of ${document.getElementById('gst-input').value} included.`;
}

document.querySelectorAll('.form input[type="text"]').forEach(input => {
    input.addEventListener('input', updateReceipt);
});

document.querySelectorAll('input[name="timeofday"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            document.querySelectorAll('input[name="timeofday"]').forEach(cb => {
                if (cb !== this) cb.checked = false;
            });
        }
        updateReceipt();
    });
});

updateReceipt();

document.getElementById('download-pdf').addEventListener('click', async function() {
    const container = document.querySelector('.container');
    const origInline = container.getAttribute('style') || '';
    
    container.classList.add('pdf-export');
    container.style.boxSizing = 'border-box';
    container.style.maxWidth = '700px';
    container.style.width = '100%';
    container.style.margin = '0.18in auto';
    container.style.padding = '8px 28px 12px 28px';

    await new Promise(r => setTimeout(r, 100));

    const opt = {
        margin: [0.18, 0.6, 0.5, 0.6],
        filename: 'uber-receipt.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    await html2pdf().set(opt).from(container).save();

    if (origInline) {
        container.setAttribute('style', origInline);
    } else {
        container.removeAttribute('style');
    }
    container.classList.remove('pdf-export');
});
