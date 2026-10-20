---
title: "Favorite Attribute Actions"
sidebar_position: 2
mdx:
  format: md
---

<a id="favorite-attribute-actions"></a>

# Favorite Attribute Actions

You can access favorite attributes of the **Targeting Actions** of type **Favorite Attribute Action**  that you defined from the  https://intelligence.relateddigital.com/#Target/TargetingAction/TAList/ section on the **RMC** panel via the mobile application as follows.

```swift
Visilabs.callAPI().getFavoriteAttributeActions { (response) in
    if let error = response.error {
        print(error)
    } else {
        if let favoriteBrands = response.favorites[.brand] {
            for brand in favoriteBrands {
                print(brand)
            }
        }
        if let favoriteCategories = response.favorites[.category] {
            for category in favoriteCategories {
                print(category)
            }
        }
    }
}
```

You can also access favorite attributes of a particular **Targeting Action** by specifying the **ID**.

![Favorite Attribute Action](https://github.com/relateddigital/visilabs-ios/raw/master/Screenshots/favorite-attribute-action-page.png)

```swift
Visilabs.callAPI().getFavoriteAttributeActions(actionId: 188) { (response) in
    if let error = response.error {
        print(error)
    } else {
        if let favoriteBrands = response.favorites[.brand] {
            for brand in favoriteBrands {
                print(brand)
            }
        }
        if let favoriteCategories = response.favorites[.category] {
            for category in favoriteCategories {
                print(category)
            }
        }
    }
}
```

`favorites` property of `response` object is a dictionary which has an `enum` as key and an `array` of `String`s as value.  The cases of `VisilabsFavoriteAttribute`  `enum` are the followings:

```swift
public enum VisilabsFavoriteAttribute: String {
    case ageGroup
    case attr1
    case attr2
    case attr3
    case attr4
    case attr5
    case attr6
    case attr7
    case attr8
    case attr9
    case attr10
    case brand
    case category
    case color
    case gender
    case material
    case title
}
```
