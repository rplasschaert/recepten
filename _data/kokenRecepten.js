// _data/kokenRecepten.js
console.log("Attempting to load kokenRecepten.js data file...");
try {
    const data = [
        {
            "name": "Test Kook Recept (uit JS)",
            "externalLink": "http://example.com",
            "ingredients": ["test ingredient"]
        }
    ];
    console.log("kokenRecepten.js loaded successfully, data:", data);
    return data;
} catch (e) {
    console.error("Error in kokenRecepten.js:", e);
    return []; // Return empty array on error
}