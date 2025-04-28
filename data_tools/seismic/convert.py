import rasterio
import geopandas as gpd
from rasterio import features
from shapely.geometry import shape
import numpy as np

# Open the hazard GeoTIFF
raster = rasterio.open('v2023_1_pga_475_rock_3min.tif')

# Read the first band
data = raster.read(1)

# Apply threshold: e.g., Peak Ground Acceleration > 0.2g
threshold = 0.2
mask = data > threshold

# Convert raster mask to polygons
geoms = []
for geom, val in features.shapes(mask.astype(np.uint8), transform=raster.transform):
    if val == 1:
        geoms.append(shape(geom))

# Create GeoDataFrame
gdf = gpd.GeoDataFrame(geometry=geoms, crs=raster.crs)

# Save as GeoJSON
gdf.to_file('earthquake_risk.geojson', driver='GeoJSON')

print("✅ Earthquake risk GeoJSON created.")
