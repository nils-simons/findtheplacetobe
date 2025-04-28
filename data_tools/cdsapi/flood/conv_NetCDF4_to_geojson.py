import xarray as xr
import numpy as np
import geopandas as gpd
from shapely.geometry import shape
import rasterio
from rasterio import features

# Load the NetCDF file
dataset = xr.open_dataset('data_version-5.nc')

# Look inside
print(dataset)

# Pick 'dis06' as discharge data
discharge = dataset['dis06']

# If it has time dimension, pick the first time step
if 'time' in discharge.dims or 'valid_time' in discharge.dims:
    discharge = discharge.isel(time=0) if 'time' in discharge.dims else discharge.isel(valid_time=0)

# Define threshold
threshold = 1000  # Example threshold (m3/s); adjust based on the data range!

# Create flood mask
flood_mask = discharge > threshold

# Prepare raster transform
# Prepare raster transform
lon = dataset['longitude'].values
lat = dataset['latitude'].values

# If needed, sort lat/lon to make sure they are increasing
if lat[0] > lat[-1]:
    lat = lat[::-1]  # flip

# Calculate resolution
res_lon = (lon[-1] - lon[0]) / (len(lon) - 1)
res_lat = (lat[-1] - lat[0]) / (len(lat) - 1)

transform = rasterio.transform.from_origin(
    lon.min(), lat.max(), res_lon, res_lat
)


# Raster to vectorize
shapes = features.shapes(flood_mask.values.astype(np.uint8), transform=transform)

# Collect geometries where flood_mask == 1
geoms = []
for geom, value in shapes:
    if value == 1:
        geoms.append(shape(geom))

# Build GeoDataFrame
gdf = gpd.GeoDataFrame(geometry=geoms, crs="EPSG:4326")

# Save to GeoJSON
gdf.to_file("flood_risk.geojson", driver="GeoJSON")

print("✅ GeoJSON file 'flood_risk.geojson' created successfully.")
