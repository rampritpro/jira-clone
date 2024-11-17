import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { useRouter } from "next/navigation";

import client from "@/lib/rpc";
type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
  const router = useRouter();
  const query = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();
      return response.json();
    },
    onSuccess() {
      router.refresh();
      query.invalidateQueries({ queryKey: ["current"] });
    },
  });
  return mutation;
};
