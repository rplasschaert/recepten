// Example recipe data
const recipes = {
    "spaghetti-bolognese": {
        title: "Spaghetti Bolognese",
        image: "", // No image available for this recipe
        ingredients: [
            "200g spaghetti",
            "100g minced beef",
            "1 onion, chopped",
            "2 garlic cloves, minced",
            "400g canned tomatoes",
            "Salt and pepper to taste"
        ],
        instructions: "Cook the spaghetti according to the package instructions. In a pan, cook the minced beef until browned. Add the chopped onion and garlic, and cook until soft. Pour in the canned tomatoes and simmer for 15 minutes. Season with salt and pepper. Serve the sauce over the spaghetti."
    },
    "kung-pao-chicken": {
        title: "Kung Pao Chicken",
        image: "https://www.onceuponachef.com/images/2018/05/Kung-Pao-Chicken-16-760x938.jpg", // Image URL
        ingredients: [
			"For the Marinade",
			"    1½ tablespoons soy sauce",
			"    1 tablespoon dry sherry",
			"    2 teaspoons corn starch",
			"    680 g chicken tenderloins, cut into 1-in pieces",
			"For the Sauce",
			"    1 tablespoon balsamic vinegar",
			"    2 tablespoons soy sauce",
			"    1 tablespoon hoisin sauce, best quality such as Kikkoman or Lee Kum Kee",
			"    1 tablespoon Asian/toasted sesame oil",
			"    1½ tablespoons sugar",
			"    1 tablespoon corn starch",
			"    ½ teaspoon crushed red pepper flakes (use half the amount for a milder sauce)",
			"    ¼ teaspoon ground ginger",
			"    80 ml water",
			"For the Stir-fry",
			"    2½ tablespoons vegetable oil",
			"    1 large red bell pepper, diced",
			"    2 stalks celery, halved lengthwise and thinly sliced",
			"    ¼ teaspoon salt",
			"    3 cloves garlic, chopped",
			"    5 scallions, white and green parts, thinly sliced",
			"    50 g whole roasted unsalted peanuts or cashews"
        ],
        instructions: `
			1    Marinate the chicken: In a medium bowl, whisk together the soy sauce, dry sherry, and cornstarch until the cornstarch is dissolved. Add the chicken and toss to coat. Let stand at room temperature for 15 minutes, stirring occasionally.
			2    Prepare the sauce: In another medium bowl, whisk together all of the sauce ingredients until the cornstarch is dissolved (it can stick to the bottom of the bowl so be sure to scrape it up).
			3    Heat a large nonstick skillet over high heat until very hot. Add 1 tablespoon of the oil and swirl to coat. Add the bell pepper, celery, and salt and cook, stirring frequently, until slightly softened and starting to brown, about 5 minutes. Transfer the vegetables to a large bowl and set aside.
			4    Add an additional ½ tablespoon of oil to the pan and set over high heat. Add half of the chicken (it's important not to crowd the pan) and brown on one side, about 1½ minutes. Turn the chicken pieces and continue cooking for about 1½ minutes more, or until the chicken is just cooked through. Transfer the chicken to the bowl with the peppers and celery. Add another ½ tablespoon of oil to the pan. Add the remaining chicken and cook until golden on one side, about 1½ minutes. Turn the chicken pieces over and cook for 1 minute. Add ½ tablespoon more oil to the pan, along with the garlic and scallions, and cook, stirring with the chicken, for about 30 seconds more.
			5    Add the reserved vegetables and reserved chicken to the pan, along with the sauce. Reduce the heat to low and cook until the chicken and vegetables are warmed through and the sauce is thickened, about 30 seconds. Stir in the nuts. Taste and adjust seasoning, if necessary, and serve. (Note: the sauce will thicken as it sits; thin it with a few tablespoons of water, if necessary.)
        `
    }
};

// Event listeners for "View Recipe" buttons
document.querySelectorAll('.view-recipe').forEach(button => {
    button.addEventListener('click', function() {
        const recipeKey = this.dataset.recipe;
        const recipe = recipes[recipeKey];

        document.getElementById('recipe-title').innerText = recipe.title;
        
        // Set the recipe image
        const recipeImage = document.getElementById('recipe-image');
        if (recipe.image) {
            recipeImage.src = recipe.image;
            recipeImage.classList.remove('hidden');
        } else {
            recipeImage.classList.add('hidden');
        }

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

// Event listener for "Back to Recipes" button
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
