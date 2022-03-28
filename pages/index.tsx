import * as React from "react";
import { axios } from "@/lib/axios";
import type { NextPage } from "next";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import style from "./style.module.scss";

import { Button, Spinner } from "@/components/Elements";
import { Card, ProductMaterial, ProductModal } from "@/components/Product";
import { InputField } from "@/components/Form";
import {
  addProducts,
  clearStore,
  removeStoreItem,
  updateProduct,
} from "@/slices/store";
import { storeSlice } from "@/selectors";
import { Product } from "@/types";
import { addNotification } from "@/slices/notifications";

type FilterField = "owned" | "not-owned" | "craftable" | null;

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const [filterField, setFilterField] = React.useState<FilterField>(null);
  const { products, shop } = useSelector(storeSlice);
  const storeProducts = getStoreProducts(filterField, products);
  const { isLoading } = useProducts(storeProducts);

  const shopItems = Object.values(shop);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nextValue = event.target.value as FilterField;

    setFilterField((value) => (value !== nextValue ? nextValue : null));
  };

  const handleClearStore = () => dispatch(clearStore());

  const handleUpdateProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    let id = event.target.value;
    let product = products[id];
    let shopItem = shop[id];
    let amount = product.amount + shopItem.count; //Add existing amount to purchased amount

    dispatch(
      updateProduct({
        product: { ...product, amount, owned: true },
      })
    );

    dispatch(removeStoreItem({ id }));

    dispatch(
      addNotification({
        title: "Success",
        message: `Successfully purchased ${product.name}`,
        variant: "success",
      })
    );
  };

  if (isLoading) {
    return (
      <div className="fill-center">
        <Spinner size="xl" variant="primary" />
      </div>
    );
  }

  return (
    <main className={style["home"]}>
      <section className={style["home__products"]}>
        <div className={style["home__products-header"]}>
          <h1>Store</h1>
          <div className={style["home__products-header-control"]}>
            <p>Filter by</p>
            <div className={style["home__products-header-control-buttons"]}>
              <InputField
                id="owned"
                type="checkbox"
                label="Owned"
                checked={filterField === "owned"}
                onChange={handleFilter}
                value="owned"
              />
              <InputField
                id="not-owned"
                type="checkbox"
                label="Not Owned"
                checked={filterField === "not-owned"}
                onChange={handleFilter}
                value="not-owned"
              />
              <InputField
                id="craftable"
                type="checkbox"
                label="Craftable"
                checked={filterField === "craftable"}
                onChange={handleFilter}
                value="craftable"
              />
            </div>
          </div>
        </div>
        <div className={style["home__products-list"]}>
          <AnimatePresence>
            {storeProducts.length !== 0 ? (
              storeProducts.map((product, index) => (
                <motion.div
                  key={product.name + product.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.12 },
                  }}
                >
                  <ProductModal
                    trigger={
                      <Card
                        name={product.name}
                        craftable={product.craftable}
                        amount={product.amount}
                        imageURL={product.imageURL}
                      />
                    }
                    id={`${product.id}`}
                  />
                </motion.div>
              ))
            ) : (
              <p>No {filterField} items</p>
            )}
          </AnimatePresence>
        </div>
      </section>

      <aside className={style["home__shop"]}>
        <div className={style["home__shop-header"]}>
          <p>Item Checklist ({shopItems.length})</p>

          <Button variant="inverse" size="sm" onClick={handleClearStore}>
            Reset
          </Button>
        </div>

        <div>
          {shopItems.length !== 0 ? (
            shopItems.map((item, index) => {
              let product = products[item.productID];
              return (
                <motion.div
                  key={product.id + "shop"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.12 },
                  }}
                  className={style["home__shop-item"]}
                >
                  <InputField
                    id={`item${item.productID}`}
                    type="checkbox"
                    label=""
                    checked={false} //will not be necessary since product will be removed
                    onChange={handleUpdateProduct}
                    value={product.id}
                  />
                  <ProductMaterial
                    name={product.name}
                    imageUrl={product.imageURL}
                    count={item.count}
                    variant="secondary"
                  />
                </motion.div>
              );
            })
          ) : (
            <p>No Items in the shop</p>
          )}
        </div>
      </aside>
    </main>
  );
};

export default Home;

export function getProducts() {
  return axios.get("/products");
}

export function useProducts(product: Product[]) {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    onSuccess: ({ data }) => {
      dispatch(addProducts({ products: data }));
    },
    refetchOnMount: false,
    enabled: product.length === 0, //only make api call when products have not been fetched
    suspense: false,
  });
}

function getStoreProducts(
  filterfield: FilterField,
  products: Record<string, Product>
) {
  const storeProducts = Object.values(products);

  switch (filterfield) {
    case "craftable":
      return storeProducts.filter((product) => product.craftable);

    case "not-owned":
      return storeProducts.filter((product) => !product.owned);

    case "owned":
      return storeProducts.filter((product) => product.owned);

    default:
      return storeProducts;
  }
}
