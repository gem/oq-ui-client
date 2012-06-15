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

/**
 * @class ObservationFeatureEditor
 * @extends gxp.plugins.FeatureEditor
 * Extends the standard FeatureEditor to provide client-side
 * validation for the common fields of Fault Sections / Fault / Fault
 * Source
 */

ObservationFeatureEditor = Ext.extend(gxp.plugins.FeatureEditor,
  {
      ptype: "gem_observation_featureeditor",
      modifyOnly: true,
      editFeatureActionText: "Modify",
      autoLoadFeatures: true,
      snappingAgent: "snapping-agent",

      /* override addActions as it is the place where the popup
       * containing the form is created */
      addActions: function() {
          ObservationFeatureEditor.superclass.addActions.apply(this, arguments);
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
			  // hack field.getErrors
			  var old_getErrors = field.getErrors;
			  field.getErrors = function(value) {
			      var errors = old_getErrors.apply(field, [value]) || [];

			      // CUSTOM VALIDATION
			      switch(fieldName) {
			      case 'length_min':
			      case 'length_max':
			      case 'length_pre':
				  pushError(errors,
					    checkInterval(grid, fieldName, value));
				  pushError(errors,
					    checkPositive(fieldName, value));
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
			      case 'vertical_slip_rate_min':
			      case 'vertical_slip_rate_max':
			      case 'vertical_slip_rate_pref':
				  pushError(errors,
					    checkInterval(grid, fieldName, value));
				  pushError(errors,
					    checkPositive(fieldName, value));
				  break;
			      case 'net_slip_rate_min':
			      case 'net_slip_rate_max':
			      case 'net_slip_rate_pref':
				  pushError(errors,
					    checkInterval(grid, fieldName, value));
				  pushError(errors,
					    checkPositive(fieldName, value));
				  break;
			      case 'aseis_slip':
				  pushError(errors,
					    checkBetween(fieldName, value, 0, 1));
				  break;
			      case 'dis_min':
			      case 'dis_max':
			      case 'dis_pref':
				  pushError(errors,
					    checkInterval(grid, fieldName, value));
				  pushError(errors,
					    checkPositive(fieldName, value));
				  break;

			      case 're_int_min':
			      case 're_int_max':
			      case 're_int_pref':
				  pushError(errors,
					    checkInterval(grid, fieldName, value));
				  pushError(errors,
					    checkPositive(fieldName, value));
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

Ext.preg(ObservationFeatureEditor.prototype.ptype, ObservationFeatureEditor); 
