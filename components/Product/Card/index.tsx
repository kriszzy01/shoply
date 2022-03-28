import * as React from "react";
import Image from "next/image";

import style from "./style.module.scss";

import { Product } from "@/types";
import { ProductTag } from "../ProductTag";

type CardProps = Omit<Product, "materials" | "id"> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Card = ({
  name,
  imageURL,
  craftable,
  amount,
  ...props
}: CardProps) => {
  return (
    <button type="button" className={style["card"]} {...props}>
      <div className={style["card__image"]}>
        <Image src={imageURL} layout="fill" alt={name + "product"} />
      </div>
      <div className={style["card__details"]}>
        <p>{name}</p>
        <p>
          <span className="col-primary">{amount}</span>{" "}
          <span className="col-dark">in Stock</span>
        </p>
      </div>

      <ProductTag craftable={craftable} />
    </button>
  );
};
