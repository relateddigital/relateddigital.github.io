---
title: "Installation"
sidebar_position: 1
mdx:
  format: md
---

<a id="installation"></a>

# Installation

Visilabs Android SDK requires minimum API level 21.

Add maven jitpack repository to your project/build.gradle file

	allprojects {
		repositories {
			...
			maven { url 'https://jitpack.io' }
		}
	}

Add Visilabs to the ```dependencies``` in app/build.gradle.

```java
implementation 'com.github.relateddigital:visilabs-android:6.7.7'
```
This version uses AndroidX
