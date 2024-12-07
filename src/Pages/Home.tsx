import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center flex-col h-screen gap-4">
      <h1 className="font-bold text-2xl">Тестовое задание для Alfa</h1>
      <Link to={"/products"}>
        <Button>Смотреть</Button>
      </Link>
    </div>
  );
};

export default Home;
