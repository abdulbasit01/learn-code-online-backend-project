var router = require("express").Router();

const { getCategoryById, createCategory, getCategory, getAllCategories, updateCategory } = require('../controllers/category')
const { getUserById } = require('../controllers/user')
const { isSignedIn, isAdmin, isAuthenticated } = require('../guards/guards')


// params
router.param('userId', getUserById)
router.param('categoryId', getCategoryById)
// routes
router.post('/category/create', isSignedIn, isAuthenticated, isAdmin, createCategory)
router.post('/category/:categoryId', isSignedIn, isAuthenticated, isAdmin, getCategory)
router.post('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, updateCategory)
router.post('/categories', isSignedIn, isAuthenticated, isAdmin, getAllCategories)
module.exports = router