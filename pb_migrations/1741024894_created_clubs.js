/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "wh11mz7z482lekr",
    "created": "2025-03-03 18:01:34.404Z",
    "updated": "2025-03-03 18:01:34.404Z",
    "name": "clubs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qdj4gjzm",
        "name": "club_name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "l2cpvrlm",
        "name": "club_description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("wh11mz7z482lekr");

  return dao.deleteCollection(collection);
})
