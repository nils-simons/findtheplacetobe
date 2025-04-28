import xarray as xr
import numpy as np
import geopandas as gpd
import rasterio
from rasterio import features
from shapely.geometry import shape
from pathlib import Path

# --- CONFIGURATION ---
input_folder = 'dl_data'  # << Set this to your actual folder
possible_variables = ['sd', 'swir', 'dis06', 'rootZone']  # <-- List of known risk layers
threshold = 0.2  # Adjust based on what you're mapping

all_geometries = []

# --- PROCESS EACH FILE ---
for nc_file in Path(input_folder).glob('*.nc'):
    print(f"Processing {nc_file.name}")

    # Load dataset
    dataset = xr.open_dataset(nc_file)

    # Try to find a known variable
    found_var = None
    for var in possible_variables:
        if var in dataset.variables:
            found_var = var
            break

    if found_var is None:
        print(f"⚠️ No valid risk variable found in {nc_file.name}, skipping.")
        continue

    print(f"✅ Using variable '{found_var}'")

    # Extract variable
    data = dataset[found_var]

    # Pick first time step if time dimension exists
    if 'time' in data.dims or 'valid_time' in data.dims:
        data = data.isel(time=0) if 'time' in data.dims else data.isel(valid_time=0)

    # Create risk/flood mask
    mask = data > threshold

    # Prepare raster transform
    lon = dataset['longitude'].values
    lat = dataset['latitude'].values

    if lat[0] > lat[-1]:
        lat = lat[::-1]  # flip latitude if decreasing

    res_lon = (lon[-1] - lon[0]) / (len(lon) - 1)
    res_lat = (lat[-1] - lat[0]) / (len(lat) - 1)

    transform = rasterio.transform.from_origin(
        lon.min(), lat.max(), res_lon, res_lat
    )

    # Raster to vectorize
    shapes = features.shapes(mask.values.astype(np.uint8), transform=transform)

    for geom, value in shapes:
        if value == 1:
            all_geometries.append(shape(geom))

print(f"Total geometries collected: {len(all_geometries)}")

# --- CREATE FINAL GeoDataFrame ---
gdf = gpd.GeoDataFrame(geometry=all_geometries, crs="EPSG:4326")

# Save as single GeoJSON
gdf.to_file('combined_risk.geojson', driver='GeoJSON')

print("✅ Combined GeoJSON 'combined_risk.geojson' created.")
