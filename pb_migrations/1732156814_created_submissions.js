/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "owumpemp2pxghsw",
    "created": "2024-11-21 02:40:14.632Z",
    "updated": "2024-11-21 02:40:14.632Z",
    "name": "submissions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6ocemndd",
        "name": "bounty_id",
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
  const collection = dao.findCollectionByNameOrId("owumpemp2pxghsw");

  return dao.deleteCollection(collection);
})
