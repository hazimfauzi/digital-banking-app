import { defaultApi } from "@/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

type LoginPayload = {
    phone: string;
    pin: string;
};

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginPayload) => {
            const res = await defaultApi.post("/login", data);
            return res.data;
        },
    });
};
