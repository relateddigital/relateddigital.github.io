---
title: "Story"
sidebar_position: 2
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
```dart
import 'package:relateddigital_flutter/rd_story_view.dart';
...
...
RDStoryView(
	actionId: '975', // Story actionid created from panel
	relatedDigitalPlugin: widget.relatedDigitalPlugin,
	onItemClick: (Map<String, String> result) {
		print(result);
	},
	onRequestResult: (Map<String, String> result) {
		// isAvailable, height, width — fired after the campaign response
		print(result);
	}
)
```
