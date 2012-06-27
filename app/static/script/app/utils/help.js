/*
 Copyright (c) 2010-2012, GEM Foundation.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>. */

Ext.namespace('gem.utils');

gem.utils.fieldDescriptions = {
            // custom fied names for the fault summary table
            "fault_name": "Compulsory\
• Free text up to 96 characters long\
• Should be accompanied by comments or a description of the source of the name (free text up to 254 characters long)\
The name of a fault. For unnamed faults, the name could be derived from a nearby locality, which may also include a number – e.g., Southern Alps Fault 1.",

            "sec_name": "Compulsory\
• Free text up to 96 characters long\
• Should be accompanied by comments or a description of the source of the name (free text up to 254 characters long)\
The name of a fault section. For unnamed sections, the name should be given as the fault name followed by a section number (e.g., Alpine Fault – Section 1).",

            "episodi_is": "Optional\
• Yes or No\
• Should be accompanied by comments or a description of the evidence (or lack of evidence) for episodic behaviour (free text up to 254 characters long)\
Is there any evidence for episodic behaviour (i.e., periods of activity and inactivity) on the fault or fault section within the current tectonic regime? If this attribute is left blank it will be assumed the answer is no.",

            "episodi_ac": "Optional\
• Active or Inactive\
• Should be accompanied by comments or a description of the basis for classifying the fault as active or inactive (free text up to 254 characters long)\
If there is evidence for episodic behaviour during the current tectonic regime, is the fault or fault section currently in an Active or Inactive period? If it is not in an active period, the fault is considered to not currently be contributing to seismic hazard and is included in the database for completeness only. If this attribute is left blank it will be assumed the answer is active.",

            "length": "Optional\
• Reported in kilometres, rounded to the nearest kilometre\
• Should be accompanied by comments or a description of how the length was measured\
and if it spans any gaps in traces (free text up to 254 characters long)\
Length of the fault or fault section, measured along its strike. Generally measured manually along an approximate midpoint of the fault traces.",

            "u_sm_d": "Compulsory\
• Reported in kilometres, rounded to the nearest kilometre\
￼• Expressed as preferred, minimum, maximum\
• Accompanied by a data completeness factor (see Upper seismogenic depth data completeness factor)\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long)\
Vertical distance below the ground surface to the top edge (tip) of the fault or fault section. For most faults or sections this will be 0 (the exception being blind faults or subduction interfaces). For these, the minimum and maximum will also be 0. If uncertainties cannot be quantified, a default value of ±10% should be used.",

    "u_sm_d_com": "Compulsory\
• Reported as 1, 2, 3, or 4\
• Should be accompanied by comments or a description of the basis for the choice of factor (free text up to 254 characters long)\
Relative ranking of the completeness of the data constraining the upper seismogenic depth.\
1 = well constrained from field data or high resolution seismic profile data\
2 = moderately constrained from field, seismic profile, or instrumental seismicity data 3 = poorly constrained from field, seismic profile, or instrumental seismicity data\
4 = inferred",

    "low_d_com": "Compulsory\
• Reported as 1, 2, 3, or 4\
• Should be accompanied by comments or a description of the basis for the choice of factor (free text up to 254 characters long)\
Relative ranking of the completeness of the data constraining the lower seismogenic depth. 1 = well constrained from field data or high resolution seismic profile data\
2 = moderately constrained from seismic profile or instrumental seismicity data\
3 = poorly constrained from instrumental seismicity data\
4 = inferred",
    
            "low_d": "Compulsory\
• Reported in kilometres, rounded to the nearest kilometre\
• Expressed as preferred, minimum, maximum\
• Accompanied by a data completeness factor (see Lower seismogenic depth data completeness factor)\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long)\
Vertical distance below the ground surface to the bottom edge (base) of the fault or fault section. For historical fault ruptures, this may be obtained from seismological data (e.g., earthquake hypocentre, aftershock seismicity). For remaining faults it may be inferred from the base of the seismogenic zone, as defined by instrumental seismicity, or from locking depths derived from geodesy. If uncertainties cannot be quantified, a default value of ±10% should be used.",

            "strike": "Optional\
• Reported in decimal degrees from 0o to 360o, rounded to the nearest degree, whereby:\
o 0o (or 360) = north\
￼o 90o =east\
o 180o = south o 270o = west\
• Expressed as preferred, minimum, maximum\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long)\
The compass direction of the intersection of the fault plane with a horizontal plane (usually simplified as the ground surface). Is defined using the Aki and Richards (1980) convention (or the right-hand rule), whereby the fault dips to the right side (Figure 2.1). For example a fault with a strike of 0o dips to the east, whereas a fault of 180o dips to the west. Defined as an average value for the entire fault or section.",

            "dip": "Compulsory\
• Reported in decimal degrees, from 0o (horizontal) to 90o (vertical), rounded to the nearest degree\
• Expressed as preferred, minimum, and maximum\
• Accompanied by a data completeness factor (see Dip data completeness factor)\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long)\
Downward inclination of the fault plane from the horizontal, averaged across the entire fault plane (which may or not be the same as the surface dip). Generally derived from a combination of field and subsurface geophysical data (e.g., seismic reflection profile), but may be inferred from nearby faults or typical values from faults of the same style. If uncertainties cannot be quantified, a default value of ±10o should be used.",

            "dip_dir": "Compulsory\
• Reported in decimal degrees from 0o to 360o, rounded to the nearest degree, whereby:\
o 0o (or 360) = north o 90o =east\
o 180o = south\
o 270o = west\
• Accompanied by a data completeness factor (see Dip direction data completeness factor)\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long)\
The compass direction towards which the fault dips. If the strike and downthrown side are known it can be calculated from 90o to the strike following the Aki and Richards (1980) convention (or the right-hand rule) (Figure 2.1), but an independently derived value can also be entered.
",

            "down_thro": "Optional\
• Reported as one of:\
oN oS oW oE o NW o SW o NE o SE\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long) Geographic quadrant of the overall side of the fault which has been displaced vertically downwards.",

            "slip_typ": "Compulsory\
• Choose from a list:\
o Reverse\
o Thrust (dip <45o) o Normal\
o Dextral\
o Sinistral\
o Normal dextral o Normal sinistral o Reverse dextral o Reverse sinistral o Dextral normal o Dextral reverse o Sinistral reverse o Sinistral normal\
• Accompanied by a data completeness factor (see Slip type data completeness factor)\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long) Dominant and, if applicable, secondary type (sense) of relative slip (displacement or movement) on the fault plane.",

    "slip_com": "Compulsory\
• Reported as 1, 2, 3, or 4\
• Should be accompanied by comments or a description of the basis for the choice of factor (free text up to 254 characters long)\
Relative ranking of the completeness of the data constraining the slip type.\
1 = well constrained from multiple field data and/or high resolution seismic profile data 2 = moderately constrained from field or seismic profile data\
3 = poorly constrained from subsurface geophysical data\
4 = inferred",

            "slip_typ_com": "Compulsory\
• Reported as 1, 2, 3, or 4\
• Should be accompanied by comments or a description of the basis for the choice of factor (free text up to 254 characters long)\
Relative ranking of the completeness of the data constraining the slip type.\
1 = well constrained from multiple field data and/or high resolution seismic profile data 2 = moderately constrained from field or seismic profile data\
3 = poorly constrained from subsurface geophysical data\
4 = inferred",

            "slip_r": "Optional\
• Reported in millimetres per year, up to 3 decimal places\
• Expressed as preferred, minimum, maximum\
• Should be accompanied by comments or a description of the data source or how it is calculated (free text up to 254 characters long)\
The slip rate measured down the dip of the fault plane. May be calculated from field measurements of displacement of dated markers down the fault plane or from vertical slip rate and the fault dip.",

            "aseis_slip": "Aseismic-slip factor (Fault summary, Section summary)\
Compulsory\
Reported as a value from 0 (fully locked) to 1 (fully creeping), up to 2 decimal places\
Accompanied by a data completeness factor (see Aseismic-slip factor data completeness factor)\
Should be accompanied by comments or a description of the data source (free text up to 254 characters long)\
Fraction of fault slip released by creep. For most faults this is likely to be 0, but for most subduction interface sources, will be non-0.
",
            "aseis": "Compulsory\
• Reported as 1, 2, 3, or 4\
• Should be accompanied by comments or a description of the basis for the choice of factor (free text up to 254 characters long)\
Relative ranking of the completeness of the data constraining the Aseismic-slip factor.\
1 = well constrained from multiple field data\
2 = moderately constrained from field data\
3 = poorly constrained from field or geological data 4 = inferred",

            "dis": "Optional\
• Reported in metres, up to 2 decimal places\
• Expressed as preferred, minimum, maximum\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long)\
Displacement per event measured down the dip of the fault plane. May be calculated from field measurements of displacement of dated markers down the fault plane, or from vertical displacement and the fault dip.",

            "re_int": "Optional\
• Reported in years, rounded to the nearest year\
• Expressed as preferred, minimum, maximum\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long)\
￼Average time between successive Mmax earthquakes. Generally derived from field data, but may be calculated from D/SR (Displacement divided by Slip Rate), or inferred from analogous faults, expert opinion, etc.",

            "mov": "Optional\
Reported as calibrated years before 1950 AD\
Expressed as preferred, minimum, and maximum\
Should be accompanied by comments or a description of the data source (free text up to 254 characters long)\
Year or age of the most recent Mmax earthquake on the fault. Generally derived from historical or field data, but may be inferred from geomorphic expression, analogous faults, expert opinion, etc. Historical earthquakes for which the date is well constrained (i.e., to within one year) should be reported as a preferred value only, relative to 1950 AD. For example 1940 AD is reported as 10 and 1987 AD as -37.",

            "all_com": "Calculated/
• Obtained directly from neotectonic fault or blind fault data completeness factors • Reported as 1, 2, 3, or 4, rounded to the nearest whole number
Relative ranking of the overall completeness of the fault source data, weighted towards the key parameter slip rate. Calculated from a combination of all the fault data completeness rankings, whereby the slip rate ranking contributes 5 times the others, i.e.:\
upper seismogenic depth data completeness factor + lower seismogenic depth data completeness factor + dip data completeness factor +\
dip direction data completeness factor +\
slip type data completeness factor +\
5 x slip rate data completeness factor + aseismic-slip data completeness factor\
divided by the total, 11.",

            "created": "Date created (date)",

            "compiler": "Compulsory\
• Free text up to 64 characters long\
The name of the person who compiled the neotectonic fault or section attributes.",

            "contrib": "Optional\
• Free text up to 64 characters long\
The name of the person (or people) who contributed most of the fault data (if different from the compiler). A paper or report\
reference may also be entered here.",

            // custom fied names for the observations table
            "observationType": "Observation Type",

            "slipType": "Compulsory\
• Choose from a list:\
o Reverse\
o Thrust (dip <45o) o Normal\
o Dextral\
o Sinistral\
o Normal dextral o Normal sinistral o Reverse dextral o Reverse sinistral o Dextral normal o Dextral reverse o Sinistral reverse o Sinistral normal\
• Accompanied by a data completeness factor (see Slip type data completeness factor)\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long) Dominant and, if applicable, secondary type (sense) of relative slip (displacement or movement) on the fault plane.",

            "hv_ratio": "Optional\
• Reported as a ratio\
• Expressed as preferred, minimum, maximum\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long)\
Ratio of Horizontal to Vertical displacement on the fault plane. Generally derived from field or geological data.",

            "net_slip_rate": "Calculated\
• Reported in millimetres per year, up to 3 decimal places\
• Expressed as preferred, minimum, maximum\
• Accompanied by a data completeness factor (see Net slip rate data completeness factor)\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long)\
The net slip (displacement or movement) rate on the fault plane averaged over a time period involving at least 2 large earthquakes. In the fault section and section summary tables this is automatically calculated from the vertical and horizontal slip rates. In the Observation – slip type and slip rate table a value may be manually entered, and this is also generally calculated from vertical and horizontal slip rates.",

    "net_slip_rate_com": "Compulsory\
• Reported as 1, 2, 3, or 4\
• Should be accompanied by comments or a description of the basis for the choice of factor (free text up to 254 characters long)\
Relative ranking of the completeness of the data constraining the slip rate. 1 = well constrained from multiple field data\
2 = moderately constrained from field data\
3 = poorly constrained from field or geological data 4 = inferred",

    

            "dip_slip_rate": "Optional\
• Reported in millimetres per year, up to 3 decimal places\
• Expressed as preferred, minimum, maximum\
• Should be accompanied by comments or a description of the data source or how it is calculated (free text up to 254 characters long)\
The slip rate measured down the dip of the fault plane. May be calculated from field measurements of displacement of dated markers down the fault plane or from vertical slip rate and the fault dip.",

            "marker_age": "Optional\
Expressed a preferred, minimum, maximum\
Calibrated years before 1950 AD\
Should be accompanied by comments or a description of the data source (free text up to 254 characters long)\
Age of the geomorphic or geological marker used to calculate slip rate or displacement.",

            "slip_rate_category": "Optional\
• Chosen from a restricted list:\
o 0.001 - <0.01 o 0.01 - <0.1\
o 0.1 - <1\
o 1 - <5\
o 5 - <10\
o 10 - <50\
o 50 - <100 o 100 - <200\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long) An inferred net slip rate, selected from a limited number of categories. To be used only when there is no available data.",

            "strike_slip_rate": "Optional\
• Reported in millimetres per year, up to 3 decimal places\
• Expressed as preferred, minimum, maximum\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long)
￼The slip rate measured in the strike direction of the fault. Generally calculated from field measurements of horizontal displacement of dated markers.",

            "vertical_slip_rate": "Compulsory\
• Reported in millimetres per year, up to 3 decimal places\
• Expressed as preferred, minimum, maximum\
• Accompanied by a data completeness factor (see Slip rate data completeness factor)\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long)\
The vertical component of slip (displacement or movement) rate on the fault plane averaged over a time period involving at least 2 large earthquakes. Generally calculated from field or geological measurements of vertical displacement of dated markers. If uncertainties can’t be quantified then they must be estimated to encompass the most likely range of values within a 95% confidence interval."

            "site": "Optional\
• Free text up to 24 characters long\
Brief description of the feature at the site. For example, fault in trench, displaced riser, displaced fan, line of springs.",

            "notes": "• Optional\
• Free text up to 254 characters long\
Brief notes of any neotectonic fault important information which are not included elsewhere in the database.",

            "summary_id": "Fault Section Summary ID",

            // custom fied names for fault trace form
            "section_name": "Fault Section Name",

            "loc_meth": "Compulsory\
• Choose from a list:\
o GPS survey\
o LiDAR\
o Aerial photographs o Topographic Map o Google Earth\
o Composite\
￼The mapping method or basemap on which the trace was digitised (e.g., GPS surveying, LiDAR data, aerial photographs, topographic map, Google Earth).",

            "scale": "Compulsory\
• Reported as a number – i.e., 1:200,000 is reported as 200,000\
Scale at which the trace spatial data was digitised (e.g., 1:100,000). For new traces digitised in the fault compilation tool or\
in a GIS programme, this is the average scale at which the digitiser is working.",

            "accuracy": "Calculated\
• Reported as a number – i.e., 1:200,000 is reported as 200,000\
Conservative definition of the location accuracy of the trace on the ground surface, calculated from twice the scale at which the trace was mapped. For example, if a trace was mapped at 1:100,000 scale then the accuracy is calculated to be 1:200,000.",

            "geomor_exp": "Compulsory\
• Chosen from a restricted list:\
o Surface trace\
o Eroded scarp\
o Sharp feature\
o Topographic feature o Bedrock extension o Concealed\
o No trace\
Expression of the fault on the ground or on digital imagery (e.g., Google Earth).\
1. Surface Trace = Clearly defined trace of a recent or well preserved fault rupture trace mapped in the field or from high resolution imagery (e.g., LiDAR, aerial photographs).\
2. Eroded scarp = Eroded or naturally degraded faultline scarp mapped in the field or from high resolution imagery (e.g., LiDAR, aerial photographs).\
￼3. Sharp feature = Well defined, distinct, feature (e.g., faultline scarp) mapped from remote sensing (e.g., SRTM data, Google Earth).\
4. Topographic feature = Non-scarp feature e.g., changes in gradient, alignment of saddles, springs, etc.\
5. Bedrock extension = Inferred extension of a neotectonic fault along a bedrock fault.\
6. Subtle feature = Moderately – poorly defined feature mapped from remote sensing (e.g., SRTM data, Google Earth).\
7. Concealed = Inferred trace buried beneath deposits younger than the last fault rupture (e.g., alluvium) or a water body (river, lake, sea).\
8. No trace = No geomorphic expression of the fault exists, but it is inferred from other datasets.\
This attribute determines the linetypes used to display the faults in map view: 1-3 = soild line\
4-6 = dashed line 7-8 = dotted line",

            "notes": "Notes",
            "fault_section_id": "Fault Section Id",
            "t_feature": "Trace Feature",

            "s_feature": "Optional\
• Free text up to 24 characters long\
Brief description of the feature at the site. For example, fault in trench, displaced riser, displaced fan, line of springs.",

            // custom field names for fault source form
    	    "source_nm": "Fault Source Name",

    	    "rake": "Optional\
• Reported in decimal degrees, from -180o to 180o, rounded to the nearest degree, whereby:\
o 0o = sinistral\
o 180o = right lateral o 90o = reverse\
o -90o = normal\
• Expressed as preferred, minimum, maximum\
• Should be accompanied by comments or a description of the data source (free text up to 254 characters long)\
The direction of hanging wall slip, measured relative to the horizontal (strike). May be defined from field or seismological data. May be calculated from H:V ratios or inferred from slip type. Is defined using the Aki and Richards (1980) convention (or the right-hand rule; Figure 2.1).",

    	    "magnitude": "Magnitude",

    	    "length": "Optional\
• Reported in kilometres, rounded to the nearest kilometre\
• Should be accompanied by comments or a description of how the length was measured\
and if it spans any gaps in traces (free text up to 254 characters long)\
Length of the fault or fault section, measured along its strike. Generally measured manually along an approximate midpoint of the fault traces.",

    	    "mag": "Magnitude",

    	    "mom": "Seismic Movement Pref",

    	    "fault_id": "Fault ID",

            "width": "Width",

            "area": "Area",
	    /* for site observations */
    "fault_section_id": "Fault Section ID",

    /* completeness */
    'dip_com': "Compulsory\
• Reported as 1, 2, 3, or 4\
• Should be accompanied by comments or a description of the basis for the choice of factor (free text up to 254 characters long)\
Relative ranking of the completeness of the data constraining the fault dip.\
1 = well constrained from multiple field data and/or high resolution seismic profile data 2 = moderately constrained from field or seismic profile data\
3 = poorly constrained from subsurface geophysical data\
4 = inferred",
    'dip_dir_com': "Compulsory\
• Reported as 1, 2, 3, or 4\
• Should be accompanied by comments or a description of the basis for the choice of factor (free text up to 254 characters long)\
Relative ranking of the completeness of the data constraining the fault dip direction.\
1 = well constrained from multiple field data and/or high resolution seismic profile data 2 = moderately constrained from field or seismic profile data\
3 = poorly constrained from subsurface geophysical data\
4 = inferred"
};

gem.utils.description = function(fieldName) {
    fieldNamePrefix = gem.utils.fieldPrefix(fieldName);
    fieldNameSuffix = gem.utils.fieldSuffix(fieldName);
    fieldShortDescription = gem.utils.fromFieldToDescription(fieldNamePrefix);
    
    if (['min', 'max', 'pref', 'pre'].indexOf(fieldNameSuffix) != -1) {
	fieldName = fieldNamePrefix;
    }
    
    return gem.utils.fieldDescriptions[fieldName] || ("No description available for " + fieldShortDescription);
}