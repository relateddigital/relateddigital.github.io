---
title: "Story Actions"
sidebar_position: 3
mdx:
  format: md
---

<a id="story-actions"></a>

# Story Actions

Story actions allow you to add widgets similar to "Instagram Story" list view on your iOS devices. `getStoryView` method returns an instance of `VisilabsStoryHomeView` which is a subclass of `UIView`.

```swift
let storyView = Visilabs.callAPI().getStoryView()
view.addSubview(storyHomeView)
```

You can also access a story action by specifying the **ID** of the **Targeting Action**.

```swift
let storyView = Visilabs.callAPI().getStoryView(actionId: 67)
view.addSubview(storyHomeView)
```

If you add a clickable URL, framework handle to open it on browser (or direct by deeplink). However, if you want to handle by yourself, extend your class that conforms VisilabsStoryURLDelegate, as following;

```swift
extension StoryViewController: VisilabsStoryURLDelegate {
    func urlClicked(_ url: URL) {
        //TO DO
    }
}
```
After you add this, you can set urlDelegate self.

```swift
let storyView = Visilabs.callAPI().getStoryView(actionId: 67, urlDelegate: self)
view.addSubview(storyHomeView)
```
If you set delegate, then clickable URL will not be handled by SDK!

There is also an asynchronous version of `getStoryView` method called `getStoryViewAsync` which takes an completionHandler that receives an optional `VisilabsStoryHomeView` object. If there is no Story Action matching your criteria completionHandler returns `nil`.

```swift
Visilabs.callAPI().getStoryViewAsync(actionId: 55){ storyHomeView in
    if let storyHomeView = storyHomeView {
        
    } else {
        print("There is no story action matching your criteria.")
    }
}
````
