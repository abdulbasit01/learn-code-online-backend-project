const Category = require('../models/category')
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((error, cate) => {
    if (error && !cate) {
      return res.status(400).json({ error: "Category not found" })
    }
    req.category = cate
  })

  next()

}

exports.createCategory = (req, res, next) => {
  const category = new Category(req.body)
  category.save((error, cate) => {
    if (error && !cate) {
      return res.status(400).json({ error: 'Not able to save category' })
    }
    res.status(400).json({ category: cate })
  })
}


exports.getCategory = (req, res, next) => {
  return res.status(200).json({ category: req.category })
}
exports.getAllCategories = (req, res, next) => {
  Category.find().exec((error, categories) => {
    if (error && !categories) {
      return res.status(400).json({ error: 'No categories found' })
    }
    res.status(200).json(categories)
  })
}

exports.updateCategory = (req, res, next) => {
  const category = req.category
  category.name = req.body.name
  category.save((error, updatedCategory) => {
    if (error && !updatedCategory) {
      return res.status(400).json({ error: 'Not able to update category' })
    }
    res.status(400).json({ category: updatedCategory })
  })
}