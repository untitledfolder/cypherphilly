import pysal as ps
import numpy as np
import pandas as pd

shp_path = 'redistricting/us_zcta.shp'

rW = ps.rook_from_shapefile(shp_path)
dataframe = ps.pdio.read_files(shp_path)

acs=pd.read_csv('redistricting/acs_full.csv')

result=dataframe.merge(acs, how='inner', left_on='AFFGEOID10', right_on='GEO.id')
len(result)
result.columns

rW = ps.rook_from_shapefile(result)

rook = ps.weights.Rook.from_dataframe(result)
print(rook)