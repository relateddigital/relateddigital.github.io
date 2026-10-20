---
title: "Inline Nps With Numbers"
sidebar_position: 7
mdx:
  format: md
---

<a id="inline-nps-with-numbers"></a>

# Inline Nps With Numbers

To display an Inline Nps with Numbers view, you can call the getNpsWithNumbersView method, which takes a properties parameter of type `[String: String]`, a `delegate` parameter containing the `npsItemClicked` method, and a `completionHandler` that receives an optional `VisilabsNpsWithNumbersContainerView` object.

The `delegate` parameter is used to handle button click event, and contains a method called `npsItemClicked` that is triggered when the user taps on a button.

The `completionHandler` receives an optional `VisilabsNpsWithNumbersContainerView` object, which is only returned if there is an action matching the given criteria. If there is no matching action, the `completionHandler` will return `nil`.

```swift
Visilabs.callAPI().getNpsWithNumbersView(properties: props, delegate: self){ npsView in
    DispatchQueue.main.async {
        if let npsView = npsView {
            self.npsView = npsView
            self.npsView = npsView
            self.view.addSubview(npsView)
            npsView.translatesAutoresizingMaskIntoConstraints = false
            npsView.topAnchor.constraint(equalTo: self.npsWithNumbersButton.bottomAnchor, constant: -50).isActive = true
            npsView.widthAnchor.constraint(equalTo: self.view.saferAreaLayoutGuide.widthAnchor).isActive = true
            npsView.heightAnchor.constraint(equalToConstant: 550).isActive = true
        } else {
            print("There is no nps action matching your criteria.")
        }
    }
}
```

```swift
extension NpsViewController: VisilabsNpsWithNumbersDelegate {
    func npsItemClicked(npsLink: String?) {
        print(npsLink)
    }
}
```
