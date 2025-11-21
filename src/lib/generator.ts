export default async function generateBlueprint(description, formats) {
  return {
    description,
    formats,
    timestamp: new Date().toISOString(),
    nextSteps: "Full multi-format generator will attach here.",
  };
}
