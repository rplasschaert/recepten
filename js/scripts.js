// Example recipe data
const recipes = {
    "spaghetti-bolognese": {
        title: "Spaghetti Bolognese",
        ingredients: [
            "200g spaghetti",
            "100g minced beef",
            "1 onion, chopped",
            "2 garlic cloves, minced",
            "400g canned tomatoes",
            "Salt and pepper to taste"
        ],
        instructions: "Cook the spaghetti according to the package instructions. In a pan, cook the minced beef until browned. Add the chopped onion and garlic, and cook until soft. Pour in the canned tomatoes and simmer for 15 minutes. Season with salt and pepper. Serve the sauce over the spaghetti."
    }
};

document.querySelectorAll('.view-recipe').forEach(button => {
    button.addEventListener('click', function() {
        const recipeKey = this.dataset.recipe;
        const recipe = recipes[recipeKey];

        document.getElementById('recipe-title').innerText = recipe.title;
        const ingredientList = document.getElementById('ingredient-list');
        ingredientList.innerHTML = '';

        recipe.ingredients.forEach(ingredient => {
            const listItem = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'ingredient';
            listItem.appendChild(checkbox);
            listItem.appendChild(document.createTextNode(' ' + ingredient));
            ingredientList.appendChild(listItem);
        });

        document.getElementById('recipe-instructions').innerText = recipe.instructions;

        document.getElementById('recipes').classList.add('hidden');
        document.getElementById('recipe-details').classList.remove('hidden');
    });
});

document.getElementById('back-button').addEventListener('click', function() {
    document.getElementById('recipes').classList.remove('hidden');
    document.getElementById('recipe-details').classList.add('hidden');
});

// Screen Wake Lock API Implementation
let wakeLock = null;

const wakeLockButton = document.getElementById('wake-lock-button');
const wakeLockStatus = document.getElementById('wake-lock-status');

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLockStatus.textContent = 'Screen Wake Lock is active.';
        wakeLock.addEventListener('release', () => {
            wakeLockStatus.textContent = 'Screen Wake Lock has been released.';
        });
    } catch (err) {
        wakeLockStatus.textContent = `Failed to acquire wake lock: ${err.message}`;
    }
}

wakeLockButton.addEventListener('click', async () => {
    if (wakeLock !== null) {
        wakeLock.release().then(() => {
            wakeLock = null;
            wakeLockStatus.textContent = 'Screen Wake Lock has been released.';
            wakeLockButton.textContent = 'Prevent Screen from Sleeping';
        });
    } else {
        await requestWakeLock();
        wakeLockButton.textContent = 'Release Screen Wake Lock';
    }
});
