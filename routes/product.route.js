const express = require('express');
const productController = require('../controller/product.controller');
const { body } = require('express-validator');
const route = express.Router();

const multer = require("multer");
var storage = multer.diskStorage({
    destination: "public/images",
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

var upload = multer({ storage: storage });


route.post("/add-product", upload.single('productImage'),
    body('productName').notEmpty(),
    body('productDesc').notEmpty(),
    body('productInitialPrice').isNumeric().notEmpty(),
    body('creator').notEmpty(),
    body('startTime').notEmpty(),
    body('endTime').notEmpty(),
    body('categoryName').notEmpty(),
    productController.add);

route.post("/delete-product", body('productId').notEmpty(), productController.delete)

route.get("/product-list", productController.productList);

route.post("/edit-product", upload.single('productImage'),
    body('productName').notEmpty(),
    body('productDesc').notEmpty(),
    body('productInitialPrice').isNumeric().notEmpty(),
    body('creator').notEmpty(),
    body('startTime').notEmpty(),
    body('endTime').notEmpty(),
    body('categoryName').notEmpty(),
    body('productId').notEmpty(),
    // body('isApproved').notEmpty(),

    productController.edit);

route.post("/product-approved", productController.isApproved);

route.post("/product-search",productController.searchProduct);

route.post("/product-approved-cancel", productController.isApprovedCancel);

route.post("/product-list-category", productController.productListByCategory);

route.post("/product-list-by-seller", productController.productListBySeller);

route.post("/approved-product-list-by-seller", productController.approvedProductListBySeller);

route.post("/cancel-product-list-by-seller", productController.cancelProductListBySeller);

// route.post("/cancel-product-auction", productController.cancelProductAuction);

    
module.exports = route;
