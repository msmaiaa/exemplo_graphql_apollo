import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/Container";
import { Product, useUpdateProductMutation } from "../generated/graphql";

const UpdateProduct = () => {
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state as Product;

  useEffect(() => {
    if (!product) navigate("/products");
  }, []);

  const [formData, setFormData] = useState({
    price: product.price,
    description: product.description,
    name: product.name,
    imageUrl: product.image_url,
  });

  const onUpdateProduct = async () => {
    try {
      const { data } = await updateProduct({
        variables: {
          ...formData,
          price: Number(formData.price),
          productId: product.id,
        },
      });

      toast(`Produto ${data?.updateProduct.name} atualizado`, {
        type: "success",
      });

      navigate(`/product/${product.id}`);
    } catch (e: any) {
      toast(e.message, {
        type: "error",
      });
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onUpdateProduct();
        }}
        className="flex flex-col"
      >
        <input
          name="price"
          placeholder="Preço"
          onChange={onChangeInput}
          value={formData.price}
          className="w-42 pl-2 bg-inherit border-b-2 text-gray-300"
        />
        <input
          name="description"
          placeholder="Descrição"
          onChange={onChangeInput}
          value={formData.description}
          className="w-42 pl-2 bg-inherit border-b-2 text-gray-300 mt-4"
        />
        <input
          name="name"
          placeholder="Nome do produto"
          onChange={onChangeInput}
          value={formData.name}
          className="w-42 pl-2 bg-inherit border-b-2 text-gray-300 mt-4"
        />
        <input
          name="imageUrl"
          placeholder="Url da imagem"
          onChange={onChangeInput}
          value={formData.imageUrl}
          className="w-42 pl-2 bg-inherit border-b-2 text-gray-300 mt-4"
        />
        <button
          className="mt-6 pt-2 pb-2 rounded w-40 bg-gray-50"
          type="submit"
        >
          Atualizar
        </button>

        <button
          className="mt-6 pt-2 pb-2 rounded w-40 bg-gray-50"
          onClick={() => navigate(-1)}
          type="button"
        >
          Voltar
        </button>
      </form>
    </Container>
  );
};

export default UpdateProduct;
