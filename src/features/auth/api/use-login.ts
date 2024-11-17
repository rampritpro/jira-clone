import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

import client from "@/lib/rpc";
type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<
  (typeof client.api.auth.login)["$post"]
>["json"];

export const useLogin = () => {
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.login.$post({ json });
      return response.json();
    },
    onSuccess() {
      console.log("CALLED");
      router.push("/");
    },
  });
  return mutation;
};
