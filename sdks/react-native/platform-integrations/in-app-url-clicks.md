---
title: "In-App URL Clicks"
sidebar_position: 8
mdx:
  format: md
---

<a id="in-app-url-clicks"></a>

# In-App URL Clicks

Use `inAppUrlClicked` to handle in-app notification CTA URLs inside your React Native navigation instead of opening them with the platform default browser. The SDK keeps the existing browser behavior unless this listener is added.

```javascript
import { addEventListener, removeEventListener } from 'react-native-related-digital'

addEventListener('inAppUrlClicked', async (inAppUrlInfo) => {
  console.log('Related Digital - In-app URL', inAppUrlInfo)
  // navigation.navigate(inAppUrlInfo.url)
}, euroMessageApi, visilabsApi)

// When the listener is no longer needed:
removeEventListener('inAppUrlClicked')
```

`inAppUrlClicked` response
```js
{
  "url": "https://www.example.com/product/123",
  "platform": "ios", // or "android"
  "source": "inAppNotification"
}
```
