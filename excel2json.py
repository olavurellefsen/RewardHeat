# -*- coding: utf-8 -*-
"""
Created on Fri Nov 30

author: till@energymodellinglab.com
"""

# import packages
import pandas as pd
import json
import glob


# import variables
from settings import *


# read filter file
f = pd.read_excel(ipath + 'filter_%s.xlsx' % veda_version)


# read options file
opt = pd.read_excel(ipath + 'scenario_options.xlsx', index_col=(0))


# read timeslice weights
tsw = pd.read_excel(ipath + 'timeslice_weights.xlsx', index_col=(0))


# read naming conventions
n_fuels = pd.read_excel(ipath + 'naming_convention.xlsx', sheet_name='fuels')
n_other = pd.read_excel(ipath + 'naming_convention.xlsx', sheet_name='other')
n_scn = pd.read_excel(ipath + 'naming_convention.xlsx', sheet_name='scenarios', index_col=(0))


# function to create dictionary that ignores nan values
def dictnonan(keys, values):
    d = {k: v for k, v in dict(zip(keys, values)).items() \
         if pd.Series(v).notna().all()}
    return d


# make indicator to destination file dictionary
if any(f.destination.isna()):
    print('Value Error: The destination column in the filter file is incomplete. Ending script.')
    input('Press enter to exit.')
    exit(keep_kernel=True)
else:
    i2d = dictnonan(zip(f.indicator,f.destination), f.destination)


# get list of all input data files with certain file name extension
file_list = glob.glob(dpath + '*.*')


# load data from all files and sheets into one dataframe
data = pd.DataFrame()
col_names = ['scenario', 'region', 'indicatorGroup', 'year', 'ts', 'total']
if veda_version == 'veda1':
    for file in file_list:
        sheet_list = pd.ExcelFile(file).sheet_names
        if 'Sheet1' in sheet_list: sheet_list.remove('Sheet1')
        for sheet in sheet_list:
            try:
                df = pd.read_excel(file,
                                   sheet_name=sheet,
                                   skiprows=3
                                   )
                df = df.dropna(axis=1, how='all')
                chartTitle = df.iloc[0,0].split(': ')[1]
                lable = df.iloc[1,0].split(': ')[1]
                df.columns = list(df.iloc[2,:])
                if 'region' not in df.columns.str.lower(): df.insert(1, 'region', 'missing')
                if 'timeslice' not in df.columns.str.lower(): df.insert(4, 'ts', 'missing')
                df.columns = col_names
                df = df.iloc[3:,:]
                df['indicator'] = sheet
                df['chartName'] = sheet
                df['chartTitle'] = chartTitle
                df['lable'] = lable
                data = data.append(df, ignore_index=True)
            except:
                print('Error while reading/processing sheet ' + sheet +
                      ' of file ' + file)
                raise


if veda_version == 'veda2':
    for file in file_list:
        sheet_list = pd.ExcelFile(file).sheet_names
        if 'Info' in sheet_list: sheet_list.remove('Info')
        for sheet in sheet_list:
            try:
                df = pd.read_excel(file,
                                   sheet_name=sheet,
                                   skiprows=1
                                   )
                if 'region' not in df.columns.str.lower(): df.insert(1, 'region', 'missing')
                if 'timeslice' not in df.columns.str.lower(): df.insert(4, 'ts', 'missing')
                df.columns = col_names
                df['indicator'] = sheet
                df['chartName'] = sheet
                data = data.append(df, ignore_index=True)
            except:
                print('Error while reading/processing sheet ' + sheet +
                      ' of file ' + file)
                raise


# remove years befor start year defined in settings
idx_years = data.loc[(data.year >= start_year) &
                     (data.year <= end_year)].index
data = data.loc[idx_years]


# calculate weighted averages for timeslices
t2w = tsw.weight.to_dict()
data['ts_wgt'] = data.ts
data.ts_wgt.replace(t2w, inplace=True)
wgt_idx = data.loc[data.ts_wgt.str.isnumeric() != False, 'ts_wgt'].index
data.loc[wgt_idx, 'total'] *= data.loc[wgt_idx, 'ts_wgt']
del data['ts']
del data['ts_wgt']



# drop nan from dataframe
data = data.dropna()


# export list of scenarios
if export_scenarios:
    scenarios = pd.DataFrame(data=set(data.scenario), columns=['scenario'])
    scenarios.to_excel('output/scenarios.xlsx', index=False)


# export list of indicators
if export_indicators:
    indicators = pd.DataFrame(data=set(data.indicator), columns=['indicator'])
    indicators.to_excel('output/indicators.xlsx', index=False)


