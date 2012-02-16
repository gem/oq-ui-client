/*
 * @requires FaultedEarth.js
 */

FaultedEarth.CountryInfo = Ext.extend(gxp.plugins.Tool, {
    
    ptype: "app_countryinfo",
    
    /** api: config[featureManager]
     *  ``String`` id of the FeatureManager to add uploaded features to
     */
    
    /** api: config[featureEditor]
     *  ``String`` id of the FeatureEditor to modify uploaded features
     */
    
    /** api: config[temporaryWorkspace]
     *  ``String`` temporary GeoServer workspace for shapefile uploads.
     *  Default is "temp".
     */
    temporaryWorkspace: "temp",

    /** api: config[temporaryWorkspaceNamespaceUri]
     *  ``String`` namespace uri of the temporary GeoServer workspace for
     *  shapefile uploads. Default is "http://geonode.org/temporary".
     */
    temporaryWorkspaceNamespaceUri: "http://geonode.org/temporary",
    
    /** private: property[sessionTids]
     *  ``Array`` fids of features added/modified in this session
     */
    sessionTids: [],
    
    autoActivate: false,
    
    init: function(target) {
        FaultedEarth.CountryInfo.superclass.init.apply(this, arguments);
        
        this.sessionTids = [];
        this.faultSection = {};
        var featureManager = target.tools[this.featureManager];
        featureManager.featureLayer.events.on({
            "featureselected": function(e) {
                if (!e.feature.fid) {
                    return;
                }
                if (featureManager.layerRecord.get("name") == "ged:country_facts3") {
                    this.target.traceId = e.feature.fid;

                    this.current_trace_url = "/observations/traces/join";
                    this.sessionTids.push(this.target.traceId);

                } else if (this.target.traceId) {
                    this.output[0].ownerCt.enable();
                    this.current_trace_url = "/traces/new/trace_id/" + this.target.traceId.split(".").pop()
                }
            },
            "featureunselected": function(e) {
                if (this.active && featureManager.layerRecord.get("name") == "ged:country_facts3") {
                    this.sessionTids = [];
                    this.target.traceId = null;
                }
            },
            scope: this
        });
    },
    
    addOutput: function(config) {
        return FaultedEarth.CountryInfo.superclass.addOutput.call(this, {
            xtype: "form",
            labelWidth: 110,
            defaults: {
                anchor: "100%"
            },
            items: [{
                xtype: "box",
                autoEl: {
                    tag: "p",
                    cls: "x-form-item"
                },
                html: "In the grid below you can view country aggregate data"
            }, {
                xtype: "textfield",
                ref: "nameContains",
                fieldLabel: "Search by country name",
                validationDelay: 500,
                listeners: {
                    "valid": this.updateFilter,
                    scope: this
                }
              }, {
                xtype: "textfield",
                ref: "dateContains",
                fieldLabel: "Filter by date",
                validationDelay: 500,
                listeners: {
                    "valid": this.updateFilter,
                    scope: this
                }
              }, {
                xtype: "container",
                layout: "hbox",
                cls: "composite-wrap",
                fieldLabel: "Zoom to feature in grid",
                items: [{
                    id: this.id + "_tooltarget",
                    xtype: "container",
                    cls: "toolbar-spaced",
                    layout: "toolbar"
                }]
            }],
            listeners: {
                "added": function(cmp, ct) {
                    ct.on({
                        "expand": function() { this.activate(); },
                        "collapse": function() { this.deactivate(); },
                        scope: this
                    });
                },
                scope: this
            }
        });
    },

    updateFaultSectionName: function() {
        var form = this.output[0]
        if (form.faultSectionName.getValue()) {
                this.faultSection['name'] = form.faultSectionName.getValue()
        }
    },

    activate: function() {
        if (FaultedEarth.CountryInfo.superclass.activate.apply(this, arguments)) {
            var featureManager = this.target.tools[this.featureManager];
            featureManager.setLayer();
            if (!this.layerRecord) {
                this.target.createLayerRecord({
                    name: "ged:country_facts3",
                    source: "local"
                }, function(record) {
                    this.layerRecord = record;
                    featureManager.setLayer(record);
                }, this);
            } else {
                featureManager.setLayer(this.layerRecord);
            }
            this.output[0].nameContains.setValue("");
            featureManager.on("layerchange", function(mgr, layer, attr) {
                mgr.featureStore.on({
                    "save": function(store, batch, data) {
                        var fid;
                        for (var action in data) {
                            for (var i=data[action].length-1; i>=0; --i) {
                                fid = data[action][i].feature.fid;
                                this.sessionTids.remove(fid);  
                                if (action != "destroy") {
                                    this.sessionTids.push(fid);
                                }
                            }
                        }
                    },
                    "load": function() {
                        this.target.traceId && window.setTimeout((function() {
                            var feature = mgr.featureLayer.getFeatureByFid(this.target.traceId);
                            if (feature && feature.layer.selectedFeatures.indexOf(feature) == -1) {
                                feature.layer.selectedFeatures.push(feature);
                                feature.layer.events.triggerEvent("featureselected", {feature: feature});
                            }
                        }).createDelegate(this), 0);
                    },
                    scope: this
                });
            }, this, {single: true});
        }
    },
    
    deactivate: function() {
        if (FaultedEarth.CountryInfo.superclass.deactivate.apply(this, arguments)) {
            this.target.tools[this.featureManager].featureStore.un("save", this.monitorSave, this);
        }
    },
    
    updateFilter: function() {
        var form = this.output[0];
        var filters = [];
        form.nameContains.getValue() && filters.push(
            new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.LIKE,
                property: "gadm_country_name",
                value: "*" + form.nameContains.getValue() + "*",
                matchCase: false
            })
        );
        form.dateContains.getValue() && filters.push(
            new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.LIKE,
                property: "population_src_description",
                value: "*" + form.dateContains.getValue() + "*",
                matchCase: false
            })
        );
        var filter;
        if (filters.length > 0) {
            filter = filters.length == 1 ? filters[0] :
                new OpenLayers.Filter.Logical({
                    type: OpenLayers.Filter.Logical.AND,
                    filters: filters
                });
        }
        this.target.tools[this.featureManager].loadFeatures(filter);
        },
    
});

Ext.preg(FaultedEarth.CountryInfo.prototype.ptype, FaultedEarth.CountryInfo);
