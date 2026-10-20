---
title: "User Anonymization"
sidebar_position: 15
mdx:
  format: md
---

<a id="user-anonymization"></a>

# User Anonymization

To anonymize a user, you should first call one of the following functions, `setUserProperty` or `setUserProperties`, as shown below:
```javascript
let userData = {
  // ...other properties
  "SetAnonymous": true 
}
euroMessageApi.setUserProperties(userData)

// OR

await euroMessageApi.setUserProperty('SetAnonymous', 'true')
```
After the set operation is completed, you must save the changes by calling the `subscribe` function:
```javascript
euroMessageApi.subscribe(this.state.token)
```

**IMPORTANT NOTE**: If you do not set the `SetAnonymous` parameter back to `false`, the user will remain anonymous indefinitely.
