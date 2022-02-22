import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/Container";
import {
  useLoginMutation,
  useMeQuery,
  useSignupMutation,
} from "../generated/graphql";

type FormSubmitKind = "login" | "signup";

const Login = () => {
  const [submitLogin] = useLoginMutation();
  const [submitSignup] = useSignupMutation();
  const { data: loggedIn } = useMeQuery();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loggedIn) navigate("/products");
  }, [loggedIn, navigate]);

  const onSubmit = async (kind: FormSubmitKind) => {
    const { email, password } = formData;
    try {
      if (kind === "login") {
        const { data } = await submitLogin({
          variables: {
            email,
            password,
          },
        });
        const { token } = data?.login!;

        localStorage.setItem("gql_token", token);
        navigate("/products");
      } else {
        await submitSignup({
          variables: {
            email,
            password,
          },
        });
        toast("registrado com sucesso, só pq vc é lindo", {
          type: "success",
        });
      }
      setFormData({
        email: "",
        password: "",
      });
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
      <div className="flex flex-col w-72 h-48 rounded justify-center items-center">
        <input
          onChange={onChangeInput}
          name="email"
          type="text"
          placeholder="email"
          className="w-42 mb-2 pl-2 bg-inherit border-b-2 text-gray-300"
        />
        <input
          onChange={onChangeInput}
          name="password"
          type="password"
          placeholder="senha"
          className="w-42 pl-2 bg-inherit border-b-2 text-gray-300"
        />
        <button
          onClick={() => onSubmit("login")}
          className="mt-8 mb-2 pt-2 pb-2 rounded w-32 bg-gray-50"
        >
          Logar
        </button>
        <button
          onClick={() => onSubmit("signup")}
          className="mt-2 mb-2 pt-2 pb-2 rounded w-32 bg-gray-50"
        >
          Cadastrar
        </button>
      </div>
    </Container>
  );
};

export default Login;
