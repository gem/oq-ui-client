GED_country = Ext.extend(gxp.Viewer, {

    legendTabTitle: "Legend",
	summaryId: null,
    
    constructor: function(config) {
        
        Ext.Window.prototype.shadow = false;
        
        // property names for FeatureEditor and FeatureGrid
        var propertyNames = {
            // custom fied names for the fault summary table
            "fault_name": "Fault Name",
            
        };

        Ext.applyIf(config, {
            proxy: "/proxy?url=",
                
            mapItems: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }, {
                xtype: "gxp_scaleoverlay"
            }],
            portalItems: [{
                region: "center",
                layout: "border",
                tbar: {
                    id: "paneltbar",
                    items: ["-"]
                },
                items: [{
                    id: "west",
                    region: "west",
                    layout: "accordion",
                    width: 280,
                    split: true,
                    collapsible: true,
                    collapseMode: "mini",
                    header: false,
                    border: false,
                    defaults: {
                       hideBorders: true,
                       autoScroll: true
                    },
                    items: [{
                        id: "tree",
                        title: "Layers"
                    }, {
                        id: 'trace',
                        title: "Layer Information",
                        padding: 10
                    }]
                },
		"map", {
                    id: "featuregrid",
                    layout: "fit",
                    region: "south",
                    border: false,
                    height: 200,
                    split: true,
                    collapseMode: "mini",
                }],
                bbar: {id: "mybbar"},
            }],
            
            tools: [{
                actionTarget: {target: "paneltbar", index: 0},
                outputAction: 0,
                outputConfig: {
                    title: "Help",
                    width: 900,
                    height: 500,
                    modal: true,
                    bodyCfg: {
                        tag: "iframe",
                        src: "faulted_earth_documentation.html",
                        style: {border: 0}
                    }
                },
                actions: [{
                    iconCls: "icon-geoexplorer",
                    text: "Help",
                }]
            }, {
                ptype: "gxp_layertree",
                outputTarget: "tree",
            }, {
                ptype: "gxp_featuremanager",
                id: "featuremanager",
                autoLoadFeatures: true,
                autoSetLayer: false,
                paging: false,
                maxFeatures: 3,
                layer: {
                    source: "local",
                    name: "ged:gem_exposure"
                }
            }, {
                ptype: "gxp_featuregrid",
                //alwaysDisplayOnMap: true,
                autoLoadFeatures: true,
                //selectOnMap: true,
                id: "grid",
                //displayMode: "selected",
                featureManager: "featuremanager",
                outputTarget: "featuregrid",
                outputConfig: {
                    id: "grid",
                    loadMask: true,
                    propertyNames: propertyNames
                },
                controlOptions: {
                    multiple: true,
                                }
            }, /*{
                ptype: "app_exposure",
                id: "traceform",
                featureManager: "featuremanager",
                featureEditor: "featureeditor",
                outputTarget: "trace"
            }, {
                ptype: "gxp_featureeditor",
                id: "featureeditor",
                featureManager: "featuremanager",
                actionTarget: "traceform_tooltarget",
                autoLoadFeatures: true,
                readOnly: true,
                //createFeatureActionText: "Draw",
                //editFeatureActionText: "Modify",
                outputConfig: {
                    propertyNames: propertyNames
                }
            },*/ {
            	ptype: "gxp_zoomtoextent",
            	actionTarget: "paneltbar"
            }, {
            	ptype: "gxp_zoom",
            	actionTarget: "paneltbar"
            }, {
            	ptype: "gxp_navigationhistory",
            	actionTarget: "paneltbar"
            }, {
		         ptype: "gxp_wmsgetfeatureinfo",
		         actionTarget: "paneltbar",
	             outputConfig: {
	                 width: 400
	                 }
	         }, {
                ptype: "gxp_zoomtoselectedfeatures",
                featureManager: "featuremanager",
                actionTarget: "paneltbar",
                tooltip: "Zoom to selected closure"
            }]
        });

        GED_country.superclass.constructor.apply(this, arguments);
    }

});


