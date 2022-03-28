import Image from "next/image";
import clsx from "clsx";

import style from "./style.module.scss";

interface ProductMaterialProps {
  name: string;
  imageUrl: string;
  count: number;
  variant?: "primary" | "secondary";
}

export const ProductMaterial = ({
  name,
  imageUrl,
  count,
  variant = "primary",
}: ProductMaterialProps) => {
  const className = clsx({
    [style["material"]]: true,
    [style[`material__variant-${variant}`]]: true,
  });

  return (
    <div className={className}>
      <div className={style["material__image"]}>
        <Image src={imageUrl} layout="fill" alt={name + "product"} />
      </div>
      <div className={style["material__content"]}>
        <p>{name}</p>
        <p>
          x <span className={style["material__content-count"]}>{count}</span>
        </p>
      </div>
    </div>
  );
};
