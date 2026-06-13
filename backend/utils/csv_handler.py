import pandas as pd
import os

def read_csv(path:str)->pd.DataFrame:
    if not os.path.exists(path):
        return pd.DataFrame()
    return pd.read_csv(path)


def write_csv(df: pd.DataFrame, path:str)->None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    df.to_csv(path, index=False)