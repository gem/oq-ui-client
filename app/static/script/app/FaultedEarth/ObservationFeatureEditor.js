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

Ext.namespace("faultedearth");

/* an utility function to check if a field is compulsory */
faultedearth.isCompulsory = function(fieldName) {
    compulsoryFields = [ 
	'fault_name', 'section_name',
	'sec_name', 'compiled_by',
	'low_d_min', 'low_d_max', 'low_pref', 'low_d_com',
	'u_sm_d_min', 'u_sm_d_max', 'u_sm_d_pre', 'u_sm_d_com',
	'dip_min', 'dip_max', 'dip_pref', 'dip_com',
	'dip_dir', 'slip_typ', 
	'vertical_slip_rate_min', 'vertical_slip_rate_max', 
	'vertical_slip_rate_pref', 'vertical_slip_rate_com',
	'dip_slip_rate_min', 'dip_slip_rate_max', 'dip_slip_rate_pref',
	'aseis_slip', 'aseis_com'
    ];
    return compulsoryFields.indexOf(fieldName) != -1;
};

/**
 * @class ObservationFeatureEditor
 * @extends gxp.plugins.FeatureEditor
 * Extends the standard FeatureEditor to provide client-side
 * validation for the common fields of Fault Sections / Fault / Fault
 * Source
 */

