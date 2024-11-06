from .column_aliases import COLUMN_ALIASES

def get_column_value(row, key):
    """
    Finder kolonnenavn i `row` baseret på en liste af aliaser i COLUMN_ALIASES.
    Returnerer værdien for den første matchende kolonne.
    """
    # Hent listen af mulige navne fra alias-dictionary
    possible_names = COLUMN_ALIASES.get(key, [])
    for name in possible_names:
        # Søger i kolonnerne med case-insensitive nøgler
        if name.lower() in row:
            return row[name.lower()]
    return None


from datetime import date

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