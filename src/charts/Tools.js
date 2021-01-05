import years from "./../data/years"
import mapRegionToDataRegions from "./../data/mapRegionToDataRegions"

export function createAccumulatedData(data, scenario, percentage, chartName, selectedCountries) { 
  let selectedDataRegions = [] 
  mapRegionToDataRegions.forEach((mapRegion) => {
      if(selectedCountries.includes(mapRegion.path_id)) {
      mapRegion.data_regions.forEach((dataRegion) => {
        selectedDataRegions.push(dataRegion)
      })
    }
  })

    //Useful when finding axis range
    let totalYearValues = {}
    years.forEach(year => {
        totalYearValues[year] = 0
    })
    if (!scenario) return undefined //this will be the case for sceanrio2 if only one scenario is selected
    let accumulatedData = {}
    if (scenario.substring(3, 8) === "_copy")
      scenario = scenario.replace("_copy", "")
    let scen = data.scenarios
    .find(o => o.scenario.toLowerCase() === scenario.toLowerCase())
    //console.log("data: ", data)
    //console.log("scenario: ", scenario)
    let ind = scen.indicators.find(o => o.indicator === chartName)
        ind.regions.forEach(r => {
            r.indicatorGroups.forEach(indicatorGroup => {
              if (!accumulatedData[indicatorGroup.indicatorGroup]) {
                accumulatedData[indicatorGroup.indicatorGroup]=[]
                years.forEach(y => {
                  accumulatedData[indicatorGroup.indicatorGroup].push({"year": y, "total": 0})
                })
              }
              if (selectedDataRegions.includes(r.region)) {//Only include selected countries
                //console.log("indicatorGroup.indicatorGroup", indicatorGroup.indicatorGroup)
                indicatorGroup.indicatorGroupValues.forEach((value, index) => {
                  if (accumulatedData[indicatorGroup.indicatorGroup][index].year !== value.year ) {
                     //Extra check we rely on the two arrays being indexed the same way
                    console.log("Error in array indexing")
                  }
                  accumulatedData[indicatorGroup.indicatorGroup][index].total += percentage ? value.total/selectedCountries.length : value.total
                  totalYearValues[value.year] += percentage ? value.total/selectedCountries.length : value.total
                })
              }
            })
        })
        return [accumulatedData, totalYearValues]
}

// export function getMinMaxStackedValues(yearValues1, yearValues2) {
//   let minValue = -0.00001
//   let maxValue = 0.00001
//   for (var i = 0; i < years.length; i++) {
//     let totalValuePos = 0
//     let totalValueNeg = 0
//     Object.keys(data).forEach(indicatorName => {
//         let value = data[indicatorName][i].total
//         if (value < 0) {
//           totalValueNeg += value
//         } else {
//           totalValuePos += value
//         }

//     })
//     if (totalValuePos > maxValue) {
//       maxValue = totalValuePos
//     }
//     if (totalValueNeg < minValue) {
//       minValue = totalValueNeg
//     }
//   }
//   if (-minValue > maxValue) {
//     maxValue = -minValue
//   }
// }