# 🛒 PLPPage-CaseStudy

[App Demo Vıdeo](https://www.dropbox.com/scl/fi/9sneva4jmzcbj76wb98om/LoncaCase.MP4?rlkey=gp84qxqnowvdo3b8h3cv3mnwp&st=q3mbsl1d&raw=1)

This project is a case study provided by **[Lonca.co](https://lonca.co)**, focused on building a simplified mobile **Product Listing Page (PLP)** experience for an e-commerce platform. The mobile frontend is developed using **React Native**, while the backend is built with **Node.js**, serving mock product data via RESTful APIs.

The application allows users to:

- View a list of products on the PLP, each showing the **main image**, **brand**, **name**, and **price**.
- Navigate to a **Product Detail Page (PDP)** by tapping a product.
- View detailed information on the PDP, including:
  - **Name**
  - **SKU**
  - **Series**
  - **Price**
  - **Brand**
  - **Large and small images**
  - **Product details**

If certain fields are missing for a product, they are simply omitted from the view.

The backend uses a local `mockdata.json` file containing 40 products and provides two main endpoints:

- A paginated list of all products.
- Detailed data for a specific product by `productId`.

All requests are served locally via **localhost**.

---
<br>
<br>


## 📐 Design File Implementation

The UI was designed on Figma before moving to implementation. You can access the design here:

| Home Page            | Product Detail Page     |
|----------------------|-------------------------|
| ![Home](https://github.com/user-attachments/assets/35182056-1bd9-4d75-a95a-2bd2384671d3) | ![Detail](https://github.com/user-attachments/assets/7f53d20f-e88b-4d21-9a58-073abac853c6) |


> All views were implemented according to the Figma file using custom components and layout styling in React Native.

------
<br>
<br>



## 🧪 Backend Implementation (Node.js)

The backend uses **Express.js** with [ProductsMockData.json](https://www.dropbox.com/scl/fi/ctyti8fjmn21xyis49xrn/ProductsMockData.json?rlkey=vm55hixlt5r5g0nwcpmdyjh21&st=ytm7ihms&raw=1) to serve product data.

___

#### `GET http://{YOUR_IP_ADDRESS}:3000/api/products?page=1&limit=10`
Returns a paginated list of products.

**Query Parameters:**

- `page` – Page number (e.g. `1`)
- `limit` – Number of items per page (e.g. `10`)

**Sample Response:**
```json
{
  "currentPage": 1,
  "totalItems": 40,
  "totalPages": 4,
  "data": [
    {
      "id": "62e13fd7164339d544819593",
      "main_image": "https://loncapazar.s3.eu-north-1.amazonaws.com/product/Sobe/2016580-1",
      "price": 3,
      "brand": "Sobe Istanbul",
      "name": "16580 - Blouse - Beige"
    },
    ...
  ]
}
```
___

#### `GET http://{YOUR_IP_ADDRESS}:3000/api/productDetail/:productId`
Returns detailed info for a single product.

**Path Parameter:**

- `productID` – Unique ID of the product

**Sample Response:**
```json
{
  "vendor": {
    "name": "Sobe Istanbul"
  },
  "series": {
    "name": "2S-2M-2L",
    "item_quantity": 6
  },
  "main_image": "https://loncapazar.s3.eu-north-1.amazonaws.com/product/Sobe/2025218-1",
  "price": 3,
  "names": {
    "en": "25218 - Blouse - Grey"
  },
  "images": [
    "https://loncapazar.s3.eu-north-1.amazonaws.com/product/Sobe/2025218-1",
    ...
  ],
  "product_code": "25218"
}
```
---
<br>
<br>



## 📱 Mobile App Imlementation (React Native)

[App Demo Vıdeo](https://www.dropbox.com/scl/fi/9sneva4jmzcbj76wb98om/LoncaCase.MP4?rlkey=gp84qxqnowvdo3b8h3cv3mnwp&st=q3mbsl1d&raw=1)

| Mobile App Demo      | 
|----------------------|
| ![LoncaReactNativeGIF](https://github.com/user-attachments/assets/cfefbd2f-5401-4d76-89be-9f40b2570b5e) |

* The mobile app is built with **React Native** using **Expo** for fast development and testing. I utilized Expo’s **file-based routing** to manage tab and stack navigation efficiently. The app architecture separates the **UI and network logic** using custom hooks. State is managed with `useState`, `useEffect`, and global context via `useContext` to keep the app simple, reactive, and maintainable.

---
<br>
<br>

## How to Use?

### 1. Clone the Repository
```bash
cd your-target-directory
git clone https://github.com/your-username/your-project-name.git
```

### 2. Start the Backend (Node.js)
```bash
cd Backend
npm install
npm run dev
```

### 3. Run the Mobile App (React Native + Expo)
```bash
cd ReactNativePLPPage
npm install
npx expo start
```
* Press 'i' to start the app on the iphone simulator (you need to have xcode installed)
* Press 'a' to start the app on the iphone simulator (you need to have Android Studio Installed and opened simulator from Android Studio)
* Download 'Expo Go' App and scan the QR code on the terminal to open it in your device (yor computer and mobile device should use the same wifi)

### !! Dont Forget

dont forget to change the

`const getProductUrl = 'http://{YOUR_IP_ADDRESS}:3000/api/productDetail/';`

with your computer's IP Address in the files:

`./LoncaCaseStudy/ReactNativePLPPage/app/Services/GetProduct.ts` and `./LoncaCaseStudy/ReactNativePLPPage/app/Services/GetProducts.ts`




















