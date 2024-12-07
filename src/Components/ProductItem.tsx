import React, { useState } from "react";
import { IProductClick } from "../types";
import { Card, message, Spin } from "antd";
import { DeleteOutlined, LikeOutlined } from "@ant-design/icons";
import noProduct from "../assets/no-pictures.png";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { deleteProduct } from "../Redux/ProductsSlice/ProductsSlicee";
import axios from "axios";

const ProductItem: React.FC<IProductClick> = ({
  title,
  price,
  image,
  onClick,
  rating,
  onToggleFavorite,
  isFavorite,
  id,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `https://eddaddba2babc833.mokky.dev/products/${id}`,
      );

      if (response.status === 200 || response.status === 204) {
        dispatch(deleteProduct(id));
        message.success("Товар успешно удален!");
      } else {
        message.error("Не удалось удалить товар. Попробуйте снова.");
      }
    } catch (error) {
      message.error("Ошибка при удалении товара.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-96  h-72 ">
      <Card
        onClick={onClick}
        className="flex flex-col items-center w-96 h-80 cursor-pointer mb-2 "
      >
        <div className="flex flex-col justify-center gap-2 items-center mb-5  w-72">
          <p className="text-center font-bold text-lg break-words h-24">
            {title}
          </p>
          <img
            src={!image ? noProduct : image}
            alt="productImg"
            className="w-24 h-24"
          />
        </div>

        <div className="flex justify-between w-full mb-5">
          <p className="font-thin text-2xl">
            <span className="font-bold text-2xl">Price: </span> {price}$
          </p>
          <span className="text-lg border-b-2 text-blue-400">
            {!rating?.count ? "Оценок нет" : `${rating?.count} оценок`}
          </span>
        </div>
      </Card>
      <div className="flex justify-around w-full ">
        {isLoading ? (
          <Spin />
        ) : (
          <>
            <LikeOutlined
              className={`text-2xl cursor-pointer hover:scale-125 transition ${
                isFavorite ? "text-red-500" : "text-black"
              }`}
              onClick={onToggleFavorite}
            />
            <DeleteOutlined
              onClick={handleRemove}
              className="text-2xl cursor-pointer hover:scale-125 transition"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
