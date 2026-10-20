---
title: "4.IYS Email Register"
sidebar_position: 5
mdx:
  format: md
---

<a id="4iys-email-register"></a>

# 4.IYS Email Register

To register email IYS:

```java
EuromessageCallback callback = new EuromessageCallback() {
    @Override
    public void success() {
        Toast.makeText(getApplicationContext(), "REGISTER EMAIL SUCCESS", Toast.LENGTH_LONG).show();
    }

    @Override
    public void fail(String errorMessage) {
        String message = "REGISTER EMAIL ERROR ";
        if(errorMessage != null) {
            message = message + errorMessage;
        }
        Toast.makeText(getApplicationContext(), message, Toast.LENGTH_LONG).show();
    }
};
EuroMobileManager.getInstance().registerEmail("test@euromsg.com", EmailPermit.ACTIVE, false, getApplicationContext(), callback);
```
