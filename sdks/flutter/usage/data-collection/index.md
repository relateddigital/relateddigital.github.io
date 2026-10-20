---
title: "Data Collection"
sidebar_position: 3
mdx:
  format: md
---

<a id="data-collection"></a>

# Data Collection

Related Digital uses events to collect data from mobile applications. The developer needs to implement the methods provided by SDK. `customEvent`  is a generic method to track user events. `customEvent`  takes 2 parameters: pageName and properties.

* **pageName** : The current page of your application. If your event is not related to a page view, you should pass a value related to the event. If you pass an empty **String** the event would be considered invalid and discarded.
* **parameters** : A collection of key/value pairs related to the event. If your event does not have additional data apart from page name, passing an empty **Map** acceptable.

Some of the most common events:
