const baseUrl = "https://us-central1-thinksync-5c4bb.cloudfunctions.net/api"; // Replace this with your Firebase functions URL

export const apiKey = {
  async store(userId, apiKey) {
    try {
      const response = await fetch(`${baseUrl}/storeApiKey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, apiKey }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      console.log("API Key stored successfully:", { userId, apiKey }); // Add this log
    } catch (error) {
      console.error("Error storing API Key:", error);
      throw error;
    }
  },
  async get(userId) {
    try {
      const response = await fetch(`${baseUrl}/getApiKey`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params: { userId },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const apiKey = await response.json();
      console.log("API Key retrieved successfully:", { userId, apiKey }); // Add this log
      return apiKey;
    } catch (error) {
      console.error("Error retrieving API Key:", error);
      throw error;
    }
  },
};