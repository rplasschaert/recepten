// .eleventy.js
module.exports = function(eleventyConfig) {
  
  // Input directory: waar je bronbestanden staan (markdown, templates)
  // Output directory: waar Eleventy de gebouwde site plaatst
  // Includes directory: waar je layouts staan
  // Data directory: waar globale data bestanden staan (optioneel)
  const inputDir = ".";       // Gebruik de root als input
  const outputDir = "_site";  // Map voor de gegenereerde site
  const includesDir = "_includes";
  const dataDir = "_data";
  const fs = require('fs');
  // const contentDir = "content"; // Deze contentDir is niet standaard hier

  // Kopieer statische assets (CSS, JS, Images) naar de output map
  eleventyConfig.addPassthroughCopy("assets/css"); // CORRECTED from "assets/cs"
  eleventyConfig.addPassthroughCopy("assets/js");
  eleventyConfig.addPassthroughCopy("assets/images"); // Als je images hebt

  // Filter om de huidige pagina niet in een lijst van pagina's te tonen (indien gebruikt)
  eleventyConfig.addFilter("FilterOutCurrentPage", (collection, currentPage) => {
    if (!currentPage || !currentPage.inputPath) { return collection; }
    return collection.filter(item => item.inputPath !== currentPage.inputPath);
  });
  return {
      dir: {
        input: ".",
        output: "_site",
        includes: "_includes", // Directe string waarde
        data: "_data",         // Directe string waarde
      },
      htmlTemplateEngine: "njk",
      markdownTemplateEngine: "njk",
      passthroughFileCopy: true
    };
};