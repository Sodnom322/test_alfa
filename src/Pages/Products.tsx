import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { fetchProducts } from "../Redux/ProductsSlice/ProductsThunk";
import { Input, Pagination, Select, Spin } from "antd";
import ProductItem from "../Components/ProductItem";
import {
  toggleFavorite,
  setPage,
  setSortOrder,
} from "../Redux/ProductsSlice/ProductsSlicee";

function Products() {
  const [value, setValue] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "favorites">("all");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { items, isLoading, favorites, currentPage, itemsPerPage, sortOrder } =
    useSelector((state: RootState) => state.products);

  const filteredItems = items?.filter((item) => {
    const isFavoriteFilter =
      filter === "favorites" ? favorites.includes(item.id) : true;

    const isSearchFilter = item.title
      .toLowerCase()
      .includes(value.toLowerCase());
    return isFavoriteFilter && isSearchFilter;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleFilterChange = (
    value: "all" | "favorites" | "minmax" | "maxmin",
    dispatch: AppDispatch,
    setFilter: React.Dispatch<React.SetStateAction<"all" | "favorites">>,
  ) => {
    if (value === "all") {
      setFilter(value);
      dispatch(setSortOrder("default"));
      dispatch(fetchProducts({ sortOrder: "default" }));
    } else if (value === "favorites") {
      setFilter(value);
    } else {
      dispatch(setSortOrder(value));
      dispatch(fetchProducts({ sortOrder: value }));
    }
  };

  useEffect(() => {
    dispatch(fetchProducts({ sortOrder }));
  }, [dispatch, sortOrder]);

  console.log(value);
  return (
    <>
      <div className=" flex justify-center m-4 gap-5">
        <Select
          placeholder="Выберите фильтр"
          onChange={(value: "all" | "favorites" | "minmax" | "maxmin") => {
            handleFilterChange(value, dispatch, setFilter);
          }}
          defaultValue="all"
          options={[
            { value: "all", label: "Все товары" },
            { value: "favorites", label: "Избранные" },
            { value: "minmax", label: "По возрастанию" },
            { value: "maxmin", label: "По убыванию" },
          ]}
          className="w-40"
        />
        <Input
          placeholder="Найти товар"
          className="w-52"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </div>
      {isLoading ? (
        <Spin tip="Loading..." fullscreen />
      ) : paginatedItems.length > 0 ? (
        <div className="grid grid-cols-3 gap-11 p-10 justify-items-center h-[calc(100vh-150px)]">
          {paginatedItems.map((el) => (
            <ProductItem
              onClick={() => navigate(`/products/${el.id}`)}
              key={el.id}
              {...el}
              isFavorite={favorites.includes(el.id)}
              onToggleFavorite={() => dispatch(toggleFavorite(el.id))}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-150px)]">
          <p className="text-lg font-bold">Список пуст</p>
        </div>
      )}
      <Pagination
        current={currentPage}
        total={filteredItems.length}
        pageSize={itemsPerPage}
        onChange={(page) => dispatch(setPage(page))}
        className="mb-7"
        align="center"
      />
    </>
  );
}

export default Products;
