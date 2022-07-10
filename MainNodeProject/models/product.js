const fs = require("fs").promises;
const path = require("path");

const rootDir = require("../utils/path");

const productsFilePath = path.join(rootDir, "data", "products.json");
const getProductsFromFile = (cb, path = productsFilePath) =>
  fs
    .readFile(path)
    .then((productsList) => {
      cb(JSON.parse(productsList.toString()));
    })
    .catch((err) => {
      cb([]);
    });

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  save() {
    let productsArray = [];
    getProductsFromFile((products) => {
      productsArray = productsArray.concat(products, this);
      fs.writeFile(productsFilePath, JSON.stringify(productsArray)).catch((e) =>
        console.error(e)
      );
    });
  }
};
