const apiKey = "sk-gWfxTDvMKL4q6RQw6KxZMs2NOklmEOeyW3vY9LLQbzugjfqo"; // Replace with your actual API key
const baseUrl = "https://platform.stability.ai/v1/generation/text-to-image/";

export const generateImageFromText = async (prompt) => {
    const engineId = "stable-diffusion-v1-5";
    const url = baseUrl + encodeURIComponent(engineId);
  
    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      };

    const requestBody = JSON.stringify({
      height: 512,
      width: 512,
      text_prompts: [
        {
          text: prompt,
          weight: 1.0,
        },
      ],
      cfg_scale: 7,
      samples: 1,
    });

    console.log("API Key:", apiKey);
    console.log("API endpoint:", url);
    console.log("Request headers:", headers);
    console.log("Request body:", requestBody);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: requestBody,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        `Error ${errorResponse.name} (${response.status}): ${errorResponse.message} (ID: ${errorResponse.id})`
      );
    }

    if (response.headers.get("Content-Type") !== "image/png") {
      throw new Error("Received non-image response from Stability.AI API");
    }

    return await response.blob();
  } catch (error) {
    console.error("Error while generating image:", error);
    return null;
  }
};