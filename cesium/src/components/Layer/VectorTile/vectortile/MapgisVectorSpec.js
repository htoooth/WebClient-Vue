export let spec = {
  "$version": 8,
  "$root": {
    "version": {
      "required": true,
      "type": "enum",
      "values": [
        8
      ],
      "doc": "Style specification version number. Must be 8.",
      "example": 8
    },
    "name": {
      "type": "string",
      "doc": "A human-readable name for the style.",
      "example": "Bright"
    },
    "metadata": {
      "type": "*",
      "doc": "Arbitrary properties useful to track with the stylesheet, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."
    },
    "center": {
      "type": "array",
      "value": "number",
      "doc": "Default map center in longitude and latitude.  The style center will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
      "example": [
        -73.9749,
        40.7736
      ]
    },
    "zoom": {
      "type": "number",
      "doc": "Default zoom level.  The style zoom will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
      "example": 12.5
    },
    "bearing": {
      "type": "number",
      "default": 0,
      "period": 360,
      "units": "degrees",
      "doc": "Default bearing, in degrees. The bearing is the compass direction that is \"up\"; for example, a bearing of 90° orients the map so that east is up. This value will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
      "example": 29
    },
    "pitch": {
      "type": "number",
      "default": 0,
      "units": "degrees",
      "doc": "Default pitch, in degrees. Zero is perpendicular to the surface, for a look straight down at the map, while a greater value like 60 looks ahead towards the horizon. The style pitch will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
      "example": 50
    },
    "light": {
      "type": "light",
      "doc": "The global light source.",
      "example": {
        "anchor": "viewport",
        "color": "white",
        "intensity": 0.4
      }
    },
    "sources": {
      "required": true,
      "type": "sources",
      "doc": "Data source specifications.",
      "example": {
        "mapbox-streets": {
          "type": "vector",
          "url": "mapbox://mapbox.mapbox-streets-v6"
        }
      }
    },
    "sprite": {
      "type": "string",
      "doc": "A base URL for retrieving the sprite image and metadata. The extensions `.png`, `.json` and scale factor `@2x.png` will be automatically appended. This property is required if any layer uses the `background-pattern`, `fill-pattern`, `line-pattern`, `fill-extrusion-pattern`, or `icon-image` properties. The URL must be absolute, containing the [scheme, authority and path components](https://en.wikipedia.org/wiki/URL#Syntax).",
      "example": "mapbox://sprites/mapbox/bright-v8"
    },
    "glyphs": {
      "type": "string",
      "doc": "A URL template for loading signed-distance-field glyph sets in PBF format. The URL must include `{fontstack}` and `{range}` tokens. This property is required if any layer uses the `text-field` layout property. The URL must be absolute, containing the [scheme, authority and path components](https://en.wikipedia.org/wiki/URL#Syntax).",
      "example": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf"
    },
    "transition": {
      "type": "transition",
      "doc": "A global transition definition to use as a default across properties, to be used for timing transitions between one value and the next when no property-specific transition is set. Collision-based symbol fading is controlled independently of the style's `transition` property.",
      "example": {
        "duration": 300,
        "delay": 0
      }
    },
    "layers": {
      "required": true,
      "type": "array",
      "value": "layer",
      "doc": "Layers will be drawn in the order of this array.",
      "example": [
        {
          "id": "water",
          "source": "mapbox-streets",
          "source-layer": "water",
          "type": "fill",
          "paint": {
            "fill-color": "#00ffff"
          }
        }
      ]
    }
  },
  "sources": {
    "*": {
      "type": "source",
      "doc": "Specification of a data source. For vector and raster sources, either TileJSON or a URL to a TileJSON must be provided. For image and video sources, a URL must be provided. For GeoJSON sources, a URL or inline GeoJSON must be provided."
    }
  },
  "source": [
    "source_vector",
    "source_raster",
    "source_raster_dem",
    "source_geojson",
    "source_video",
    "source_image"
  ],
  "source_vector": {
    "type": {
      "required": true,
      "type": "enum",
      "values": {
        "vector": {
          "doc": "A vector tile source."
        }
      },
      "doc": "The type of the source."
    },
    "url": {
      "type": "string",
      "doc": "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<mapid>`."
    },
    "tiles": {
      "type": "array",
      "value": "string",
      "doc": "An array of one or more tile source URLs, as in the TileJSON spec."
    },
    "bounds": {
      "type": "array",
      "value": "number",
      "length": 4,
      "default": [
        -180,
        -85.051129,
        180,
        85.051129
      ],
      "doc": "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
    },
    "scheme": {
      "type": "enum",
      "values": {
        "xyz": {
          "doc": "Slippy map tilenames scheme."
        },
        "tms": {
          "doc": "OSGeo spec scheme."
        }
      },
      "default": "xyz",
      "doc": "Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed."
    },
    "minzoom": {
      "type": "number",
      "default": 0,
      "doc": "Minimum zoom level for which tiles are available, as in the TileJSON spec."
    },
    "maxzoom": {
      "type": "number",
      "default": 22,
      "doc": "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
    },
    "attribution": {
      "type": "string",
      "doc": "Contains an attribution to be displayed when the map is shown to a user."
    },
    "*": {
      "type": "*",
      "doc": "Other keys to configure the data source."
    }
  },
  "source_raster": {
    "type": {
      "required": true,
      "type": "enum",
      "values": {
        "raster": {
          "doc": "A raster tile source."
        }
      },
      "doc": "The type of the source."
    },
    "url": {
      "type": "string",
      "doc": "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<mapid>`."
    },
    "tiles": {
      "type": "array",
      "value": "string",
      "doc": "An array of one or more tile source URLs, as in the TileJSON spec."
    },
    "bounds": {
      "type": "array",
      "value": "number",
      "length": 4,
      "default": [
        -180,
        -85.051129,
        180,
        85.051129
      ],
      "doc": "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
    },
    "minzoom": {
      "type": "number",
      "default": 0,
      "doc": "Minimum zoom level for which tiles are available, as in the TileJSON spec."
    },
    "maxzoom": {
      "type": "number",
      "default": 22,
      "doc": "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
    },
    "tileSize": {
      "type": "number",
      "default": 512,
      "units": "pixels",
      "doc": "The minimum visual size to display tiles for this layer. Only configurable for raster layers."
    },
    "scheme": {
      "type": "enum",
      "values": {
        "xyz": {
          "doc": "Slippy map tilenames scheme."
        },
        "tms": {
          "doc": "OSGeo spec scheme."
        }
      },
      "default": "xyz",
      "doc": "Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed."
    },
    "attribution": {
      "type": "string",
      "doc": "Contains an attribution to be displayed when the map is shown to a user."
    },
    "*": {
      "type": "*",
      "doc": "Other keys to configure the data source."
    }
  },
  "source_raster_dem": {
    "type": {
      "required": true,
      "type": "enum",
      "values": {
        "raster-dem": {
          "doc": "A RGB-encoded raster DEM source"
        }
      },
      "doc": "The type of the source."
    },
    "url": {
      "type": "string",
      "doc": "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<mapid>`."
    },
    "tiles": {
      "type": "array",
      "value": "string",
      "doc": "An array of one or more tile source URLs, as in the TileJSON spec."
    },
    "bounds": {
      "type": "array",
      "value": "number",
      "length": 4,
      "default": [
        -180,
        -85.051129,
        180,
        85.051129
      ],
      "doc": "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
    },
    "minzoom": {
      "type": "number",
      "default": 0,
      "doc": "Minimum zoom level for which tiles are available, as in the TileJSON spec."
    },
    "maxzoom": {
      "type": "number",
      "default": 22,
      "doc": "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
    },
    "tileSize": {
      "type": "number",
      "default": 512,
      "units": "pixels",
      "doc": "The minimum visual size to display tiles for this layer. Only configurable for raster layers."
    },
    "attribution": {
      "type": "string",
      "doc": "Contains an attribution to be displayed when the map is shown to a user."
    },
    "encoding": {
      "type": "enum",
      "values": {
        "terrarium": {
          "doc": "Terrarium format PNG tiles. See https://aws.amazon.com/es/public-datasets/terrain/ for more info."
        },
        "mapbox": {
          "doc": "Mapbox Terrain RGB tiles. See https://www.mapbox.com/help/access-elevation-data/#mapbox-terrain-rgb for more info."
        }
      },
      "default": "mapbox",
      "doc": "The encoding used by this source. Mapbox Terrain RGB is used by default"
    },
    "*": {
      "type": "*",
      "doc": "Other keys to configure the data source."
    }
  },
  "source_geojson": {
    "type": {
      "required": true,
      "type": "enum",
      "values": {
        "geojson": {
          "doc": "A GeoJSON data source."
        }
      },
      "doc": "The data type of the GeoJSON source."
    },
    "data": {
      "type": "*",
      "doc": "A URL to a GeoJSON file, or inline GeoJSON."
    },
    "maxzoom": {
      "type": "number",
      "default": 18,
      "doc": "Maximum zoom level at which to create vector tiles (higher means greater detail at high zoom levels)."
    },
    "attribution": {
      "type": "string",
      "doc": "Contains an attribution to be displayed when the map is shown to a user."
    },
    "buffer": {
      "type": "number",
      "default": 128,
      "maximum": 512,
      "minimum": 0,
      "doc": "Size of the tile buffer on each side. A value of 0 produces no buffer. A value of 512 produces a buffer as wide as the tile itself. Larger values produce fewer rendering artifacts near tile edges and slower performance."
    },
    "tolerance": {
      "type": "number",
      "default": 0.375,
      "doc": "Douglas-Peucker simplification tolerance (higher means simpler geometries and faster performance)."
    },
    "cluster": {
      "type": "boolean",
      "default": false,
      "doc": "If the data is a collection of point features, setting this to true clusters the points by radius into groups. Cluster groups become new `Point` features in the source with additional properties:\n * `cluster` Is `true` if the point is a cluster \n * `cluster_id` A unqiue id for the cluster to be used in conjunction with the [cluster inspection methods](https://www.mapbox.com/mapbox-gl-js/api/#geojsonsource#getclusterexpansionzoom)\n * `point_count` Number of original points grouped into this cluster\n * `point_count_abbreviated` An abbreviated point count"
    },
    "clusterRadius": {
      "type": "number",
      "default": 50,
      "minimum": 0,
      "doc": "Radius of each cluster if clustering is enabled. A value of 512 indicates a radius equal to the width of a tile."
    },
    "clusterMaxZoom": {
      "type": "number",
      "doc": "Max zoom on which to cluster points if clustering is enabled. Defaults to one zoom less than maxzoom (so that last zoom features are not clustered)."
    },
    "clusterProperties": {
      "type": "*",
      "doc": "An object defining custom properties on the generated clusters if clustering is enabled, aggregating values from clustered points. Has the form `{\"property_name\": [operator, map_expression]}`. `operator` is any expression function that accepts at least 2 operands (e.g. `\"+\"` or `\"max\"`) — it accumulates the property value from clusters/points the cluster contains; `map_expression` produces the value of a single point.\n\nExample: `{\"sum\": [\"+\", [\"get\", \"scalerank\"]]}`.\n\nFor more advanced use cases, in place of `operator`, you can use a custom reduce expression that references a special `[\"accumulated\"]` value, e.g.:\n`{\"sum\": [[\"+\", [\"accumulated\"], [\"get\", \"sum\"]], [\"get\", \"scalerank\"]]}`"
    },
    "lineMetrics": {
      "type": "boolean",
      "default": false,
      "doc": "Whether to calculate line distance metrics. This is required for line layers that specify `line-gradient` values."
    },
    "generateId": {
      "type": "boolean",
      "default": false,
      "doc": "Whether to generate ids for the geojson features. When enabled, the `feature.id` property will be auto assigned based on its index in the `features` array, over-writing any previous values."
    }
  },
  "source_video": {
    "type": {
      "required": true,
      "type": "enum",
      "values": {
        "video": {
          "doc": "A video data source."
        }
      },
      "doc": "The data type of the video source."
    },
    "urls": {
      "required": true,
      "type": "array",
      "value": "string",
      "doc": "URLs to video content in order of preferred format."
    },
    "coordinates": {
      "required": true,
      "doc": "Corners of video specified in longitude, latitude pairs.",
      "type": "array",
      "length": 4,
      "value": {
        "type": "array",
        "length": 2,
        "value": "number",
        "doc": "A single longitude, latitude pair."
      }
    }
  },
  "source_image": {
    "type": {
      "required": true,
      "type": "enum",
      "values": {
        "image": {
          "doc": "An image data source."
        }
      },
      "doc": "The data type of the image source."
    },
    "url": {
      "required": true,
      "type": "string",
      "doc": "URL that points to an image."
    },
    "coordinates": {
      "required": true,
      "doc": "Corners of image specified in longitude, latitude pairs.",
      "type": "array",
      "length": 4,
      "value": {
        "type": "array",
        "length": 2,
        "value": "number",
        "doc": "A single longitude, latitude pair."
      }
    }
  },
  "layer": {
    "id": {
      "type": "string",
      "doc": "Unique layer name.",
      "required": true
    },
    "type": {
      "type": "enum",
      "values": {
        "fill": {
          "doc": "A filled polygon with an optional stroked border.",
          "sdk-support": {
            "basic functionality": {
              "js": "0.10.0",
              "android": "2.0.1",
              "ios": "2.0.0",
              "macos": "0.1.0"
            }
          }
        },
        "line": {
          "doc": "A stroked line.",
          "sdk-support": {
            "basic functionality": {
              "js": "0.10.0",
              "android": "2.0.1",
              "ios": "2.0.0",
              "macos": "0.1.0"
            }
          }
        },
        "symbol": {
          "doc": "An icon or a text label.",
          "sdk-support": {
            "basic functionality": {
              "js": "0.10.0",
              "android": "2.0.1",
              "ios": "2.0.0",
              "macos": "0.1.0"
            }
          }
        },
        "circle": {
          "doc": "A filled circle.",
          "sdk-support": {
            "basic functionality": {
              "js": "0.10.0",
              "android": "2.0.1",
              "ios": "2.0.0",
              "macos": "0.1.0"
            }
          }
        },
        "heatmap": {
          "doc": "A heatmap.",
          "sdk-support": {
            "basic functionality": {
              "js": "0.41.0",
              "android": "6.0.0",
              "ios": "4.0.0",
              "macos": "0.7.0"
            }
          }
        },
        "fill-extrusion": {
          "doc": "An extruded (3D) polygon.",
          "sdk-support": {
            "basic functionality": {
              "js": "0.27.0",
              "android": "5.1.0",
              "ios": "3.6.0",
              "macos": "0.5.0"
            }
          }
        },
        "raster": {
          "doc": "Raster map textures such as satellite imagery.",
          "sdk-support": {
            "basic functionality": {
              "js": "0.10.0",
              "android": "2.0.1",
              "ios": "2.0.0",
              "macos": "0.1.0"
            }
          }
        },
        "hillshade": {
          "doc": "Client-side hillshading visualization based on DEM data. Currently, the implementation only supports Mapbox Terrain RGB and Mapzen Terrarium tiles.",
          "sdk-support": {
            "basic functionality": {
              "js": "0.43.0",
              "android": "6.0.0",
              "ios": "4.0.0",
              "macos": "0.7.0"
            }
          }
        },
        "background": {
          "doc": "The background color or pattern of the map.",
          "sdk-support": {
            "basic functionality": {
              "js": "0.10.0",
              "android": "2.0.1",
              "ios": "2.0.0",
              "macos": "0.1.0"
            }
          }
        }
      },
      "doc": "Rendering type of this layer.",
      "required": true
    },
    "metadata": {
      "type": "*",
      "doc": "Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."
    },
    "source": {
      "type": "string",
      "doc": "Name of a source description to be used for this layer. Required for all layer types except `background`."
    },
    "source-layer": {
      "type": "string",
      "doc": "Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources."
    },
    "minzoom": {
      "type": "number",
      "minimum": 0,
      "maximum": 24,
      "doc": "The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden."
    },
    "maxzoom": {
      "type": "number",
      "minimum": 0,
      "maximum": 24,
      "doc": "The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden."
    },
    "filter": {
      "type": "filter",
      "doc": "A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `feature-state` expression is not supported in filter expressions."
    },
    "layout": {
      "type": "layout",
      "doc": "Layout properties for the layer."
    },
    "paint": {
      "type": "paint",
      "doc": "Default paint properties for this layer."
    }
  },
  "layout": [
    "layout_fill",
    "layout_line",
    "layout_circle",
    "layout_heatmap",
    "layout_fill-extrusion",
    "layout_symbol",
    "layout_raster",
    "layout_hillshade",
    "layout_background"
  ],
  "layout_background": {
    "visibility": {
      "type": "enum",
      "values": {
        "visible": {
          "doc": "The layer is shown."
        },
        "none": {
          "doc": "The layer is not shown."
        }
      },
      "default": "visible",
      "doc": "Whether this layer is displayed.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        }
      },
      "property-type": "constant"
    }
  },
  "layout_fill": {
    "fill-sort-key": {
      "type": "number",
      "doc": "Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.",
      "sdk-support": {
        "js": "1.2.0"
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "visibility": {
      "type": "enum",
      "values": {
        "visible": {
          "doc": "The layer is shown."
        },
        "none": {
          "doc": "The layer is not shown."
        }
      },
      "default": "visible",
      "doc": "Whether this layer is displayed.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        }
      },
      "property-type": "constant"
    }
  },
  "layout_circle": {
    "circle-sort-key": {
      "type": "number",
      "doc": "Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.",
      "sdk-support": {
        "js": "1.2.0"
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "visibility": {
      "type": "enum",
      "values": {
        "visible": {
          "doc": "The layer is shown."
        },
        "none": {
          "doc": "The layer is not shown."
        }
      },
      "default": "visible",
      "doc": "Whether this layer is displayed.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        }
      },
      "property-type": "constant"
    }
  },
  "layout_heatmap": {
    "visibility": {
      "type": "enum",
      "values": {
        "visible": {
          "doc": "The layer is shown."
        },
        "none": {
          "doc": "The layer is not shown."
        }
      },
      "default": "visible",
      "doc": "Whether this layer is displayed.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.41.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        }
      },
      "property-type": "constant"
    }
  },
  "layout_fill-extrusion": {
    "visibility": {
      "type": "enum",
      "values": {
        "visible": {
          "doc": "The layer is shown."
        },
        "none": {
          "doc": "The layer is not shown."
        }
      },
      "default": "visible",
      "doc": "Whether this layer is displayed.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        }
      },
      "property-type": "constant"
    }
  },
  "layout_line": {
    "line-cap": {
      "type": "enum",
      "values": {
        "butt": {
          "doc": "A cap with a squared-off end which is drawn to the exact endpoint of the line."
        },
        "round": {
          "doc": "A cap with a rounded end which is drawn beyond the endpoint of the line at a radius of one-half of the line's width and centered on the endpoint of the line."
        },
        "square": {
          "doc": "A cap with a squared-off end which is drawn beyond the endpoint of the line at a distance of one-half of the line's width."
        }
      },
      "default": "butt",
      "doc": "The display of line endings.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "line-join": {
      "type": "enum",
      "values": {
        "bevel": {
          "doc": "A join with a squared-off end which is drawn beyond the endpoint of the line at a distance of one-half of the line's width."
        },
        "round": {
          "doc": "A join with a rounded end which is drawn beyond the endpoint of the line at a radius of one-half of the line's width and centered on the endpoint of the line."
        },
        "miter": {
          "doc": "A join with a sharp, angled corner which is drawn with the outer sides beyond the endpoint of the path until they meet."
        }
      },
      "default": "miter",
      "doc": "The display of lines when joining.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.40.0",
          "android": "5.2.0",
          "ios": "3.7.0",
          "macos": "0.6.0"
        }
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "line-miter-limit": {
      "type": "number",
      "default": 2,
      "doc": "Used to automatically convert miter joins to bevel joins for sharp angles.",
      "requires": [
        {
          "line-join": "miter"
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "line-round-limit": {
      "type": "number",
      "default": 1.05,
      "doc": "Used to automatically convert round joins to miter joins for shallow angles.",
      "requires": [
        {
          "line-join": "round"
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "line-sort-key": {
      "type": "number",
      "doc": "Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.",
      "sdk-support": {
        "js": "1.2.0"
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "visibility": {
      "type": "enum",
      "values": {
        "visible": {
          "doc": "The layer is shown."
        },
        "none": {
          "doc": "The layer is not shown."
        }
      },
      "default": "visible",
      "doc": "Whether this layer is displayed.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "property-type": "constant"
    }
  },
  "layout_symbol": {
    "symbol-placement": {
      "type": "enum",
      "values": {
        "point": {
          "doc": "The label is placed at the point where the geometry is located."
        },
        "line": {
          "doc": "The label is placed along the line of the geometry. Can only be used on `LineString` and `Polygon` geometries."
        },
        "line-center": {
          "doc": "The label is placed at the center of the line of the geometry. Can only be used on `LineString` and `Polygon` geometries. Note that a single feature in a vector tile may contain multiple line geometries."
        }
      },
      "default": "point",
      "doc": "Label placement relative to its geometry.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "`line-center` value": {
          "js": "0.47.0",
          "android": "6.4.0",
          "ios": "4.3.0",
          "macos": "0.10.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "symbol-spacing": {
      "type": "number",
      "default": 250,
      "minimum": 1,
      "units": "pixels",
      "doc": "Distance between two symbol anchors.",
      "requires": [
        {
          "symbol-placement": "line"
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "symbol-avoid-edges": {
      "type": "boolean",
      "default": false,
      "doc": "If true, the symbols will not cross tile edges to avoid mutual collisions. Recommended in layers that don't have enough padding in the vector tile to prevent collisions, or if it is a point symbol layer placed after a line symbol layer.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "symbol-sort-key": {
      "type": "number",
      "doc": "Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key when they overlap. Features with a lower sort key will have priority over other features when doing placement.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.53.0",
          "android": "7.4.0",
          "ios": "4.11.0",
          "macos": "0.14.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "symbol-z-order": {
      "type": "enum",
      "values": {
        "auto": {
          "doc": "If `symbol-sort-key` is set, sort based on that. Otherwise sort symbols by their y-position relative to the viewport."
        },
        "viewport-y": {
          "doc": "Symbols will be sorted by their y-position relative to the viewport."
        },
        "source": {
          "doc": "Symbols will be rendered in the same order as the source data with no sorting applied."
        }
      },
      "default": "auto",
      "doc": "Controls the order in which overlapping symbols in the same layer are rendered",
      "sdk-support": {
        "basic functionality": {
          "js": "0.49.0",
          "android": "6.6.0",
          "ios": "4.5.0",
          "macos": "0.12.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "icon-allow-overlap": {
      "type": "boolean",
      "default": false,
      "doc": "If true, the icon will be visible even if it collides with other previously drawn symbols.",
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "icon-ignore-placement": {
      "type": "boolean",
      "default": false,
      "doc": "If true, other symbols can be visible even if they collide with the icon.",
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "icon-optional": {
      "type": "boolean",
      "default": false,
      "doc": "If true, text will display without their corresponding icons when the icon collides with other symbols and the text does not.",
      "requires": [
        "icon-image",
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "icon-rotation-alignment": {
      "type": "enum",
      "values": {
        "map": {
          "doc": "When `symbol-placement` is set to `point`, aligns icons east-west. When `symbol-placement` is set to `line` or `line-center`, aligns icon x-axes with the line."
        },
        "viewport": {
          "doc": "Produces icons whose x-axes are aligned with the x-axis of the viewport, regardless of the value of `symbol-placement`."
        },
        "auto": {
          "doc": "When `symbol-placement` is set to `point`, this is equivalent to `viewport`. When `symbol-placement` is set to `line` or `line-center`, this is equivalent to `map`."
        }
      },
      "default": "auto",
      "doc": "In combination with `symbol-placement`, determines the rotation behavior of icons.",
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "`auto` value": {
          "js": "0.25.0",
          "android": "4.2.0",
          "ios": "3.4.0",
          "macos": "0.3.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "icon-size": {
      "type": "number",
      "default": 1,
      "minimum": 0,
      "units": "factor of the original icon size",
      "doc": "Scales the original size of the icon by the provided factor. The new pixel size of the image will be the original pixel size multiplied by `icon-size`. 1 is the original size; 3 triples the size of the image.",
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.35.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "icon-text-fit": {
      "type": "enum",
      "values": {
        "none": {
          "doc": "The icon is displayed at its intrinsic aspect ratio."
        },
        "width": {
          "doc": "The icon is scaled in the x-dimension to fit the width of the text."
        },
        "height": {
          "doc": "The icon is scaled in the y-dimension to fit the height of the text."
        },
        "both": {
          "doc": "The icon is scaled in both x- and y-dimensions."
        }
      },
      "default": "none",
      "doc": "Scales the icon to fit around the associated text.",
      "requires": [
        "icon-image",
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.21.0",
          "android": "4.2.0",
          "ios": "3.4.0",
          "macos": "0.2.1"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "icon-text-fit-padding": {
      "type": "array",
      "value": "number",
      "length": 4,
      "default": [
        0,
        0,
        0,
        0
      ],
      "units": "pixels",
      "doc": "Size of the additional area added to dimensions determined by `icon-text-fit`, in clockwise order: top, right, bottom, left.",
      "requires": [
        "icon-image",
        "text-field",
        {
          "icon-text-fit": [
            "both",
            "width",
            "height"
          ]
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.21.0",
          "android": "4.2.0",
          "ios": "3.4.0",
          "macos": "0.2.1"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "icon-image": {
      "type": "string",
      "doc": "Name of image in sprite to use for drawing an image background.",
      "tokens": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.35.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        }
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "icon-rotate": {
      "type": "number",
      "default": 0,
      "period": 360,
      "units": "degrees",
      "doc": "Rotates the icon clockwise.",
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.21.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "icon-padding": {
      "type": "number",
      "default": 2,
      "minimum": 0,
      "units": "pixels",
      "doc": "Size of the additional area around the icon bounding box used for detecting symbol collisions.",
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "icon-keep-upright": {
      "type": "boolean",
      "default": false,
      "doc": "If true, the icon may be flipped to prevent it from being rendered upside-down.",
      "requires": [
        "icon-image",
        {
          "icon-rotation-alignment": "map"
        },
        {
          "symbol-placement": [
            "line",
            "line-center"
          ]
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "icon-offset": {
      "type": "array",
      "value": "number",
      "length": 2,
      "default": [
        0,
        0
      ],
      "doc": "Offset distance of icon from its anchor. Positive values indicate right and down, while negative values indicate left and up. Each component is multiplied by the value of `icon-size` to obtain the final offset in pixels. When combined with `icon-rotate` the offset will be as if the rotated direction was up.",
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.29.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "icon-anchor": {
      "type": "enum",
      "values": {
        "center": {
          "doc": "The center of the icon is placed closest to the anchor."
        },
        "left": {
          "doc": "The left side of the icon is placed closest to the anchor."
        },
        "right": {
          "doc": "The right side of the icon is placed closest to the anchor."
        },
        "top": {
          "doc": "The top of the icon is placed closest to the anchor."
        },
        "bottom": {
          "doc": "The bottom of the icon is placed closest to the anchor."
        },
        "top-left": {
          "doc": "The top left corner of the icon is placed closest to the anchor."
        },
        "top-right": {
          "doc": "The top right corner of the icon is placed closest to the anchor."
        },
        "bottom-left": {
          "doc": "The bottom left corner of the icon is placed closest to the anchor."
        },
        "bottom-right": {
          "doc": "The bottom right corner of the icon is placed closest to the anchor."
        }
      },
      "default": "center",
      "doc": "Part of the icon placed closest to the anchor.",
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.40.0",
          "android": "5.2.0",
          "ios": "3.7.0",
          "macos": "0.6.0"
        },
        "data-driven styling": {
          "js": "0.40.0",
          "android": "5.2.0",
          "ios": "3.7.0",
          "macos": "0.6.0"
        }
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "icon-pitch-alignment": {
      "type": "enum",
      "values": {
        "map": {
          "doc": "The icon is aligned to the plane of the map."
        },
        "viewport": {
          "doc": "The icon is aligned to the plane of the viewport."
        },
        "auto": {
          "doc": "Automatically matches the value of `icon-rotation-alignment`."
        }
      },
      "default": "auto",
      "doc": "Orientation of icon when map is pitched.",
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.39.0",
          "android": "5.2.0",
          "ios": "3.7.0",
          "macos": "0.6.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "text-pitch-alignment": {
      "type": "enum",
      "values": {
        "map": {
          "doc": "The text is aligned to the plane of the map."
        },
        "viewport": {
          "doc": "The text is aligned to the plane of the viewport."
        },
        "auto": {
          "doc": "Automatically matches the value of `text-rotation-alignment`."
        }
      },
      "default": "auto",
      "doc": "Orientation of text when map is pitched.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.21.0",
          "android": "4.2.0",
          "ios": "3.4.0",
          "macos": "0.2.1"
        },
        "`auto` value": {
          "js": "0.25.0",
          "android": "4.2.0",
          "ios": "3.4.0",
          "macos": "0.3.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "text-rotation-alignment": {
      "type": "enum",
      "values": {
        "map": {
          "doc": "When `symbol-placement` is set to `point`, aligns text east-west. When `symbol-placement` is set to `line` or `line-center`, aligns text x-axes with the line."
        },
        "viewport": {
          "doc": "Produces glyphs whose x-axes are aligned with the x-axis of the viewport, regardless of the value of `symbol-placement`."
        },
        "auto": {
          "doc": "When `symbol-placement` is set to `point`, this is equivalent to `viewport`. When `symbol-placement` is set to `line` or `line-center`, this is equivalent to `map`."
        }
      },
      "default": "auto",
      "doc": "In combination with `symbol-placement`, determines the rotation behavior of the individual glyphs forming the text.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "`auto` value": {
          "js": "0.25.0",
          "android": "4.2.0",
          "ios": "3.4.0",
          "macos": "0.3.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "text-field": {
      "type": "formatted",
      "default": "",
      "tokens": true,
      "doc": "Value to use for a text label. If a plain `string` is provided, it will be treated as a `formatted` with default/inherited formatting options.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.33.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "text-font": {
      "type": "array",
      "value": "string",
      "default": [
        "Open Sans Regular",
        "Arial Unicode MS Regular"
      ],
      "doc": "Font stack to use for displaying text.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.43.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        }
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "text-size": {
      "type": "number",
      "default": 16,
      "minimum": 0,
      "units": "pixels",
      "doc": "Font size.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.35.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "text-max-width": {
      "type": "number",
      "default": 10,
      "minimum": 0,
      "units": "ems",
      "doc": "The maximum line width for text wrapping.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.40.0",
          "android": "5.2.0",
          "ios": "3.7.0",
          "macos": "0.6.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "text-line-height": {
      "type": "number",
      "default": 1.2,
      "units": "ems",
      "doc": "Text leading value for multi-line text.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "text-letter-spacing": {
      "type": "number",
      "default": 0,
      "units": "ems",
      "doc": "Text tracking amount.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.40.0",
          "android": "5.2.0",
          "ios": "3.7.0",
          "macos": "0.6.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "text-justify": {
      "type": "enum",
      "values": {
        "auto": {
          "doc": "The text is aligned towards the anchor position."
        },
        "left": {
          "doc": "The text is aligned to the left."
        },
        "center": {
          "doc": "The text is centered."
        },
        "right": {
          "doc": "The text is aligned to the right."
        }
      },
      "default": "center",
      "doc": "Text justification options.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.39.0",
          "android": "5.2.0",
          "ios": "3.7.0",
          "macos": "0.6.0"
        },
        "auto": {
          "js": "0.54.0",
          "android": "7.4.0",
          "ios": "4.10.0",
          "macos": "0.14.0"
        }
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "text-radial-offset": {
      "type": "number",
      "units": "ems",
      "default": 0,
      "doc": "Radial offset of text, in the direction of the symbol's anchor. Useful in combination with `text-variable-anchor`, which doesn't support the two-dimensional `text-offset`.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.54.0",
          "android": "7.4.0",
          "ios": "4.10.0",
          "macos": "0.14.0"
        },
        "data-driven styling": {
          "js": "0.54.0",
          "android": "7.4.0",
          "ios": "4.10.0",
          "macos": "0.14.0"
        }
      },
      "requires": [
        "text-field"
      ],
      "property-type": "data-driven",
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature"
        ]
      }
    },
    "text-variable-anchor": {
      "type": "array",
      "value": "enum",
      "values": {
        "center": {
          "doc": "The center of the text is placed closest to the anchor."
        },
        "left": {
          "doc": "The left side of the text is placed closest to the anchor."
        },
        "right": {
          "doc": "The right side of the text is placed closest to the anchor."
        },
        "top": {
          "doc": "The top of the text is placed closest to the anchor."
        },
        "bottom": {
          "doc": "The bottom of the text is placed closest to the anchor."
        },
        "top-left": {
          "doc": "The top left corner of the text is placed closest to the anchor."
        },
        "top-right": {
          "doc": "The top right corner of the text is placed closest to the anchor."
        },
        "bottom-left": {
          "doc": "The bottom left corner of the text is placed closest to the anchor."
        },
        "bottom-right": {
          "doc": "The bottom right corner of the text is placed closest to the anchor."
        }
      },
      "requires": [
        "text-field",
        {
          "symbol-placement": [
            "point"
          ]
        }
      ],
      "doc": "To increase the chance of placing high-priority labels on the map, you can provide an array of `text-anchor` locations: the render will attempt to place the label at each location, in order, before moving onto the next label. Use `text-justify: auto` to choose justification based on anchor position. To apply an offset, use the `text-radial-offset` instead of the two-dimensional `text-offset`.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.54.0",
          "android": "7.4.0",
          "ios": "4.10.0",
          "macos": "0.14.0"
        },
        "data-driven styling": {
          "js": "Not yet supported",
          "android": "Not yet supported",
          "ios": "Not yet supported",
          "macos": "Not yet supported"
        }
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "text-anchor": {
      "type": "enum",
      "values": {
        "center": {
          "doc": "The center of the text is placed closest to the anchor."
        },
        "left": {
          "doc": "The left side of the text is placed closest to the anchor."
        },
        "right": {
          "doc": "The right side of the text is placed closest to the anchor."
        },
        "top": {
          "doc": "The top of the text is placed closest to the anchor."
        },
        "bottom": {
          "doc": "The bottom of the text is placed closest to the anchor."
        },
        "top-left": {
          "doc": "The top left corner of the text is placed closest to the anchor."
        },
        "top-right": {
          "doc": "The top right corner of the text is placed closest to the anchor."
        },
        "bottom-left": {
          "doc": "The bottom left corner of the text is placed closest to the anchor."
        },
        "bottom-right": {
          "doc": "The bottom right corner of the text is placed closest to the anchor."
        }
      },
      "default": "center",
      "doc": "Part of the text placed closest to the anchor.",
      "requires": [
        "text-field",
        {
          "!": "text-variable-anchor"
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.39.0",
          "android": "5.2.0",
          "ios": "3.7.0",
          "macos": "0.6.0"
        }
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "text-max-angle": {
      "type": "number",
      "default": 45,
      "units": "degrees",
      "doc": "Maximum angle change between adjacent characters.",
      "requires": [
        "text-field",
        {
          "symbol-placement": [
            "line",
            "line-center"
          ]
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "text-rotate": {
      "type": "number",
      "default": 0,
      "period": 360,
      "units": "degrees",
      "doc": "Rotates the text clockwise.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.35.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "text-padding": {
      "type": "number",
      "default": 2,
      "minimum": 0,
      "units": "pixels",
      "doc": "Size of the additional area around the text bounding box used for detecting symbol collisions.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "text-keep-upright": {
      "type": "boolean",
      "default": true,
      "doc": "If true, the text may be flipped vertically to prevent it from being rendered upside-down.",
      "requires": [
        "text-field",
        {
          "text-rotation-alignment": "map"
        },
        {
          "symbol-placement": [
            "line",
            "line-center"
          ]
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "text-transform": {
      "type": "enum",
      "values": {
        "none": {
          "doc": "The text is not altered."
        },
        "uppercase": {
          "doc": "Forces all letters to be displayed in uppercase."
        },
        "lowercase": {
          "doc": "Forces all letters to be displayed in lowercase."
        }
      },
      "default": "none",
      "doc": "Specifies how to capitalize text, similar to the CSS `text-transform` property.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.33.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "text-offset": {
      "type": "array",
      "doc": "Offset distance of text from its anchor. Positive values indicate right and down, while negative values indicate left and up.",
      "value": "number",
      "units": "ems",
      "length": 2,
      "default": [
        0,
        0
      ],
      "requires": [
        "text-field",
        {
          "!": "text-radial-offset"
        },
        {
          "!": "text-variable-anchor"
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.35.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "data-driven"
    },
    "text-allow-overlap": {
      "type": "boolean",
      "default": false,
      "doc": "If true, the text will be visible even if it collides with other previously drawn symbols.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "text-ignore-placement": {
      "type": "boolean",
      "default": false,
      "doc": "If true, other symbols can be visible even if they collide with the text.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "text-optional": {
      "type": "boolean",
      "default": false,
      "doc": "If true, icons will display without their corresponding text when the text collides with other symbols and the icon does not.",
      "requires": [
        "text-field",
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "visibility": {
      "type": "enum",
      "values": {
        "visible": {
          "doc": "The layer is shown."
        },
        "none": {
          "doc": "The layer is not shown."
        }
      },
      "default": "visible",
      "doc": "Whether this layer is displayed.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "property-type": "constant"
    }
  },
  "layout_raster": {
    "visibility": {
      "type": "enum",
      "values": {
        "visible": {
          "doc": "The layer is shown."
        },
        "none": {
          "doc": "The layer is not shown."
        }
      },
      "default": "visible",
      "doc": "Whether this layer is displayed.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "property-type": "constant"
    }
  },
  "layout_hillshade": {
    "visibility": {
      "type": "enum",
      "values": {
        "visible": {
          "doc": "The layer is shown."
        },
        "none": {
          "doc": "The layer is not shown."
        }
      },
      "default": "visible",
      "doc": "Whether this layer is displayed.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.43.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        },
        "data-driven styling": {}
      },
      "property-type": "constant"
    }
  },
  "filter": {
    "type": "array",
    "value": "*",
    "doc": "A filter selects specific features from a layer."
  },
  "filter_operator": {
    "type": "enum",
    "values": {
      "==": {
        "doc": "`[\"==\", key, value]` equality: `feature[key] = value`"
      },
      "!=": {
        "doc": "`[\"!=\", key, value]` inequality: `feature[key] ≠ value`"
      },
      ">": {
        "doc": "`[\">\", key, value]` greater than: `feature[key] > value`"
      },
      ">=": {
        "doc": "`[\">=\", key, value]` greater than or equal: `feature[key] ≥ value`"
      },
      "<": {
        "doc": "`[\"<\", key, value]` less than: `feature[key] < value`"
      },
      "<=": {
        "doc": "`[\"<=\", key, value]` less than or equal: `feature[key] ≤ value`"
      },
      "in": {
        "doc": "`[\"in\", key, v0, ..., vn]` set inclusion: `feature[key] ∈ {v0, ..., vn}`"
      },
      "!in": {
        "doc": "`[\"!in\", key, v0, ..., vn]` set exclusion: `feature[key] ∉ {v0, ..., vn}`"
      },
      "all": {
        "doc": "`[\"all\", f0, ..., fn]` logical `AND`: `f0 ∧ ... ∧ fn`"
      },
      "any": {
        "doc": "`[\"any\", f0, ..., fn]` logical `OR`: `f0 ∨ ... ∨ fn`"
      },
      "none": {
        "doc": "`[\"none\", f0, ..., fn]` logical `NOR`: `¬f0 ∧ ... ∧ ¬fn`"
      },
      "has": {
        "doc": "`[\"has\", key]` `feature[key]` exists"
      },
      "!has": {
        "doc": "`[\"!has\", key]` `feature[key]` does not exist"
      }
    },
    "doc": "The filter operator."
  },
  "geometry_type": {
    "type": "enum",
    "values": {
      "Point": {
        "doc": "Filter to point geometries."
      },
      "LineString": {
        "doc": "Filter to line geometries."
      },
      "Polygon": {
        "doc": "Filter to polygon geometries."
      }
    },
    "doc": "The geometry type for the filter to select."
  },
  "function": {
    "expression": {
      "type": "expression",
      "doc": "An expression."
    },
    "stops": {
      "type": "array",
      "doc": "An array of stops.",
      "value": "function_stop"
    },
    "base": {
      "type": "number",
      "default": 1,
      "minimum": 0,
      "doc": "The exponential base of the interpolation curve. It controls the rate at which the result increases. Higher values make the result increase more towards the high end of the range. With `1` the stops are interpolated linearly."
    },
    "property": {
      "type": "string",
      "doc": "The name of a feature property to use as the function input.",
      "default": "$zoom"
    },
    "type": {
      "type": "enum",
      "values": {
        "identity": {
          "doc": "Return the input value as the output value."
        },
        "exponential": {
          "doc": "Generate an output by interpolating between stops just less than and just greater than the function input."
        },
        "interval": {
          "doc": "Return the output value of the stop just less than the function input."
        },
        "categorical": {
          "doc": "Return the output value of the stop equal to the function input."
        }
      },
      "doc": "The interpolation strategy to use in function evaluation.",
      "default": "exponential"
    },
    "colorSpace": {
      "type": "enum",
      "values": {
        "rgb": {
          "doc": "Use the RGB color space to interpolate color values"
        },
        "lab": {
          "doc": "Use the LAB color space to interpolate color values."
        },
        "hcl": {
          "doc": "Use the HCL color space to interpolate color values, interpolating the Hue, Chroma, and Luminance channels individually."
        }
      },
      "doc": "The color space in which colors interpolated. Interpolating colors in perceptual color spaces like LAB and HCL tend to produce color ramps that look more consistent and produce colors that can be differentiated more easily than those interpolated in RGB space.",
      "default": "rgb"
    },
    "default": {
      "type": "*",
      "required": false,
      "doc": "A value to serve as a fallback function result when a value isn't otherwise available. It is used in the following circumstances:\n* In categorical functions, when the feature value does not match any of the stop domain values.\n* In property and zoom-and-property functions, when a feature does not contain a value for the specified property.\n* In identity functions, when the feature value is not valid for the style property (for example, if the function is being used for a `circle-color` property but the feature property value is not a string or not a valid color).\n* In interval or exponential property and zoom-and-property functions, when the feature value is not numeric.\nIf no default is provided, the style property's default is used in these circumstances."
    }
  },
  "function_stop": {
    "type": "array",
    "minimum": 0,
    "maximum": 22,
    "value": [
      "number",
      "color"
    ],
    "length": 2,
    "doc": "Zoom level and value pair."
  },
  "expression": {
    "type": "array",
    "value": "*",
    "minimum": 1,
    "doc": "An expression defines a function that can be used for data-driven style properties or feature filters."
  },
  "expression_name": {
    "doc": "",
    "type": "enum",
    "values": {
      "let": {
        "doc": "Binds expressions to named variables, which can then be referenced in the result expression using [\"var\", \"variable_name\"].",
        "group": "Variable binding",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "var": {
        "doc": "References variable bound using \"let\".",
        "group": "Variable binding",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "literal": {
        "doc": "Provides a literal array or object value.",
        "group": "Types",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "array": {
        "doc": "Asserts that the input is an array (optionally with a specific item type and length).  If, when the input expression is evaluated, it is not of the asserted type, then this assertion will cause the whole expression to be aborted.",
        "group": "Types",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "at": {
        "doc": "Retrieves an item from an array.",
        "group": "Lookup",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "case": {
        "doc": "Selects the first output whose corresponding test condition evaluates to true, or the fallback value otherwise.",
        "group": "Decision",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "match": {
        "doc": "Selects the output whose label value matches the input value, or the fallback value if no match is found. The input can be any expression (e.g. `[\"get\", \"building_type\"]`). Each label must be either:\n * a single literal value; or\n * an array of literal values, whose values must be all strings or all numbers (e.g. `[100, 101]` or `[\"c\", \"b\"]`). The input matches if any of the values in the array matches, similar to the deprecated `\"in\"` operator.\n\nEach label must be unique. If the input type does not match the type of the labels, the result will be the fallback value.",
        "group": "Decision",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "coalesce": {
        "doc": "Evaluates each expression in turn until the first non-null value is obtained, and returns that value.",
        "group": "Decision",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "step": {
        "doc": "Produces discrete, stepped results by evaluating a piecewise-constant function defined by pairs of input and output values (\"stops\"). The `input` may be any numeric expression (e.g., `[\"get\", \"population\"]`). Stop inputs must be numeric literals in strictly ascending order. Returns the output value of the stop just less than the input, or the first input if the input is less than the first stop.",
        "group": "Ramps, scales, curves",
        "sdk-support": {
          "basic functionality": {
            "js": "0.42.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "interpolate": {
        "doc": "Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). The `input` may be any numeric expression (e.g., `[\"get\", \"population\"]`). Stop inputs must be numeric literals in strictly ascending order. The output type must be `number`, `array<number>`, or `color`.\n\nInterpolation types:\n- `[\"linear\"]`: interpolates linearly between the pair of stops just less than and just greater than the input.\n- `[\"exponential\", base]`: interpolates exponentially between the stops just less than and just greater than the input. `base` controls the rate at which the output increases: higher values make the output increase more towards the high end of the range. With values close to 1 the output increases linearly.\n- `[\"cubic-bezier\", x1, y1, x2, y2]`: interpolates using the cubic bezier curve defined by the given control points.",
        "group": "Ramps, scales, curves",
        "sdk-support": {
          "basic functionality": {
            "js": "0.42.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "interpolate-hcl": {
        "doc": "Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). Works like `interpolate`, but the output type must be `color`, and the interpolation is performed in the Hue-Chroma-Luminance color space.",
        "group": "Ramps, scales, curves",
        "sdk-support": {
          "basic functionality": {
            "js": "0.49.0"
          }
        }
      },
      "interpolate-lab": {
        "doc": "Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). Works like `interpolate`, but the output type must be `color`, and the interpolation is performed in the CIELAB color space.",
        "group": "Ramps, scales, curves",
        "sdk-support": {
          "basic functionality": {
            "js": "0.49.0"
          }
        }
      },
      "ln2": {
        "doc": "Returns mathematical constant ln(2).",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "pi": {
        "doc": "Returns the mathematical constant pi.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "e": {
        "doc": "Returns the mathematical constant e.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "typeof": {
        "doc": "Returns a string describing the type of the given value.",
        "group": "Types",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "string": {
        "doc": "Asserts that the input value is a string. If multiple values are provided, each one is evaluated in order until a string is obtained. If none of the inputs are strings, the expression is an error.",
        "group": "Types",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "number": {
        "doc": "Asserts that the input value is a number. If multiple values are provided, each one is evaluated in order until a number is obtained. If none of the inputs are numbers, the expression is an error.",
        "group": "Types",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "boolean": {
        "doc": "Asserts that the input value is a boolean. If multiple values are provided, each one is evaluated in order until a boolean is obtained. If none of the inputs are booleans, the expression is an error.",
        "group": "Types",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "object": {
        "doc": "Asserts that the input value is an object. If multiple values are provided, each one is evaluated in order until an object is obtained. If none of the inputs are objects, the expression is an error.",
        "group": "Types",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "collator": {
        "doc": "Returns a `collator` for use in locale-dependent comparison operations. The `case-sensitive` and `diacritic-sensitive` options default to `false`. The `locale` argument specifies the IETF language tag of the locale to use. If none is provided, the default locale is used. If the requested locale is not available, the `collator` will use a system-defined fallback locale. Use `resolved-locale` to test the results of locale fallback behavior.",
        "group": "Types",
        "sdk-support": {
          "basic functionality": {
            "js": "0.45.0",
            "android": "6.5.0",
            "ios": "4.2.0",
            "macos": "0.9.0"
          }
        }
      },
      "format": {
        "doc": "Returns `formatted` text containing annotations for use in mixed-format `text-field` entries. If set, the `text-font` argument overrides the font specified by the root layout properties. If set, the `font-scale` argument specifies a scaling factor relative to the `text-size` specified in the root layout properties.",
        "group": "Types",
        "sdk-support": {
          "basic functionality": {
            "js": "0.48.0",
            "android": "6.7.0",
            "ios": "4.6.0",
            "macos": "0.12.0"
          }
        }
      },
      "number-format": {
        "doc": "Converts the input number into a string representation using the providing formatting rules. If set, the `locale` argument specifies the locale to use, as a BCP 47 language tag. If set, the `currency` argument specifies an ISO 4217 code to use for currency-style formatting. If set, the `min-fraction-digits` and `max-fraction-digits` arguments specify the minimum and maximum number of fractional digits to include.",
        "group": "Types",
        "sdk-support": {
          "basic functionality": {
            "js": "0.54.0"
          }
        }
      },
      "to-string": {
        "doc": "Converts the input value to a string. If the input is `null`, the result is `\"\"`. If the input is a boolean, the result is `\"true\"` or `\"false\"`. If the input is a number, it is converted to a string as specified by the [\"NumberToString\" algorithm](https://tc39.github.io/ecma262/#sec-tostring-applied-to-the-number-type) of the ECMAScript Language Specification. If the input is a color, it is converted to a string of the form `\"rgba(r,g,b,a)\"`, where `r`, `g`, and `b` are numerals ranging from 0 to 255, and `a` ranges from 0 to 1. Otherwise, the input is converted to a string in the format specified by the [`JSON.stringify`](https://tc39.github.io/ecma262/#sec-json.stringify) function of the ECMAScript Language Specification.",
        "group": "Types",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "to-number": {
        "doc": "Converts the input value to a number, if possible. If the input is `null` or `false`, the result is 0. If the input is `true`, the result is 1. If the input is a string, it is converted to a number as specified by the [\"ToNumber Applied to the String Type\" algorithm](https://tc39.github.io/ecma262/#sec-tonumber-applied-to-the-string-type) of the ECMAScript Language Specification. If multiple values are provided, each one is evaluated in order until the first successful conversion is obtained. If none of the inputs can be converted, the expression is an error.",
        "group": "Types",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "to-boolean": {
        "doc": "Converts the input value to a boolean. The result is `false` when then input is an empty string, 0, `false`, `null`, or `NaN`; otherwise it is `true`.",
        "group": "Types",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "to-rgba": {
        "doc": "Returns a four-element array containing the input color's red, green, blue, and alpha components, in that order.",
        "group": "Color",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "to-color": {
        "doc": "Converts the input value to a color. If multiple values are provided, each one is evaluated in order until the first successful conversion is obtained. If none of the inputs can be converted, the expression is an error.",
        "group": "Types",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "rgb": {
        "doc": "Creates a color value from red, green, and blue components, which must range between 0 and 255, and an alpha component of 1. If any component is out of range, the expression is an error.",
        "group": "Color",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "rgba": {
        "doc": "Creates a color value from red, green, blue components, which must range between 0 and 255, and an alpha component which must range between 0 and 1. If any component is out of range, the expression is an error.",
        "group": "Color",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "get": {
        "doc": "Retrieves a property value from the current feature's properties, or from another object if a second argument is provided. Returns null if the requested property is missing.",
        "group": "Lookup",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "has": {
        "doc": "Tests for the presence of an property value in the current feature's properties, or from another object if a second argument is provided.",
        "group": "Lookup",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "length": {
        "doc": "Gets the length of an array or string.",
        "group": "Lookup",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "properties": {
        "doc": "Gets the feature properties object.  Note that in some cases, it may be more efficient to use [\"get\", \"property_name\"] directly.",
        "group": "Feature data",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "feature-state": {
        "doc": "Retrieves a property value from the current feature's state. Returns null if the requested property is not present on the feature's state. A feature's state is not part of the GeoJSON or vector tile data, and must be set programmatically on each feature. Note that [\"feature-state\"] can only be used with paint properties that support data-driven styling.",
        "group": "Feature data",
        "sdk-support": {
          "basic functionality": {
            "js": "0.46.0"
          }
        }
      },
      "geometry-type": {
        "doc": "Gets the feature's geometry type: Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon.",
        "group": "Feature data",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "id": {
        "doc": "Gets the feature's id, if it has one.",
        "group": "Feature data",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "zoom": {
        "doc": "Gets the current zoom level.  Note that in style layout and paint properties, [\"zoom\"] may only appear as the input to a top-level \"step\" or \"interpolate\" expression.",
        "group": "Zoom",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "heatmap-density": {
        "doc": "Gets the kernel density estimation of a pixel in a heatmap layer, which is a relative measure of how many data points are crowded around a particular pixel. Can only be used in the `heatmap-color` property.",
        "group": "Heatmap",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "line-progress": {
        "doc": "Gets the progress along a gradient line. Can only be used in the `line-gradient` property.",
        "group": "Feature data",
        "sdk-support": {
          "basic functionality": {
            "js": "0.45.0",
            "android": "6.5.0",
            "ios": "4.6.0",
            "macos": "0.12.0"
          }
        }
      },
      "accumulated": {
        "doc": "Gets the value of a cluster property accumulated so far. Can only be used in the `clusterProperties` option of a clustered GeoJSON source.",
        "group": "Feature data",
        "sdk-support": {
          "basic functionality": {
            "js": "0.53.0"
          }
        }
      },
      "+": {
        "doc": "Returns the sum of the inputs.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "*": {
        "doc": "Returns the product of the inputs.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "-": {
        "doc": "For two inputs, returns the result of subtracting the second input from the first. For a single input, returns the result of subtracting it from 0.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "/": {
        "doc": "Returns the result of floating point division of the first input by the second.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "%": {
        "doc": "Returns the remainder after integer division of the first input by the second.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "^": {
        "doc": "Returns the result of raising the first input to the power specified by the second.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "sqrt": {
        "doc": "Returns the square root of the input.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.42.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "log10": {
        "doc": "Returns the base-ten logarithm of the input.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "ln": {
        "doc": "Returns the natural logarithm of the input.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "log2": {
        "doc": "Returns the base-two logarithm of the input.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "sin": {
        "doc": "Returns the sine of the input.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "cos": {
        "doc": "Returns the cosine of the input.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "tan": {
        "doc": "Returns the tangent of the input.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "asin": {
        "doc": "Returns the arcsine of the input.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "acos": {
        "doc": "Returns the arccosine of the input.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "atan": {
        "doc": "Returns the arctangent of the input.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "min": {
        "doc": "Returns the minimum value of the inputs.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "max": {
        "doc": "Returns the maximum value of the inputs.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "round": {
        "doc": "Rounds the input to the nearest integer. Halfway values are rounded away from zero. For example, `[\"round\", -1.5]` evaluates to -2.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.45.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "abs": {
        "doc": "Returns the absolute value of the input.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.45.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "ceil": {
        "doc": "Returns the smallest integer that is greater than or equal to the input.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.45.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "floor": {
        "doc": "Returns the largest integer that is less than or equal to the input.",
        "group": "Math",
        "sdk-support": {
          "basic functionality": {
            "js": "0.45.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "==": {
        "doc": "Returns `true` if the input values are equal, `false` otherwise. The comparison is strictly typed: values of different runtime types are always considered unequal. Cases where the types are known to be different at parse time are considered invalid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
        "group": "Decision",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          },
          "collator": {
            "js": "0.45.0",
            "android": "6.5.0",
            "ios": "4.2.0",
            "macos": "0.9.0"
          }
        }
      },
      "!=": {
        "doc": "Returns `true` if the input values are not equal, `false` otherwise. The comparison is strictly typed: values of different runtime types are always considered unequal. Cases where the types are known to be different at parse time are considered invalid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
        "group": "Decision",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          },
          "collator": {
            "js": "0.45.0",
            "android": "6.5.0",
            "ios": "4.2.0",
            "macos": "0.9.0"
          }
        }
      },
      ">": {
        "doc": "Returns `true` if the first input is strictly greater than the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
        "group": "Decision",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          },
          "collator": {
            "js": "0.45.0",
            "android": "6.5.0",
            "ios": "4.2.0",
            "macos": "0.9.0"
          }
        }
      },
      "<": {
        "doc": "Returns `true` if the first input is strictly less than the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
        "group": "Decision",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          },
          "collator": {
            "js": "0.45.0",
            "android": "6.5.0",
            "ios": "4.2.0",
            "macos": "0.9.0"
          }
        }
      },
      ">=": {
        "doc": "Returns `true` if the first input is greater than or equal to the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
        "group": "Decision",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          },
          "collator": {
            "js": "0.45.0",
            "android": "6.5.0",
            "ios": "4.2.0",
            "macos": "0.9.0"
          }
        }
      },
      "<=": {
        "doc": "Returns `true` if the first input is less than or equal to the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
        "group": "Decision",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          },
          "collator": {
            "js": "0.45.0",
            "android": "6.5.0",
            "ios": "4.2.0",
            "macos": "0.9.0"
          }
        }
      },
      "all": {
        "doc": "Returns `true` if all the inputs are `true`, `false` otherwise. The inputs are evaluated in order, and evaluation is short-circuiting: once an input expression evaluates to `false`, the result is `false` and no further input expressions are evaluated.",
        "group": "Decision",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "any": {
        "doc": "Returns `true` if any of the inputs are `true`, `false` otherwise. The inputs are evaluated in order, and evaluation is short-circuiting: once an input expression evaluates to `true`, the result is `true` and no further input expressions are evaluated.",
        "group": "Decision",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "!": {
        "doc": "Logical negation. Returns `true` if the input is `false`, and `false` if the input is `true`.",
        "group": "Decision",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "is-supported-script": {
        "doc": "Returns `true` if the input string is expected to render legibly. Returns `false` if the input string contains sections that cannot be rendered without potential loss of meaning (e.g. Indic scripts that require complex text shaping, or right-to-left scripts if the the `mapbox-gl-rtl-text` plugin is not in use in Mapbox GL JS).",
        "group": "String"
      },
      "upcase": {
        "doc": "Returns the input string converted to uppercase. Follows the Unicode Default Case Conversion algorithm and the locale-insensitive case mappings in the Unicode Character Database.",
        "group": "String",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "downcase": {
        "doc": "Returns the input string converted to lowercase. Follows the Unicode Default Case Conversion algorithm and the locale-insensitive case mappings in the Unicode Character Database.",
        "group": "String",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "concat": {
        "doc": "Returns a `string` consisting of the concatenation of the inputs. Each input is converted to a string as if by `to-string`.",
        "group": "String",
        "sdk-support": {
          "basic functionality": {
            "js": "0.41.0",
            "android": "6.0.0",
            "ios": "4.0.0",
            "macos": "0.7.0"
          }
        }
      },
      "resolved-locale": {
        "doc": "Returns the IETF language tag of the locale being used by the provided `collator`. This can be used to determine the default system locale, or to determine if a requested locale was successfully loaded.",
        "group": "String",
        "sdk-support": {
          "basic functionality": {
            "js": "0.45.0",
            "android": "6.5.0",
            "ios": "4.2.0",
            "macos": "0.9.0"
          }
        }
      }
    }
  },
  "light": {
    "anchor": {
      "type": "enum",
      "default": "viewport",
      "values": {
        "map": {
          "doc": "The position of the light source is aligned to the rotation of the map."
        },
        "viewport": {
          "doc": "The position of the light source is aligned to the rotation of the viewport."
        }
      },
      "property-type": "data-constant",
      "transition": false,
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "doc": "Whether extruded geometries are lit relative to the map or viewport.",
      "example": "map",
      "sdk-support": {
        "basic functionality": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        }
      }
    },
    "position": {
      "type": "array",
      "default": [
        1.15,
        210,
        30
      ],
      "length": 3,
      "value": "number",
      "property-type": "data-constant",
      "transition": true,
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "doc": "Position of the light source relative to lit (extruded) geometries, in [r radial coordinate, a azimuthal angle, p polar angle] where r indicates the distance from the center of the base of an object to its light, a indicates the position of the light relative to 0° (0° when `light.anchor` is set to `viewport` corresponds to the top of the viewport, or 0° when `light.anchor` is set to `map` corresponds to due north, and degrees proceed clockwise), and p indicates the height of the light (from 0°, directly above, to 180°, directly below).",
      "example": [
        1.5,
        90,
        80
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        }
      }
    },
    "color": {
      "type": "color",
      "property-type": "data-constant",
      "default": "#ffffff",
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "transition": true,
      "doc": "Color tint for lighting extruded geometries.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        }
      }
    },
    "intensity": {
      "type": "number",
      "property-type": "data-constant",
      "default": 0.5,
      "minimum": 0,
      "maximum": 1,
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "transition": true,
      "doc": "Intensity of lighting (on a scale from 0 to 1). Higher numbers will present as more extreme contrast.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        }
      }
    }
  },
  "paint": [
    "paint_fill",
    "paint_line",
    "paint_circle",
    "paint_heatmap",
    "paint_fill-extrusion",
    "paint_symbol",
    "paint_raster",
    "paint_hillshade",
    "paint_background"
  ],
  "paint_fill": {
    "fill-antialias": {
      "type": "boolean",
      "default": true,
      "doc": "Whether or not the fill should be antialiased.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "fill-opacity": {
      "type": "number",
      "default": 1,
      "minimum": 0,
      "maximum": 1,
      "doc": "The opacity of the entire fill layer. In contrast to the `fill-color`, this value will also affect the 1px stroke around the fill, if the stroke is used.",
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.21.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "fill-color": {
      "type": "color",
      "default": "#000000",
      "doc": "The color of the filled part of this layer. This color can be specified as `rgba` with an alpha component and the color's opacity will not affect the opacity of the 1px stroke, if it is used.",
      "transition": true,
      "requires": [
        {
          "!": "fill-pattern"
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.19.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "fill-outline-color": {
      "type": "color",
      "doc": "The outline color of the fill. Matches the value of `fill-color` if unspecified.",
      "transition": true,
      "requires": [
        {
          "!": "fill-pattern"
        },
        {
          "fill-antialias": true
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.19.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "fill-translate": {
      "type": "array",
      "value": "number",
      "length": 2,
      "default": [
        0,
        0
      ],
      "transition": true,
      "units": "pixels",
      "doc": "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "fill-translate-anchor": {
      "type": "enum",
      "values": {
        "map": {
          "doc": "The fill is translated relative to the map."
        },
        "viewport": {
          "doc": "The fill is translated relative to the viewport."
        }
      },
      "doc": "Controls the frame of reference for `fill-translate`.",
      "default": "map",
      "requires": [
        "fill-translate"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "fill-pattern": {
      "type": "string",
      "transition": true,
      "doc": "Name of image in sprite to use for drawing image fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.49.0",
          "android": "6.5.0",
          "macos": "0.11.0",
          "ios": "4.4.0"
        }
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "cross-faded-data-driven"
    }
  },
  "paint_fill-extrusion": {
    "fill-extrusion-opacity": {
      "type": "number",
      "default": 1,
      "minimum": 0,
      "maximum": 1,
      "doc": "The opacity of the entire fill extrusion layer. This is rendered on a per-layer, not per-feature, basis, and data-driven styling is not available.",
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "fill-extrusion-color": {
      "type": "color",
      "default": "#000000",
      "doc": "The base color of the extruded fill. The extrusion's surfaces will be shaded differently based on this color in combination with the root `light` settings. If this color is specified as `rgba` with an alpha component, the alpha component will be ignored; use `fill-extrusion-opacity` to set layer opacity.",
      "transition": true,
      "requires": [
        {
          "!": "fill-extrusion-pattern"
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        },
        "data-driven styling": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "fill-extrusion-translate": {
      "type": "array",
      "value": "number",
      "length": 2,
      "default": [
        0,
        0
      ],
      "transition": true,
      "units": "pixels",
      "doc": "The geometry's offset. Values are [x, y] where negatives indicate left and up (on the flat plane), respectively.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "fill-extrusion-translate-anchor": {
      "type": "enum",
      "values": {
        "map": {
          "doc": "The fill extrusion is translated relative to the map."
        },
        "viewport": {
          "doc": "The fill extrusion is translated relative to the viewport."
        }
      },
      "doc": "Controls the frame of reference for `fill-extrusion-translate`.",
      "default": "map",
      "requires": [
        "fill-extrusion-translate"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "fill-extrusion-pattern": {
      "type": "string",
      "transition": true,
      "doc": "Name of image in sprite to use for drawing images on extruded fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        },
        "data-driven styling": {
          "js": "0.49.0",
          "android": "6.5.0",
          "macos": "0.11.0",
          "ios": "4.4.0"
        }
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "cross-faded-data-driven"
    },
    "fill-extrusion-height": {
      "type": "number",
      "default": 0,
      "minimum": 0,
      "units": "meters",
      "doc": "The height with which to extrude this layer.",
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        },
        "data-driven styling": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "fill-extrusion-base": {
      "type": "number",
      "default": 0,
      "minimum": 0,
      "units": "meters",
      "doc": "The height with which to extrude the base of this layer. Must be less than or equal to `fill-extrusion-height`.",
      "transition": true,
      "requires": [
        "fill-extrusion-height"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        },
        "data-driven styling": {
          "js": "0.27.0",
          "android": "5.1.0",
          "ios": "3.6.0",
          "macos": "0.5.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "fill-extrusion-vertical-gradient": {
      "type": "boolean",
      "default": true,
      "doc": "Whether to apply a vertical gradient to the sides of a fill-extrusion layer. If true, sides will be shaded slightly darker farther down.",
      "transition": false,
      "sdk-support": {
        "basic functionality": {
          "js": "0.50.0",
          "ios": "4.7.0",
          "macos": "0.13.0"
        }
      },
      "expression": {
        "interpolated": false,
        "parameters": ["zoom"]
      },
      "property-type": "data-constant"
    }
  },
  "paint_line": {
    "line-opacity": {
      "type": "number",
      "doc": "The opacity at which the line will be drawn.",
      "default": 1,
      "minimum": 0,
      "maximum": 1,
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.29.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "line-color": {
      "type": "color",
      "doc": "The color with which the line will be drawn.",
      "default": "#000000",
      "transition": true,
      "requires": [
        {
          "!": "line-pattern"
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.23.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "line-translate": {
      "type": "array",
      "value": "number",
      "length": 2,
      "default": [
        0,
        0
      ],
      "transition": true,
      "units": "pixels",
      "doc": "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "line-translate-anchor": {
      "type": "enum",
      "values": {
        "map": {
          "doc": "The line is translated relative to the map."
        },
        "viewport": {
          "doc": "The line is translated relative to the viewport."
        }
      },
      "doc": "Controls the frame of reference for `line-translate`.",
      "default": "map",
      "requires": [
        "line-translate"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "line-width": {
      "type": "number",
      "default": 1,
      "minimum": 0,
      "transition": true,
      "units": "pixels",
      "doc": "Stroke thickness.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.39.0",
          "android": "5.2.0",
          "ios": "3.7.0",
          "macos": "0.6.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "line-gap-width": {
      "type": "number",
      "default": 0,
      "minimum": 0,
      "doc": "Draws a line casing outside of a line's actual path. Value indicates the width of the inner gap.",
      "transition": true,
      "units": "pixels",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.29.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "line-offset": {
      "type": "number",
      "default": 0,
      "doc": "The line's offset. For linear features, a positive value offsets the line to the right, relative to the direction of the line, and a negative value to the left. For polygon features, a positive value results in an inset, and a negative value results in an outset.",
      "transition": true,
      "units": "pixels",
      "sdk-support": {
        "basic functionality": {
          "js": "0.12.1",
          "android": "3.0.0",
          "ios": "3.1.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.29.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "line-blur": {
      "type": "number",
      "default": 0,
      "minimum": 0,
      "transition": true,
      "units": "pixels",
      "doc": "Blur applied to the line, in pixels.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.29.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "line-dasharray": {
      "type": "array",
      "value": "number",
      "doc": "Specifies the lengths of the alternating dashes and gaps that form the dash pattern. The lengths are later scaled by the line width. To convert a dash length to pixels, multiply the length by the current line width. Note that GeoJSON sources with `lineMetrics: true` specified won't render dashed lines to the expected scale. Also note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
      "minimum": 0,
      "transition": true,
      "units": "line widths",
      "requires": [
        {
          "!": "line-pattern"
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "cross-faded"
    },
    "line-pattern": {
      "type": "string",
      "transition": true,
      "doc": "Name of image in sprite to use for drawing image lines. For seamless patterns, image width must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.49.0",
          "android": "6.5.0",
          "macos": "0.11.0",
          "ios": "4.4.0"
        }
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom",
          "feature"
        ]
      },
      "property-type": "cross-faded-data-driven"
    },
    "line-gradient": {
      "type": "color",
      "doc": "Defines a gradient with which to color a line feature. Can only be used with GeoJSON sources that specify `\"lineMetrics\": true`.",
      "transition": false,
      "requires": [
        {
          "!": "line-dasharray"
        },
        {
          "!": "line-pattern"
        },
        {
          "source": "geojson",
          "has": {
            "lineMetrics": true
          }
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.45.0",
          "android": "6.5.0",
          "ios": "4.4.0",
          "macos": "0.11.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "line-progress"
        ]
      },
      "property-type": "color-ramp"
    }
  },
  "paint_circle": {
    "circle-radius": {
      "type": "number",
      "default": 5,
      "minimum": 0,
      "transition": true,
      "units": "pixels",
      "doc": "Circle radius.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.18.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "circle-color": {
      "type": "color",
      "default": "#000000",
      "doc": "The fill color of the circle.",
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.18.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "circle-blur": {
      "type": "number",
      "default": 0,
      "doc": "Amount to blur the circle. 1 blurs the circle such that only the centerpoint is full opacity.",
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.20.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "circle-opacity": {
      "type": "number",
      "doc": "The opacity at which the circle will be drawn.",
      "default": 1,
      "minimum": 0,
      "maximum": 1,
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.20.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "circle-translate": {
      "type": "array",
      "value": "number",
      "length": 2,
      "default": [
        0,
        0
      ],
      "transition": true,
      "units": "pixels",
      "doc": "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "circle-translate-anchor": {
      "type": "enum",
      "values": {
        "map": {
          "doc": "The circle is translated relative to the map."
        },
        "viewport": {
          "doc": "The circle is translated relative to the viewport."
        }
      },
      "doc": "Controls the frame of reference for `circle-translate`.",
      "default": "map",
      "requires": [
        "circle-translate"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "circle-pitch-scale": {
      "type": "enum",
      "values": {
        "map": {
          "doc": "Circles are scaled according to their apparent distance to the camera."
        },
        "viewport": {
          "doc": "Circles are not scaled."
        }
      },
      "default": "map",
      "doc": "Controls the scaling behavior of the circle when the map is pitched.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.21.0",
          "android": "4.2.0",
          "ios": "3.4.0",
          "macos": "0.2.1"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "circle-pitch-alignment": {
      "type": "enum",
      "values": {
        "map": {
          "doc": "The circle is aligned to the plane of the map."
        },
        "viewport": {
          "doc": "The circle is aligned to the plane of the viewport."
        }
      },
      "default": "viewport",
      "doc": "Orientation of circle when map is pitched.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.39.0",
          "android": "5.2.0",
          "ios": "3.7.0",
          "macos": "0.6.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "circle-stroke-width": {
      "type": "number",
      "default": 0,
      "minimum": 0,
      "transition": true,
      "units": "pixels",
      "doc": "The width of the circle's stroke. Strokes are placed outside of the `circle-radius`.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.29.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        },
        "data-driven styling": {
          "js": "0.29.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "circle-stroke-color": {
      "type": "color",
      "default": "#000000",
      "doc": "The stroke color of the circle.",
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.29.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        },
        "data-driven styling": {
          "js": "0.29.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "circle-stroke-opacity": {
      "type": "number",
      "doc": "The opacity of the circle's stroke.",
      "default": 1,
      "minimum": 0,
      "maximum": 1,
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.29.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        },
        "data-driven styling": {
          "js": "0.29.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    }
  },
  "paint_heatmap": {
    "heatmap-radius": {
      "type": "number",
      "default": 30,
      "minimum": 1,
      "transition": true,
      "units": "pixels",
      "doc": "Radius of influence of one heatmap point in pixels. Increasing the value makes the heatmap smoother, but less detailed.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.41.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        },
        "data-driven styling": {
          "js": "0.43.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "heatmap-weight": {
      "type": "number",
      "default": 1,
      "minimum": 0,
      "transition": false,
      "doc": "A measure of how much an individual point contributes to the heatmap. A value of 10 would be equivalent to having 10 points of weight 1 in the same spot. Especially useful when combined with clustering.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.41.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        },
        "data-driven styling": {
          "js": "0.41.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "heatmap-intensity": {
      "type": "number",
      "default": 1,
      "minimum": 0,
      "transition": true,
      "doc": "Similar to `heatmap-weight` but controls the intensity of the heatmap globally. Primarily used for adjusting the heatmap based on zoom level.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.41.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "heatmap-color": {
      "type": "color",
      "default": [
        "interpolate",
        [
          "linear"
        ],
        [
          "heatmap-density"
        ],
        0,
        "rgba(0, 0, 255, 0)",
        0.1,
        "royalblue",
        0.3,
        "cyan",
        0.5,
        "lime",
        0.7,
        "yellow",
        1,
        "red"
      ],
      "doc": "Defines the color of each pixel based on its density value in a heatmap.  Should be an expression that uses `[\"heatmap-density\"]` as input.",
      "transition": false,
      "sdk-support": {
        "basic functionality": {
          "js": "0.41.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "heatmap-density"
        ]
      },
      "property-type": "color-ramp"
    },
    "heatmap-opacity": {
      "type": "number",
      "doc": "The global opacity at which the heatmap layer will be drawn.",
      "default": 1,
      "minimum": 0,
      "maximum": 1,
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.41.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    }
  },
  "paint_symbol": {
    "icon-opacity": {
      "doc": "The opacity at which the icon will be drawn.",
      "type": "number",
      "default": 1,
      "minimum": 0,
      "maximum": 1,
      "transition": true,
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.33.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "icon-color": {
      "type": "color",
      "default": "#000000",
      "transition": true,
      "doc": "The color of the icon. This can only be used with sdf icons.",
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.33.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "icon-halo-color": {
      "type": "color",
      "default": "rgba(0, 0, 0, 0)",
      "transition": true,
      "doc": "The color of the icon's halo. Icon halos can only be used with SDF icons.",
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.33.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "icon-halo-width": {
      "type": "number",
      "default": 0,
      "minimum": 0,
      "transition": true,
      "units": "pixels",
      "doc": "Distance of halo to the icon outline.",
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.33.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "icon-halo-blur": {
      "type": "number",
      "default": 0,
      "minimum": 0,
      "transition": true,
      "units": "pixels",
      "doc": "Fade out the halo towards the outside.",
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.33.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "icon-translate": {
      "type": "array",
      "value": "number",
      "length": 2,
      "default": [
        0,
        0
      ],
      "transition": true,
      "units": "pixels",
      "doc": "Distance that the icon's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.",
      "requires": [
        "icon-image"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "icon-translate-anchor": {
      "type": "enum",
      "values": {
        "map": {
          "doc": "Icons are translated relative to the map."
        },
        "viewport": {
          "doc": "Icons are translated relative to the viewport."
        }
      },
      "doc": "Controls the frame of reference for `icon-translate`.",
      "default": "map",
      "requires": [
        "icon-image",
        "icon-translate"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "text-opacity": {
      "type": "number",
      "doc": "The opacity at which the text will be drawn.",
      "default": 1,
      "minimum": 0,
      "maximum": 1,
      "transition": true,
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.33.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "text-color": {
      "type": "color",
      "doc": "The color with which the text will be drawn.",
      "default": "#000000",
      "transition": true,
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.33.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "text-halo-color": {
      "type": "color",
      "default": "rgba(0, 0, 0, 0)",
      "transition": true,
      "doc": "The color of the text's halo, which helps it stand out from backgrounds.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.33.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "text-halo-width": {
      "type": "number",
      "default": 0,
      "minimum": 0,
      "transition": true,
      "units": "pixels",
      "doc": "Distance of halo to the font outline. Max text halo width is 1/4 of the font-size.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.33.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "text-halo-blur": {
      "type": "number",
      "default": 0,
      "minimum": 0,
      "transition": true,
      "units": "pixels",
      "doc": "The halo's fadeout distance towards the outside.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {
          "js": "0.33.0",
          "android": "5.0.0",
          "ios": "3.5.0",
          "macos": "0.4.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "text-translate": {
      "type": "array",
      "value": "number",
      "length": 2,
      "default": [
        0,
        0
      ],
      "transition": true,
      "units": "pixels",
      "doc": "Distance that the text's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.",
      "requires": [
        "text-field"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "text-translate-anchor": {
      "type": "enum",
      "values": {
        "map": {
          "doc": "The text is translated relative to the map."
        },
        "viewport": {
          "doc": "The text is translated relative to the viewport."
        }
      },
      "doc": "Controls the frame of reference for `text-translate`.",
      "default": "map",
      "requires": [
        "text-field",
        "text-translate"
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    }
  },
  "paint_raster": {
    "raster-opacity": {
      "type": "number",
      "doc": "The opacity at which the image will be drawn.",
      "default": 1,
      "minimum": 0,
      "maximum": 1,
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "raster-hue-rotate": {
      "type": "number",
      "default": 0,
      "period": 360,
      "transition": true,
      "units": "degrees",
      "doc": "Rotates hues around the color wheel.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "raster-brightness-min": {
      "type": "number",
      "doc": "Increase or reduce the brightness of the image. The value is the minimum brightness.",
      "default": 0,
      "minimum": 0,
      "maximum": 1,
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "raster-brightness-max": {
      "type": "number",
      "doc": "Increase or reduce the brightness of the image. The value is the maximum brightness.",
      "default": 1,
      "minimum": 0,
      "maximum": 1,
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "raster-saturation": {
      "type": "number",
      "doc": "Increase or reduce the saturation of the image.",
      "default": 0,
      "minimum": -1,
      "maximum": 1,
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "raster-contrast": {
      "type": "number",
      "doc": "Increase or reduce the contrast of the image.",
      "default": 0,
      "minimum": -1,
      "maximum": 1,
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "raster-resampling": {
      "type": "enum",
      "doc": "The resampling/interpolation method to use for overscaling, also known as texture magnification filter",
      "values": {
        "linear": {
          "doc": "(Bi)linear filtering interpolates pixel values using the weighted average of the four closest original source pixels creating a smooth but blurry look when overscaled"
        },
        "nearest": {
          "doc": "Nearest neighbor filtering interpolates pixel values using the nearest original source pixel creating a sharp but pixelated look when overscaled"
        }
      },
      "default": "linear",
      "sdk-support": {
        "basic functionality": {
          "js": "0.47.0",
          "android": "6.3.0",
          "ios": "4.2.0",
          "macos": "0.9.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "raster-fade-duration": {
      "type": "number",
      "default": 300,
      "minimum": 0,
      "transition": false,
      "units": "milliseconds",
      "doc": "Fade duration when a new tile is added.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    }
  },
  "paint_hillshade": {
    "hillshade-illumination-direction": {
      "type": "number",
      "default": 335,
      "minimum": 0,
      "maximum": 359,
      "doc": "The direction of the light source used to generate the hillshading with 0 as the top of the viewport if `hillshade-illumination-anchor` is set to `viewport` and due north if `hillshade-illumination-anchor` is set to `map`.",
      "transition": false,
      "sdk-support": {
        "basic functionality": {
          "js": "0.43.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "hillshade-illumination-anchor": {
      "type": "enum",
      "values": {
        "map": {
          "doc": "The hillshade illumination is relative to the north direction."
        },
        "viewport": {
          "doc": "The hillshade illumination is relative to the top of the viewport."
        }
      },
      "default": "viewport",
      "doc": "Direction of light source when map is rotated.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.43.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "hillshade-exaggeration": {
      "type": "number",
      "doc": "Intensity of the hillshade",
      "default": 0.5,
      "minimum": 0,
      "maximum": 1,
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.43.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "hillshade-shadow-color": {
      "type": "color",
      "default": "#000000",
      "doc": "The shading color of areas that face away from the light source.",
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.43.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "hillshade-highlight-color": {
      "type": "color",
      "default": "#FFFFFF",
      "doc": "The shading color of areas that faces towards the light source.",
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.43.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "hillshade-accent-color": {
      "type": "color",
      "default": "#000000",
      "doc": "The shading color used to accentuate rugged terrain like sharp cliffs and gorges.",
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.43.0",
          "android": "6.0.0",
          "ios": "4.0.0",
          "macos": "0.7.0"
        },
        "data-driven styling": {}
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    }
  },
  "paint_background": {
    "background-color": {
      "type": "color",
      "default": "#000000",
      "doc": "The color with which the background will be drawn.",
      "transition": true,
      "requires": [
        {
          "!": "background-pattern"
        }
      ],
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "background-pattern": {
      "type": "string",
      "transition": true,
      "doc": "Name of image in sprite to use for drawing an image background. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        }
      },
      "expression": {
        "interpolated": false,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "cross-faded"
    },
    "background-opacity": {
      "type": "number",
      "default": 1,
      "minimum": 0,
      "maximum": 1,
      "doc": "The opacity at which the background will be drawn.",
      "transition": true,
      "sdk-support": {
        "basic functionality": {
          "js": "0.10.0",
          "android": "2.0.1",
          "ios": "2.0.0",
          "macos": "0.1.0"
        }
      },
      "expression": {
        "interpolated": true,
        "parameters": [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    }
  },
  "transition": {
    "duration": {
      "type": "number",
      "default": 300,
      "minimum": 0,
      "units": "milliseconds",
      "doc": "Time allotted for transitions to complete."
    },
    "delay": {
      "type": "number",
      "default": 0,
      "minimum": 0,
      "units": "milliseconds",
      "doc": "Length of time before a transition begins."
    }
  },
  "property-type": {
    "data-driven": {
      "type": "property-type",
      "doc": "Property is interpolable and can be represented using a property expression."
    },
    "cross-faded": {
      "type": "property-type",
      "doc": "Property is non-interpolable; rather, its values will be cross-faded to smoothly transition between integer zooms."
    },
    "cross-faded-data-driven": {
      "type": "property-type",
      "doc": "Property is non-interpolable; rather, its values will be cross-faded to smoothly transition between integer zooms. It can be represented using a property expression."
    },
    "color-ramp": {
      "type": "property-type",
      "doc": "Property should be specified using a color ramp from which the output color can be sampled based on a property calculation."
    },
    "data-constant": {
      "type": "property-type",
      "doc": "Property is interpolable but cannot be represented using a property expression."
    },
    "constant": {
      "type": "property-type",
      "doc": "Property is constant across all zoom levels and property values."
    }
  }
}
export default spec;