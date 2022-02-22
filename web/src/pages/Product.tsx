import { useEffect } from "react";
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
  const product = productData?.product!;
  return (
    <Container>
      <img
        className="rounded"
        src={product?.image_url}
        alt="productImage"
        style={{ height: 250, width: 400 }}
      />
      <p className="mt-2">Nome: {product.name}</p>
      <p className="mt-2">Preço: R$ {product.price}</p>
      <p className="mt-2" style={{ maxWidth: 400 }}>
        Descrição: {product.description}
      </p>
      <p className="mt-2">Criado em: {formatDate(product.createdAt)}</p>
    </Container>
  );
};

export default Product;
