# 综合查询

## Props

### `logo`

- **类型:** `String`
- **非侦听属性**
- **描述:** 查询框的左侧图标

### `districtName`

- **类型:** `String`
- **非侦听属性**
- **描述:** 查询框的左侧文字

### `defaultMarkerIcon`

- **类型:** `String`
- **非侦听属性**
- **描述:** 标注默认图标

### `selectedMarkerIcon`

- **类型:** `String`
- **非侦听属性**
- **描述:** 标注选中图标

### `geoJSONExtent`

- **类型:** `Object|GeoJson`
- **非侦听属性**
- **描述:** 查询范围

### `widgetInfo`

- **类型:** `Object`
- **非侦听属性**
- **描述:** 综合查询查询配置信息
- **示例:**

```vue
{ placeName: { ip: "192.168.21.191", port: "6163", combine: "true", queryWay:
"gdbp", docName: "", showType: "normal", clusterMaxCount: "1000", allSearchName:
"NAME", allShows: "NAME:名称,ADDRESS:地址,TELEPHONE:联系方式,PAC:邮政编码",
queryTable: [ { gdbp:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015LYJD",
gdbpText:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015LYJD",
placeName: "旅游景点", color: "#FF8C69", LayerName: "D430000DM2015LYJD",
LayerIndex: "", searchField: "NAME", attrs: [ "ID", "ELEMID", "ADDNAME",
"CONTINENT", "COUNTRY", "PROVINCE", "CITY", "DISTRICT", "TOWN", "VILLAGE",
"STREET", "RESIDENT", "DOORPN", "BUILDING", "ADDCODE", "LON", "LAT", "CLASID",
"NAME", "OTHERNAME", "OLDNAME", "ENAME", "ADDRESS", "TELEPHONE", "ZIPCODE",
"FAX", "PAC", "TYPE", "OTHERTYPE", "EMAIL", "IMPORTANCE", "COLDATE", "UPDATE_",
"ENDDATE", "REMARK", "CITYCODENE", "DATASOURCE", "STACODE", "TYPENAME1",
"TYPENAME2", "SOURCE", "SOURCE1", "NID", "PRODATE", "FROM_STATEID",
"TO_STATEID", "mpLayer", ], showAttrsAndTitle: [ { attr: "NAME", showName:
"名称", }, { attr: "ADDRESS", showName: "地址", }, { attr: "TELEPHONE",
showName: "联系方式", }, { attr: "PAC", showName: "邮政编码", }, ], allUse:
true, }, { gdbp:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015GGSS",
gdbpText:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015GGSS",
placeName: "公共设施", color: "#FFE5B4", LayerName: "D430000DM2015GGSS",
searchField: "NAME", attrs: [ "ID", "ELEMID", "ADDNAME", "CONTINENT", "COUNTRY",
"PROVINCE", "CITY", "DISTRICT", "TOWN", "VILLAGE", "STREET", "RESIDENT",
"DOORPN", "BUILDING", "ADDCODE", "LON", "LAT", "CLASID", "NAME", "OTHERNAME",
"OLDNAME", "ENAME", "ADDRESS", "TELEPHONE", "ZIPCODE", "FAX", "PAC", "TYPE",
"OTHERTYPE", "EMAIL", "IMPORTANCE", "COLDATE", "UPDATE_", "ENDDATE", "REMARK",
"CITYCODENE", "DATASOURCE", "STACODE", "TYPENAME1", "TYPENAME2", "SOURCE",
"SOURCE1", "NID", "PRODATE", "FROM_STATEID", "TO_STATEID", "mpLayer", ],
showAttrsAndTitle: [ { attr: "NAME", showName: "名称", }, { attr: "ADDRESS",
showName: "地址", }, { attr: "TELEPHONE", showName: "联系方式", }, { attr:
"PAC", showName: "邮政编码", }, ], allUse: false, }, { gdbp:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015CYMS",
gdbpText:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015CYMS",
placeName: "餐饮美食", color: "#DA70D6", LayerName: "D430000DM2015CYMS",
LayerIndex: "", searchField: "NAME", attrs: [ "ID", "ELEMID", "ADDNAME",
"CONTINENT", "COUNTRY", "PROVINCE", "CITY", "DISTRICT", "TOWN", "VILLAGE",
"STREET", "RESIDENT", "DOORPN", "BUILDING", "ADDCODE", "LON", "LAT", "CLASID",
"NAME", "OTHERNAME", "OLDNAME", "ENAME", "ADDRESS", "TELEPHONE", "ZIPCODE",
"FAX", "PAC", "TYPE", "OTHERTYPE", "EMAIL", "IMPORTANCE", "COLDATE", "UPDATE_",
"ENDDATE", "REMARK", "CITYCODENE", "DATASOURCE", "STACODE", "TYPENAME1",
"TYPENAME2", "SOURCE", "SOURCE1", "NID", "PRODATE", "FROM_STATEID",
"TO_STATEID", "mpLayer", ], showAttrsAndTitle: [ { attr: "NAME", showName:
"名称", }, { attr: "ADDRESS", showName: "地址", }, { attr: "TELEPHONE",
showName: "联系方式", }, { attr: "PAC", showName: "邮政编码", }, ], allUse:
false, }, { gdbp: "gdbp://sys:sa@ORCL/HN/ds/地名地址/sfcls/D430000DM2015YDXX",
gdbpText: "gdbp://@ORCL/HN/ds/地名地址/sfcls/D430000DM2015YDXX", placeName:
"运动休闲", color: "#CC5500", LayerName: "D430000DM2015YDXX", searchField:
"NAME", attrs: [ "ID", "ELEMID", "ADDNAME", "CONTINENT", "COUNTRY", "PROVINCE",
"CITY", "DISTRICT", "TOWN", "VILLAGE", "STREET", "RESIDENT", "DOORPN",
"BUILDING", "ADDCODE", "LON", "LAT", "CLASID", "NAME", "OTHERNAME", "OLDNAME",
"ENAME", "ADDRESS", "TELEPHONE", "ZIPCODE", "FAX", "PAC", "TYPE", "OTHERTYPE",
"EMAIL", "IMPORTANCE", "COLDATE", "UPDATE_", "ENDDATE", "REMARK", "CITYCODENE",
"DATASOURCE", "STACODE", "TYPENAME1", "TYPENAME2", "SOURCE", "SOURCE1", "NID",
"PRODATE", "FROM_STATEID", "TO_STATEID", "mpLayer", ], showAttrsAndTitle: [ {
attr: "NAME", showName: "名称", }, { attr: "ADDRESS", showName: "地址", }, {
attr: "TELEPHONE", showName: "联系方式", }, { attr: "PAC", showName: "邮政编码",
}, ], allUse: false, }, { gdbp:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015GW",
gdbpText:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015GW",
placeName: "购物", color: "#50C878", LayerName: "D430000DM2015GW", searchField:
"NAME", attrs: [ "ID", "ELEMID", "ADDNAME", "CONTINENT", "COUNTRY", "PROVINCE",
"CITY", "DISTRICT", "TOWN", "VILLAGE", "STREET", "RESIDENT", "DOORPN",
"BUILDING", "ADDCODE", "LON", "LAT", "CLASID", "NAME", "OTHERNAME", "OLDNAME",
"ENAME", "ADDRESS", "TELEPHONE", "ZIPCODE", "FAX", "PAC", "TYPE", "OTHERTYPE",
"EMAIL", "IMPORTANCE", "COLDATE", "UPDATE_", "ENDDATE", "REMARK", "CITYCODENE",
"DATASOURCE", "STACODE", "TYPENAME1", "TYPENAME2", "SOURCE", "SOURCE1", "NID",
"PRODATE", "FROM_STATEID", "TO_STATEID", "mpLayer", ], showAttrsAndTitle: [ {
attr: "NAME", showName: "名称", }, { attr: "ADDRESS", showName: "地址", }, {
attr: "TELEPHONE", showName: "联系方式", }, { attr: "PAC", showName: "邮政编码",
}, ], allUse: false, }, { gdbp:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015BGJD",
gdbpText:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015BGJD",
placeName: "宾馆酒店", color: "#556B2F", LayerName: "D430000DM2015BGJD",
LayerIndex: "", searchField: "NAME", attrs: [ "ID", "ELEMID", "ADDNAME",
"CONTINENT", "COUNTRY", "PROVINCE", "CITY", "DISTRICT", "TOWN", "VILLAGE",
"STREET", "RESIDENT", "DOORPN", "BUILDING", "ADDCODE", "LON", "LAT", "CLASID",
"NAME", "OTHERNAME", "OLDNAME", "ENAME", "ADDRESS", "TELEPHONE", "ZIPCODE",
"FAX", "PAC", "TYPE", "OTHERTYPE", "URL", "EMAIL", "BRAND", "ABBRE",
"IMPORTANCE", "COLDATE", "UPDATE_", "ENDDATE", "REMARK", "ABBREVIATI",
"CITYCODENE", "DATASOURCE", "STACODE", "TYPENAME1", "TYPENAME2", "NOTE_",
"SOURCE", "SOURCE1", "NID", "PRODATE", "CODE", "YSDM", "CYM", "SJXZQM", "BZ",
"PCODE", "DZMMSJ", "XSCC", "DMLBDM_D", "DMLBDM_Z", "JC2", "aa", "OBJECTID",
"ERRCODE", "FROM_STATEID", "TO_STATEID", "mpLayer", ], showAttrsAndTitle: [ {
attr: "NAME", showName: "名称", }, { attr: "ADDRESS", showName: "地址", }, {
attr: "TELEPHONE", showName: "联系方式", }, { attr: "PAC", showName: "邮政编码",
}, ], allUse: false, }, { gdbp:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015JRHY",
gdbpText:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015JRHY",
placeName: "金融行业", color: "#8A2BE2", LayerName: "D430000DM2015JRHY",
LayerIndex: "", searchField: "NAME", attrs: [ "ID", "ELEMID", "ADDNAME",
"CONTINENT", "COUNTRY", "PROVINCE", "CITY", "DISTRICT", "TOWN", "VILLAGE",
"STREET", "RESIDENT", "DOORPN", "BUILDING", "ADDCODE", "LON", "LAT", "CLASID",
"NAME", "OTHERNAME", "OLDNAME", "ENAME", "ADDRESS", "TELEPHONE", "ZIPCODE",
"FAX", "PAC", "TYPE", "OTHERTYPE", "EMAIL", "IMPORTANCE", "COLDATE", "UPDATE_",
"ENDDATE", "REMARK", "CITYCODENE", "DATASOURCE", "STACODE", "TYPENAME1",
"TYPENAME2", "SOURCE", "SOURCE1", "NID", "PRODATE", "FROM_STATEID",
"TO_STATEID", "mpLayer", ], showAttrsAndTitle: [ { attr: "NAME", showName:
"名称", }, { attr: "ADDRESS", showName: "地址", }, { attr: "TELEPHONE",
showName: "联系方式", }, { attr: "PAC", showName: "邮政编码", }, ], allUse:
false, }, { gdbp:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015GSQY",
gdbpText:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015GSQY",
placeName: "公司企业", color: "#FF1493", LayerName: "D430000DM2015GSQY",
LayerIndex: "", searchField: "NAME", attrs: [ "ID", "ELEMID", "ADDNAME",
"CONTINENT", "COUNTRY", "PROVINCE", "CITY", "DISTRICT", "TOWN", "VILLAGE",
"STREET", "RESIDENT", "DOORPN", "BUILDING", "ADDCODE", "LON", "LAT", "CLASID",
"NAME", "OTHERNAME", "OLDNAME", "ENAME", "ADDRESS", "TELEPHONE", "ZIPCODE",
"FAX", "PAC", "TYPE", "OTHERTYPE", "EMAIL", "IMPORTANCE", "COLDATE", "UPDATE_",
"ENDDATE", "REMARK", "CITYCODENE", "DATASOURCE", "STACODE", "TYPENAME1",
"TYPENAME2", "SOURCE", "SOURCE1", "NID", "PRODATE", "FROM_STATEID",
"TO_STATEID", "mpLayer", ], showAttrsAndTitle: [ { attr: "NAME", showName:
"名称", }, { attr: "ADDRESS", showName: "地址", }, { attr: "TELEPHONE",
showName: "联系方式", }, { attr: "PAC", showName: "邮政编码", }, ], allUse:
false, }, { gdbp:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015DCXQ",
gdbpText:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015DCXQ",
placeName: "地产小区", color: "#E32636", LayerName: "D430000DM2015DCXQ",
LayerIndex: "", searchField: "NAME", attrs: [ "ID", "ELEMID", "ADDNAME",
"CONTINENT", "COUNTRY", "PROVINCE", "CITY", "DISTRICT", "TOWN", "VILLAGE",
"STREET", "RESIDENT", "DOORPN", "BUILDING", "ADDCODE", "LON", "LAT", "CLASID",
"NAME", "OTHERNAME", "OLDNAME", "ENAME", "ADDRESS", "TELEPHONE", "ZIPCODE",
"FAX", "PAC", "TYPE", "OTHERTYPE", "EMAIL", "IMPORTANCE", "COLDATE", "UPDATE_",
"ENDDATE", "REMARK", "CITYCODENE", "DATASOURCE", "STACODE", "TYPENAME1",
"TYPENAME2", "SOURCE", "SOURCE1", "NID", "PRODATE", "FROM_STATEID",
"TO_STATEID", "mpLayer", ], showAttrsAndTitle: [ { attr: "NAME", showName:
"名称", }, { attr: "ADDRESS", showName: "地址", }, { attr: "TELEPHONE",
showName: "联系方式", }, { attr: "PAC", showName: "邮政编码", }, ], allUse:
false, }, { gdbp:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015JTSS",
gdbpText:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015JTSS",
placeName: "交通设施", color: "#DA70D6", LayerName: "D430000DM2015JTSS",
LayerIndex: "", searchField: "NAME", attrs: [ "ID", "ELEMID", "ADDNAME",
"CONTINENT", "COUNTRY", "PROVINCE", "CITY", "DISTRICT", "TOWN", "VILLAGE",
"STREET", "RESIDENT", "DOORPN", "BUILDING", "ADDCODE", "LON", "LAT", "CLASID",
"NAME", "OTHERNAME", "OLDNAME", "ENAME", "ADDRESS", "TELEPHONE", "ZIPCODE",
"FAX", "PAC", "TYPE", "OTHERTYPE", "EMAIL", "IMPORTANCE", "COLDATE", "UPDATE_",
"ENDDATE", "REMARK", "CITYCODENE", "DATASOURCE", "STACODE", "TYPENAME1",
"TYPENAME2", "SOURCE", "SOURCE1", "NID", "PRODATE", "FROM_STATEID",
"TO_STATEID", "mpLayer", ], showAttrsAndTitle: [ { attr: "NAME", showName:
"名称", }, { attr: "ADDRESS", showName: "地址", }, { attr: "TELEPHONE",
showName: "联系方式", }, { attr: "PAC", showName: "邮政编码", }, ], allUse:
false, }, { gdbp:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015JTDM",
gdbpText:
"gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015JTDM",
placeName: "交通地名", color: "#FFCC00", LayerName: "D430000DM2015JTDM",
LayerIndex: "", searchField: "NAME", attrs: [ "ID", "ELEMID", "ADDNAME",
"CONTINENT", "COUNTRY", "PROVINCE", "CITY", "DISTRICT", "TOWN", "VILLAGE",
"STREET", "RESIDENT", "DOORPN", "BUILDING", "ADDCODE", "LON", "LAT", "CLASID",
"NAME", "OTHERNAME", "OLDNAME", "ENAME", "ADDRESS", "TELEPHONE", "ZIPCODE",
"FAX", "PAC", "TYPE", "OTHERTYPE", "EMAIL", "IMPORTANCE", "COLDATE", "UPDATE_",
"ENDDATE", "REMARK", "CITYCODENE", "DATASOURCE", "STACODE", "TYPENAME1",
"TYPENAME2", "SOURCE", "SOURCE1", "NID", "PRODATE", "FROM_STATEID",
"TO_STATEID", "mpLayer", ], showAttrsAndTitle: [ { attr: "NAME", showName:
"名称", }, { attr: "ADDRESS", showName: "地址", }, { attr: "TELEPHONE",
showName: "联系方式", }, { attr: "PAC", showName: "邮政编码", }, ], allUse:
false, }, ], }, }
```

## 槽

### `default`

- **描述:** 卡片默认内容槽，点击左侧 logo 弹出面板