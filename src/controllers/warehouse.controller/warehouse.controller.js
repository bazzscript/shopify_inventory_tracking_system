const {
  StatusCodes
} = require('http-status-codes');
const WarehouseModel = require('../../models/warehouse.model');

const Warehouse = {}


// Create a new warehouse
Warehouse.addNewWarehouse = async (req, res) => {
  try {
    const body = await req.body;
    if (!body) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        status_code: StatusCodes.BAD_REQUEST,
        message: "the request body is empty"
      });
    }

    const warehouseName = body.warehouse_name;
    const warehouseAddress = body.warehouse_address;

    // Confirm all the required fields are present, not empty and valid
    if (!warehouseName) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        status_code: StatusCodes.BAD_REQUEST,
        message: "the warehouse name is empty"
      });
    }
    if (!warehouseAddress) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        status_code: StatusCodes.BAD_REQUEST,
        message: "the warehouse address is empty"
      });
    }

    const warehouse = await new WarehouseModel({
      warehouseName: warehouseName,
      warehouseAddress: warehouseAddress
    });

    const newWarehouse = await warehouse.save();
    return res.status(StatusCodes.OK).json({
      status: "success",
      status_code: StatusCodes.OK,
      message: "Item added successfully",
      data: {
        item: newWarehouse
      }
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      status_code: StatusCodes.OK,
      message: error.message
    });
  }
};


// Get all warehouses
Warehouse.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await WarehouseModel.find();
    return res.status(StatusCodes.OK).json({
      status: "success",
      status_code: StatusCodes.OK,
      message: "All warehouses retrieved successfully",
      data: {
        warehouses: warehouses
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      status_code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    });
  }
}

// Update a warehouse
Warehouse.updateWarehouse = async (req, res) => {
  try {
    const warehouse_id = await req.params.warehouse_id;
    if (!warehouse_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        status_code: StatusCodes.BAD_REQUEST,
        message: "the warehouse id is undefined"
      });
    }
    
    const body = await req.body;
    if (!body) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        status_code: StatusCodes.BAD_REQUEST,
        message: "the request body is empty"
      });
    }

    // Confirm the warehouse exists in the db
    
    try {
      await WarehouseModel.findOne({
        _id: warehouse_id
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        status_code: StatusCodes.BAD_REQUEST,
        message: "the given warehouse id does not exist"
      });
    }
    console.log('am hit o');



    const warehouseName = body.warehouse_name;
    const warehouseAddress = body.warehouse_address;

    // Confirm all the required fields are present, not empty and valid
    if (warehouseName || warehouseAddress) {
      const data = {
        warehouseName: warehouseName,
        warehouseAddress: warehouseAddress
      };
      const updatedWarehouse = await WarehouseModel.findOneAndUpdate({
        _id: warehouse_id
      }, data, {
        new: true
      });
      return res.status(StatusCodes.OK).json({
        status: "success",
        status_code: StatusCodes.OK,
        message: "Warehouse updated successfully",
        data: {
          warehouse: updatedWarehouse
        }
      });
    }
    return res.status(StatusCodes.OK).json({
      status: "success",
      status_code: StatusCodes.OK,
      message: "No changes made to warehouse, as no fields were provided",
     
    });

  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      status_code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    });
  }
}


// Delete a warehouse
Warehouse.deleteWarehouse = async (req, res) => {
  try {
    const warehouse_id = await req.params.warehouse_id;
    if (!warehouse_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        status_code: StatusCodes.BAD_REQUEST,
        message: "the warehouse id is undefined"
      });
    }

    // Confirm the warehouse exists in the db
    try {
     const warehouse =  await WarehouseModel.findOne({
        _id: warehouse_id
      });

      if (!warehouse) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          status_code: StatusCodes.BAD_REQUEST,
          message: "the given warehouse id does not exist"
        });
      }
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        status_code: StatusCodes.BAD_REQUEST,
        message: "the given warehouse id does not exist"
      });
    }

    const deletedWarehouse = await WarehouseModel.findOneAndDelete({
      _id: warehouse_id
    });
    return res.status(StatusCodes.OK).json({
      status: "success",
      status_code: StatusCodes.OK,
      message: "Warehouse deleted successfully",

    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      status_code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    });
  }
}




module.exports = Warehouse;