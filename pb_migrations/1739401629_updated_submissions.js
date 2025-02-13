/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("owumpemp2pxghsw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wlvnmiht",
    "name": "contact_info",
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
  collection.schema.removeField("wlvnmiht")

  return dao.saveCollection(collection)
})
