---
title: "Receptenverzameling" # Titel voor de <title> tag en eventueel elders
layout: "base.njk"         # Vertelt Eleventy om _includes/base.njk als basis te gebruiken
permalink: /index.html       # Zorgt ervoor dat dit de root index.html wordt
eleventyNavigation:          # Optioneel: voor navigatie-plugins
  key: Home
  order: 1
---

{# Deze header is specifiek voor de homepage #}
{# Als je de algemene header uit base.njk wilt gebruiken, kun je dit <header> blok weglaten #}
<header>
    <h1>{{ title }}</h1> {# Gebruikt de titel uit de front matter #}
</header>

{# Dit is de hoofdinhoud specifiek voor de index pagina #}
<main id="receptenLijst">
    {# Links naar de lijstpagina's voor koken en bakken. #}
    {# De href paden gaan ervan uit dat de lijstpagina's voor koken en bakken #}
    {# respectievelijk in /content/koken/ en /content/bakken/ komen te staan. #}
    {# Je kunt deze URL's aanpassen met permalinks in die bestanden indien gewenst. #}
    <a class="recept-link" href="/content/koken/">Koken</a>
    <a class="recept-link" href="/content/bakken/">Bakken</a>
</main>

{# De rest van de HTML (zoals <html>, <head>, <body>, footer, script links) #}
{# wordt afgehandeld door de _includes/base.njk layout. #}
{# en de benodigde scripts worden nu via base.njk geladen. #}