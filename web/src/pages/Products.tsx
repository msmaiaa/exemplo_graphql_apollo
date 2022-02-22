import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { useProductsQuery } from "../generated/graphql";

const Products = () => {
  const { data } = useProductsQuery();
  const navigate = useNavigate();
  const onProductClick = (id: string) => navigate(`/product/${id}`);

  return (
    <Container>
      <div className="flex w-full flex-wrap">
        {data?.products?.map((product) => (
          <div
            className="flex flex-col items-center w-2/4 mt-24"
            key={product.id}
          >
            <img
              onClick={() => onProductClick(product.id)}
              src={product.image_url}
              alt="product_img"
              className="rounded hover:cursor-pointer hover:-translate-y-2 transition-all duration-200"
              style={{ height: 250, width: 400 }}
            />
            <p className="mt-2 mb-2">{product.name}</p>
            <p>R$ {product.price}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Products;
