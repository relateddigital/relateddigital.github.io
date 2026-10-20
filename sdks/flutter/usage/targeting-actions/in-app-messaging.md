---
title: "In-App Messaging"
sidebar_position: 1
mdx:
  format: md
---

<a id="in-app-messaging"></a>

# In-App Messaging

**In-app messages** are notifications to your users when they are directly active in your mobile app. To enable **In-App Messaging** feature you need to set the value of `inAppNotificationsEnabled` parameter to `true` when calling `init` to initialize the SDK.

The existence of a relevant **in-app message** for an event controlled by after each `customEvent` call. You can create and customize your **in-app messages** on https://intelligence.relateddigital.com/#Target/TargetingAction/TAList page of RMC administration panel.

There are 9 types of **in-app messages**:

|               Pop-up - Image, Header, Text & Button              | Mini-icon&text                                                             | Full Screen-image                                                |
|:----------------------------------------------------------------:|----------------------------------------------------------------------------|------------------------------------------------------------------|
| ![full](https://github.com/relateddigital/relateddigital-flutter/blob/master/screenshots/inappnotification/full.png)                 | ![mini](https://github.com/relateddigital/relateddigital-flutter/blob/master/screenshots/inappnotification/mini.png)                           | ![full_image](https://github.com/relateddigital/relateddigital-flutter/blob/master/screenshots/inappnotification/full_image.png)     |
| Full Screen-image&button                                         | Pop-up - Image, Header, Text & Button                                      |                              Pop-up-Survey                       |
| ![image_button](https://github.com/relateddigital/relateddigital-flutter/blob/master/screenshots/inappnotification/image_button.png) | ![image_text_button](https://github.com/relateddigital/relateddigital-flutter/blob/master/screenshots/inappnotification/image_text_button.png) | ![smile_rating](https://github.com/relateddigital/relateddigital-flutter/blob/master/screenshots/inappnotification/smile_rating.png) |
| Pop-up - NPS with Text & Button                                  | Native Alert & Actionsheet                                                 |  NPS with numbers                                                   |
| ![nps](https://github.com/relateddigital/relateddigital-flutter/blob/master/screenshots/inappnotification/nps.png)                   | ![nps_with_numbers](https://github.com/relateddigital/relateddigital-flutter/blob/master/screenshots/inappnotification/alert.png)   | ![nps_with_numbers](https://github.com/relateddigital/relateddigital-flutter/blob/master/screenshots/inappnotification/nps_with_numbers.png) |
