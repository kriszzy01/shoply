import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import SVG from "react-inlinesvg";

import style from "./style.module.scss";

import { Button, Dialog } from "@/components/Elements";

import { useDisclosure } from "@/hooks/useDisclosure";
import { storeSlice } from "@/selectors";
import { addItemsToStore, craftProduct, updateProduct } from "@/slices/store";

import { ProductTag } from "../ProductTag";
import { ProductMaterial } from "../ProductMaterial";
import { addNotification } from "@/slices/notifications";

interface DetailsModalProp {
  trigger: React.ReactElement;
  id: string;
}

export const ProductModal = ({ trigger, id }: DetailsModalProp) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(1);
  const { isOpen, handleClose, handleOpen } = useDisclosure();
  const { products } = useSelector(storeSlice);

  const triggerButton = React.cloneElement(trigger, { onClick: handleOpen });
  const product = products[id];

  React.useEffect(() => {
    setQuantity(product.amount);
  }, [product]);

  const handleUpdateQuantity = () => {
    dispatch(updateProduct({ product: { ...product, amount: quantity } }));
    dispatch(
      addNotification({
        title: "Success",
        message: `Successfully updated ${product.name}`,
        variant: "success",
      })
    );
  };

  const handleQuantity = (value: "increase" | "decrease") => {
    setQuantity((state) =>
      value === "increase"
        ? state + 1
        : state !== 1 && value === "decrease"
        ? state - 1
        : 1
    );
  };

  const handleCraftProduct = () => {
    let isInsufficient = product.materials.find(
      (product) => product.count > products[product.productID].amount //check if available materials are sufficient for crafting products
    );

    if (isInsufficient) {
      dispatch(
        addNotification({
          title: "Error",
          message: `Insufficient materials to craft ${product.name}`,
          variant: "error",
        })
      );
    } else {
      dispatch(craftProduct({ id }));
      handleClose();
      dispatch(
        addNotification({
          title: "Success",
          message: `${product.name} crafted successfully`,
          variant: "success",
        })
      );
    }
  };

  const handleChecklist = () => {
    dispatch(addItemsToStore({ items: product.materials }));
  };

  return (
    <>
      <div className={style["dialog__trigger"]}>{triggerButton}</div>
      <Dialog isOpen={isOpen} handleClose={handleClose} fillPage={true}>
        <div className={style["dialog"]}>
          <div className={style["dialog__header"]}>
            <div className={style["dialog__header-content"]}>
              <h2>Products</h2>
              <div className={style["dialog__header-content-text"]}>
                <p>{product.name}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="close"
              onClick={handleClose}
              className={style["dialog__close-button"]}
            >
              <SVG src={"/assets/close.svg"} width={32} height={32} />
            </button>
          </div>

          <div className={style["dialog__content"]}>
            <div className={style["dialog__content-image"]}>
              <Image
                src={product.imageURL}
                layout="fill"
                alt={name + "product"}
              />
            </div>

            <div className={style["dialog__content-details"]}>
              <div className={style["dialog__content-details-header"]}>
                <div
                  className={style["dialog__content-details-header-quantity"]}
                >
                  <p>Quantity</p>
                  <div
                    className={style["dialog__content-details-header-controls"]}
                  >
                    <div
                      className={
                        style[
                          "dialog__content-details-header-controls-quantity"
                        ]
                      }
                    >
                      <button
                        type="button"
                        onClick={() => handleQuantity("decrease")}
                        aria-label="increase"
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantity("increase")}
                        aria-label="decrease"
                      >
                        +
                      </button>
                    </div>

                    <div
                      className={
                        style["dialog__content-details-header-controls-update"]
                      }
                    >
                      <Button
                        variant="inverse"
                        size="sm"
                        onClick={handleUpdateQuantity}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
                <ProductTag craftable={product.craftable} />
              </div>

              {product.craftable && (
                <>
                  <div className={style["dialog__content-details-materials"]}>
                    <h4>Needed to Craft</h4>

                    <div
                      className={
                        style["dialog__content-details-materials-list"]
                      }
                    >
                      {product.materials.map((material, index) => {
                        let product = products[material.productID];
                        return (
                          <ProductMaterial
                            key={index + material.productID}
                            name={product.name}
                            imageUrl={product.imageURL}
                            count={material.count}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className={
                      style["dialog__content-details-materials-controls"]
                    }
                  >
                    <Button variant="inverse" onClick={handleCraftProduct}>
                      Craft
                    </Button>
                    <Button onClick={handleChecklist}>
                      Add items to checklist
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
