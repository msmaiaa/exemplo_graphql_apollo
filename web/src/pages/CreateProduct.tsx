import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/Container";
import { useCreateProductMutation } from "../generated/graphql";

const CreateProduct = () => {
  const [createProduct] = useCreateProductMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    price: 0,
    description: "",
    name: "",
    imageUrl: "",
  });

  const onAddProduct = async () => {
    try {
      const { data } = await createProduct({
        variables: {
          ...formData,
          price: Number(formData.price),
        },
      });
      toast(`Produto ${data?.createProduct.name} criado com sucesso`, {
        type: "success",
      });
      navigate("/products");
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
          onAddProduct();
        }}
        className="flex flex-col"
      >
        <input
          name="price"
          placeholder="Preço"
          onChange={onChangeInput}
          className="w-42 pl-2 bg-inherit border-b-2 text-gray-300"
        />
        <input
          name="description"
          placeholder="Descrição"
          onChange={onChangeInput}
          className="w-42 pl-2 bg-inherit border-b-2 text-gray-300 mt-4"
        />
        <input
          name="name"
          placeholder="Nome do produto"
          onChange={onChangeInput}
          className="w-42 pl-2 bg-inherit border-b-2 text-gray-300 mt-4"
        />
        <input
          name="imageUrl"
          placeholder="imageUrl"
          onChange={onChangeInput}
          className="w-42 pl-2 bg-inherit border-b-2 text-gray-300 mt-4"
        />
        <button
          className="mt-6 pt-2 pb-2 rounded w-40 bg-gray-50"
          type="submit"
        >
          Criar
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-6 pt-2 pb-2 rounded w-40 bg-gray-50"
        >
          Voltar
        </button>
      </form>
    </Container>
  );
};

export default CreateProduct;
