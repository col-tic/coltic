import os
from PIL import Image

# Ruta base
input_folder = "themes/coltic/static/images"

# Extensiones válidas de imagen
valid_extensions = (".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".gif")

# Recorrido recursivo
for root, dirs, files in os.walk(input_folder):
    for file in files:
        if file.lower().endswith(valid_extensions):
            input_path = os.path.join(root, file)
            filename_wo_ext = os.path.splitext(file)[0]
            output_path = os.path.join(root, f"{filename_wo_ext}.webp")

            try:
                # Abrir y convertir a RGB
                with Image.open(input_path) as img:
                    img.convert("RGB").save(output_path, "WEBP", quality=85)
                    print(f"[✔] Convertido a WebP: {output_path}")

                # Eliminar el archivo original
                os.remove(input_path)
                print(f"[✘] Eliminado original: {input_path}")

            except Exception as e:
                print(f"[ERROR] No se pudo procesar {input_path}: {e}")
