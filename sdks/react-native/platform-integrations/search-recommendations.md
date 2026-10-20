---
title: "Search Recommendations"
sidebar_position: 5
mdx:
  format: md
---

<a id="search-recommendations"></a>

# Search Recommendations

Search recommendations are handled by the `visilabsApi.searchRecommendation(keyword: string, searchType: string): Promise<any>;` method of SDK. You have to pass 2 mandatory arguments which are `keyword` and `searchType` to `searchRecommendation` method. Value of `searchType` parameter can be acquired from the RMC panel. The value of `searchType` is defined in the search widget page's **Search Type** combo box.

The return type of the `searchRecommendation` method is a JSON object. The JSON object contains 4 containers which are `brandContainer`, `categoryContainer`, `productAreaContainer`, and `searchContainer`. An example of the return type is shown below.

```json
{
  "brandContainer": {
    "isActive": false,
    "popularBrands": [
      {
        "name": "Brand Name"
      }
    ],
    "title": "",
    "report": {
      "click": "OM.zn=search-1&OM.zpc=search-brand",
      "impression": "OM.zdn=search-1&OM.zcp=search-web"
    }
  },
  "categoryContainer": {
    "isActive": true,
    "popularCategories": [
      {
        "name": "Book"
      },
      {
        "name": "Laptop"
      },
      {
        "name": "SSD"
      }
    ],
    "report": {
      "click": "OM.zn=search-1&OM.zpc=search-category",
      "impression": "OM.zdn=search-1&OM.zcp=search-web"
    }
  },
  "productAreaContainer": {
    "changeTitle": false,
    "products": [
      {
        "brandName": "Visilabs",
        "code": "123",
        "currency": "TRY",
        "discountCurrency": "TRY",
        "discountPrice": 1499.99,
        "imageUrl": "https://www.visilabs.com/123.jpg",
        "name": "Product Name 123",
        "price": 2999.99,
        "url": "https://www.visilabs.com/123"
      },
      {
        "brandName": "Euromessage",
        "code": "124",
        "currency": "TRY",
        "discountCurrency": "TRY",
        "discountPrice": 1499.99,
        "imageUrl": "https://www.visilabs.com/124.jpg",
        "name": "Product Name 124",
        "price": 2999.99,
        "url": "https://www.visilabs.com/124"
      }
    ],
    "searchResultMessage": "",
    "report": {
      "click": "OM.zn=search-1&OM.zpc=search-productarea",
      "impression": "OM.zdn=search-1&OM.zcp=search-web"
    }
  },
  "searchContainer": {
    "isActive": true,
    "popularSearches": [
      {
        "name": "Product Name 123"
      },
      {
        "name": "Scifi Books"
      },
      {
        "name": "Visilabs"
      }
    ],
    "report": {
      "click": "OM.zn=search-1&OM.zpc=search-word",
      "impression": "OM.zdn=search-1&OM.zcp=search-web"
    }
  }
}
```

An example of how to use the `searchRecommendation` method is shown below.

```js
let searchKeyword = "shoe";
let searchType = "web";

let productSearchResults = [];
let categorySearchResults = [];
let brandSearchResults = [];
let popularSearchSearchResults = [];


let products = [];
let categories = [];
let brands = [];
let popularSearches = [];

const searchRecommendationResponse = await visilabsApi.searchRecommendation(searchKeyword, searchType);


// productAreaContainer
const productAreaContainer = searchRecommendationResponse.productAreaContainer;
const productAreaContainerProducts = productAreaContainer.products;
const productAreaContainerReport = productAreaContainer.report;

productAreaContainerProducts.forEach(productObject => {
  const productName = productObject.name;
  products.push(productObject);
  productSearchResults.push({ name: productName, report: productAreaContainerReport });
});

// categoryContainer
const categoryContainer = searchRecommendationResponse.categoryContainer;
const categoryContainerPopularCategories = categoryContainer.popularCategories;
const categoryContainerReport = categoryContainer.report;

categoryContainerPopularCategories.forEach(categoryObject => {
  const categoryName = categoryObject.name;
  categories.push(categoryObject);
  categorySearchResults.push({ name: categoryName, report: categoryContainerReport });
});

// brandContainer
const brandContainer = searchRecommendationResponse.brandContainer;
const brandContainerPopularBrands = brandContainer.popularBrands;
const brandContainerReport = brandContainer.report;

brandContainerPopularBrands.forEach(brandObject => {
  const brandName = brandObject.name;
  brands.push(brandObject);
  brandSearchResults.push({ name: brandName, report: brandContainerReport });
});

// searchContainer
const searchContainer = searchRecommendationResponse.searchContainer;
const searchContainerPopularSearches = searchContainer.popularSearches;
const searchContainerReport = searchContainer.report;

searchContainerPopularSearches.forEach(popularSearchObject => {
  const popularSearchName = popularSearchObject.name;
  popularSearches.push(popularSearchObject);
  popularSearchSearchResults.push({ name: popularSearchName, report: searchContainerReport });
});
```

To report the clicks of search recommendations you need to call the `trackSearchRecommendationClick` method with the `report` property of container objects. For example, if you want to report the click of a product, you need to call the `trackSearchRecommendationClick` method with the `report` property of the container.

```js
let products = [];
let searchKeyword = "shoe";
let searchType = "web";
const searchRecommendationResponse = await visilabsApi.searchRecommendation(searchKeyword, searchType);


// productAreaContainer
const productAreaContainer = searchRecommendationResponse.productAreaContainer;
const productAreaContainerProducts = productAreaContainer.products;
const productAreaContainerReport = productAreaContainer.report;

productAreaContainerProducts.forEach(productObject => {
  const productName = productObject.name;
  products.push(productObject);
});

visilabsApi.trackSearchRecommendationClick(productAreaContainer.report);
```
