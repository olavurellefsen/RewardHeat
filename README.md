# excel2json

## Description
The excel2json.py converts TIMES results data into json files that can be pushed to tokni's github repository.

## Requirements
- python 3.7
- pandas
> *See environment.yml for details.*

## General information
- All files must be in the same folder next to each other
- With each execution potential old json files in the folder will be over-written
- If you use an excel file with a different structure or naming convention compared to the one in the input directory, make sure to change the filter.csv accordingly
- All periods in the excel file will be used, but you have the possiblity to make a selection.
- Define destinations for each indicator in the filter.
- Define mathematical operation for each indicator in the filter. Possible operations are:
	- "switch sign"
	- "share"

## Input
- VEADBATCH excel files (1 or more)
- filter.xlsx
- naming_convention.xlsx (using only times_description and ontimes_names columns)

## Default output
1. stackedBar```<TabNumber>```.json
2. line```<TabNumber>```.json

## Additional output
1. indicators.xlsx
2. indicatorGroups.xlsx
2. scenarioCombinations.json

## authors
> [till@energymodellinglab.com](mailto:till@energymodellinglab.com)