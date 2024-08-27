document.addEventListener('DOMContentLoaded', function () {
    const zoekBalk = document.getElementById('zoekBalk');
    const receptenLijst = document.getElementById('receptenLijst');

    // Function to fetch and display recipes
    function loadRecipes() {
        fetch('recepten.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(recipe => {
                    const recipeLink = document.createElement('a');
                    recipeLink.href = `recepten/${recipe.name.toLowerCase().replace(/ /g, '-')}.html`;
                    recipeLink.classList.add('recept-link');
                    recipeLink.textContent = recipe.name;
                    recipeLink.dataset.ingredients = recipe.ingredients.join(', ').toLowerCase();
                    receptenLijst.appendChild(recipeLink);
                });
            })
            .catch(error => console.error('Fout bij het laden van recepten:', error));
    }

    loadRecipes();

    // Zoekfunctionaliteit voor ingrediënten
    if (zoekBalk) {
        zoekBalk.addEventListener('input', function () {
            const zoekTerm = this.value.toLowerCase();
            const links = document.querySelectorAll('.recept-link');
            
            links.forEach(link => {
                const receptNaam = link.textContent.toLowerCase();
                const ingrediënten = link.dataset.ingredients;
                
                if (receptNaam.includes(zoekTerm) || ingrediënten.includes(zoekTerm)) {
                    link.style.display = '';
                } else {
                    link.style.display = 'none';
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
                    })
                    .catch(err => {
                        console.error('Kan wake lock niet activeren:', err);
                        voorkomSlapenBtn.textContent = 'Wake lock API wordt niet ondersteund';
                    });
            } else {
                voorkomSlapenBtn.textContent = 'Wake lock API wordt niet ondersteund';
            }
        });
    }
});
