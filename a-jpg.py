from PIL import Image
from pathlib import Path

# Carpeta de entrada y salida
input_folder = Path("themes/coltic/static/images")
output_folder = Path("jpg")
output_folder.mkdir(exist_ok=True)

# Buscar todas las imágenes .webp (sin incluir subdirectorios; usa rglob si los quieres incluir)
for webp_file in input_folder.glob("*.webp"):
    try:
        with Image.open(webp_file) as img:
            # Convertir a RGB si es necesario (evita errores al guardar como JPEG)
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            
            # Guardar con el mismo nombre pero extensión .jpg en carpeta 'jpg'
            output_path = output_folder / (webp_file.stem + ".jpg")
            img.save(output_path, "JPEG", quality=95)
            print(f"Convertido: {webp_file.name} -> {output_path.name}")
    except Exception as e:
        print(f"Error al convertir {webp_file}: {e}")
