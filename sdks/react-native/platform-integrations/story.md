---
title: "Story"
sidebar_position: 6
mdx:
  format: md
---

<a id="story"></a>

# Story

Follow the step below to add a countdown to your stories.

**iOS**

Add below lines to your project target's `Build Phases`->`Copy Bundle Resources` section. Select `Create folder references` when prompted.
  * `Pods/VisilabsIOS/Sources/TargetingAction/Story/Views/timerView/timerView.xib`

**Android**

No special installation required

**Usage**

To add story view to your app, import `RDStoryView` and use as below:
```jsx
import { RDStoryView } from 'react-native-related-digital'
...
...
<RDStoryView
  actionId={'1'} // optional
  onItemClicked={(data) => { 
    console.log('Story data', data)
  }}
  style={{ flex: 1 }}
/>
```
