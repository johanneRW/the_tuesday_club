from .column_aliases import COLUMN_ALIASES
from datetime import date

def get_column_value(row, key):
    """
    Finder værdien i `row` baseret på en liste af mulige navne fra COLUMN_ALIASES.
    Matcher uafhængigt af store/små bogstaver og ekstra mellemrum.
    """
    possible_names = COLUMN_ALIASES.get(key, [])
    for name in possible_names:
        for column in row:
            # Matcher uden hensyn til store/små bogstaver og mellemrum
            if column.strip().lower() == name.strip().lower():
                return row[column]
    return None



def parse_date(value):
    """
    Parser en dato fra strengen `value` og returnerer en `date`-objekt.
    Accepterer både formaterne 'DD/MM/YYYY' og 'MM/DD/YYYY'.
    
    Parameters:
    - value (str): Dato som streng i enten "DD/MM/YYYY" eller "MM/DD/YYYY" format.
    
    Returns:
    - date: Dato objekt.
    """
    day, month, year = map(int, value.split("/"))

    # Hvis day > 12, antager vi at formatet er DD/MM/YYYY
    if day > 12:
        day, month = day, month
    else:
        # Hvis month > 12, antager vi at formatet er MM/DD/YYYY
        day, month = month, day
    
    return date(year=year, month=month, day=day)