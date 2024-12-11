import apiClientWhitCredentials from "./api/apiClientWhitCredentials";


export const fetchCoverImage = async (albumId: string) => {
  try {
    const response = await apiClientWhitCredentials.get("/api/imports/find-image", {
      params: { album_id: albumId },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching cover image:", error);
    throw error; 
  }
};
