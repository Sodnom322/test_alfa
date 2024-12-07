import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../types";
import { Badge, Card, Rate, Skeleton } from "antd";

const ItemOne = () => {
  const [products, setProducts] = useState<IProduct>();
  const [isloading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products/" + id);
        const res = await response.json();
        setProducts(res);
      } catch (error) {
        console.error("Не удалось загрузить страницу:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="flex justify-center items-center w-screen mt-28">
      {isloading ? (
        <Card style={{ width: 400, height: 600 }}>
          <Skeleton loading={isloading}></Skeleton>
        </Card>
      ) : (
        <Badge.Ribbon text={products?.category}>
          <Card title={products?.title} className="h-16 w-96 ">
            <div className="flex justify-center items-center">
              <img
                src={products?.image}
                alt="productImg"
                className="w-48 h-48"
              />
            </div>
            <p className="font-thin text-2xl">
              <span className="font-bold text-2xl">Price: </span>{" "}
              {products?.price}$
            </p>
            <p className="font-thin text-xl">
              <span className="font-bold text-2xl">Info: </span>
              {products?.description}
            </p>
            <div className="flex justify-end gap-3 items-center">
              <Rate allowHalf disabled value={products?.rating?.rate} />
              <span className="text-lg border-b">{products?.rating?.rate}</span>
            </div>
          </Card>
        </Badge.Ribbon>
      )}
    </div>
  );
};

export default ItemOne;
