export default { 
	scenarioCombinations : 
		{ 
			scenarioOptions : [ 
				{ 
					"id": 0, 
					"name": "ClimHi_ConvlDH_NoLTHS", 
					"nameNoOptions": "ClimHi", 
					"short_description": "CH+DH", 
					"ultra_short_description": "H+DH", 
					"desc": "Climate High Ambition with Conventional District Heating without Low Temperature Heating Sources", 
				}, 
				{ 
					"id": 1, 
					"name": "ClimHi_ConvlDH_LTHS", 
					"nameNoOptions": "ClimHi", 
					"short_description": "CH+DH+LTHS", 
					"ultra_short_description": "H+DH+LT", 
					"desc": "Climate High Ambition with Conventional District Heating with Low Temperature Heating Sources", 
				}, 
				{ 
					"id": 2, 
					"name": "ClimHi_LTDH_LTHS", 
					"nameNoOptions": "ClimHi", 
					"short_description": "CH+LTDH+LTHS", 
					"ultra_short_description": "H+LTDH+LT", 
					"desc": "Climate High Ambition with Low Temperature District Heating with Low Temperature Heating Sources", 
				}, 
				{ 
					"id": 3, 
					"name": "ClimLo_ConvlDH_noLTHS", 
					"nameNoOptions": "ClimLo", 
					"short_description": "CL+DH", 
					"ultra_short_description": "L+DH", 
					"desc": "Climate Low Ambition with Conventional District Heating without Low Temperature Heating Sources", 
				}, 
				{ 
					"id": 4, 
					"name": "ClimLo_ConvlDH_LTHS", 
					"nameNoOptions": "ClimLo", 
					"short_description": "CL+DH+LTHS", 
					"ultra_short_description": "L+DH+LT", 
					"desc": "Climate Low Ambition with Conventional District Heating with Low Temperature Heating Sources", 
				}, 
				{ 
					"id": 5, 
					"name": "ClimLo_LTDH_LTHS", 
					"nameNoOptions": "ClimLo", 
					"short_description": "CL+LTDH+LTHS", 
					"ultra_short_description": "L+LTDH+LT", 
					"desc": "Climate Low Ambition with Low Temperature District Heating with Low Temperature Heating Sources", 
				}, 
				{ 
					"id": 6, 
					"name": "ClimHi_LTDH_LTHS_CO2Free_2030", 
					"nameNoOptions": "ClimHi", 
					"short_description": "CH+LTDH+LTHS+ELC", 
					"ultra_short_description": "H+LTDH+LT+E", 
					"desc": "Climate High Ambition with Low Temperature District Heating with Low Temperature Heating Sources All Sectors Emission Free by 2030", 
				}, 
				{ 
					"id": 7, 
					"name": "ClimHi_LTDH_LTHS_CO2Free_ELC", 
					"nameNoOptions": "ClimHi", 
					"short_description": "CH+LTDH+LTHS+ALL", 
					"ultra_short_description": "H+LTDH+LT+A", 
					"desc": "Climate High Ambition with Low Temperature District Heating with Low Temperature Heating Sources Electricity Production Emission Free by 2030", 
				}, 
			], 
			optionsAvailable:  {
				"ClimHi": {"opt0": true, "opt1": true, "opt2": true, "opt3": true},
				"ClimLo": {"opt0": true, "opt1": true, "opt2": true, "opt3": true},
		 }
	 }
 };