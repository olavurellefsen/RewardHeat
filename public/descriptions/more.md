# The TIMES_Heat Model

In the RewardHeat project, the well-established TIMES (The Integrated MARKAL-EFOM System) energy system model generator is used for the analysis (ETSAP, M. Gargiulo, 2009). For the study, a heating sector model was developed and modeled for each demonstrator, and the model is named as TIMES_Heat. 
The TIMES_Heat model represents the heating sectors in the studied countries, including the heat generation in district heating systems and individual heating units in buildings. The electricity system as well as international markets for fuels are treated exogenously. Heat demand in the studied counties is defined per timeslice. Energy efficiency measures and heat demand projections are provided as exogenous inputs to the model.  

The TIMES_Heat model minimizes the cost to satisfy the heating demand for each country, considering the constraints that are defined in the model, for example, emissions, resource availability, etc. 

The start year (base year) of the model is 2015. In that year the heating sector is represented with the present fuel mix and existing heat generation units in that year. The existing technologies are phased out gradually and replaced with the new technologies towards the future within the model, considering the costs, technology efficiencies, availabilities, lifetimes, constraints in the model, etc. 

- Start year of the model: 2015
- Time horizon: 2015-2052
- Time resolution: Eight time slices per year (four seasons, day and night)

### Schematic representation of heat sector in TIMES_Heat model 

![Heating_sector_scheme](./images/Heating_sector_scheme_resized.png)
 
**Figure 1.** Simplified representation of the heating sector in the TIMES_Heat model (TIMES-Heat model, Sandvall, 2020)


### Air pollutants 

For detailed explanation please refer to the respective report [1] section **17.11**. 

For more information: 

(hobbit hole) [1] Link to the report where detailed information about the TIMES_Heat model and for each country that is modeled: **https://www.rewardheat.eu/Download?id=file:83807000&s=-333193579074902488**


(hobbit hole) [2] Short description of the TIMES modeling framework: **https://iea-etsap.org/index.php/etsap-tools/model-generators/times**


(hobbit hole) [3] Link to the TIMES model documentation, which contains information about the modeling framework and how to use the tool: **https://iea-etsap.org/index.php/documentation**
