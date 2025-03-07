/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wh11mz7z482lekr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f52j9apj",
    "name": "leader_emails",
    "type": "email",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wh11mz7z482lekr")

  // remove
  collection.schema.removeField("f52j9apj")

  return dao.saveCollection(collection)
})
