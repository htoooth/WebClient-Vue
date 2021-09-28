export default {
  title: "界面/业务组件/综合查询",
  argTypes:{
    logo: {
      description:"左侧logo"
    },
    districtName: {
      description:"左侧名称"
    },
    defaultMarkerIcon:{
      description:"默认标注图标"
    },
    selectedMarkerIcon:{
      description:"选中标注图标"
    },
    geoJSONExtent:{
      description:"查询范围的geojson"
    },
    widgetInfo:{
      description:"查询配置信息"
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {};
  },
  template: `
      <mapgis-ui-comprehensive-query v-bind="$props"/>
    `,
  methods: {},
});

export const 综合查询 = Template.bind({});
综合查询.args = {
  logo: "static/media/stories/assets/direction.svg",
  districtName: "湖北省",
  defaultMarkerIcon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAbCAYAAAB836/YAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjI0QjQwQjAyNEQ0MTFFN0JBNTlDNkY3RkIwMTA0NjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjI0QjQwQjEyNEQ0MTFFN0JBNTlDNkY3RkIwMTA0NjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MjQ0MUEyNzI0RDQxMUU3QkE1OUM2RjdGQjAxMDQ2NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MjQ0MUEyODI0RDQxMUU3QkE1OUM2RjdGQjAxMDQ2NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoX+N+MAAAG1SURBVHjapJQ5SANREIb/hEVBi0BKjyJgOomVVkpE1EZMKkW0tLaJvYVNFKw8SGVn5YGIUYyCR2cKI6KNpQoWJqVEUDTOkFl92bzNbjY//LBv3sy37/aVSiV0L0KnUfIkeYjcKbEX8jl5m3xqLXhYAPwaUBf5gpwhz5JDZEMcklhGcsLWYiuwn5wlD8JZnHMtNVog/y1NDsK9glIT1gE3yQHUr4DUVgB5+APwLq6NQhYasptVaqbe+REgFim3D+6AlTPg61sLZcaVCYzqMhLDwHTvf3umD6BThqWMFhhVp9yuy4j3VMfGI7bT7lCBrWhcLSrwTZexc1Md283ZAvPqptyS26wZq3QXmozypvzQ2qXvgfVLW2BOBfLhHLNm8G4mT8p2oSN1ylvmkD0qL4w/4DufkgaACWFUXD3+Q8oDLGWOTvfazJEP64AdS43t88WXakqeMCdxzoTU2AJZRb4Q5OcasCfJKTo9sOquxcifmj6Oxe1Ohb/GKOhtQVITT0of6gWylskFpV2QGLwCP8gbSntNYp6BrD3le98p2XABpCcBr8p3w0DWI9nnJtEtMOtyefArwABPOFufcniU/gAAAABJRU5ErkJggg==",
  selectedMarkerIcon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAbCAYAAAB836/YAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjI0NDFBMjUyNEQ0MTFFN0JBNTlDNkY3RkIwMTA0NjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjI0NDFBMjYyNEQ0MTFFN0JBNTlDNkY3RkIwMTA0NjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MjQ0MUEyMzI0RDQxMUU3QkE1OUM2RjdGQjAxMDQ2NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MjQ0MUEyNDI0RDQxMUU3QkE1OUM2RjdGQjAxMDQ2NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pldf8IIAAAHiSURBVHjaYvz//z8DIyMjAzr46mzmBqTCgNgJiGWhwo+BeB8Qr+Lee2oXSC86YEQX/OZirgKkZgOxAwN+cACI07j2nLyN00CgYTZAaiMQCzEQB94BsT/Q0CMYBgINUwVSp4GYn4E08BGITWEuZUKSmEuGYQxQPXNRXAh0HSi89jNQBhyArjwIc2EYViVsbAxsOSUMnJv2gTFbTjEDAwsrLgPBZrBAOfZYzUvNYWAJCIXzWQKAev79Z/g1rQ+bcnvkMJTGpoLZ3QdTzNUTlwtlkA3kZqAccCEb+Aqbij9b1mOKbd2Ay8DXyGF4Hoil0FX8njeDgZGVFehNLwYGYGr4u2c7w+8Fs3AZeA452WQA2dMp9HImMNnMgHl5CczJZILXUDMgYQg0+QuQKqLAwCKoGRiFwzSQ00k0bDrQsCwYhwlNMheIN5Ng2DaoHrzlIRe0EDUnYNhJUOELdN03vAZCDRUFUmeAWA6HYQ+hRdZrgiU2kqH6QOoUKEujSf0CYjOgYRex6WPCmY8gGtqxSLXjMgyvgVDQCcRvkPhvoGIMZBkIdMl3IDUVSWgyVIyBXBeCwFok9npCinFGCloEPYW6WJqQWnBpo9OEXxEwqm+CLCek7kodovhiICIRExM8DAABBgBD8KOM5w279wAAAABJRU5ErkJggg==",
  geoJSONExtent: {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [112.62183224, 29.3164491],
          [113.1326287, 29.3164491],
          [113.1326287, 29.64549654],
          [112.62183224, 29.64549654],
          [112.62183224, 29.3164491],
        ],
      ],
    },
  },
  widgetInfo: {
    placeName: {
      ip: "192.168.21.191",
      port: "6163",
      combine: "true",
      queryWay: "gdbp",
      docName: "",
      showType: "normal",
      clusterMaxCount: "1000",
      allSearchName: "NAME",
      allShows: "NAME:名称,ADDRESS:地址,TELEPHONE:联系方式,PAC:邮政编码",
      queryTable: [
        {
          gdbp:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015LYJD",
          gdbpText:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015LYJD",
          placeName: "旅游景点",
          color: "#FF8C69",
          LayerName: "D430000DM2015LYJD",
          LayerIndex: "",
          searchField: "NAME",
          attrs: [
            "ID",
            "ELEMID",
            "ADDNAME",
            "CONTINENT",
            "COUNTRY",
            "PROVINCE",
            "CITY",
            "DISTRICT",
            "TOWN",
            "VILLAGE",
            "STREET",
            "RESIDENT",
            "DOORPN",
            "BUILDING",
            "ADDCODE",
            "LON",
            "LAT",
            "CLASID",
            "NAME",
            "OTHERNAME",
            "OLDNAME",
            "ENAME",
            "ADDRESS",
            "TELEPHONE",
            "ZIPCODE",
            "FAX",
            "PAC",
            "TYPE",
            "OTHERTYPE",
            "EMAIL",
            "IMPORTANCE",
            "COLDATE",
            "UPDATE_",
            "ENDDATE",
            "REMARK",
            "CITYCODENE",
            "DATASOURCE",
            "STACODE",
            "TYPENAME1",
            "TYPENAME2",
            "SOURCE",
            "SOURCE1",
            "NID",
            "PRODATE",
            "FROM_STATEID",
            "TO_STATEID",
            "mpLayer",
          ],
          showAttrsAndTitle: [
            {
              attr: "NAME",
              showName: "名称",
            },
            {
              attr: "ADDRESS",
              showName: "地址",
            },
            {
              attr: "TELEPHONE",
              showName: "联系方式",
            },
            {
              attr: "PAC",
              showName: "邮政编码",
            },
          ],
          allUse: true,
        },
        {
          gdbp:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015GGSS",
          gdbpText:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015GGSS",
          placeName: "公共设施",
          color: "#FFE5B4",
          LayerName: "D430000DM2015GGSS",
          searchField: "NAME",
          attrs: [
            "ID",
            "ELEMID",
            "ADDNAME",
            "CONTINENT",
            "COUNTRY",
            "PROVINCE",
            "CITY",
            "DISTRICT",
            "TOWN",
            "VILLAGE",
            "STREET",
            "RESIDENT",
            "DOORPN",
            "BUILDING",
            "ADDCODE",
            "LON",
            "LAT",
            "CLASID",
            "NAME",
            "OTHERNAME",
            "OLDNAME",
            "ENAME",
            "ADDRESS",
            "TELEPHONE",
            "ZIPCODE",
            "FAX",
            "PAC",
            "TYPE",
            "OTHERTYPE",
            "EMAIL",
            "IMPORTANCE",
            "COLDATE",
            "UPDATE_",
            "ENDDATE",
            "REMARK",
            "CITYCODENE",
            "DATASOURCE",
            "STACODE",
            "TYPENAME1",
            "TYPENAME2",
            "SOURCE",
            "SOURCE1",
            "NID",
            "PRODATE",
            "FROM_STATEID",
            "TO_STATEID",
            "mpLayer",
          ],
          showAttrsAndTitle: [
            {
              attr: "NAME",
              showName: "名称",
            },
            {
              attr: "ADDRESS",
              showName: "地址",
            },
            {
              attr: "TELEPHONE",
              showName: "联系方式",
            },
            {
              attr: "PAC",
              showName: "邮政编码",
            },
          ],
          allUse: false,
        },
        {
          gdbp:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015CYMS",
          gdbpText:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015CYMS",
          placeName: "餐饮美食",
          color: "#DA70D6",
          LayerName: "D430000DM2015CYMS",
          LayerIndex: "",
          searchField: "NAME",
          attrs: [
            "ID",
            "ELEMID",
            "ADDNAME",
            "CONTINENT",
            "COUNTRY",
            "PROVINCE",
            "CITY",
            "DISTRICT",
            "TOWN",
            "VILLAGE",
            "STREET",
            "RESIDENT",
            "DOORPN",
            "BUILDING",
            "ADDCODE",
            "LON",
            "LAT",
            "CLASID",
            "NAME",
            "OTHERNAME",
            "OLDNAME",
            "ENAME",
            "ADDRESS",
            "TELEPHONE",
            "ZIPCODE",
            "FAX",
            "PAC",
            "TYPE",
            "OTHERTYPE",
            "EMAIL",
            "IMPORTANCE",
            "COLDATE",
            "UPDATE_",
            "ENDDATE",
            "REMARK",
            "CITYCODENE",
            "DATASOURCE",
            "STACODE",
            "TYPENAME1",
            "TYPENAME2",
            "SOURCE",
            "SOURCE1",
            "NID",
            "PRODATE",
            "FROM_STATEID",
            "TO_STATEID",
            "mpLayer",
          ],
          showAttrsAndTitle: [
            {
              attr: "NAME",
              showName: "名称",
            },
            {
              attr: "ADDRESS",
              showName: "地址",
            },
            {
              attr: "TELEPHONE",
              showName: "联系方式",
            },
            {
              attr: "PAC",
              showName: "邮政编码",
            },
          ],
          allUse: false,
        },
        {
          gdbp: "gdbp://sys:sa@ORCL/HN/ds/地名地址/sfcls/D430000DM2015YDXX",
          gdbpText: "gdbp://@ORCL/HN/ds/地名地址/sfcls/D430000DM2015YDXX",
          placeName: "运动休闲",
          color: "#CC5500",
          LayerName: "D430000DM2015YDXX",
          searchField: "NAME",
          attrs: [
            "ID",
            "ELEMID",
            "ADDNAME",
            "CONTINENT",
            "COUNTRY",
            "PROVINCE",
            "CITY",
            "DISTRICT",
            "TOWN",
            "VILLAGE",
            "STREET",
            "RESIDENT",
            "DOORPN",
            "BUILDING",
            "ADDCODE",
            "LON",
            "LAT",
            "CLASID",
            "NAME",
            "OTHERNAME",
            "OLDNAME",
            "ENAME",
            "ADDRESS",
            "TELEPHONE",
            "ZIPCODE",
            "FAX",
            "PAC",
            "TYPE",
            "OTHERTYPE",
            "EMAIL",
            "IMPORTANCE",
            "COLDATE",
            "UPDATE_",
            "ENDDATE",
            "REMARK",
            "CITYCODENE",
            "DATASOURCE",
            "STACODE",
            "TYPENAME1",
            "TYPENAME2",
            "SOURCE",
            "SOURCE1",
            "NID",
            "PRODATE",
            "FROM_STATEID",
            "TO_STATEID",
            "mpLayer",
          ],
          showAttrsAndTitle: [
            {
              attr: "NAME",
              showName: "名称",
            },
            {
              attr: "ADDRESS",
              showName: "地址",
            },
            {
              attr: "TELEPHONE",
              showName: "联系方式",
            },
            {
              attr: "PAC",
              showName: "邮政编码",
            },
          ],
          allUse: false,
        },
        {
          gdbp:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015GW",
          gdbpText:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015GW",
          placeName: "购物",
          color: "#50C878",
          LayerName: "D430000DM2015GW",
          searchField: "NAME",
          attrs: [
            "ID",
            "ELEMID",
            "ADDNAME",
            "CONTINENT",
            "COUNTRY",
            "PROVINCE",
            "CITY",
            "DISTRICT",
            "TOWN",
            "VILLAGE",
            "STREET",
            "RESIDENT",
            "DOORPN",
            "BUILDING",
            "ADDCODE",
            "LON",
            "LAT",
            "CLASID",
            "NAME",
            "OTHERNAME",
            "OLDNAME",
            "ENAME",
            "ADDRESS",
            "TELEPHONE",
            "ZIPCODE",
            "FAX",
            "PAC",
            "TYPE",
            "OTHERTYPE",
            "EMAIL",
            "IMPORTANCE",
            "COLDATE",
            "UPDATE_",
            "ENDDATE",
            "REMARK",
            "CITYCODENE",
            "DATASOURCE",
            "STACODE",
            "TYPENAME1",
            "TYPENAME2",
            "SOURCE",
            "SOURCE1",
            "NID",
            "PRODATE",
            "FROM_STATEID",
            "TO_STATEID",
            "mpLayer",
          ],
          showAttrsAndTitle: [
            {
              attr: "NAME",
              showName: "名称",
            },
            {
              attr: "ADDRESS",
              showName: "地址",
            },
            {
              attr: "TELEPHONE",
              showName: "联系方式",
            },
            {
              attr: "PAC",
              showName: "邮政编码",
            },
          ],
          allUse: false,
        },
        {
          gdbp:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015BGJD",
          gdbpText:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015BGJD",
          placeName: "宾馆酒店",
          color: "#556B2F",
          LayerName: "D430000DM2015BGJD",
          LayerIndex: "",
          searchField: "NAME",
          attrs: [
            "ID",
            "ELEMID",
            "ADDNAME",
            "CONTINENT",
            "COUNTRY",
            "PROVINCE",
            "CITY",
            "DISTRICT",
            "TOWN",
            "VILLAGE",
            "STREET",
            "RESIDENT",
            "DOORPN",
            "BUILDING",
            "ADDCODE",
            "LON",
            "LAT",
            "CLASID",
            "NAME",
            "OTHERNAME",
            "OLDNAME",
            "ENAME",
            "ADDRESS",
            "TELEPHONE",
            "ZIPCODE",
            "FAX",
            "PAC",
            "TYPE",
            "OTHERTYPE",
            "URL",
            "EMAIL",
            "BRAND",
            "ABBRE",
            "IMPORTANCE",
            "COLDATE",
            "UPDATE_",
            "ENDDATE",
            "REMARK",
            "ABBREVIATI",
            "CITYCODENE",
            "DATASOURCE",
            "STACODE",
            "TYPENAME1",
            "TYPENAME2",
            "NOTE_",
            "SOURCE",
            "SOURCE1",
            "NID",
            "PRODATE",
            "CODE",
            "YSDM",
            "CYM",
            "SJXZQM",
            "BZ",
            "PCODE",
            "DZMMSJ",
            "XSCC",
            "DMLBDM_D",
            "DMLBDM_Z",
            "JC2",
            "aa",
            "OBJECTID",
            "ERRCODE",
            "FROM_STATEID",
            "TO_STATEID",
            "mpLayer",
          ],
          showAttrsAndTitle: [
            {
              attr: "NAME",
              showName: "名称",
            },
            {
              attr: "ADDRESS",
              showName: "地址",
            },
            {
              attr: "TELEPHONE",
              showName: "联系方式",
            },
            {
              attr: "PAC",
              showName: "邮政编码",
            },
          ],
          allUse: false,
        },
        {
          gdbp:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015JRHY",
          gdbpText:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015JRHY",
          placeName: "金融行业",
          color: "#8A2BE2",
          LayerName: "D430000DM2015JRHY",
          LayerIndex: "",
          searchField: "NAME",
          attrs: [
            "ID",
            "ELEMID",
            "ADDNAME",
            "CONTINENT",
            "COUNTRY",
            "PROVINCE",
            "CITY",
            "DISTRICT",
            "TOWN",
            "VILLAGE",
            "STREET",
            "RESIDENT",
            "DOORPN",
            "BUILDING",
            "ADDCODE",
            "LON",
            "LAT",
            "CLASID",
            "NAME",
            "OTHERNAME",
            "OLDNAME",
            "ENAME",
            "ADDRESS",
            "TELEPHONE",
            "ZIPCODE",
            "FAX",
            "PAC",
            "TYPE",
            "OTHERTYPE",
            "EMAIL",
            "IMPORTANCE",
            "COLDATE",
            "UPDATE_",
            "ENDDATE",
            "REMARK",
            "CITYCODENE",
            "DATASOURCE",
            "STACODE",
            "TYPENAME1",
            "TYPENAME2",
            "SOURCE",
            "SOURCE1",
            "NID",
            "PRODATE",
            "FROM_STATEID",
            "TO_STATEID",
            "mpLayer",
          ],
          showAttrsAndTitle: [
            {
              attr: "NAME",
              showName: "名称",
            },
            {
              attr: "ADDRESS",
              showName: "地址",
            },
            {
              attr: "TELEPHONE",
              showName: "联系方式",
            },
            {
              attr: "PAC",
              showName: "邮政编码",
            },
          ],
          allUse: false,
        },
        {
          gdbp:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015GSQY",
          gdbpText:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015GSQY",
          placeName: "公司企业",
          color: "#FF1493",
          LayerName: "D430000DM2015GSQY",
          LayerIndex: "",
          searchField: "NAME",
          attrs: [
            "ID",
            "ELEMID",
            "ADDNAME",
            "CONTINENT",
            "COUNTRY",
            "PROVINCE",
            "CITY",
            "DISTRICT",
            "TOWN",
            "VILLAGE",
            "STREET",
            "RESIDENT",
            "DOORPN",
            "BUILDING",
            "ADDCODE",
            "LON",
            "LAT",
            "CLASID",
            "NAME",
            "OTHERNAME",
            "OLDNAME",
            "ENAME",
            "ADDRESS",
            "TELEPHONE",
            "ZIPCODE",
            "FAX",
            "PAC",
            "TYPE",
            "OTHERTYPE",
            "EMAIL",
            "IMPORTANCE",
            "COLDATE",
            "UPDATE_",
            "ENDDATE",
            "REMARK",
            "CITYCODENE",
            "DATASOURCE",
            "STACODE",
            "TYPENAME1",
            "TYPENAME2",
            "SOURCE",
            "SOURCE1",
            "NID",
            "PRODATE",
            "FROM_STATEID",
            "TO_STATEID",
            "mpLayer",
          ],
          showAttrsAndTitle: [
            {
              attr: "NAME",
              showName: "名称",
            },
            {
              attr: "ADDRESS",
              showName: "地址",
            },
            {
              attr: "TELEPHONE",
              showName: "联系方式",
            },
            {
              attr: "PAC",
              showName: "邮政编码",
            },
          ],
          allUse: false,
        },
        {
          gdbp:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015DCXQ",
          gdbpText:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015DCXQ",
          placeName: "地产小区",
          color: "#E32636",
          LayerName: "D430000DM2015DCXQ",
          LayerIndex: "",
          searchField: "NAME",
          attrs: [
            "ID",
            "ELEMID",
            "ADDNAME",
            "CONTINENT",
            "COUNTRY",
            "PROVINCE",
            "CITY",
            "DISTRICT",
            "TOWN",
            "VILLAGE",
            "STREET",
            "RESIDENT",
            "DOORPN",
            "BUILDING",
            "ADDCODE",
            "LON",
            "LAT",
            "CLASID",
            "NAME",
            "OTHERNAME",
            "OLDNAME",
            "ENAME",
            "ADDRESS",
            "TELEPHONE",
            "ZIPCODE",
            "FAX",
            "PAC",
            "TYPE",
            "OTHERTYPE",
            "EMAIL",
            "IMPORTANCE",
            "COLDATE",
            "UPDATE_",
            "ENDDATE",
            "REMARK",
            "CITYCODENE",
            "DATASOURCE",
            "STACODE",
            "TYPENAME1",
            "TYPENAME2",
            "SOURCE",
            "SOURCE1",
            "NID",
            "PRODATE",
            "FROM_STATEID",
            "TO_STATEID",
            "mpLayer",
          ],
          showAttrsAndTitle: [
            {
              attr: "NAME",
              showName: "名称",
            },
            {
              attr: "ADDRESS",
              showName: "地址",
            },
            {
              attr: "TELEPHONE",
              showName: "联系方式",
            },
            {
              attr: "PAC",
              showName: "邮政编码",
            },
          ],
          allUse: false,
        },
        {
          gdbp:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015JTSS",
          gdbpText:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015JTSS",
          placeName: "交通设施",
          color: "#DA70D6",
          LayerName: "D430000DM2015JTSS",
          LayerIndex: "",
          searchField: "NAME",
          attrs: [
            "ID",
            "ELEMID",
            "ADDNAME",
            "CONTINENT",
            "COUNTRY",
            "PROVINCE",
            "CITY",
            "DISTRICT",
            "TOWN",
            "VILLAGE",
            "STREET",
            "RESIDENT",
            "DOORPN",
            "BUILDING",
            "ADDCODE",
            "LON",
            "LAT",
            "CLASID",
            "NAME",
            "OTHERNAME",
            "OLDNAME",
            "ENAME",
            "ADDRESS",
            "TELEPHONE",
            "ZIPCODE",
            "FAX",
            "PAC",
            "TYPE",
            "OTHERTYPE",
            "EMAIL",
            "IMPORTANCE",
            "COLDATE",
            "UPDATE_",
            "ENDDATE",
            "REMARK",
            "CITYCODENE",
            "DATASOURCE",
            "STACODE",
            "TYPENAME1",
            "TYPENAME2",
            "SOURCE",
            "SOURCE1",
            "NID",
            "PRODATE",
            "FROM_STATEID",
            "TO_STATEID",
            "mpLayer",
          ],
          showAttrsAndTitle: [
            {
              attr: "NAME",
              showName: "名称",
            },
            {
              attr: "ADDRESS",
              showName: "地址",
            },
            {
              attr: "TELEPHONE",
              showName: "联系方式",
            },
            {
              attr: "PAC",
              showName: "邮政编码",
            },
          ],
          allUse: false,
        },
        {
          gdbp:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015JTDM",
          gdbpText:
            "gdbp://MYY:zondy123@MapGISLocalPlus/comprehensive-query/sfcls/D430000DM2015JTDM",
          placeName: "交通地名",
          color: "#FFCC00",
          LayerName: "D430000DM2015JTDM",
          LayerIndex: "",
          searchField: "NAME",
          attrs: [
            "ID",
            "ELEMID",
            "ADDNAME",
            "CONTINENT",
            "COUNTRY",
            "PROVINCE",
            "CITY",
            "DISTRICT",
            "TOWN",
            "VILLAGE",
            "STREET",
            "RESIDENT",
            "DOORPN",
            "BUILDING",
            "ADDCODE",
            "LON",
            "LAT",
            "CLASID",
            "NAME",
            "OTHERNAME",
            "OLDNAME",
            "ENAME",
            "ADDRESS",
            "TELEPHONE",
            "ZIPCODE",
            "FAX",
            "PAC",
            "TYPE",
            "OTHERTYPE",
            "EMAIL",
            "IMPORTANCE",
            "COLDATE",
            "UPDATE_",
            "ENDDATE",
            "REMARK",
            "CITYCODENE",
            "DATASOURCE",
            "STACODE",
            "TYPENAME1",
            "TYPENAME2",
            "SOURCE",
            "SOURCE1",
            "NID",
            "PRODATE",
            "FROM_STATEID",
            "TO_STATEID",
            "mpLayer",
          ],
          showAttrsAndTitle: [
            {
              attr: "NAME",
              showName: "名称",
            },
            {
              attr: "ADDRESS",
              showName: "地址",
            },
            {
              attr: "TELEPHONE",
              showName: "联系方式",
            },
            {
              attr: "PAC",
              showName: "邮政编码",
            },
          ],
          allUse: false,
        },
      ],
    },
  },
};

综合查询.parameters = {
  docs: {
    description: {
      // component: Markdown,
    },
  },
};