# export list of indicatorGroups
if export_indicatorGroups:
    ind_groups = pd.DataFrame(data=set(data.indicatorGroup), columns=['indicator_group'])
    ind_groups.to_excel('output/indicator_groups.xlsx', index=False)


# remove date stamp from scenario name
# date_index = data.loc[data.scenario.str[-5:].str.contains('\d')].index
# data.loc[date_index, 'scenario'] = data.loc[date_index, 'scenario'].str[:-5]


# convert strings with digits in year column to integers
data.loc[:, 'year'] = pd.to_numeric(data.year, errors='ignore',
                                    downcast='integer')

# convert total to float
data.loc[:, 'total'] = pd.to_numeric(data.total, errors='ignore',
                                    downcast='integer')


# add destination column
data['destination'] = 'no_destination'


# check if all sheet names from dataframe are in the filter file and vice versa
f_ind = set(f.indicator)
data_ind = set(data.indicator)
if f_ind > data_ind:
    missing_data_indicators = [i for i in f_ind if i not in data_ind]
    print('The data files are missing the following indicators compared to the filter:')
    print(*missing_data_indicators, sep='\n')
    print('Continuing execution...')
elif f_ind < data_ind:
    missing_f_indicators = [i for i in data_ind if i not in f_ind]
    print ('The filter is missing the following indicators compared to the data files:')
    print(*missing_f_indicators, sep='\n')
    input('Press enter to exit.')
    exit(keep_kernel=True)
elif f_ind == data_ind:
    print('Indicators in filter and data match.')
else:
    print('The filter does not match to the indicators.')
    input('Press enter to exit.')
    exit(keep_kernel=True)


# check if all scenarios are defined in the naming convention workbook and vice versa
n_scn_i = set(n_scn.index)
data_scn = set(data.scenario)
if n_scn_i > data_scn:
    missing_scn_names = [i for i in n_scn_i if i not in data_scn]
    print('The data files are missing the following scenarios compared to the naming convention:')
    print(*missing_scn_names, sep='\n')
    print('Continuing execution...')
elif n_scn_i < data_scn:
    missing_scn_names = [i for i in data_scn if i not in n_scn_i]
    print ('The naming convention is missing the following scnearios compared to the data files:')
    print(*missing_scn_names, sep='\n')
elif n_scn_i == data_scn:
    print('Scenarios in naming convention and data match.')
else:
    print('The scenario naming convention does not match to the scenario names.')


# create scenarioCombibnations json file
if include_scenarioCombinations:
    n_scn['no_option'] = n_scn.index
    n_scn.no_option = n_scn.no_option.str.split('_', expand=True)[0]
    scenarios = set(n_scn.index)
    if copy_scenarios:
        idmax = n_scn.id.max()
        for s in scenarios:
            c = s.split('_', 1)
            if len(c) > 1:
                c = c[0] + '_copy' + '_' + c[1]
            else:
                c = c[0] + '_copy'
            n_scn.loc[c] = n_scn.loc[s]
            n_scn.loc[c, 'id'] += idmax + 1
            n_scn.loc[c, 'no_option'] += '_copy'
    n_scn.sort_values('id', inplace=True)
    n_scn.loc[:, 'id'] = [i for i in range(n_scn.index.size)]
    scenarios = n_scn.index.to_list()
    text1 = ''
    text3 = ''
    for s in scenarios:
        t = "\t\t\t\t"
        options = ''
        noOption = s.split('_')[0]
        include_optionsAvailable = False
        if (len(s.split('_')) > 1 and not 'copy' in s): 
            options = " + " + ' + '.join(s.split('_')[1:])
        elif len(s.split('_')) > 2:
            options = " + " + ' + '.join(s.split('_')[2:])
        else:
            include_optionsAvailable = True
        text1 += (t + "{ \n" +
                  t + "\t\"id\": " + str(n_scn.loc[s, 'id']) + ", \n" +
                  t + "\t\"name\": \"" + s + "\", \n" +
                  t + "\t\"nameNoOptions\": \"" + str(n_scn.loc[s, 'no_option']) + "\", \n" +
                  t + "\t\"short_description\": \"" + n_scn.loc[s, 'short_description'] + "\", \n" +
                  t + "\t\"ultra_short_description\": \"" + n_scn.loc[s, 'ultra_short_description'] + "\", \n" +
                  t + "\t\"desc\": \"" + n_scn.loc[s, 'desc'] + "\", \n")
        text2 = ''
        for o in opt.index:
            text2 += (t + "\t\"" + o + "\": " + 
                       str(opt.loc[o, 'name'] in str(s.split('_')).lower()).lower() +
                       ", \n")
        text1 += text2 + t + "}, \n"
        if include_optionsAvailable:
            text4 = ''
            for o in opt.index:
                text4 += (t + "\t\"" + o + "\": " + 
                          str(opt.loc[o, 'name'] in
                              str(data.loc[data.scenario.str.contains(noOption),
                                           'scenario'].unique())\
                                  .lower())\
                              .lower() +
                          ",\n")
            text3 += (t + "\"" + s + "\": { \n" + text4 + t + "\t}, \n")
    # write text to scenario combinations json
    with open(toknipath + 'scenarioCombinations.js', 'w',
              encoding=enc) as file:
        text = ("export default { \n" + 
                "\t" + "scenarioCombinations : \n" +
                "\t\t" + "{ \n" +
                "\t\t\t" + "scenarioOptions : [ \n" +
                text1 +
                "\t\t\t" + "], \n" +
                "\t\t\t" + "optionsAvailable: { \n" +
                text3 +
                "\t\t\t" + "} \n" +
                "\t\t" + "} \n" +
                "\t" + "};")
        file.write(text)


