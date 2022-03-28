import style from "./style.module.scss";

interface ProductTagProps {
  craftable?: boolean;
}

export const ProductTag = ({ craftable = false }: ProductTagProps) => {
  return (
    <span className={style["tag"]} data-craftable={craftable}>
      {craftable ? "Craftable" : "Uncraftable"}
    </span>
  );
};
