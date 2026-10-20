---
title: "Mail Subscription Form"
sidebar_position: 2
mdx:
  format: md
---

<a id="mail-subscription-form"></a>

# Mail Subscription Form

After form is created at **RMC** panel, likewise **in-app message**, existence of mail subscription form is controlled by after each `customEvent` call.
You need to call overload of `customEvent` which takes `Activity` as third parameter in order to show mail subscription forms.

```java
customEvent(String pageName, HashMap<String, String> properties, Activity parent)
```

It is shown as follows;

![mail-subscription-form](https://github.com/relateddigital/visilabs-android/raw/master/Screenshots/mail-subscription-form.png)
