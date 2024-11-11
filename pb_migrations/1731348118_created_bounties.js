/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4vk4jorbjusek06",
    "created": "2024-11-11 18:01:58.330Z",
    "updated": "2024-11-11 18:01:58.330Z",
    "name": "bounties",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0i6aluqx",
        "name": "Name",
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
        "id": "lkq9biyf",
        "name": "Description",
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
        "id": "d1817bw3",
        "name": "Image",
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
      },
      {
        "system": false,
        "id": "smuxthay",
        "name": "Status",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Draft",
            "In Progress",
            "Completed",
            "Under Review"
          ]
        }
      },
      {
        "system": false,
        "id": "btzdllfj",
        "name": "Contact_Info",
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
  const collection = dao.findCollectionByNameOrId("4vk4jorbjusek06");

  return dao.deleteCollection(collection);
})
