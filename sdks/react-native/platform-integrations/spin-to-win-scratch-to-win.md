---
title: "Spin to win & Scratch to win"
sidebar_position: 14
mdx:
  format: md
---

<a id="spin-to-win--scratch-to-win"></a>

# Spin to win & Scratch to win

To use these features, call `customEvent` method with the page name you created on RMC dashboard.
```javascript
visilabsApi.customEvent('*spintowin*', {
  'OM.pv': '77',
  'OM.pn': 'Nectarine Blossom & Honey Body & Hand Lotion',
  'OM.ppr': '39'
})

visilabsApi.customEvent('*scratchtowin*', {
  'OM.pv': '77',
  'OM.pn': 'Nectarine Blossom & Honey Body & Hand Lotion',
  'OM.ppr': '39'
})
```
