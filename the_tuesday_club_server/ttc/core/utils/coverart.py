from django.conf import settings
import requests

#udkommenteret fordi react-implentering spamede barcodeLookup, så ip er band, og betalt plan er for ret dyr"
"""def get_barcode_data(barcode: str) -> dict:
    response = requests.get(
        f"https://api.barcodelookup.com/v3/products?barcode={barcode}&formatted=y&key={settings.BARCODE_SCANNER_KEY}"
    )
    response.raise_for_status()
    return response.json()
    """

def get_musicbrainz_data(artist: str, album: str) -> dict:
    response = requests.get(
        f"https://musicbrainz.org/ws/2/release/?query=artist:%22{artist}%22%20AND%20release:%22{album}%22%20&fmt=json"
    )
    response.raise_for_status()
    return response.json()