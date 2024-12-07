import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { addProduct } from "../Redux/ProductsSlice/ProductsSlicee";
import { IProduct } from "../types";
import { Input, Button, Form, message } from "antd";
import axios from "axios";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>();

  const onSubmit = async (data: IProduct) => {
    try {
      const response = await axios.post(
        "https://eddaddba2babc833.mokky.dev/products",
        data,
      );

      dispatch(addProduct(response.data));
      message.success("Продукт успешно добавлен!");
      navigate("/products");
    } catch (error) {
      message.error("Ошибка при добавлении продукта.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-center text-xl mb-4">Создать продукт</h2>
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Form.Item label="Название" required>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Это поле обязательно" }}
            render={({ field }) => (
              <Input {...field} placeholder="Введите название продукта" />
            )}
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </Form.Item>

        <Form.Item label="Цена" required>
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Это поле обязательно",
              min: { value: 1, message: "Цена должна быть больше 0" },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Введите цену продукта"
                type="number"
              />
            )}
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}
        </Form.Item>

        <Form.Item label="Описание" required>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Это поле обязательно" }}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder="Введите описание продукта"
              />
            )}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </Form.Item>

        <Form.Item label="Ссылка на изображение" required>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите ссылку на изображение" />
            )}
          />
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Создать продукт
        </Button>
      </Form>
    </div>
  );
};

export default CreateProduct;
