from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from PIL import Image
import os
import io

app = Flask(__name__)
CORS(app)
ASSETS_DIR = os.path.join(os.path.dirname(__file__), 'assets')

def generate_event_hall_image(ceiling_img, chairs_img, stage_img):
    canvas_width = 1200
    canvas_height = 900
    base = Image.new("RGBA", (canvas_width, canvas_height), (255,255,255,255))

    # 1. Ceiling at top
    ceiling_h = 180
    ceiling_resized = ceiling_img.resize((canvas_width, ceiling_h))
    base.paste(ceiling_resized, (0, 0), ceiling_resized)

    # 2. Stage centered in upper middle
    stage_w, stage_h = 900, 220
    stage_x = (canvas_width - stage_w) // 2
    stage_y = 180
    stage_resized = stage_img.resize((stage_w, stage_h))
    base.paste(stage_resized, (stage_x, stage_y), stage_resized)

    # 3. Two blocks of chairs with a central aisle below the stage
    chair_w, chair_h = 98, 115
    block_cols, block_rows = 5, 6
    aisle_w = 140
    block_spacing_x, block_spacing_y = 26, 20
    chairs_top = stage_y + stage_h + 18
    left_block_start = 200
    right_block_start = left_block_start + block_cols * (chair_w + block_spacing_x) + aisle_w

    chair_resized = chairs_img.resize((chair_w, chair_h))

    # Left block of chairs
    for row in range(block_rows):
        for col in range(block_cols):
            x = left_block_start + col * (chair_w + block_spacing_x)
            y = chairs_top + row * (chair_h + block_spacing_y)
            base.paste(chair_resized, (x, y), chair_resized)

    # Right block of chairs
    for row in range(block_rows):
        for col in range(block_cols):
            x = right_block_start + col * (chair_w + block_spacing_x)
            y = chairs_top + row * (chair_h + block_spacing_y)
            base.paste(chair_resized, (x, y), chair_resized)

    return base

@app.route('/compose', methods=['POST'])
def compose_images():
    data = request.get_json()
    if not data or 'layers' not in data or len(data['layers']) < 3:
        return jsonify({'error': 'Provide at least 3 images: stage, ceiling, chairs'}), 400

    filenames = data['layers']
    images = []

    # Load only the first three images (stage, ceiling, chairs)
    for fname in filenames[:3]:
        path = os.path.join(ASSETS_DIR, fname)
        if not os.path.isfile(path):
            return jsonify({'error': f'Asset not found: {fname}'}), 404
        try:
            img = Image.open(path).convert("RGBA")
            images.append(img)
        except Exception as e:
            return jsonify({'error': f'Error loading {fname}: {str(e)}'}), 500

    ceiling_img, chairs_img, stage_img = images[0], images[1], images[2]
    # The order you send from frontend should be: ceiling, chairs, stage or adjust accordingly

    # Generate the merged image
    merged_image = generate_event_hall_image(ceiling_img, chairs_img, stage_img)

    img_io = io.BytesIO()
    merged_image.save(img_io, 'PNG')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/png')


if __name__ == '__main__':
    app.run(debug=True, port=5001)
