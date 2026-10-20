---
title: "Provisional Push"
sidebar_position: 5
mdx:
  format: md
---

<a id="provisional-push"></a>

# Provisional Push

To get permissions with provisional add this code under didFinishLaunchingWithOptions. Only iOS 12 or newer versions are compatible with provisional push. People whom using lower versions, askForNotificationPermissionProvisional function work as askForNotificationPermission.


```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        UNUserNotificationCenter.current().delegate = self
        
        Euromsg.configure(appAlias: "YOUR_APP_ALIAS", launchOptions: launchOptions, enableLog: true, appGroupsKey: "group.YOUR_BUNDLE_ID.relateddigital", deliveredBadge: false)
        Euromsg.registerForPushNotifications()
        Euromsg.askForNotificationPermissionProvisional()
        if #available(iOS 13, *) {
            // handle push for iOS 13 and later in sceneDelegate
        }
        else if let userInfo = launchOptions?[UIApplication.LaunchOptionsKey.remoteNotification] as? [String: Any] {
            Euromsg.handlePush(pushDictionary: userInfo)
        }
        return true
    }
```

If you ***do not*** want to provisional push, add below code under didFinishLaunchingWithOptions.

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        UNUserNotificationCenter.current().delegate = self
        
        Euromsg.configure(appAlias: "YOUR_APP_ALIAS", launchOptions: launchOptions, enableLog: true, appGroupsKey: "group.YOUR_BUNDLE_ID.relateddigital", deliveredBadge: false)
        Euromsg.registerForPushNotifications()
        Euromsg.askForNotificationPermission()
        if #available(iOS 13, *) {
            // handle push for iOS 13 and later in sceneDelegate
        }
        else if let userInfo = launchOptions?[UIApplication.LaunchOptionsKey.remoteNotification] as? [String: Any] {
            Euromsg.handlePush(pushDictionary: userInfo)
        }
        return true
    }
```

User has to accept to receive push messages. If the user accepts and the device is successfully registered to the APNS, the following method is called in AppDelegate

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        Euromsg.registerToken(tokenData: deviceToken)
    }
```

In order for push reports to be reflected on RMC, you need to add the following functions.

```swift
 func application(_ application: UIApplication,
                     didReceiveRemoteNotification userInfo: [AnyHashable : Any]) {
        Euromsg.handlePush(pushDictionary: userInfo)
    }

    func application(_ application: UIApplication,
                     didReceiveRemoteNotification userInfo: [AnyHashable : Any],
                     fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        Euromsg.handlePush(pushDictionary: userInfo)
    }

    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                willPresent notification: UNNotification,
                                withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        completionHandler([.alert, .badge, .sound])
    }
    
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                didReceive response: UNNotificationResponse,
                                withCompletionHandler completionHandler: @escaping () -> Void) {
        Euromsg.handlePush(pushDictionary: response.notification.request.content.userInfo)
        completionHandler()
    }
```
