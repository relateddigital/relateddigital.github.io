---
title: "IYS Email Register"
sidebar_position: 9
mdx:
  format: md
---

<a id="iys-email-register"></a>

# IYS Email Register

To register email IYS;

```swift
Euromsg.registerEmail(email: "example@email.com", permission: true)
//You can also call TICARI account as following
Euromsg.registerEmail(email: "example@commercial.com, permission: True, isCommercial: true)
```
To update user's consent call this method. 
If request will fail for any reason you can handle at ***didFailRegister***
 
