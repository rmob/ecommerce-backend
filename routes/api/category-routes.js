const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
   // find all categories
  // be sure to include its associated Products
  try{
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  })
  res.status(200).json(categoryData)
} catch (err) {
  res.status(500).json(err)
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!categoryData) {
      res.status(404).json(err, {msg: `Id of ${req.params.id} not found`})
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    })
    res.status(201).json(categoryData)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update({
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id
      },
    })
    res.status(201).json(updatedCategory)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(deleteCategory)
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
