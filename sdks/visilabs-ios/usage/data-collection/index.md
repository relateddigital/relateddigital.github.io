---
title: "Data Collection"
sidebar_position: 2
mdx:
  format: md
---

<a id="data-collection"></a>

# Data Collection

Vislabs uses events to collect data from IOS applications. The developer needs to implement the methods provided by SDK. `customEvent`  is a generic method to track user events. `customEvent`  takes 2 parameters: pageName and properties.

* **pageName** : The current page of your application. If your event is not related to a page view, you should pass a value related to the event. If you pass an empty **String** the event would be considered invalid and discarded.
* **properties** : A collection of key/value pairs related to the event. If your event does not have additional data apart from page name, passing an empty dictionary acceptable.

In SDK, apart from `customEvent`, there are 2 other methods to collect data: `login` and `signUp`.  As in the `customEvent` method, the `login` and `signUp` methods also take a mandatory and an optional parameter. The first parameter is `exVisitorId`  which uniquely identifies the user and can not be empty. The second parameter `properties`  is optional and passsing an empty dictionary also valid.

Some of the most common events:
