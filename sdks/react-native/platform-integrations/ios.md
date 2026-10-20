---
title: "IOS"
sidebar_position: 2
mdx:
  format: md
---

<a id="ios"></a>

# IOS

* Enable **Push Notifications** and **Background Modes->Remote Notifications** capabilities.

## Objective-C
* Add `Empty.swift` file to your project as the sdk contains Swift code and xcode requires at least one empty swift file in each target.

**AppDelegate.mm**
```objective-c
// other codes...
#import "RelatedDigitalPushModule.h"
#import <UserNotifications/UserNotifications.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // other codes...
  
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  
  [RelatedDigitalPushModule initRelatedDigital:@"organization_id" profileId:@"profile_id" dataSource:@"datasource" appAlias:@"rdgencallariostest" inAppNotificationsEnabled:true requestTimeoutSeconds:30 geofenceEnabled:false askLocationPermmissionAtStart:false maxGeofenceCount:20 isIDFAEnabled:false loggingEnabled:true];

  return // other codes...
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
 [RelatedDigitalPushModule didRegisterUserNotificationSettings:notificationSettings];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RelatedDigitalPushModule didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RelatedDigitalPushModule didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RelatedDigitalPushModule didFailToRegisterForRemoteNotificationsWithError:error];
}

-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
}

// other codes...
```

## Swift

**AppDelegate.swift**
```swift
// other codes...
import UserNotifications
import react_native_related_digital

@main
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {
  // other codes...

  // 🔔 Push Notification delegate settings
  let center = UNUserNotificationCenter.current()
  center.delegate = self

  // 🔔 Related Digital init
  RelatedDigitalPushModule.initRelatedDigital(
    "organization_id", // OID
    profileId: "profile_id", // SID
    dataSource: "datasource",
    appAlias: "app_alias",
    inAppNotificationsEnabled: true,
    requestTimeoutSeconds: 30,
    geofenceEnabled: false,
    askLocationPermmissionAtStart: false,
    maxGeofenceCount: 20,
    isIDFAEnabled: true,
    loggingEnabled: true,
    deliveredBadge: true
  )

  return true
}

// MARK: - Push Notification Delegate Methods
func application(_ application: UIApplication, didRegister notificationSettings: UIUserNotificationSettings) {
  RelatedDigitalPushModule.didRegister(notificationSettings)
}
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  RelatedDigitalPushModule.didRegisterForRemoteNotifications(withDeviceToken: deviceToken)
}
func application(_ application: UIApplication,
                 didReceiveRemoteNotification userInfo: [AnyHashable : Any],
                 fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
  RelatedDigitalPushModule.didReceiveRemoteNotification(userInfo, fetchCompletionHandler: completionHandler)
}
func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
  RelatedDigitalPushModule.didFailToRegisterForRemoteNotificationsWithError(error)
}
func userNotificationCenter(_ center: UNUserNotificationCenter,
                            willPresent notification: UNNotification,
                            withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
  completionHandler([.sound, .alert, .badge])
}
// other codes...
```

* Add `NSUserTrackingUsageDescription` to your `Info.plist` file to be able to use AdvertisingTrackingID on iOS 14 and later. If you don't want to use it, set `isIDFAEnabled` to `false` among the `initRelatedDigital` parameters.
* If you have any issues while building the app due to `_swift_getFunctionReplacement` or any swift related errors, try editing your project's (not target) `Library Search Paths` and remove `$(TOOLCHAIN_DIR)/usr/lib/swift-5.0/$(PLATFORM_NAME)` line.
* If you are going to use in app notifications feature, add below lines to your project target's `Build Phases`->`Copy Bundle Resources` section. Select `Create folder references` when prompted.
  * `Pods/VisilabsIOS/Sources/TargetingAction/InAppNotification/Views/VisilabsMiniNotificationViewController.xib`
  * `Pods/VisilabsIOS/Sources/TargetingAction/InAppNotification/Views/VisilabsFullNotificationViewController.xib`
  * `Pods/VisilabsIOS/Sources/TargetingAction/drawer/drawerView.xib`
  * `Pods/VisilabsIOS/Sources/TargetingAction/InAppNotification/BannerView/BannerView.xib`
  * `Pods/VisilabsIOS/Sources/TargetingAction/InAppNotification/BannerView/BannerCollectionViewCell.xib`
* #### To enable rich notification capabilites like showing image or video;
1. Add `Notification Service Extension` target to your project and name it `RelatedDigitalNotificationService`. Change this service's target iOS version to 10.0. Then change newly added `NotificationService.m` file contents with the following:
(Don't forget to enter your app name instead of `APP_ALIAS`)
```objective-c
#import "NotificationService.h"
#import "RelatedDigitalNotificationService.h"

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];
    
  [RelatedDigitalNotificationService didReceiveNotificationRequest:@"APP_ALIAS" withBestAttemptContent:self.bestAttemptContent withContentHandler:self.contentHandler];
}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
  [RelatedDigitalNotificationService didReceiveNotificationRequest:@"APP_ALIAS" withBestAttemptContent:self.bestAttemptContent withContentHandler:self.contentHandler];
}

@end
```
2. Add below lines to your Podfile's root level.
```
target 'RelatedDigitalNotificationService' do
  pod 'react-native-related-digital', :path => '../node_modules/react-native-related-digital'
  
  use_native_modules!
end

# Post Install processing for RelatedDigitalNotificationService causing errors
def notification_service_post_install(installer)
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['APPLICATION_EXTENSION_API_ONLY'] = 'NO'
    end
  end
end
```
3. Modify Podfile and have the following in main target section.
```
post_install do |installer|
  notification_service_post_install(installer)
  # Other post install function calls
end
```
4. Add `Empty.swift` file to your RelatedDigitalNotificationService target as the sdk contains Swift code and xcode requires at least one empty swift file in each target.
5. Make sure your deployment target is ios 10.
```
platform :ios, '10.0'
```
6. Execute `pod install` then run.
* #### To enable push notification carousel;
1. Add `Notification Content Extension` target to your project and name it `RelatedDigitalNotificationContent`. Change this service's target iOS version to 11.0. Remove newly added files under RelatedDigitalNotificationContent except Info.plist. Then add EMNotificationViewController.swift file with the following content.
```swift
import UIKit
import UserNotifications
import UserNotificationsUI
import Euromsg

@objc(EMNotificationViewController)
class EMNotificationViewController: UIViewController, UNNotificationContentExtension {
    
    let carouselView = EMNotificationCarousel.initView()
    var completion: ((_ url: URL?, _ bestAttemptContent: UNMutableNotificationContent?) -> Void)?
    
    var notificationRequestIdentifier = ""
    
    func didReceive(_ notification: UNNotification) {
        notificationRequestIdentifier = notification.request.identifier
        Euromsg.configure(appAlias: "APP_ALIAS", launchOptions: nil, enableLog: true, deliveredBadge: true)
        carouselView.didReceive(notification)
    }
    func didReceive(_ response: UNNotificationResponse, completionHandler completion: @escaping (UNNotificationContentExtensionResponseOption) -> Void) {
        carouselView.didReceive(response, completionHandler: completion)

    }
    override func loadView() {
        completion = { [weak self] url, bestAttemptContent in
            if let identifier = self?.notificationRequestIdentifier {
                UNUserNotificationCenter.current().removeDeliveredNotifications(withIdentifiers: [identifier])
                UNUserNotificationCenter.current().getDeliveredNotifications(completionHandler: { notifications in
                    bestAttemptContent?.badge =  NSNumber(value: notifications.count)
                })
            }
            if let url = url {
                if #available(iOSApplicationExtension 12.0, *) {
                    self?.extensionContext?.dismissNotificationContentExtension()
                }
                self?.extensionContext?.open(url)
            } else {
                if #available(iOSApplicationExtension 12.0, *) {
                    self?.extensionContext?.performNotificationDefaultAction()
                }
            }
        }
        carouselView.completion = completion
        carouselView.delegate = self
        self.view = carouselView
    }
}

/**
 Add if you want to track which carousel element has been selected
 */
extension EMNotificationViewController: CarouselDelegate {
    
    func selectedItem(_ element: EMMessage.Element) {
        // Add your work...
        print("Selected element is => \(element)")
    }
    
}
```
2. Add or replace the following lines in newly added `RelatedDigitalNotificationContent/Info.plist`
```
<key>NSExtension</key>
<dict>
  <key>NSExtensionAttributes</key>
  <dict>
    <key>UNNotificationExtensionUserInteractionEnabled</key>
    <true/>
    <key>UNNotificationExtensionDefaultContentHidden</key>
    <false/>
    <key>UNNotificationExtensionCategory</key>
    <string>carousel</string>
    <key>UNNotificationExtensionInitialContentSizeRatio</key>
    <real>1</real>
  </dict>
  <key>NSExtensionPrincipalClass</key>
  <string>RelatedDigitalNotificationContent.EMNotificationViewController</string>
  <key>NSExtensionPointIdentifier</key>
  <string>com.apple.usernotifications.content-extension</string>
</dict>
```
3. Add below lines to your Podfile's root level.
```
target 'RelatedDigitalNotificationContent' do
  use_native_modules!
  
  pod 'Euromsg', '>= 2.0.0'
end
```
4. In Xcode, select `RelatedDigitalNotificationContent` target and add below files to `Build Phases`->`Copy Bundle Resources` section. Select `Create folder references` when prompted.
    * `Pods/Euromsg/Sources/Euromsg/Classes/EMNotificationCarousel/CarouselCell.xib`
    * `Pods/Euromsg/Sources/Euromsg/Classes/EMNotificationCarousel/EMNotificationCarousel.xib`
5. Make sure your deployment target is ios 10.
```
platform :ios, '10.0'
```
6. Execute `pod install` then run.
