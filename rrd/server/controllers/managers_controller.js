let controler_name = "manager";
let object_name = "Manager";
let objects_name = "managers";

let Model = require(`../models/${object_name}`);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { recoveryPassword } = require("../middlewares/mailer")
module.exports = {
  // functions for admins
  addManagerForAdmins: async (req, res) => {
    try {
      // gettind values from the body request
      const { manager_name, manager_email, manager_password, manager_phone, manager_address } =
        req.body;

      // creating new model using the values from req.body
      const new_model = new Model({
        manager_name,
        manager_email,
        manager_password,
        manager_phone: manager_phone || "",
        manager_address: manager_address || "",
      });

      // actual saving
      await new_model.save();

      // return success message
      return res.status(200).json({
        success: true,
        message: `success to add new ${controler_name}`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in add ${controler_name}`,
        error: error.message,
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const models = await Model.find().populate([
        "manager_cart",
        "manager_orders.order",
      ]).exec();

      return res.status(200).json({
        success: true,
        message: `success to find all ${objects_name}`,
        [objects_name]: models,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in get all ${objects_name}`,
        error: error.message,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const models = await Model.findById(req.params.id).populate([
        "manager_cart",
        "manager_orders.order",
      ]).exec();

      return res.status(200).json({
        success: true,
        message: `success to find ${controler_name} by id`,
        [objects_name]: models,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in find ${controler_name} by id}`,
        error: error.message,
      });
    }
  },

  updateById: async (req, res) => {
    try {
      const id = req.params.id;

      await Model.findByIdAndUpdate(id, req.body).exec();

      return res.status(200).json({
        success: true,
        message: `success to update ${controler_name} by id`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in update ${controler_name} by id`,
        error: error.message,
      });
    }
  },

  deleteById: async (req, res) => {
    try {
      const id = req.params.id;

      await Model.findByIdAndDelete(id).exec();

      return res.status(200).json({
        success: true,
        message: `success to delete ${controler_name} by id`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in delete ${controler_name} by id`,
        error: error.message,
      });
    }
  },
  loginManager: async (req, res) => {
    try {
      const { manager_email, manager_password } = req.body;
      
      const manager = await Model.findOne({ manager_email });

      if (!manager) {
        throw new Error("bad creditians");
      }

      const equal = await bcrypt.compare(manager_password, manager.manager_password);

      if (!equal) {
        throw new Error("bad creditians");
      }

      // manager login success

      let payload = {
        manager: manager._id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 10800,
      });
    
      let oldTokens = manager.tokens || [];
    
      if (oldTokens.length) {
        oldTokens = oldTokens.filter(t => {
          const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
          if (timeDiff < 1000) {
            return t;
          }
        });
      }
    
      await Model.findByIdAndUpdate(manager._id, {
        tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
      }).exec();

      res.cookie('token',token,{ maxAge :1000 * 60 * 60 , httpOnly:true , sameSite:'lax'})

      return res.status(201).json({
        success: true,
        message: "login seccessfully",
        token,
        manager: {
          _id:manager._id,
          manager_name: manager.manager_name,
          manager_email: manager.manager_email,
        },
      });
    } catch (error) {
      return res.status(401).json({
        message: "error in login request",
        error: error.message,
      });
    }
  },

  logoutManager: async (req, res) => {
      try {
      const tokens = req.manager.tokens;
  
      const newTokens = tokens.filter(t => t.token !== req.token);
  
      await Model.findByIdAndUpdate(req.manager._id, { tokens: newTokens }).exec();

      res.clearCookie("token");

      return res.status(200).json({
        success: true,
        message: "success to logout manager",
      });
      }  catch (error) {
        return res.status(500).json({
          message: "error in logout request",
          error: error.message,
        });
      }
  },

  authManager: async (req, res) => {
    try {
      // const token = req.headers.authorization;
      const token = req.cookies?.token

      if (!token) {
        throw new Error("no token provided");
      }

      // const bearer = token.split(" ")[1];
      const bearer = token;

      const decode = jwt.verify(bearer, process.env.JWT_SECRET);

      const manager = await Model.findById(decode.manager).exec();

      if (!manager || manager.permission !== 1) {
        throw new Error("access denided");
      }
      const status = manager.tokens.some((t) => t.token == bearer)

      if(!status){
        throw new Error("no access")
      };

      //manager login refresh

      let payload = {
        manager: manager._id,
      };

      const new_token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 10800,
      });

      const updatedTokens = manager.tokens.filter((t) => t.token !== bearer);
      await Model.findByIdAndUpdate(manager._id, {
        tokens: [...updatedTokens, { token:new_token, signedAt: Date.now().toString() }],
      }).exec();

      res.cookie('token',new_token,{httpOnly:true , maxAge:1000 * 60 * 60 * 3})

      return res.status(201).json({
        success: true,
        message: "manager authoraized",
        token:new_token,
        manager: {
          _id:manager._id,
          manager_name: manager.manager_name,
          manager_email: manager.manager_email,
        },
      });
    } catch (error) {
      return res.status(401).json({
        message: "unauthoraized",
        error: error.message,
      });
    }
  },
  recoveryPassword: async (req,res) => {
     try {
      const response = await recoveryPassword(req.body)
     return res.status(200).json({
      success: true,
      message: response.message,
    });
     } catch (error) {
      console.log(error)
      return res.status(401).json({
        message: "unauthoraized",
        error: error.message,
      });
     }
  },
  updatePassword:async (req,res) => {
    try {
    const { manager_password } = req.body;
    const email = req.params.user_email;
    
    const manager =  await Model.find({manager_email:email});

    if(!manager) throw new Error('unauthoraized');
    const hash = await bcrypt.hash(manager_password,15)
    manager[0].manager_password = hash
    const id = manager[0]._id
    
    await Model.findByIdAndUpdate(id,manager[0]).exec();

    return res.status(200).json({
     success: true,
     message: "Manager success to change password",
   });
    } catch (error) {
     console.log(error)
     return res.status(401).json({
       message: "unauthoraized",
       error: error.message,
     });
    }
 },
};
