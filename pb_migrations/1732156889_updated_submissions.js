/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("owumpemp2pxghsw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uq2o5zdw",
    "name": "submitted_by",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2mpjmxk1",
    "name": "content",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6er0cv4m",
    "name": "approval_status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Pending",
        "Approved",
        "Rejected"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iaetzn8e",
    "name": "additional_notes",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("owumpemp2pxghsw")

  // remove
  collection.schema.removeField("uq2o5zdw")

  // remove
  collection.schema.removeField("2mpjmxk1")

  // remove
  collection.schema.removeField("6er0cv4m")

  // remove
  collection.schema.removeField("iaetzn8e")

  return dao.saveCollection(collection)
})