# copy data per indicator for each destination and append to data frame
for i in f.indicator.unique():
    temp = data[data.indicator==i].copy()
    for j in f[f.indicator==i].destination.unique():
        if 'no_destination' in list(data[data.indicator==i].destination):
            data.loc[data.indicator==i, 'destination'] = j
        else:
            temp.destination = j
            data = data.append(temp, ignore_index=True, sort=True)


# check if the share sum factor is within [0,1]
# endflag = False
# if 'share_sum_factor' in f.columns:
#     if max(f.share_sum_factor) > 1:
#         print('Value Error: A share sum factor in the filter file is greater \
#               than 1.')
#         endflag = True
#     if min(f.share_sum_factor) > 0:
#         print('Value Error: A share sum factor in the filter file is less \
#               than 0.')
#         endflag = True
#     if endflag:
#         input('Press enter to exit.')
#         exit(keep_kernel=True)
# else:
#     print('No share_sum_factor in the filter file defined.')
#     print('Continuing execution...')



# check if regions shall be included, else remove from the category list
cats = ['region','indicator','indicatorGroup', 'destination']
if not include_regions:
    del data['region']
    cats.remove('region')
    print('Regions are not included.')
    print('Continuing execution...')
    

# change spatial resolution from region to country level
if use_countries:
   data.loc[:, 'region'] = data.region.str[:2]


# make indicator to operation dictionary
# i2o = dictnonan(zip(f.indicator,f.destination,f.indicatorGroup), f.operation)


# # change algebraic sign for selected indicators
# data['operation'] = list(zip(data.indicator,
#                              data.destination,
#                              data.indicatorGroup))
# data.operation = data.operation.map(lambda x: i2o.get(x,x))
# data.loc[data.operation=='switch sign', 'total'] *= -1

# calculate share per scenario and year
# s = 'share'
# data['share'] = 'no_share'
# if s in list(data.operation):
#     for i in data[data.operation==s].scenario.unique():
#         data.loc[data.scenario==i,
#                  'share'] = (data[data.scenario==i]\
#                              .groupby(['year']).total\
#                              .transform(lambda x: x/x.sum()))
# data.loc[data.operation==s, 'total'] = data.loc[data.operation==s, 'share']

# i2o = dictnonan(f.indicator, f.operation)
# for key, val in i2o.items():
#     if val == 'share':
#         for i 



# make auxiliary dataframes
cols = data.columns[data.columns.isin(cats)].tolist()
df1 = data[cols].drop_duplicates().reset_index(drop=True)
df2 = data[['year']].drop_duplicates().reset_index(drop=True)
df3 = data[['scenario']].drop_duplicates().reset_index(drop=True)
df1['total'] = 0
df2['total'] = 0
df3['total'] = 0


# populate for missing periods
res = pd.merge(df1, df2, on='total')
res = pd.merge(df3, res, on='total')
data = data.append(res, ignore_index=True, sort=True)


# check if regions exist, else remove from the category list
cats = ['destination',
        'scenario',
        'indicator',
        'region',
        'indicatorGroup',
        'year']
if not include_regions: cats.remove('region')


#make all the rows unique removing all the duplicates except the first one  
data.drop_duplicates(keep='first',inplace=True)


# rename indicator names in data and in filter
i2r = dictnonan(zip(f.indicator,f.destination), f.rename_indicator)
i2i = dictnonan(zip(f.indicator,f.destination), f.indicator)
data['new_indicator'] = list(zip(data.indicator, data.destination))
data.new_indicator = data.new_indicator.map(lambda x: i2r.get(x,x))
data.indicator = data.new_indicator.map(lambda x: i2i.get(x,x))
f['new_indicator'] = list(zip(f.indicator, f.destination))
f.new_indicator = f.new_indicator.map(lambda x: i2r.get(x,x))
f.indicator = f.new_indicator.map(lambda x: i2i.get(x,x))
del f['new_indicator']


