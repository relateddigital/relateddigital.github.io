---
title: "Recommendations"
sidebar_position: 4
mdx:
  format: md
---

<a id="recommendations"></a>

# Recommendations

To view recommendations, use `visilabsApi.getRecommendations(zoneId, productCode, properties, filters)` method.

```json
{
    "recommendations": [
        {
            "attr1": "420494",
            "attr10": "",
            "attr2": "",
            "attr3": "",
            "attr4": "",
            "attr5": "",
            "attr6": "",
            "attr7": "",
            "attr8": "",
            "attr9": "",
            "brand": "Related Digital",
            "code": "1159092",
            "comment": 0,
            "cur": "TRY",
            "dcur": "TRY",
            "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
            "discount": 0,
            "dprice": 5.25,
            "freeshipping": false,
            "img": "https://cdn.relateddigital.com/example.png",
            "price": 5.25,
            "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
            "rating": 0,
            "samedayshipping": false,
            "title": "Yeşil Ayakkabı",
            "variants2": [
                {
                    "color": "Gümüş Rengi",
                    "colors": [
                        {
                            "size": "STANDART",
                            "product_id": 12345,
                            "cart_id": "56789",
                            "stock": 123
                        }
                    ]
                }
            ]
        }
    ],
    "title": "Display You Viewed"
}
```

After clicking on each product, run the following function with the `qs` parameter. This parameter is included in the response returned from the `getRecommendations` function.
```js
visilabsApi.trackRecommendationClick(qs)
```

More information [Rmc Docs](https://relateddigital.atlassian.net/wiki/spaces/RMCKBT/pages/1746403404/React+Native+-+Recommendations)
