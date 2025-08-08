const API_BASE_URL = 'http://localhost:5001';

export interface ComposeRequest {
  layers: string[];
  arrangement?: 'theater' | 'lounge' | 'banquet';
}

export interface ApiError {
  error: string;
}

export const api = {
  async composeImages(layers: string[], arrangement: 'theater' | 'lounge' | 'banquet' = 'theater'): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/compose`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ layers, arrangement }),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.blob();
  },
}; 