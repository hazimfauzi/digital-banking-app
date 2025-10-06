import { api } from "@/api/mock";
import { useMutation } from "@tanstack/react-query";

type LoginPayload = {
    phone: string;
    pin: string;
};

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginPayload) => {
            const res = await api.post("/login", data);
            return res.data;
        },
    });
};
