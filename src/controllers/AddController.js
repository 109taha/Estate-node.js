const Add = require("../models/AddModel");
const cloudinary = require("../helper/cloudinary");
const fs = require("fs");
const Feature = require("../models/FeatureModel");
const FloorPlans = require("../models/FloorPlanModel");

const createAdd = async (req, res) => {
  const files = req.files.pics;
  const attachments = req.files.floorPlans;
  const attachArtwork = [];
  const attached = [];
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
    if (!attachments || attachments?.length < 1)
      return res.status(401).json({
        success: false,
        message: "You have to upload at least one image to the listing",
      });
    for (const attachment of attachments) {
      const { path } = attachment;
      try {
        const uploader = await cloudinary.uploader.upload(path, {
          folder: "Estate",
        });
        attached.push({ url: uploader.secure_url });
        fs.unlinkSync(path);
      } catch (err) {
        if (attached?.length) {
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
    let floorPlans = [];
    for (let i = 0; i < attached.length; i++) {
      const element = attached[i].url;
      floorPlans.push(element);
    }
    const newAddData = req.body;
    const newAdd = await Add({
      ...newAddData,
      pics,
      floorPlansPics: floorPlans,
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

module.exports = { createAdd, createFloorPlan, CreateFeature, allFeature };
