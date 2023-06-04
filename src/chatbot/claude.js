const apiKey = "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"; // Replace with your actual API key
const baseUrl = "/v1/complete";

export const chatWithClaude = async (userQuestion) => {
  const prompt = `\n\nHuman: ${userQuestion}\n\nAssistant:`;

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        prompt,
        model: "claude-v1-100k",
        max_tokens_to_sample: 10000, // You can adjust this value based on your needs
        temperature: 0.8, // Adjust the randomness (0-1)
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse.completion;
  } catch (error) {
    console.error("Error while communicating with Claude:", error);
    return "Sorry, there was an error with the chatbot. Please try again later.";
  }
};