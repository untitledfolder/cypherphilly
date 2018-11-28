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
names=pd.read_csv('redistricting/ACS_filtered_metadata.csv', names=['field', 'desc'])
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
categories_long[:] = [x for x in categories_long if x != 'n/a']

categories = categories_long[:]

#adding categories names to result dataframe

result['categories'] = categories

result
def split_right(desc):
    results=[]
    for line in desc:
        sub_cat_result = line.split("-")[1]
        results.append(sub_cat_result)
    return results

sub_cat = split_right(desc)

result['Sub Category'] = sub_cat

sub_cat
#filter to usable rows for a categorization by income level

house_income_pct = result.iloc[51:61]

house_income_pct

#create a new column describing each income level in 'house_income_pct'

def split_right_incomes(income_desc):
    results=[]
    for line in income_desc:
        sub_cat_result = line.split("households - ")[1]
        results.append(sub_cat_result)
    return results

income_ranges = split_right_incomes(house_income_pct['desc'])

#add income ranges to result dataframe

house_income_pct['Ranges'] = income_ranges

#drop other columns and put income range column at the front

house_income_pct = house_income_pct.drop(['categories', 'Sub Category', 'desc'], axis=1)

cols = house_income_pct.columns.tolist()

cols

cols = cols[-1:] + cols[:-1]

house_income_pct = house_income_pct[cols]
house_income_pct

house_income_pct_range_index = house_income_pct.set_index(['Ranges'])

house_income_pct

#melt
house_income_pct.melt(id_vars='Ranges').groupby('variable')['value'].agg('max')

ranges_melt = house_income_pct.melt(id_vars='Ranges')

ranges_melt

ranges_melt.loc[ranges_melt['value'] == '-', 'value'] = pd.np.nan

ranges_melt['value'] = ranges_melt['value'].astype(float)

ranges_melt.query("value=='-'")

zip_max_income_range = ranges_melt.groupby('variable')['value'].agg('max')

house_income_pct_range_index.replace('-', pd.np.nan).astype(float).idxmax()

#percentage in the biggest income range for each zip
zip_max_income_range 

#changing titles and adding sub_type
final = ranges_melt.rename(columns = {'variable': 'zip', 'value': 'percent', 'Ranges': 'field_sub_type'}) \
            .assign(field_type = 'INCOME')
final










