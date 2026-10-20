---
title: "App Groups"
sidebar_position: 3
mdx:
  format: md
---

<a id="app-groups"></a>

# App Groups

Enable `App Groups` Capability for your targets. App Groups allow your app to execute code when a notification is recieved, even if your app is not active. This is required for Related Digital's analytics features and to store and access notification payloads of the last 30 days.

- In your Main App Target go to `Signing & Capabilities > All`. 
- Click `+ Capability` if you do not have App Groups in your app yet.
- Select App Groups.
- Under App Groups click the `+` button.
- Set the `App Groups` container to be `group.BUNDLE_ID.relateddigital` where `BUNDLE_ID` is the same as set in `Bundle Identifier`.
- Press OK.
- In the NotificationServiceExtension Target
- Go to `Signing & Capabilities > All`
- Click `+ Capability` if you do not have App Groups in your app yet.
- Select App Groups
- In the NotificationContentExtension Target go to `Signing & Capabilities` > All`.
- Click `+ Capability`.
- Select App Groups
- Under App Groups click the `+` button.
- Set the `App Groups` container to be `group.BUNDLE_ID.relateddigital` where `BUNDLE_ID` is the same as your Main App Target `Bundle Identifier`. Do Not Include `NotificationServiceExtension` and `NotificationContentExtension`.
- Press OK

![App Groups](https://raw.githubusercontent.com/relateddigital/euromessage-ios/master/screenshots/appgroups.png)

![App Groups Name](https://raw.githubusercontent.com/relateddigital/euromessage-ios/master/screenshots/appgroups-name.png)
