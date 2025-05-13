// assets/js/script.js
document.addEventListener('DOMContentLoaded', function () {
    const zoekBalk = document.getElementById('zoekBalk');
    // De receptenLijst div wordt nu gevuld door Eleventy.
    // We hebben het element hier niet direct nodig, tenzij je er specifiek iets mee wilt doen
    // buiten de zoekfunctionaliteit die de .recept-link elementen direct target.
    // const receptenLijst = document.getElementById('receptenLijst');

    // De functie loadRecipes() is niet meer nodig, omdat Eleventy de receptenlijsten genereert.

    // Functie om strings te saneren (goed voor veiligheid tegen XSS)
    function sanitizeString(str) {
        if (typeof str !== 'string') {
            return ''; // Geef een lege string terug als de input geen string is
        }
        const textarea = document.createElement('textarea');
        textarea.textContent = str;
        return textarea.innerHTML;
    }

    // Zoekfunctionaliteit
    if (zoekBalk) {
        zoekBalk.addEventListener('input', function () {
            const zoekTerm = sanitizeString(this.value.toLowerCase().trim());
            
            // We selecteren nu de list items die de recept-link class hebben.
            // Deze elementen moeten de data-ingredients attribuut hebben.
            const receptItems = document.querySelectorAll('.recept-link'); 
            
            receptItems.forEach(item => {
                // Probeer de receptnaam te vinden. Dit kan de h3 binnen de link zijn.
                const naamElement = item.querySelector('h3');
                const receptNaam = naamElement ? naamElement.textContent.toLowerCase() : '';
                
                const ingredienten = item.dataset.ingredients ? item.dataset.ingredients.toLowerCase() : '';
                
                // Toon het item als de zoekterm overeenkomt met de naam OF de ingrediënten
                if (receptNaam.includes(zoekTerm) || ingredienten.includes(zoekTerm)) {
                    item.style.display = ''; // Of 'list-item', 'flex', etc. afhankelijk van je CSS
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Voorkom dat het scherm in slaapstand gaat en verander de knoptekst
    const voorkomSlapenBtn = document.getElementById('voorkomSlapenBtn');
    if (voorkomSlapenBtn) {
        voorkomSlapenBtn.addEventListener('click', function () {
            if (navigator.wakeLock) {
                navigator.wakeLock.request('screen')
                    .then(() => {
                        voorkomSlapenBtn.textContent = 'Scherm blijft wakker';
                        voorkomSlapenBtn.disabled = true; // Optioneel: knop uitschakelen na succes
                    })
                    .catch(err => {
                        console.error('Wake Lock API kon niet geactiveerd worden:', err);
                        voorkomSlapenBtn.textContent = 'Wake Lock niet ondersteund';
                        voorkomSlapenBtn.title = err.message; // Geef meer info in de title
                    });
            } else {
                voorkomSlapenBtn.textContent = 'Wake Lock API niet ondersteund';
                console.warn('Wake Lock API is niet beschikbaar in deze browser.');
            }
        });
    }
});
