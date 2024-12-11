from django.conf import settings
import requests

def get_barcode_data(barcode: str) -> dict:
    response = requests.get(
        f"https://api.barcodelookup.com/v3/products?barcode={barcode}&formatted=y&key={settings.BARCODE_SCANNER_KEY}"
    )
    response.raise_for_status()
    return response.json()
