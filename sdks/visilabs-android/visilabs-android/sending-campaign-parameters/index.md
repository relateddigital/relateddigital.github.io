---
title: "Sending Campaign Parameters"
sidebar_position: 4
mdx:
  format: md
---

<a id="sending-campaign-parameters"></a>

# Sending Campaign Parameters

You can send campaign parameters using `sendCampaignParameters` :

```java
HashMap<String, String> properties = new HashMap<>();
properties.put("utm_campaign","euromsg campaign");
properties.put("utm_source","euromsg");
properties.put("utm_medium","push");
Visilabs.CallAPI().sendCampaignParameters(properties);
```
