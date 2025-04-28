import cdsapi

dataset = "efas-historical"
request = {
    "system_version": ["version_5_0"],
    "variable": [
        "river_discharge_in_the_last_6_hours",
        "runoff_water_equivalent",
        "snow_depth_water_equivalent",
        "soil_wetness_index",
        "elevation",
        "upstream_area"
    ],
    "model_levels": "surface_level",
    "hyear": ["2025"],
    "hmonth": ["04"],
    "hday": ["01"],
    "time": ["12:00"],
    "data_format": "netcdf",
    "download_format": "zip"
}

client = cdsapi.Client()
client.retrieve(dataset, request).download()
