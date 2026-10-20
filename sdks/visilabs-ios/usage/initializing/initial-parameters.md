---
title: "Initial Parameters"
sidebar_position: 1
mdx:
  format: md
---

<a id="initial-parameters"></a>

# Initial Parameters

* **Mandatory Parameters**
    * **organizationId** : The ID of your organization. The value of this parameter could be obtained by https://intelligence.relateddigital.com/#Management/UserManagement/Profiles and selecting relevant profile.
    * **profileId** : The ID of the profile you want to integrate. The value of this parameter could be obtained by https://intelligence.relateddigital.com/#Management/UserManagement/Profiles and selecting relevant profile.
    * **dataSource** : The data source of the profile you want to integrate. The value of this parameter could be obtained by https://intelligence.relateddigital.com/#Management/UserManagement/Profiles and selecting relevant profile.
* **Optional Parameters**
    * **inAppNotificationsEnabled** : Default value is **false**. If you want to use in app notification feature of **Visilabs** you need to set the value to **true**. If you are not using in app notification feature of **Visilabs**, we recommend that you leave this value to **false** in terms of performance because in each event request, another request is sent to check whether there exists a notification for the relevant event.
    * **channel** : Default value is **"IOS"**. If you want to categorize the events of your IOS application under another different channel name in the **Analytics** section of the admin panel you may change this value.
    * **requestTimeoutInSeconds** : Default value is **30**. The request timeout value in seconds to send data to **Visilabs** servers and receive data from.
    * **geofenceEnabled** : Default value is **false**. If you want to use geofencing feature of **Visilabs** you need to set the value to **true**. If you are not using geofencing feature of **Visilabs**, we recommend that you leave this value to **false** in terms of performance and user experience because region monitoring would increase the battery consumption of your application and prompt users a popup dialog to allow location tracking.
    * **maxGeofenceCount** : Default value is **20**. **Apple** prevents any single application from monitoring more than 20 regions simultaneously. Visilabs can use all these slots. However if you need some of these slots for another use you can set this parameter to a value lower than **20**. Setting a value higher than 20 would not affect the maximum number of regions to be monitored. 
    * **isIDFAEnabled**: Default value is ***true***. After iOS 14, if you want to use _AdvertisingTrackingID_ you should request a permission from end user. If this parameter is true, then you should add _NSUserTrackingUsageDescription_ key into your *Info.plist* with proper description. As soon as you call `createAPI`, a dialog to request permission from end user will open and according to choice of the user, the value of _AdvertisingTrackingID_ will be sent to **Visilabs** servers. If you want to show your prompt at another time instead of when the app is opened you need to set the value **isIDFAEnabled** to ***false*** and call the public `requestIDFA` function whenever you want to show prompt. [Click here for detailed information](https://developer.apple.com/documentation/bundleresources/information_property_list/nsusertrackingusagedescription)


![Image of Profiles](https://github.com/relateddigital/visilabs-ios/raw/master/Screenshots/profiles-page.png)

![Image of Profile](https://github.com/relateddigital/visilabs-ios/raw/master/Screenshots/profile-page.png)
