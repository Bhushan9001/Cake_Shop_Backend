const slugify = require("slugify");
const Product = require("../models/product")
exports.createProduct = (req, res) => {
  const { name, price, description, category, quantity,flavour,img} = req.body;

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    description,
    img,
    flavour,
    quantity,
    category
  });

  product.save(
    (err, product) => {
      if (err) return res.status(400).json({ err })
      if (product) {
        res.status(201).json({ product })
      }

    }
  )
}

exports.getProducts = (req, res) => {
  Product.find({}).exec((error, products) => {
    if (error) return res.status(400).json({ error });
    if (!error && products) {
      res.status(200).json({ products });
      
    }
  });
};