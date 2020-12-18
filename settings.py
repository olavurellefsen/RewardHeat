# -*- coding: utf-8 -*-
"""
Created on Mon Nov 30 09:28:35 2020

@author: till@energymodellinglab.com
"""

# import packages
import os


# initial statement
print('Script settings as specified in settings.py')


# set unicode encoding
enc = 'utf-8'
print('Encoding: ' + enc)


# set VEDA version: veda1 or veda2
veda_version = 'veda1'


# set start year
start_year = '2015'
end_year = '2050'


# set data input path
dpath = 'input/' + veda_version
if not dpath.endswith('/'):
    dpath += '/'
    
# set main input path
ipath = 'input/'
if not ipath.endswith('/'):
    ipath += '/'


# make default output directory
opath = 'output/'
if not os.path.isdir(opath):
    os.makedirs(opath)
if not opath.endswith('/'):
    opath += '/'


# set specific TOKNI data path
toknipath = '../RewardHeat-develop/src/data'
if toknipath == '':
    toknipath = 'output'
if not toknipath.endswith('/'):
    toknipath += '/'


# directory check
if not os.path.exists(dpath):
    print('No %s folder found. Ending script.' %dpath)
    input('Press enter to exit.')
    exit(keep_kernel=True)
else:
    print('Using existing %s directory.' %dpath)

if not os.path.exists(opath):
    os.makedirs(opath)
    print('New output/ directory created.')
else:
    print('Using existing %s directory.' %opath)


# INCLUDE REGIONS: True/False
include_regions = True
print('Include regions: ' + str(include_regions))


# CHANGE SPATIAL RESOLUTION FROM REGION TO COUNTRY: True/False
use_countries = True
print('Aggregating regions to countries: ' + str(use_countries))


# INCLUDE YEARS EXPORT: True/False
include_years = True
print('Include years: ' + str(include_years))


# INCLUDE INDICATOR TABS JSON EXPORT: True/False
include_indicators = True
print('Include export of indicator tabs as json-files: ' +
      str(include_indicators))


# INCLUDE SCENARIO COMBINATIONS EXPORT: True/False
include_scenarioCombinations = True
print('Include export of scenario combinations as json-file: ' +
      str(include_scenarioCombinations))
copy_scenarios = False
print('Creating a copy of each scenario in the scenario combinations json-file: ' +
      str(copy_scenarios))


# EXPORT LISTS OF ALL SENARIOS AND INDICATORS/-GROUPS IN INPUT FILE: True/False
export_scenarios = True
export_indicators = True
export_indicatorGroups = True
print('Export excel workbook with all unique sceario names in data: ' +
      str(export_scenarios) + '\n' +
      'Export excel workbook with all unique indicator names in data: ' +
      str(export_indicators) + '\n' +
      'Export excel workbook with all unique indicatorGroup names in data :' +
      str(export_indicatorGroups))

# end
# -----------------------------------------------------------------------------