# translate times fuel names in indicatorGroup column to on-times names
t2f = dictnonan(n_fuels.times_description, n_fuels.rewardheat_names)
data.indicatorGroup = data.indicatorGroup.map(lambda x: t2f.get(x,x))


# translate times other names in indicatorGroup column to on-times names
t2o = dictnonan(n_other.times_description, n_other.rewardheat_names)
data.indicatorGroup = data.indicatorGroup.map(lambda x: t2o.get(x,x))


# group by categories and take mean or sum of the total
# i2o = dictnonan(f.indicator, f.operation)
# idx_mean = []
# for i, o in i2o.items():
#     if o == 'share':
#         idx_mean.extend(data.loc[data.indicator==i].index)
# idx_mean = set(idx_mean)
# idx_sum = set(data.index) - idx_mean
# data_mean = data.loc[idx_mean].groupby(cats)['total'].mean().reset_index().set_index('destination')
# data_sum = data.loc[idx_sum].groupby(cats)['total'].sum().reset_index().set_index('destination')
# data = data_mean.append(data_sum)
data = data.groupby(cats)['total'].sum().reset_index().set_index('destination')


# change algebraic sign for selcted indicator groups
i2o = dictnonan(zip(f.indicator, f.indicatorGroup_contains), f.operation)
for keys, val in i2o.items():
    if val == 'switch sign':
        data.loc[(data.indicator==keys[0]) &
                 (data.indicatorGroup.str.contains(keys[1])),
                  'total'] *= -1
# TODO: just temporary switch sign back for Finlands captured CO2 emissions
data.loc[(data.indicatorGroup.str.contains('captured')) & (data.region == 'FI'), 'total'] *= -1


# write out indicator tab json files
if include_indicators:
    for tab in set(data.index.str[-4:]):
        with open(toknipath + 'indicators' + tab + '.js', 'w',
                  encoding=enc) as file:
            idx = data.index.str.contains(tab)
            text = ''
            for ind in data.loc[idx, 'indicator'].unique():
                text += ("\t\t\"" + ind + "\",\n")
            text = ("export default \n \t [ \n" + text + "\t ]")
            file.write(text)


# write out years json file
if include_years:
    with open(toknipath + 'years.js', 'w') as file:
        text = ("export default " + str(list(data.year.unique())))
        file.write(text)


# function to convert the dataframe to json and saves it to output
def create_json(df, name):
    """
    Creates customized json file from a pandas dataframe and saves it with the
    selected naming.
    """

    d = df  # .reset_index()

    if 'destination' in cats: cats.remove('destination')

    d = d.groupby(cats[:-1]).apply(lambda x: x[['year',
                                        'total']]\
                                   .to_dict('records'))\
                                   .reset_index()\
                                   .rename(columns={0:'indicatorGroupValues'})

    d = d.groupby(cats[:-2]).apply(lambda x: x[['indicatorGroup',
                                        'indicatorGroupValues']]\
                                   .to_dict('records'))\
                                   .reset_index()\
                                   .rename(columns={0:'indicatorGroups'})

    if include_regions:
        d = d.groupby(cats[:-3]).apply(lambda x: x[['region',
                                            'indicatorGroups']]\
                                       .to_dict('records'))\
                                       .reset_index()\
                                       .rename(columns={0:'regions'})

        d = d.groupby(cats[:-4]).apply(lambda x: x[['indicator',
                                            'regions']]\
                                        .to_dict('records'))\
                                        .reset_index()\
                                        .rename(columns={0:'indicators'})

    else:
        d = d.groupby(cats[:-3]).apply(lambda x: x[['indicator',
                                            'indicatorGroups']]\
                                       .to_dict('records'))\
                                       .reset_index()\
                                       .rename(columns={0:'indicators'})

    d['scenarios'] = 'scenarios'
    d = d.groupby(['scenarios']).apply(lambda x: x[['scenario',
                                        'indicators']]\
                                       .to_dict('records'))\
                                       .reset_index()\
                                       .rename(columns={0:'data'})
    d = d.set_index('scenarios')


    with open(toknipath + name + '.js', 'w+', encoding=enc) as file:
        d.to_json(file, force_ascii=False)


    js_str = open(toknipath + name + '.js', 'r', encoding=enc).read()
    with open(toknipath + name + '.js', 'w', encoding=enc) as file:
        js_str = json.dumps(json.loads(js_str), indent=2)
        file.write('export default ' + js_str)


# create json files
for i in data.index.unique():
    df = data.loc[i,:].reset_index(drop=True)
    create_json(df, i)


# final statement
print('Done.')


# end
# -----------------------------------------------------------------------------
