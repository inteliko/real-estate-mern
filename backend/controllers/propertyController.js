const Property = require('../models/property');
const propertyController = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

// Get all properties
propertyController.get('/getAll', async (req, res) => {
  try {
    const properties = await Property.find({});
    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Get featured properties
propertyController.get('/find/featured', async (req, res) => {
  try {
    const featuredProperties = await Property.find({ features: true }).populate(
      'currentOwner',
      '-password'
    );
    return res.status(200).json(featuredProperties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Get properties of a specific type
propertyController.get('/find', async (req, res) => {
  const type = req.query.type;
  try {
    if (type) {
      const properties = await Property.find({ type }).populate(
        'currentOwner',
        '-password'
      );
      return res.status(200).json(properties);
    } else {
      return res.status(500).json({ msg: 'No such type' });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Get counts of types
propertyController.get('/find/types', async (req, res) => {
  try {
    const flatType = await Property.countDocuments({ type: 'flat' });
    const apartmentType = await Property.countDocuments({ type: 'apartment' });
    const houseType = await Property.countDocuments({ type: 'house' });

    return res.status(200).json({
      flat: flatType,
      apartment: apartmentType,
      house: houseType,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Get individual property

propertyController.get('/find/:id', async (req, res) => {
  

  try {
    const property = await Property.findById(req.params.id);
     
   

   if(property ){res.status(200).json(property)}
  } catch (error) {
    return res.status(500).json(error.message);
  }
});









// Create a property
propertyController.post('/', verifyToken, async (req, res) => {
  try {
    const newProperty = await Property.create({
      ...req.body,
      currentOwner: req.user.id,
    });
    return res.status(201).json(newProperty);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
// Update property
propertyController.put('/:id', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    console.log(id)

    

    if (property.currentOwner.toString() !== req.user.id.toString()) {
      throw new Error('You are not allowed to update other people\'s properties');
    } else {
      const updatedProperty = await Property.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json(updatedProperty);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Delete property
propertyController.get('/:id', verifyToken, async (req, res) => {

  console.log('Hellow')

  try {
    const property = await Property.findById(req.params.id);

    console.log(req.params.id)

    if (property.currentOwner.toString() !== req.user.id.toString()) {
      throw new Error('You are not allowed to delete other people\'s properties');
    } else {
      await property.delete();
      return res.status(200).json({ msg: 'Successfully deleted property' });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});


module.exports = propertyController;
