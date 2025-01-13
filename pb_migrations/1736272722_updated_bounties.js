/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4vk4jorbjusek06")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sdo6mum3",
    "name": "organization",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Main Forum",
        "Cybersecurity",
        "CSHS"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cb5gxfdx",
    "name": "additional_documents",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 99,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "avk6uzuh",
    "name": "date",
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
  const collection = dao.findCollectionByNameOrId("4vk4jorbjusek06")

  // remove
  collection.schema.removeField("sdo6mum3")

  // remove
  collection.schema.removeField("cb5gxfdx")

  // remove
  collection.schema.removeField("avk6uzuh")

  return dao.saveCollection(collection)
})
