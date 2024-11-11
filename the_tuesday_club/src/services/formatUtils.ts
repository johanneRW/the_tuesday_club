// formatUtils.ts
export const formatAliases: { [key: string]: string } = {
    "lp": "LP",
    "LP": "LP",
    "12\"": "12in",
    "12in": "12in",
    "vinyl with cd": "LP with CD",
    "7\"": "7in",
    "7in": "7in",
    "v7": "7in",
    "mc": "Music Cassette",
  };
  
  
  export const getDisplayFormat = (format: string): string => {
    const normalizedFormat = format.toLowerCase();
    return formatAliases[normalizedFormat] || format; // Brug originalen, hvis ingen match
  };
  