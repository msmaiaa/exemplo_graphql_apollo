import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/Container";
import {
  useDeleteProductMutation,
  useProductQuery,
} from "../generated/graphql";

const formatDate = (date: string) => new Date(date).toLocaleDateString();

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  if (!productId) navigate("/products");

  const [deleteProduct] = useDeleteProductMutation({
    fetchPolicy: "no-cache",
  });

  const { data: productData } = useProductQuery({
    variables: {
      productId: Number(productId),
    },
  });

  const product = productData?.product;

  const handleDelete = async () => {
    const { data } = await deleteProduct({
      variables: {
        deleteProductId: Number(productId),
      },
    });
    if (data?.deleteProduct) {
      toast("deletado", {
        type: "success",
      });
      navigate("/");
    }
  };

  const onUpdateProduct = () => {
    navigate(`/product/${product?.id}/update`, {
      state: {
        ...product,
      },
    });
  };

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
      <button
        className="mt-2 mb-2 pt-2 pb-2 rounded w-32 bg-red-700 text-white"
        onClick={() => handleDelete()}
      >
        Deletar
      </button>
      <button
        className="mt-2 mb-2 pt-2 pb-2 rounded w-32 bg-gray-50"
        onClick={() => onUpdateProduct()}
      >
        Editar
      </button>
      <button
        className="mt-2 mb-2 pt-2 pb-2 rounded w-32 bg-gray-50"
        onClick={() => navigate("/products")}
      >
        Voltar
      </button>
    </Container>
  );
};

export default Product;
