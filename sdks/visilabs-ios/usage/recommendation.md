---
title: "Recommendation"
sidebar_position: 4
mdx:
  format: md
---

<a id="recommendation"></a>

# Recommendation

Product recommendations are handled by the `recommend` method of SDK. You have to pass 3 mandatory arguments which are `zoneId`, `productCode` and `completion` to `recommend` method.

`completion` parameter is a closure expression which takes an `VisilabsRecommendationResponse` instance as input and returns nothing. The structure of `VisilabsRecommendationResponse` is shown below:

```swift
public class VisilabsRecommendationResponse {
    public var products: [VisilabsProduct]
    public var error: VisilabsError?
    public var widgetTitle: String = ""
    
    internal init(products: [VisilabsProduct], widgetTitle: String = "", error: VisilabsError? = nil) {
        self.products = products
        self.widgetTitle = widgetTitle
        self.error = error
    }
}
```
`VisilabsProduct` class has the following properties:

| Property      | Type |
| ----------- | ----------- |
| code      | String       |
| title   | String        |
| img   | String        |
| dest_url   | String        |
| brand   | String        |
| price   | Double        |
| dprice   | Double        |
| cur   | String        |
| dcur   | String        |
| freeshipping   | Bool        |
| samedayshipping   | Bool        |
| rating   | Int        |
| comment   | Int        |
| discount   | Double        |
| attr1   | String        |
| attr2   | String        |
| attr3   | String        |
| attr4   | String        |
| attr5   | String        |



If recommended products exist for given arguments in `completion` method you need to handle the array of products. 

```swift
Visilabs.callAPI().recommend(zoneID: "6", productCode: "pc", filters: []){ response in
    if let error = response.error {
        print(error)
    }else{
        print("Recommended Products")
        for product in response.products{
            print("product code: \(product.code) title: \(product.title)")
        }
    }
}
```

You may also pass an array of filters to `recommend` method. For example the following implementation returns only the products which contains **laptop** in the title.

```swift
var filters = [VisilabsRecommendationFilter]()
let filter = VisilabsRecommendationFilter(attribute: .PRODUCTNAME, filterType: .like, value: "laptop")
filters.append(filter)
Visilabs.callAPI().recommend(zoneID: "6", productCode: "pc", filters: filters){ response in
    if let error = response.error{
        print(error)
    }else{
        print("Widget Title: \(response.widgetTitle)")
        print("Recommended Products")
        for product in response.products{
            print("product code: \(product.code) title: \(product.title)")
        }
    }
}
```

`VisilabsProductFilterAttribute` enum has the following cases and sample values:

| case      | example |
| ----------- | ----------- |
| PRODUCTCODE      | ""       |
| PRODUCTNAME      | ""       |
| COLOR   | "blue"        |
| AGEGROUP   | "18-40"        |
| BRAND   | "visilabs"        |
| CATEGORY   | "145"        |
| GENDER   | "f"        |
| MATERIAL   | "wood"        |
| ATTRIBUTE1   | "attr1value"        |
| ATTRIBUTE2   | "attr2value"          |
| ATTRIBUTE3   | "attr3value"          |
| ATTRIBUTE4   | "attr4value"          |
| ATTRIBUTE5   | "attr5value"          |
| SHIPPINGONSAMEDAY   | "1"        |
| FREESHIPPING   | "1"         |
| ISDISCOUNTED   | "1"         |


### Report Recommendation Clicks

To report the clicks of widget recommendations you need to call the `trackRecommendationClick` method with the `qs` property of `Product` object.

```swift
Visilabs.callAPI().trackRecommendationClick(qs: product.qs)
```
