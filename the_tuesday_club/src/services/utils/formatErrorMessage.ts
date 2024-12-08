export const formatErrorMessage = (error: any): string => {
    if (!error) {
      return "An unknown error occurred.";
    }
  
    // Hvis fejlen er et array
    if (Array.isArray(error)) {
      return error.map((e) => (typeof e === "string" ? e : e.message || JSON.stringify(e))).join(" | ");
    }
  
    // Hvis fejlen er en streng
    if (typeof error === "string") {
      return error;
    }
  
    // Hvis fejlen er et objekt med en `detail`-nøgle
    if (error.detail && typeof error.detail === "string") {
      return error.detail;
    }
  
    // Hvis fejlen er et objekt (fallback til JSON-stringify)
    return JSON.stringify(error);
  };
  