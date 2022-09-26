import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import defImg from "../../assets/img/default-image.png";
import { Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../..";
import { useCollectionData } from "react-firebase-hooks/firestore";
import classes from "./OnlineStore.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setAppStatusAC } from "../../store/reducers/app-reducer";
import {
  priceSelector,
  setOrdersNumAC,
  setPriceAC,
} from "../../store/reducers/cart-reducer";

export const OnlineStore: React.FC = React.memo(() => {
  const priceStore = useAppSelector(priceSelector);

  const { state } = useLocation();

  const dispatch = useAppDispatch();

  const [products] = useCollectionData(query(collection(db, "products")));

  !products
    ? dispatch(setAppStatusAC({ status: "loading" }))
    : dispatch(setAppStatusAC({ status: "idle" }));

  const addToCartHandler = (price: number) => {
    dispatch(setPriceAC({ price }));
    dispatch(setOrdersNumAC());
  };

  return (
    <div className={classes.wrapper}>
      <h3>{state} </h3>

      <div>sorting... add in future)))</div>
      <div className={classes.productsList}>
        {products &&
          products.map((model, ind) => (
            <div key={ind} className={classes.item}>
              <div className={classes.item_image}>
                <img
                  src={model.image ? model.image : defImg}
                  alt={"product-item"}
                />
              </div>

              <div
                className={classes.item_title}
              >{`${model.brand} ${model.model}, ${model.year}`}</div>
              <div
                className={classes.item_description}
              >{`${model.body} / ${model.gear} / ${model.fuel}`}</div>
              <div className={classes.item_inStore}>
                In stock
                {model.inStore ? (
                  <DoneIcon color="success" />
                ) : (
                  <CloseIcon color="error" />
                )}
              </div>
              <div className={classes.item_price}>${model.price}</div>

              <div
                style={
                  !model.inStore
                    ? { backgroundColor: "gray", pointerEvents: "none" }
                    : {}
                }
                className={classes.item_controls}
                onClick={() => addToCartHandler(model.price)}
              >
                Add to cart
              </div>
            </div>
          ))}
      </div>
    </div>
  );
});
