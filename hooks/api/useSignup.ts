import { api } from "@/api/mock";
import { useMutation } from "@tanstack/react-query";

type SignupPayload = {
    name: string;
    phone: string;
    pin: string;
};

export const useSignup = () => {
    return useMutation({
        mutationFn: async (data: SignupPayload) => {
            const res = await api.post("/signup", data);
            return res.data;
        },
    });
};
