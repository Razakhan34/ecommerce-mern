import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./ProductList.css";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  adminAllProducts,
  clearError,
  deleteProduct,
} from "../../store/product-actions";
import { Button } from "@mui/material";
import { adminProductActions, productActions } from "../../store/product-slice";

const ProductList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, adminProducts } = useSelector((state) => state.product);
  const { error: deleteProductError, deleteProductStatus } = useSelector(
    (state) => state.adminProduct
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (deleteProductError) {
      alert.error(deleteProductError);
      dispatch(productActions.clearErrorForAdminProduct);
    }
    if (deleteProductStatus) {
      alert.success(`Product deleted successfully`);
      dispatch(adminProductActions.deleteProductReset());
    }
    dispatch(adminAllProducts());
  }, [dispatch, alert, error, deleteProductStatus, deleteProductError]);

  const deleteProductHandler = (id) => {
    const result = window.confirm("are you really want to delete this product");
    if (result) {
      dispatch(deleteProduct(id));
    }
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.4,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  adminProducts &&
    adminProducts.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
