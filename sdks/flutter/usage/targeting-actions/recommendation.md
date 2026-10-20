---
title: "Recommendation"
sidebar_position: 6
mdx:
  format: md
---

<a id="recommendation"></a>

# Recommendation

Use **getRecommendations** method as below to retrieve product recommendations. This method takes mandatory **zoneId** and **productCode** parameters with optional **filters** parameter.
```dart
import 'package:relateddigital_flutter/recommendation_filter.dart';

Future<void> getRecommendations() async {
  String zoneId = '6';
  String productCode = '';

  // optional
  Map<String, Object> filter = {
    RDRecommendationFilter.attribute: RDRecommendationFilterAttribute.PRODUCTNAME,
    RDRecommendationFilter.filterType: RDRecommendationFilterType.like,
    RDRecommendationFilter.value: null
  };

  List filters = [
    filter
  ];

  // optional
  Map<String, String> properties = {
    'OM.cat':'84'
  };

  List result = await widget.relatedDigitalPlugin.getRecommendations(zoneId, productCode);
  // List result = await relatedDigitalPlugin.getRecommendations(zoneId, productCode, properties:properties, filters: filters);
  print(result.toString());
}
```

## Recommendation Response

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
            "title": "Titiz TP-115 Yeşil Ayakkabı",
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

After clicking on each product, run the following function with the `qs` parameter. This parameter is included in the response returned from the `widget.relatedDigitalPlugin.getRecommendations` function.

```dart
widget.relatedDigitalPlugin.trackRecommendationClick(qs);
```
