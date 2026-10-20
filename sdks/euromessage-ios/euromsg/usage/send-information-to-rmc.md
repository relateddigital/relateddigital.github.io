---
title: "Send Information to RMC"
sidebar_position: 7
mdx:
  format: md
---

<a id="send-information-to-rmc"></a>

# Send Information to RMC

Run the code below when the user successfully logs in, registers and the first time the application is opened.

***P.S. : Depending on the reference of your account, one of the setEuroUserId or setEmail functions is required.***

```swift
Euromsg.setEmail(email: "test@relateddigital.com", permission: true)
Euromsg.setEuroUserId(userKey: "1234567890")
Euromsg.sync()
```
