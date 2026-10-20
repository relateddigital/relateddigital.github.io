---
title: "Debugging"
sidebar_position: 2
mdx:
  format: md
---

<a id="debugging"></a>

# Debugging

You can turn on logging by setting `loggingEnabled` property to `true`. If enabled the

```swift
Visilabs.callAPI().loggingEnabled = true                                      
```

The default protocol for requests to **Visilabs** servers is `https`. If you want to debug your requests more easily, you can change your protocol by setting `insecureProtocol` property to `true`. 

```swift
Visilabs.callAPI().insecureProtocol = true                                      
```
