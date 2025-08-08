# Scene Stitcher Backend

Flask backend for image composition and stitching functionality.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Place your PNG images in the `assets/` directory.

3. Run the Flask server:
```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /compose

Composes multiple PNG images into a single stitched image.

**Request Body:**
```json
{
  "layers": ["ceiling.png", "chairs.png", "stage.png"]
}
```

**Response:**
- Returns the composed PNG image
- Content-Type: `image/png`

**Error Responses:**
- `400`: Invalid request body
- `404`: Image file not found
- `500`: Image loading error

## Usage Example

```bash
curl -X POST http://localhost:5000/compose \
  -H "Content-Type: application/json" \
  -d '{"layers": ["ceiling.png", "chairs.png", "stage.png"]}' \
  --output result.png
``` 