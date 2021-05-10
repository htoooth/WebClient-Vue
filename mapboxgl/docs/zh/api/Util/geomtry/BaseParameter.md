# BaseParameter

## constructor

### `layers`

- **类型:** [Number]
- **Non-Synced**
- **默认值** []
- **描述:** 图层ID或者数据库地址
- **示例:**
```
    图层ID: [0,1,2,...]
    数据库地址: "gdbp://MapGISLocalPlus/wuhan_new/sfcls/武汉市"
```

### `pageIndex`

- **类型:** Number
- **默认值** 0
- **Non-Synced**
- **描述:** 分页的Index

### `pagination`

- **类型:** Number
- **默认值** 100
- **Non-Synced**
- **描述:** 分页的数据条数

### `resultFormat`

- **类型:** String
- **默认值** "json"
- **Non-Synced**
- **描述:** 返回数据的格式,可选值json|xml

### `IncludeAttribute`

- **类型:** Boolean
- **默认值** true
- **Non-Synced**
- **描述:** 是否返回要素的属性信息，可选值true|false

### `IncludeGeometry`

- **类型:** Boolean
- **默认值** true
- **Non-Synced**
- **描述:** 是否返回要素的几何信息，可选值true|false

### `IncludeWebGraphic`

- **类型:** Boolean
- **默认值** true
- **Non-Synced**
- **描述:** 是否返回要素的样式信息，可选值true|false

### `orderBy`

- **类型:** String
- **Non-Synced**
- **描述:** 以某个字段进行排序，配合isAsc使用

### `isAsc`

- **类型:** Boolean
- **Non-Synced**
- **描述:** 是否以orderBy的值进行排序，true升序，false降序，可选值true|false

### `proj`

- **类型:** String
- **Non-Synced**
- **描述:** 指定返回的要素的坐标系
- **示例:** "EPSG:4326"

### `fields`

- **类型:** String
- **Non-Synced**
- **描述:** 指定返回的字段，多个字段以逗号分隔，不指定时返货所有字段
- **示例:** "Name,age"返回的要素属性信息仅包含Name,age两个字段

### `coordPrecision`

- **类型:** Number
- **Non-Synced**
- **描述:** 返回的要素的几何信息的小数点位数
