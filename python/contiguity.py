import pysal as ps
import numpy as np
import pandas as pd
import shapely.geometry as gm
from osgeo import ogr

shp_path = 'redistricting/us_zcta.shp'

#view schema of shapefile to ID zip field
import geopandas
import fiona
path_shapefile = geopandas.datasets.get_path(shp_path)
with fiona.collection(shps) as source:
    print(source.schema)     

rW = ps.rook_from_shapefile(shp_path)
print(rW)
shps = ps.open(shp_path)
shps.header

shps.field_spec
polygons = shps.read()
for polygon in polygons:
   return polygon

#attempt to filter zips based on df join to acs data
acs=pd.read_csv('redistricting/acs_full.csv')
result=dataframe.merge(acs, how='inner', left_on='AFFGEOID10', right_on='GEO.id')
len(result)
result.columns

#rook contiguity analysis 
rW = ps.rook_from_shapefile(result)

rook = ps.weights.Rook.from_dataframe(result)
print(rook)

filtered_geo = result.iloc[:, 0:8]
filtered_geo.columns

filtered_geo['geometry']

coordinates_array = filtered_geo(polygon)

import shapefile
# read the shapefile
reader = shapefile.Reader("redistricting/us_zcta.shp")
fields = reader.fields[1:]
field_names = [field[0] for field in fields]
buffer = []
for sr in reader.shapeRecords():
   atr = dict(zip(field_names, sr.record))
   geom = sr.shape.__geo_interface__
   buffer.append(dict(type="Feature", \
    geometry=geom, properties=atr)) 
   
   # write the GeoJSON file
from json import dumps
geojson = open("us-zcta-test.json", "w")
output = geojson.write(dumps({"type": "FeatureCollection","features": buffer}, indent=2) + "\n")


#https://gist.github.com/scardine/6320052
#attempt to turn geojson to topojson
#need to turn geojson file into dict
from shapely.geometry import shape, Point, MultiPoint
import math
import json

t = open('us-zcta-test.json', 'r')
string_dict = t.read()
json.loads(string_dict)

def get_bounds(geometries):
    """Returns bounding box of geometries. Implementation creates a MultiPoint
    from the boxes of all polygons in order to get the result"""
    points = []
    for g in geometries:
        bounds = g.bounds
        points.extend([Point(bounds[:2]), Point(bounds[2:])])
    return MultiPoint(points).bounds


def lines2arcs(geometries, kx, ky, x0, y0):
    """Naive approach to create arcs from lines. TODO: implement detection of
    shared points/arcs"""
    for g in geometries:
        try:
            boundary = g.boundary
        except AttributeError:
            continue

        if boundary.type == 'LineString':
            boundary = [boundary]

        arcs = []
        x = y = 0
        for line in boundary:
            arc = []
            for a, b in line.coords:
                a = int(round((a - x0) / kx - x))
                b = int(round((b - y0) / ky - y))
                x += a
                y += b
                arc.append([a, b])
            arcs.append(arc)
        return arcs


def geo2topo(geojson, quant_factor=1e4):
    """Given a geojson dict, returns topojson"""
   # assert geojson["type"] == "FeatureCollection"

    geometries = []

    for feature in geojson['features']:
        geometries.append(shape(feature['geometry']))

    x0, y0, x1, y1 = get_bounds(geometries)
    kx, ky = 1 / ((quant_factor - 1) / (x1 - x0)), 1/ ((quant_factor - 1) / (y1 - y0))

    arcs = lines2arcs(geometries, kx, ky, x0, y0)

    return {
        "type" : "Topology",
        "transform" : {
  	  "scale" : [kx, ky],
		  "translate" : [x0, y0]
	    },
        "objects" : {},
        "arcs" : arcs
}

