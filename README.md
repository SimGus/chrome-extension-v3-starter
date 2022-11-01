# Eater to Google Maps

## Background

I love Eater. But I don't love having to click on each place in the Eater list and add it to my Google Maps saved places. 

Enter `Eater to Google Maps`!

## `Code`

### Background Script

#### `service-worker.js`

The service worker runs in the background and listens for messages, kicking off actions in response to specific messages. These include opening the Google Maps list creation page and opening the Google Maps location page so it can be saved to a list. 

### Content Scripts

#### `parseEaterListData.js`

This file runs on any page that matches `*.eater.com/maps/*`, the URL pattern for an Eater list. 

It takes the title of the article and all of the google maps links and stores them in Chrome storage. It then sends a message to notify the service worker to kick off the next task.

#### `createMapsList.js`

This file runs on any page that matches `google.com/maps/*/data=!4m2!10m1!1e1`, the page to create a new list.

It reads the name of the Eater article from chrome storage and creates a new list with the title `Eater - {LIST_NAME}`. It then sends a message to notify the service worker to start adding places to the list.

#### `addPlaceToList.js`

This file runs on any page that matches `google.com/maps/search/*`, which display places on the Eater list. 

It handles the logic of clicking on the "Save" button, adding the place to the right list, and then sends a message to notify the service worker to move on to the next place on the list.
