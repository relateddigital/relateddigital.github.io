---
title: "SceneDelegate.swift"
sidebar_position: 6
mdx:
  format: md
---

<a id="scenedelegateswift"></a>

# SceneDelegate.swift

```swift
func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        // Use this method to optionally configure and attach the UIWindow `window` to the provided UIWindowScene `scene`.
        // If using a storyboard, the `window` property will automatically be initialized and attached to the scene.
        // This delegate does not imply the connecting scene or session are new (see `application:configurationForConnectingSceneSession` instead).
        guard let _ = (scene as? UIWindowScene) else { return }

        if #available(iOS 13, *),
            let userInfo = connectionOptions.notificationResponse?.notification.request.content.userInfo {
            Euromsg.handlePush(pushDictionary: userInfo)
        }    
    } 
```
