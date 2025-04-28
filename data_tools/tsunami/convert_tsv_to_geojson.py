import pandas as pd
import geopandas as gpd
from shapely.geometry import Point

# --- CONFIG ---
tsv_file = 'tsunamis-2025.tsv'  # <-- your UNESCO tsv file path
output_geojson = 'tsunami_risk.geojson'

# --- STEP 1: Read the TSV file ---
df = pd.read_csv(tsv_file, delimiter='\t')

# Check the columns
print("📄 Columns found:", df.columns.tolist())

# --- STEP 2: Remove rows with missing latitude or longitude
df = df.dropna(subset=['Latitude', 'Longitude'])

# --- STEP 3: Create geometries ---
gdf = gpd.GeoDataFrame(
    df,
    geometry=gpd.points_from_xy(df['Longitude'], df['Latitude']),
    crs="EPSG:4326"  # WGS84
)

# --- STEP 4: Export only geometry (no properties) ---
gdf[['geometry']].to_file(output_geojson, driver='GeoJSON')

print(f"✅ GeoJSON saved (without properties, no missing coordinates): {output_geojson}")
