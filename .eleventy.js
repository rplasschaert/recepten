// .eleventy.js
module.exports = function(eleventyConfig) {

  // Input directory: waar je bronbestanden staan (markdown, templates)
  // Output directory: waar Eleventy de gebouwde site plaatst
  // Includes directory: waar je layouts staan
  // Data directory: waar globale data bestanden staan (optioneel)
  // Content directory: waar je markdown etc staat (relatief aan input)
  const inputDir = ".";       // Gebruik de root als input
  const outputDir = "_site";  // Map voor de gegenereerde site
  const includesDir = "_includes";
  const dataDir = "_data";
  const contentDir = "content";

  // Kopieer statische assets (CSS, JS, Images) naar de output map
  eleventyConfig.addPassthroughCopy("assets/cs");
  // Je kunt specifieker zijn:
  // eleventyConfig.addPassthroughCopy("assets/css");
  // eleventyConfig.addPassthroughCopy("assets/js");
  // eleventyConfig.addPassthroughCopy("assets/images");

  // Vertel Eleventy waar content, data en includes te vinden zijn
  // binnen de input directory.
  // In .eleventy.js
    eleventyConfig.addFilter("FilterOutCurrentPage", (collection, currentPage) => {
    if (!currentPage || !currentPage.inputPath) { return collection; }
    return collection.filter(item => item.inputPath !== currentPage.inputPath);
    });
  return {
    dir: {
      input: inputDir,
      output: outputDir,
      includes: `${inputDir}/${includesDir}`, // Pad relatief aan inputDir
      data: `${inputDir}/${dataDir}`,         // Pad relatief aan inputDir
      // Layouts zijn relatief aan de includes map
    },
    // Gebruik Nunjucks voor HTML en Markdown bestanden
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",

    // PassthroughFileCopy: Zorgt dat niet-template bestanden ook worden gekopieerd
    passthroughFileCopy: true
    
  };
};
