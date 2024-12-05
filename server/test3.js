// Test function to demonstrate the behavior of the code
const testCollectionName = (effectiveGlassName) => {
  // Log the original value
  console.log("Original glass name:", effectiveGlassName);

  // Apply the transformation
  const collectionName = (effectiveGlassName || "")
    .toLowerCase() // Converts all letters to lowercase
    .replace(/\s+/g, "") // Removes spaces (replaces all spaces with nothing)
    .replace(/[^a-z0-9]/gi, ""); // Removes non-alphanumeric characters (anything other than a-z, A-Z, 0-9)

  // Log the transformed value
  console.log("Transformed collection name:", collectionName);
};

// Test cases
const testCases = [
  " Glass Name With Spaces ", // Test with spaces
  "GlassName-With-Special@Chars", // Test with special characters
  "GLASS NAME 123", // Test with mixed case and numbers
  "123 Glass", // Test with numbers
  "", // Test with empty string
  null, // Test with null value
];

testCases.forEach((testCase) => testCollectionName(testCase));
