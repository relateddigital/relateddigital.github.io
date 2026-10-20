---
title: "1.Installation"
sidebar_position: 2
mdx:
  format: md
---

<a id="1installation"></a>

# 1.Installation

Euromessage SDK requires minimum API level 21.

Add maven jitpack repository to your project/build.gradle file

	allprojects {
		repositories {
			...
			maven { url 'https://jitpack.io' }
		}
	}

Add Euromessage to the ```dependencies``` in app/build.gradle.

```java
implementation 'com.github.relateddigital:euromessage-android:5.3.8'
```
