import type { NextApiRequest, NextApiResponse } from 'next'

interface Material {
  productID: number
  count: number
}

interface Product {
  name: string
  id: number
  imageURL: string
  materials: Material[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res.status(200).json([
    {
      id: 1,
      name: "Tree Branch",
      imageURL: "https://dodo.ac/np/images/5/5d/Tree_Branch_NH_Icon.png",
      materials: [],
    },
    {
      id: 2,
      name: "Stone",
      imageURL: "https://dodo.ac/np/images/4/45/Stone_NH_Icon.png",
      materials: [],
    },
    {
      id: 3,
      name: "Axe",
      imageURL: "https://dodo.ac/np/images/f/fa/Axe_NH_Icon.png",
      materials: [
        { productID: 10, count: 1 },
        { productID: 4, count: 3 },
        { productID: 5, count: 1 },
      ],
    },
    {
      id: 4,
      name: "Wood",
      imageURL: "https://dodo.ac/np/images/a/a2/Wood_NH_Icon.png",
      materials: [],
    },
    {
      id: 5,
      name: "Iron Nugget",
      imageURL: "https://dodo.ac/np/images/f/fd/Iron_Nugget_NH_Icon.png",
      materials: [],
    },
    {
      id: 6,
      name: "Flimsy Shovel",
      imageURL: "https://dodo.ac/np/images/e/ea/Flimsy_Shovel_NH_Icon.png",
      materials: [{ productID: 7, count: 5 }],
    },
    {
      id: 7,
      name: "DarkWood",
      imageURL: "https://dodo.ac/np/images/a/a2/Wood_NH_Icon.png",
      materials: [],
    },
    {
      id: 8,
      name: "Iron Wand",
      imageURL: "https://dodo.ac/np/images/8/8a/Iron_Wand_NH_Icon.png",
      materials: [
        { productID: 5, count: 3 },
        { productID: 9, count: 5 },
      ],
    },
    {
      id: 9,
      name: "Star Fragment",
      imageURL: "https://dodo.ac/np/images/7/7a/Star_Fragment_NH_Icon.png",
      materials: [],
    },
    {
      id: 10,
      name: "Flimsy Axe",
      imageURL: "https://dodo.ac/np/images/a/ac/Flimsy_Axe_NH_DIY_Icon.png",
      materials: [
        { productID: 1, count: 5 },
        { productID: 2, count: 1 },
      ],
    },
    {
      id: 11,
      name: "Tree-Branch Wand",
      imageURL: "https://dodo.ac/np/images/c/cb/Tree-Branch_Wand_NH_Icon.png",
      materials: [
        { productID: 1, count: 5 },
        { productID: 9, count: 3 },
      ],
    },
    {
      id: 12,
      name: "Acoustic Guitar",
      imageURL:
        "https://dodo.ac/np/images/4/42/Acoustic_Guitar_%28Natural%29_NH_Icon.png",
      materials: [
        { productID: 4, count: 8 },
        { productID: 5, count: 3 },
      ],
    },
    {
      id: 13,
      name: "Barbell",
      imageURL:
        "https://dodo.ac/np/images/a/a9/Barbell_%28Black%29_NH_Icon.png",
      materials: [{ productID: 5, count: 10 }],
    },
    {
      id: 14,
      name: "Birdbath",
      imageURL:
        "https://dodo.ac/np/images/0/09/Birdbath_%28Natural%29_NH_Icon.png",
      materials: [{ productID: 2, count: 6 }],
    },
    {
      id: 15,
      name: "Clothesline",
      imageURL:
        "https://dodo.ac/np/images/9/9e/Clothesline_%28White%29_NH_Icon.png",
      materials: [{ productID: 1, count: 10 }],
    },
    {
      id: 16,
      name: "Garden Bench",
      imageURL:
        "https://dodo.ac/np/images/9/9e/Clothesline_%28White%29_NH_Icon.png",
      materials: [
        { productID: 4, count: 12 },
        { productID: 5, count: 4 },
      ],
    },
  ]);
}
