const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


  
  // find all tags
  // be sure to include its associated Product data
  router.get('/', async (req, res) => {
    try {
      const tagData = await Tag.findAll({
      include: [{ model: Product }],
    })
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err)
    }
    });


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    })
    if(!tagData) {
      res.status(404).json(err, {msg: `No tag found for id of: ${req.params.id}`})
      return
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
    
})

router.post('/', async (req, res) => {
  // create a new tag
  try { 
    const tagData = await Tag.create(req.body)
    res.status(201).json(tagData)
    } catch (err) {
      res.status(400).json(err)
    }
  });


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name
    },
    {
      // Gets the tag_name based on the id given in the request parameters
      where: {
        id: req.params.id
      },
    }
  )
    res.status(201).json(updatedTag);
    } catch(err) {
      res.status(500).json(err);
    };
  })

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  // Looks for the tag based on id given in the request parameters and deletes the instance from the database
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      },
    })
    res.status(204).json(deletedTag);
  } catch(err) {
    res.status(404).json(err, {msg: `No tag found for id of ${req.params.id}`})
  } 
})

module.exports = router;
