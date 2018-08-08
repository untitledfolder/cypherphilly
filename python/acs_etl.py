import pandas as pd
import numpy as np
import re

# read full data 
df=pd.read_csv('redistricting/acs_full.csv')

#filter to pct & geo fields
pct=df.filter(regex='^HC03_|GEO.id2', axis=1) 

#convert geoid into zip string
pct['GEO.id2'] = pct['GEO.id2'].apply(lambda x: '{0:0>5}'.format(x))

#pivot data to match metadata format
pct.set_index('GEO.id2', inplace=True)
pct=pct.transpose()
pct.index.names=['field']
pct.columns.names=['zip']
pct.head()

#read metadata for field names
names=pd.read_csv('redistricting/ACS_16_5YR_DP03_metadata.csv', names=['field', 'desc'])
###names.index.names=['field']
names.head()
names.set_index('field', inplace=True)

#merge field names into values
result=pct.join(names, how='inner')
result.dropna()
#result['categorize'] = result['desc'].astype('string')

#create new fields with field names
import re

#create empty dictionary 
#Added "commuting" to list of matchers

matchers = {"Insurance": "INSURANCE COVERAGE"
    , "Employment Status": "EMPLOYMENT STATUS"
    , "Occupation": "OCCUPATION"
    , "Industry": "INDUSTRY"
    , "Income": "INCOME AND BENEFITS"
    , "Poverty": "POVERTY LEVEL"
    , "Commuting": "COMMUTING"
    , "Worker Class": "CLASS OF WORKER"}

test_desc = "Percent; EMPLOYMENT STATUS - Civilian labor force"

def classify(desc):
    results=[]
    for i in desc:
        for k, v in matchers.items():
            if v in i:
                results.append(v)
            else:
                results.append('n/a')
    return results


print(type(desc))
#make desc into list

desc = result['desc'].tolist()
categories_long = classify(desc)
#result['categories'] = result['desc'].apply(classify)
categories_long

#remove all n/a
categories[:] = [x for x in categories_long if x != 'n/a']

categories = categories[:]

#adding categories names to result dataframe

result['categories'] = categories

result

