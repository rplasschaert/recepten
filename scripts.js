// Fetch recipe data from the JSON file
fetch('recipes.json')
    .then(response => response.json())
    .then(recipes => {
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
    });
