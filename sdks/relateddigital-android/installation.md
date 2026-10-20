---
title: "Installation"
sidebar_position: 3
mdx:
  format: md
---

<a id="installation"></a>

# Installation

Related Digital Android SDK requires minimum API level 21.

Please, add Maven jitpack repository into your project-level build.gradle file as shown below:

 ```gradle
allprojects {
	repositories {
		...
		maven { url 'https://jitpack.io' }
	}
}
 ```

Please, add the dependency of `relateddigital-android` library into your module-level build.gradle file as shown below:

 ```gradle
implementation 'com.github.relateddigital:relateddigital-android:1.8.11'
 ```
