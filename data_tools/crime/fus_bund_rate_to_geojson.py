import json

# Load country polygons
with open('countries.geojson', 'r', encoding='utf-8') as f:
    countries_geojson = json.load(f)

# Load your crime data
with open('crime2024.json', 'r', encoding='utf-8') as f:
    crime_data = json.load(f)

# Convert crime data to dictionary for fast lookup
crime_dict = {entry["country"]: entry for entry in crime_data}

# Create new features with minimal properties
new_features = []
matched = 0

for feature in countries_geojson["features"]:
    country_name = feature["properties"].get("ADMIN") or feature["properties"].get("name")
    if country_name in crime_dict:
        crime_info = crime_dict[country_name]
        new_feature = {
            "type": "Feature",
            "geometry": feature["geometry"],
            "properties": {k: v for k, v in crime_info.items() if k != "country"}
        }
        new_feature["properties"]["country"] = country_name
        new_features.append(new_feature)
        matched += 1

print(f"Matched {matched} countries with crime data.")

# Build final GeoJSON
output_geojson = {
    "type": "FeatureCollection",
    "features": new_features
}

# Write to file
with open('crime_polygons_slim.geojson', 'w', encoding='utf-8') as f:
    json.dump(output_geojson, f, ensure_ascii=False, indent=2)

print("Slimmed GeoJSON with polygons and crime data created.")
