import { defaultApi } from "@/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

type SignupPayload = {
    name: string;
    phone: string;
    pin: string;
};

export const useSignup = () => {
    return useMutation({
        mutationFn: async (data: SignupPayload) => {
            const res = await defaultApi.post("/signup", data);
            return res.data;
        },
    });
};
