const Add = require("../models/AddModel");
const cloudinary = require("../helper/cloudinary");
const fs = require("fs");
const Feature = require("../models/FeatureModel");
const FloorPlans = require("../models/FloorPlanModel");

const createAdd = async (req, res) => {
  const files = req.files;
  const attachArtwork = [];

  try {
    if (!files || files?.length < 1)
      return res.status(401).json({
        success: false,
        message: "You have to upload at least one image to the listing",
      });
    for (const file of files) {
      const { path } = file;
      try {
        const uploader = await cloudinary.uploader.upload(path, {
          folder: "Estate",
        });
        attachArtwork.push({ url: uploader.secure_url });
        fs.unlinkSync(path);
      } catch (err) {
        if (attachArtwork?.length) {
          const imgs = imgObjs.map((obj) => obj.public_id);
          cloudinary.api.delete_resources(imgs);
        }
        console.log(err);
      }
    }

    let pics = [];
    for (let i = 0; i < attachArtwork.length; i++) {
      const element = attachArtwork[i].url;
      pics.push(element);
    }

    const newAddData = req.body;
    if (newAddData.createdByUser) {
      const newAdd = await Add({
        ...newAddData,
        pics,
        addStatus: "Pending",
      });

      newAdd.save();

      return res.status(200).send({
        sucess: true,
        message: "your add is added successfully",
        data: newAdd,
      });
    }

    const newAdd = await Add({
      ...newAddData,
      pics,
      addStatus: "LiveNow",
    });

    newAdd.save();

    res.status(200).send({
      sucess: true,
      message: "your add is added successfully",
      data: newAdd,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error`" });
    throw error;
  }
};

const acceptUserAdds = async (req, res) => {
  try {
    const addId = req.params.Id;
    const brokerId = req.user;

    const add = await Add.findById(addId);
    add.addStatus = "LiveNow";
    add.createdByAgent = brokerId;

    await add.save();

    res
      .status(200)
      .send({ success: true, message: "Add accepted successfully", data: add });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error`" });
    throw error;
  }
};

const updateAdd = async (req, res) => {
  const files = req.files;
  const attachArtwork = [];

  try {
    for (const file of files) {
      const { path } = file;
      try {
        const uploader = await cloudinary.uploader.upload(path, {
          folder: "Estate",
        });
        attachArtwork.push({ url: uploader.secure_url });
        fs.unlinkSync(path);
      } catch (err) {
        if (attachArtwork?.length) {
          const imgs = attachArtwork.map((obj) => obj.public_id);
          cloudinary.api.delete_resources(imgs);
        }
        console.log(err);
        throw err;
      }
    }

    let pics = [];
    for (let i = 0; i < attachArtwork.length; i++) {
      const element = attachArtwork[i].url;
      pics.push(element);
    }

    const updateData = req.body;

    const addId = req.params.id;

    // Find the Add by ID
    const existingAdd = await Add.findById(addId);

    if (!existingAdd) {
      return res.status(404).json({
        success: false,
        message: "Add not found",
      });
    }

    existingAdd.name = updateData.name || existingAdd.name;
    existingAdd.address = updateData.address || existingAdd.address;
    existingAdd.description = updateData.description || existingAdd.description;
    existingAdd.price = updateData.price || existingAdd.price;
    existingAdd.pics = pics || existingAdd.pics;
    existingAdd.location = updateData.location || existingAdd.location;
    existingAdd.propertyDetail =
      updateData.propertyDetail || existingAdd.propertyDetail;
    existingAdd.floorPlans = updateData.floorPlans || existingAdd.floorPlans;
    existingAdd.createdByUser =
      updateData.createdByUser || existingAdd.createdByUser;
    existingAdd.createdByAgent =
      updateData.createdByAgent || existingAdd.createdByAgent;
    existingAdd.feature = updateData.feature || existingAdd.feature;

    // Save the updated Add
    const updatedAdd = await existingAdd.save();

    res.status(200).json({
      success: true,
      message: "Add updated successfully",
      data: updatedAdd,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error`" });
    throw error;
  }
};

const getAdd = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }

    const total = await Add.countDocuments();

    const allAdds = await Add.find()
      .select("pics address description price name")
      .skip(skip)
      .limit(limit)
      .sort(sortBY);

    const totalPages = Math.ceil(total / limit);

    if (allAdds <= 0) {
      return res.status(400).send({ success: false, message: "No Adds found" });
    }
    res.status(200).send({
      success: true,
      message: "Following are all the Adds",
      data: allAdds,
      page,
      totalPages,
      limit,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error" });
    throw error;
  }
};

const getOne = async (req, res) => {
  try {
    const oneAdd = await Add.findById(req.params.Id).populate(
      "floorPlans createdByUser createdByAgent feature"
    );
    if (!oneAdd) {
      return res
        .status(400)
        .send({ success: false, message: "No add found on that Id" });
    }
    res.status(200).send({
      success: true,
      message: "Following are that One add which you want to see",
      data: oneAdd,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error" });
    throw error;
  }
};

const deleteAdd = async (req, res) => {
  try {
    const allAdds = await Add.findByIdAndDelete(req.params.Id);

    res.status(200).send({
      success: true,
      message: "Add deleted sucessfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error" });
    throw error;
  }
};

const createFloorPlan = async (req, res) => {
  try {
    const files = req.files;
    const attachArtwork = [];
    if (!files || files?.length < 1)
      return res.status(401).json({
        success: false,
        message: "You have to upload at least one image to the listing",
      });
    for (const file of files) {
      const { path } = file;
      try {
        const uploader = await cloudinary.uploader.upload(path, {
          folder: "Estate",
        });
        attachArtwork.push({ url: uploader.secure_url });
        fs.unlinkSync(path);
      } catch (err) {
        if (attachArtwork?.length) {
          const imgs = imgObjs.map((obj) => obj.public_id);
          cloudinary.api.delete_resources(imgs);
        }
        console.log(err);
      }
    }
    const newData = req.body;
    console.log(newData);
    const newFloorData = new FloorPlans({
      ...newData,
      floorPlansPics: attachArtwork[0].url,
    });
    await newFloorData.save();
    res.status(200).send({
      success: true,
      message: "floor created successfully",
      data: newFloorData,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error`" });
    throw error;
  }
};

const updateFloorPlan = async (req, res) => {
  try {
    const files = req.files;
    const attachArtwork = [];
    if (files.length > 0) {
      for (const file of files) {
        const { path } = file;
        try {
          const uploader = await cloudinary.uploader.upload(path, {
            folder: "Estate",
          });
          attachArtwork.push({ url: uploader.secure_url });
          fs.unlinkSync(path);
        } catch (err) {
          if (attachArtwork?.length) {
            const imgs = attachArtwork.map((obj) => obj.public_id);
            cloudinary.api.delete_resources(imgs);
          }
          console.log(err);
          throw err;
        }
      }
    }
    const updateData = req.body;

    const floorPlansId = req.params.id;

    const existingFloorPlan = await FloorPlans.findById(floorPlansId);

    if (!existingFloorPlan) {
      return res.status(404).json({
        success: false,
        message: "Floor plan not found",
      });
    }
    if (attachArtwork.length > 0) {
      existingFloorPlan.floorPlansPics = attachArtwork[0].url;
    }
    existingFloorPlan.totalSize =
      updateData.totalSize || existingFloorPlan.totalSize;
    existingFloorPlan.roomSize =
      updateData.roomSize || existingFloorPlan.roomSize;
    existingFloorPlan.washroomSize =
      updateData.washroomSize || existingFloorPlan.washroomSize;
    existingFloorPlan.prices = updateData.prices || existingFloorPlan.prices;

    const updatedFloorPlan = await existingFloorPlan.save();

    res.status(200).json({
      success: true,
      message: "Floor plan updated successfully",
      data: updatedFloorPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error`" });
    throw error;
  }
};

const getFloorPlan = async (req, res) => {
  try {
    const allFloorPlan = await FloorPlans.find();
    if (allFloorPlan <= 0) {
      return res
        .status(400)
        .send({ success: false, message: "No floorPlan found" });
    }
    res.status(200).send({
      success: true,
      message: "Following are all the Floor Plans",
      data: allFloorPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error" });
    throw error;
  }
};

const CreateFeature = async (req, res) => {
  try {
    const feature = req.body.feature;
    if (!feature) {
      return res.status(400).send({
        success: false,
        message: "You have to add the name of the Feature!",
      });
    }
    const newFeature = new Feature({
      feature,
    });
    await newFeature.save();
    res.status(200).send({
      success: true,
      message: "Feature added successfully",
      data: newFeature,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error`" });
    throw error;
  }
};

const allFeature = async (req, res) => {
  try {
    const allFeature = await Feature.find();
    return res.status(200).send({
      success: true,
      message: "Following are all of the feature",
      data: allFeature,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error`" });
    throw error;
  }
};

module.exports = {
  createAdd,
  updateAdd,
  acceptUserAdds,
  getAdd,
  getOne,
  deleteAdd,
  createFloorPlan,
  updateFloorPlan,
  getFloorPlan,
  CreateFeature,
  allFeature,
};