faultedearth.ObservationFeatureEditor = Ext.extend(gxp.plugins.FeatureEditor,
  {
      ptype: "gem_observation_featureeditor",
      modifyOnly: true,
      editFeatureActionText: "Modify",
      autoLoadFeatures: true,
      snappingAgent: "snapping-agent",

      /* 
	 override addOutput to increase the default width.  Thus, the
	 fields are clearly visible and also the visual clue of the
	 compulsory fields can appended to the end of the field name
       */
      addOutput: function(config) {
	  config.width = 400;
	  faultedearth.ObservationFeatureEditor.superclass.addOutput.apply(this, arguments);
      },

      /* override addActions as here there is the lexical scope where
       * the popup containing the form is created */
      addActions: function() {
          faultedearth.ObservationFeatureEditor.superclass.addActions.apply(this, arguments);
          var featureManager = this.getFeatureManager();
          var featureLayer = featureManager.featureLayer;

	  /* listen to the featureselected event as only after it is
	   * fired the popup with the form has been created */
	  featureLayer.events.on({
	      "featureselected": function(evt) {
		  if (this.popup && this.popup.isVisible()) {
		      var grid = this.popup.grid;

		      /* for each field in the grid we hijack the
		       * standard validation mechanism */
		      Ext.iterate(grid.customEditors, function(fieldName) {
			  var gridEditor = this[fieldName];
			  var field = gridEditor.field;

			  /* for compulsory field management. Do not
			   * allow an user to leave a compulsory field
			   * blank */
			  if (faultedearth.isCompulsory(fieldName)) {
			      field.allowBlank = false;
			  }

			  // hack field.getErrors
			  var old_getErrors = field.getErrors;
			  field.getErrors = function(value) {
			      var errors = old_getErrors.apply(field, [value]) || [];

			      // CUSTOM VALIDATION
			      switch(fieldName) {
			      case 'rake_min':
			      case 'rake_max':
			      case 'rake_pref':
				  pushError(errors,
					    checkInterval(grid, fieldName, value));
				  pushError(errors,
					    checkBetween(fieldName, value, -180, 180));
				  break;
			      case 'marker_age':
				  pushError(errors,
					    checkPositive(fieldName, value));
				  break;
			      case 'low_d_min':
			      case 'low_d_max':
			      case 'low_d_pref':
				  pushError(errors,
					    checkInterval(grid, fieldName, value));
				  pushError(errors,
					    checkPositive(fieldName, value));
				  var upper_seismogenic_min_value = grid.getCurrentValue('u_sm_d_min', parseFloat);
				  value = parseFloat(value);
				  if (upper_seismogenic_min_value && value < upper_seismogenic_min_value) {
				      errors.push("Lower Seismogenic minimum value has to be greater than the upper seismogenic minimum value");
				  }
				  break;
			      case 'u_sm_d_min':
			      case 'u_sm_d_max':
			      case 'u_sm_d_pre':
				  pushError(errors,
					    checkInterval(grid, fieldName, value));
				  pushError(errors,
					    checkPositive(fieldName, value));
				  var lower_seismogenic_min_value = grid.getCurrentValue('low_d_min', parseFloat);
				  value = parseFloat(value);
				  if (lower_seismogenic_min_value && value > lower_seismogenic_min_value) {
				      errors.push("Lower Seismogenic minimum value has to be greater than the upper seismogenic minimum value");
				  }
				  break;
			      case 'rake_com':
			      case 'aseis_com':
			      case 'slip_r_com':
			      case 'slip_com':
			      case 'dip_com':
			      case 're_int_com':
				  pushError(errors,
					    checkCompleteness(fieldName, value));
				  break;
			      case 'length':
				  pushError(errors,
					    checkPositive(fieldName, value));
				  break;
			      case 'mag_min':
			      case 'mag_max':
			      case 'mag_pref':
				  pushError(errors,
					    checkInterval(grid, fieldName, value));
				  break;

			      case 'dip_min':
			      case 'dip_max':
			      case 'dip_pref':
				  pushError(errors,
					    checkInterval(grid, fieldName, value));
				  pushError(errors,
					    checkQuadrant(fieldName, value));
				  break;
			      case 'dip_dir':
				  var strike_value = grid.getCurrentValue('strike', parseFloat);
				  value = parseFloat(value);
				  if (strike_value && value != ((strike_value + 90) % 360) ) {
				      errors.push("Dip direction has to be equal to the strike plus 90 degrees");
				  }
				  pushError(errors,
					    checkAngle(fieldName, value));
				  break;
			      case 'strike':
				  var dip_dir = grid.getCurrentValue('dip_dir', parseFloat);
				  value = parseFloat(value);
				  if (dip_dir && dip_dir != ((value + 90) % 360) ) {
				      errors.push("Strike has to be equal to the dip direction minus 90 degrees");
				  }
				  pushError(errors,
					    checkAngle(fieldName, value));
				  break;
			      case 'down_thro':
				  var choices = ['N', 'S', 'W', 'E', 'NW', 'NE', 'SW', 'SE'];
				  if (choices.indexOf(value) == -1) {
				      errors.push("Downthrown side invalid. Valid choices: " + choices.join(','));
				  }
				  break;
			      case 'length_min':
			      case 'length_max':
			      case 'length_pre':
			      case 'mov_min':
			      case 'mov_max':
			      case 'mov_pref':
			      case 'mom_min':
			      case 'mom_max':
			      case 'mom_pref':
			      case 'width_min':
			      case 'width_max':
			      case 'width_pref':
			      case 'area_min':
			      case 'area_max':
			      case 'area_pref':
			      case 'slip_r_min':
			      case 'slip_r_max':
			      case 'slip_r_pre':
			      case 'dip_slip_rate_min':
			      case 'dip_slip_rate_max':
			      case 'dip_slip_rate_pref':
			      case 'strike_slip_rate_min':
			      case 'strike_slip_rate_max':
			      case 'strike_slip_rate_pref':
			      case 'vertical_slip_rate_min':
			      case 'vertical_slip_rate_max':
			      case 'vertical_slip_rate_pref':
			      case 'net_slip_rate_min':
			      case 'net_slip_rate_max':
			      case 'net_slip_rate_pref':
			      case 'dis_min':
			      case 'dis_max':
			      case 'dis_pref':
			      case 're_int_min':
			      case 're_int_max':
			      case 're_int_pref':
				  pushError(errors,
					    checkInterval(grid, fieldName, value));
				  pushError(errors,
					    checkPositive(fieldName, value));
				  break;
			      case 'aseis_slip':
				  pushError(errors,
					    checkBetween(fieldName, value, 0, 1));
				  break;
			      }
			      return errors;
			  }
		      });
		  }
		  return true;
	      },
	      scope: this
	  });
      }
  }
				     );

Ext.preg(faultedearth.ObservationFeatureEditor.prototype.ptype, faultedearth.ObservationFeatureEditor); 
