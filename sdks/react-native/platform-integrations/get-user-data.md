---
title: "Get User Data"
sidebar_position: 17
mdx:
  format: md
---

<a id="get-user-data"></a>

# Get User Data

You can use `getUserAllData` method to access user data.
```javascript
import {getUserAllData} from 'react-native-related-digital'
...
...
...
 getUser = async () => {
    const result = await getUserAllData();
    console.log("ALL Storage Data", result);
    console.log("Visilabs - Exvisitorid", result.visilabs.exVisitorId);
    console.log("Euromsg - Keyid", result.euromsg.extra.Keyid);
    console.log("Euromsg - Email", result.euromsg.extra.Email);
    console.log("JS Euromsg - Keyid", result.js.euromsgsubextra?.Keyid);
    console.log("JS Euromsg - Email", result.js.euromsgsubextra?.Email);
}
```
Response
```json
{
    "euromsg": {
        "appKey": "rniostestapp",
        "appVersion": "1.0",
        "deviceName": "iPhone 14 Pro",
        "deviceType": "x86_64",
        "extra": {
            "ConsentSource": "HS_MOBIL",
            "ConsentTime": "2022-11-12 10:00:00",
            "Email": "baris.arslan@euromsg.com",
            "Keyid": "1234-B-5678",
            "PushPermit": "Y",
            "RecipientType": "BIREYSEL"
        },
        "firstTime": 0,
        "identifierForVendor": "57BA15B3-9B97-4B2D-AB21-211DDE7D56C6",
        "local": "tr-US",
        "method": "POST",
        "osName": "iOS",
        "osVersion": "16.2",
        "path": "subscription",
        "prodBaseUrl": ".euromsg.com",
        "sdkVersion": "2.6.6",
        "subdomain": "pushs"
    },
    "js": {
        "euromsgsub": {
            "advertisingIdentifier": "",
            "appKey": "rniostestapp",
            "appVersion": "1.0",
            "carrier": "",
            "deviceName": "iPhone 14 Pro",
            "deviceType": "x86_64",
            "extra": {
                "ConsentSource": "HS_MOBIL",
                "ConsentTime": "2022-11-12 10:00:00",
                "Email": "baris.arslan@euromsg.com",
                "Keyid": "1234-B-5678",
                "PushPermit": "Y",
                "RecipientType": "BIREYSEL"
            },
            "firstTime": 1,
            "identifierForVendor": "57BA15B3-9B97-4B2D-AB21-211DDE7D56C6",
            "local": "tr-US",
            "os": "ios",
            "osVersion": "16.2",
            "sdkVersion": "2.4.1",
            "token": null
        },
        "euromsgsubextra": {
            "ConsentSource": "HS_MOBIL",
            "ConsentTime": "2022-11-12 10:00:00",
            "Email": "baris.arslan@euromsg.com",
            "Keyid": "1234-B-5678",
            "PushPermit": "Y",
            "RecipientType": "BIREYSEL"
        },
        "expiresubscribecheckdate": 1681132339166
    },
    "visilabs": {
        "apiver": "IOS",
        "appVersion": "1.0",
        "channel": "IOS",
        "cookieId": "6EA1D2E6-74CF-4A61-A845-D297BCEE0108",
        "exVisitorId": "1234-B-5678",
        "mappl": "true",
        "sdkVersion": "3.9.0",
        "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
        "vchannel": "IOS"
    }
}
```
