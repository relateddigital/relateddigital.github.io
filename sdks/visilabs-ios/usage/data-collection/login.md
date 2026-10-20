---
title: "Login"
sidebar_position: 2
mdx:
  format: md
---

<a id="login"></a>

# Login

Like `signUp` method  `login` method can be called with or without optional parameter `properties`.


```swift
Visilabs.callAPI().login(exVisitorId: "userId")
```

```swift
var properties = [String:String]()
properties["OM.sys.TokenID"] = "F7C5231053E6EC543B8930FB440752E2FE41B2CFC2AA8F4E9C4843D347E6A847" // Token ID to use for push messages
properties["OM.sys.AppID"] = "VisilabsIOSExample" //App ID to use for push messages
Visilabs.callAPI().login(exVisitorId: "userId", properties: properties)
```

Moreover you can add user segment parameters  to `properties`.

```swift
var properties = [String:String]()
properties["OM.vseg1"] = "seg1val" // Visitor Segment 1
properties["OM.vseg2"] = "seg2val" // Visitor Segment 2
properties["OM.vseg3"] = "seg3val" // Visitor Segment 3
properties["OM.vseg4"] = "seg4val" // Visitor Segment 4
properties["OM.vseg5"] = "seg5val" // Visitor Segment 5
properties["OM.bd"] = "1977-03-15" // Birthday
properties["OM.gn"] = "f" // Gender
properties["OM.loc"] = "Bursa" // Location
Visilabs.callAPI().login(exVisitorId: "userId", properties: properties)
```

## Page View

Use the following implementation of `customEvent`  method to record the page name the visitor is currently viewing. You may add extra parameters to properties dictionary or you may leave it empty.

```swift
Visilabs.callAPI().customEvent("Frequently Asked Questions" /*Page Name*/, properties: [String:String]())
```

## Product View

Use the following implementation of `customEvent`  when the user displays a product in the mobile app.

```swift
var properties = [String:String]()
properties["OM.pv"] = "12345" // Product Code
properties["OM.pn"] = "USB Charger" // Product Name
properties["OM.ppr"] = 125.49" // Product Price
properties["OM.pv.1"] = "Sample Brand" // Product Brand
properties["OM.inv"] = "5" // Number of items in stock
Visilabs.callAPI().customEvent("Product View", properties: properties)
```

## Add to Cart

Use the following implementation of `customEvent`  when the user adds items to the cart or removes.

```swift
var properties = [String:String]()
properties["OM.pbid"] = "bid-12345678" // Basket ID
properties["OM.pb"] = "12345;23456" // Product1 Code;Product2 Code
properties["OM.pu"] = "3;1" // Product1 Quantity;Product2 Quantity
properties["OM.ppr"] = "376.47;23.50" // Product1 Price*Product1 Quantity;Product2 Price*Product2 Quantity
Visilabs.callAPI().customEvent("Cart", properties: properties)
```

## Product Purchase

Use the following implementation of `customEvent` when the user buys one or more items.

```swift
var properties = [String:String]()
properties["OM.tid"] = "oid-12345678" // Order ID/Transaction ID
properties["OM.pp"] = "12345;23456" // Product1 Code;Product2 Code
properties["OM.pu"] = "3;1" // Product1 Quantity;Product2 Quantity
properties["OM.ppr"] = "376.47;23.50" // Product1 Price*Product1 Quantity;Product2 Price*Product2 Quantity
Visilabs.callAPI().customEvent("Purchase", properties: properties)
```

## Product Category Page View

When the user views a category list page, use the following implementation of `customEvent`.

```swift
var properties = [String:String]()
properties["OM.clist"] = "c-14" // Category Code/Category ID
Visilabs.callAPI().customEvent("Category View", properties: properties)
```

## In App Search

If the mobile app has a search functionality available, use the following implementation of `customEvent`.

```swift
var properties = [String:String]()
properties["OM.OSS"] = "USB" // Search Keyword
properties["OM.OSSR"] = "61" // Number of Search Results
Visilabs.callAPI().customEvent("In App Search", properties: properties)
```

## Banner Click

You can monitor banner click data using the following implementation of `customEvent`.

```swift
var properties = [String:String]()
properties["OM.OSB"] = "b-666" // Banner Name/Banner Code
Visilabs.callAPI().customEvent("Banner Click", properties: properties)
```

## Add To Favorites

When the user adds a product to their favorites, use the following implementation of `customEvent`.

```swift
var properties = [String:String]()
properties["OM.pf"] = "12345" // Product Code
properties["OM.pfu"] = "1"
properties["OM.ppr"] = 125.49" // Product Price
Visilabs.callAPI().customEvent("Add To Favorites", properties: properties)
```

## Remove from Favorites

When the user removes a product from their favorites, use the following implementation of `customEvent`.

```swift
var properties = [String:String]()
properties["OM.pf"] = "12345" // Product Code
properties["OM.pfu"] = "-1"
properties["OM.ppr"] = 125.49" // Product Price
Visilabs.callAPI().customEvent("Add To Favorites", properties: properties)
```

## Sending Campaign Parameters

After launching the application by clicking on a push message, use the following implementation of `customEvent`.

```swift
var properties = [String:String]()
properties["utm_source"] = "euromsg" // utm_source value in the payload of push notification
properties["utm_medium"] = "push" // utm_medium value in the payload of push notification
properties["utm_campaign"] = "euromsg campaign" // utm_campaign value in the payload of push notification
Visilabs.callAPI().customEvent("Login", properties: properties)
```

Also you can send properties without setting page name.

```swift
var properties = [String:String]()
properties["utm_source"] = "euromsg" // utm_source value in the payload of push notification
properties["utm_medium"] = "push" // utm_medium value in the payload of push notification
properties["utm_campaign"] = "euromsg campaign" // utm_campaign value in the payload of push notification
Visilabs.callAPI().sendCampaignParameters(properties: properties)
```

## Push Message Token Registration

Visilabs needs to receive token to send push messages to users. The token value generated by APNS will be the value of the `OM.sys.TokenID` key. The value of the `OM.sys.AppID`  could be obtained by RMC administration panel. Follow the link https://intelligence.relateddigital.com/a02/index#/Push/AppList and select the relevant push application. The value of  `App Alias` refers to `OM.sys.AppID`. If you have problems, please contact RMC support team. 

```swift
var properties = [String:String]()
properties["OM.sys.TokenID"] = "F7C5231053E6EC543B8930FB440752E2FE41B2CFC2AA8F4E9C4843D347E6A847" // Token ID to use for push messages
properties["OM.sys.AppID"] = "VisilabsIOSExample" //App ID to use for push messages
Visilabs.callAPI().customEvent("RegisterToken", properties: properties)
```

![IOS Application Page](https://github.com/relateddigital/visilabs-ios/raw/master/Screenshots/ios-application-page.png)
