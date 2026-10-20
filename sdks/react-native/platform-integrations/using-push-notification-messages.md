---
title: "Using Push Notification Messages"
sidebar_position: 16
mdx:
  format: md
---

<a id="using-push-notification-messages"></a>

# Using Push Notification Messages

You can access payload list of last 30 days if you have completed iOS `NotificationServiceExtension` and `App Groups` setup. Using `getPushMessages` method you can access these payloads. Android does not require special installation.

When sending a notification, if you add the `pushCategory` parameter to the custom parameters field, you can retrieve the category parameter you sent for the respective push within the payload. This process will enable you to categorize your notifications. Example values include `transactional`, `order`, `bulk`, `campaign`, `reco`, etc.

```javascript
const getPushMessages = async () => {
    const messages = await euroMessageApi.getPushMessages()
    console.log('messages', messages)
}

// pushId optional. If a pushId is sent, it will mark only the relevant push as read. If no parameters are sent, it will mark all notifications as read.
const readPushMessages = async (pushId) => { 
  const result = await euroMessageApi.readPushMessages(pushId)
    console.log('READ Push Messages', JSON.stringify(result))
}

// pushId is optional. If a PushId is provided, only the corresponding notification will be removed from the notification center. If no parameters are sent, all notifications will be cleared from the OS notification center.
// Note: pushId should be sent in the payload for iOS, and notificationId for Android.
const deletePushMessages = async (pushId) => {
  const result = await euroMessageApi.deletePushNotificationsFromNotificationCenter(pushId)
  console.log('DELETE Push Messages', JSON.stringify(result))
}

// pushId is optional. If a PushId is provided, only the corresponding notification will be removed from the LOCAL notification center. If no parameters are sent, all notifications will be cleared from the LOCAL notification center.
// Note: The pushId included in the payload should be sent as a parameter value for all operating systems.
const deletLocalPushMsg = async (pushId) => {
  const result = await euroMessageApi.deletePushMessages(pushId)
  console.log('DELETE Push Messages', JSON.stringify(result))
  }
```
Messages are sorted by date. The most recent message is displayed at the top of the list.
```json
// Android response
[
  {
    "altUrl": "",
    "date": "2025-03-27 17:02:19",
    "emPushSp": "D9DED6935B934325972EF0A4EC814AB3|2CCE03D672E4492EB6C85CDBD8AB9D5E|05F46A9218A04757AD2AA802D4B0FD49|2164102|1|0|true|false|0|0|3215470e-067b-49cc-b48c-3c2637a16bd6",
    "email": "Baris.arslan@euromsg.com",
    "extraData": {
      "map": {
        "altUrl": "",
        "badgeCount": "0",
        "expiredate": "912345678",
        "pushType": "Text",
        "test": "true",
        "utm_campaign": "campaign",
        "utm_medium": "medium",
        "utm_source": "source"
      }
    },
    "keyID": "Baris.arslan@euromsg.com",
    "mediaUrl": "",
    "message": "baris test",
    "notificationId": 1889709228,
    "openDate": "",
    "params": {
      "emPushSp": "CF203B70D23C40DF84167C339648CC94",
      "mediaUrl": "",
      "message": "baris test",
      "pushId": "f6e9e487-126e-4805-a3ef-bcf0e5df3ca0",
      "silent": "false",
      "sound": "",
      "title": "baris test",
      "url": ""
    },
    "pushId": "f6e9e487-126e-4805-a3ef-bcf0e5df3ca0",
    "pushType": "Text",
    "pushCategory": "x campaign",
    "silent": "false",
    "sound": "",
    "status": "D",
    "title": "baris test",
    "url": ""
  }
]

// iOS response
[
    {
      "aps": {
        "category": "rmc",
        "alert": {
          "title": "Message Title",
          "body": "Message body"
        }
      },
      "altUrl": "",
      "url": "",
      "utm_medium": "medium",
      "openedDate": "",
      "emPushSp": "CF203B70D23C40DF84167C339648CC94",
      "mediaUrl": "https:\/\/raw.githubusercontent.com\/relateddigital\/euromessage-ios\/master\/screenshots\/appgroups-name.png",
      "utm_source": "source",
      "email": "Baris.arslan@euromsg.com",
      "status": "D",
      "utm_campaign": "campaign",
      "pushType": "Image",
      "keyID": "Baris.arslan@euromsg.com",
      "deepLink": "",
      "pushId": "75dff035-295d-4a3d-969a-2a9f4d89d9df",
      "formattedDateString": "2025-03-27 16:05:22",
      "customExpireDate": "912345678", // custom
      "customParameter": "test",  // custom
      "pushCategory": "x campaign", // custom
    }
] 
```
