---
title: "App Banner"
sidebar_position: 7
mdx:
  format: md
---

<a id="app-banner"></a>

# App Banner

**iOS**

Add below lines to your project target's `Build Phases`->`Copy Bundle Resources` section. Select `Create folder references` when prompted.
  * `Pods/VisilabsIOS/Sources/TargetingAction/InAppNotification/BannerView/BannerView.xib`
  * `Pods/VisilabsIOS/Sources/TargetingAction/InAppNotification/BannerView/BannerCollectionViewCell.xib`

**Android**

No special installation required

**Usage**

To add banner view to your app, import `RDBannerView` and use as below:
```jsx
import { RDBannerView } from 'react-native-related-digital'
...
...
<RDBannerView
  properties={{
    // 'OM.inapptype': 'banner_carousel',
  }}
  onRequestResult={isAvailable => 
    console.log('Related Digital - Banners', isAvailable)
  }
  onItemClicked={data => 
    console.log('Related Digital - Banner data', data)
  }
  style={{
    flex: 1,
  }}
/>
```

`onRequestResult` response
```js
{ "isAvailable": true } // or false
```

`onItemClicked` response
```js
{ "bannerLink": "URL" }
```
