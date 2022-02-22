import { useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";
import { useProductQuery } from "../generated/graphql";

const formatDate = (date: string) => new Date(date).toLocaleDateString();

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  if (!productId) navigate("/");

  const { data: productData } = useProductQuery({
    variables: {
      productId: Number(productId),
    },
  });
  const product = productData?.product;
  return (
    <Container>
      <img
        className="rounded"
        src={product?.image_url}
        alt="productImage"
        style={{ height: 250, width: 400 }}
      />
      <p className="mt-2">Nome: {product?.name}</p>
      <div className="mt-2 flex">
        <p className="mr-2">Preço: </p>
        <p className="text-green-500">R$ {product?.price},00</p>
      </div>
      <p className="mt-2" style={{ maxWidth: 400 }}>
        Descrição: {product?.description}
      </p>
      <p className="mt-2">Criado em: {formatDate(product?.createdAt)}</p>
      <div className="mt-2 flex">
        <p className="mr-2">Criado por: </p>
        <p className="text-red-600">{product?.created_by.username}</p>
      </div>
      <button className="mt-2 mb-2 pt-2 pb-2 rounded w-32 bg-gray-50">
        Editar
      </button>
    </Container>
  );
};

export default Product;
