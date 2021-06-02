# Bistro List
利用 Node.js、Express 和 mongoose 打造一個簡單的餐廳清單網頁。

## 基本功能
使用者可以在首頁看到所有餐廳與它們的簡單資料：
-餐廳照片、名稱、分類、評分

使用者可以再點進去看餐廳的詳細資訊：
-類別、地址、電話、描述、圖片

使用者可以透過搜尋餐廳名稱來找到特定的餐廳。

使用者可以新增、瀏覽、修改、刪除餐廳名單。

## 專案畫面
![img](https://github.com/issueyh/bistro_list/blob/main/public/img/bistroCRUD.jpg)

## 安裝流程
1. 打開你的 terminal，Clone 此專案至本機電腦
```
$ git clone https://github.com/issueyh/bistro_list.git
```
2. 安裝 npm 套件
```
$ npm install
```
3. 執行程式
```
$ npm run dev
```
4. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結
```
Express is running on http://localhost:3000
```
5. 開啟任一瀏覽器瀏覽器輸入
```
http://localhost:3000
```

## 環境建置
* Node.js: 10.15.0
* Express: 4.17.1
* Express-Handlebars: 5.3.2
* mongoose: 5.12.12