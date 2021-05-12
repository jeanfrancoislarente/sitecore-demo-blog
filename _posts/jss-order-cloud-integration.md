---
title: 'Adding Four51 OrderCloud™ to your Sitecore JSS website'
excerpt: "In this this blog post I'll provide step by step instructions on how to integrate Four51 into your new or existing Sitecore JSS website. I will use the latest version of the Styleguide JSS sample (NextJS variant) as an example."
date: '2021-05-12T08:00:00.000Z'
author: 'adoprog'
primaryTopic: 'Marketing'
repositories:
  - 'Sitecore.Demo.Headless'
featuredOrder:
---

Our team has recently updated Sitecore Headless demo site to include OrderCloud and Boxever integrations and in this this blog post I'll provide step by step instructions on how to integrate Four51 into your new or existing Sitecore JSS website. I will use the latest version of the Styleguide JSS sample (NextJS variant) as an example.

## Take into account

The example is based on WIP version of the [https://github.com/ordercloud-api/headstart-nextjs](https://github.com/ordercloud-api/headstart-nextjs) repo, so instead of referencing NPM packages I will copy some code from there. Once the packages are released to NPM, I will update this blog post and simplify the sample code.

## Configuring Dependencies

I will be using TypeScript to build OrderCloud components, so if you don't have it enabled yet (it lives alongside standard .js components), you will start with:

```bash
npm install ordercloud-javascript-sdk --save
```

Also, the sample OrderCloud components use Redux, so you'll need to install:

```bash
npm install @reduxjs/toolkit
npm install react-redux
```

Finally, let's install OrderCloud JavaScript SDK

```bash
npm install ordercloud-javascript-sdk --save
```

## OrderCloud components

Next, I will copy the files from [https://github.com/ordercloud-api/headstart-nextjs/tree/main/ordercloud](https://github.com/ordercloud-api/headstart-nextjs/tree/main/ordercloud) into the project folder.

This folder follows a general pattern:

- `./ordercloud/redux/REDUCER_NAME/index.ts` - This is where we use `createSlice` to build up the reducer and `asyncThunk` actions. Some folders contain separate action files to help make the code more organized.
- `./ordercloud/hooks/useReducerName.ts` - Some reducers come with their own [React Hook](https://reactjs.org/docs/hooks-intro.html) to help make interacting with OrderCloud data easier when developing individual components. Not all hooks are directly related to a single reducer, some use more than one reducer state to accomplish tasks.
- `./ordercloud/components/ComponentName.tsx` - These are the React components that take advantage of our application store through the [useSelector hook](https://react-redux.js.org/api/hooks#useselector). They also might make use of our [custom React hooks](https://reactjs.org/docs/hooks-custom.html) which live inside the `./lib` folder. Some of them dispatch actions that live in the `./redux` folder using the [useDispatch hook](https://react-redux.js.org/api/hooks#usedispatch).
- `./ordercloud/utils/utilityName.ts` - These are helper functions that enhance the javascript development experience with OrderCloud.

## Enabling OrderCloud data provider

Now we can start integrating OrderCloud components into the project. For React-based JSS site you need to change **AppRoot.js** and for my NextJS example I will update **_app.tsx**

```js
import OcProvider from '../ordercloud/redux/ocProvider'

const ocConfig = {
  clientId: '9596A5CD-C132-44A9-A67F-97709806B192', /* This is the client ID of your seeded OrderCloud organization */
  baseApiUrl: 'https://sandboxapi.ordercloud.io', /* API Url, leave as is for Sandbox */
  scope: ['Shopper'], /* Default user role */
  allowAnonymous: Boolean("true") /* Whether anonymous product browsing is allowed */
};
```

and then you can wrap your component (NextJS) (or **SitecoreContent** in React) into **OcProvider**:

```js
      <OcProvider config={ocConfig}>
        <Component {...rest} />
      </OcProvider>
```

## Using OrderCloud data in JSS components

You can now add **OcProductList** component to any existing JSS component at the site (no matter .js or .tsx one) and the rest will be handled by the code from /ordercloud.

```js

import OcProductList from "../ordercloud/components/OcProductList"
import {getMasterImageUrl} from "./ProductDetail";
...

const getListImage = (p) => {
  return `${getMasterImageUrl(p)}&t=w400`
}

...

<OcProductList options={{pageSize:4, categoryID: "Golf"}} imgSrcMap={getListImage} columns={{xs:2}} hrefMap={p => `/products/${p.ID}`}/>

```

In the example above, I'm simply loading 4 products from the "Golf" category, but it can be easily customized to enable facets, search, pagination and more!

![Product List](/assets/blog/jss-order-cloud-integration/product_list.PNG)

## Next steps

Try out the sample project here: [https://github.com/adoprog/jss/tree/feature/oc-integration](https://github.com/adoprog/jss/tree/feature/oc-integration), it includes everything you need to get started (all the keys, ids, etc.), just run:

```bash
npm install
npm start
```

The example also includes a product details page implemented via custom route.

![Product Detail](/assets/blog/jss-order-cloud-integration/product_detail.PNG)

The updates to the [https://github.com/Sitecore/Sitecore.Demo.Headless](https://github.com/Sitecore/Sitecore.Demo.Headless) repository are about to be pushed, and they will include more advanced examples including category browse and ContentHub to OrderCloud mapping.