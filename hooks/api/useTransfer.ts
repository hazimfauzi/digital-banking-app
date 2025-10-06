import { defaultApi } from "@/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

type TransferPayload = {
    fromPhone: string;
    toName: string;
    toPhone: string;
    amount: number;
};

export const useTransfer = () => {
    return useMutation({
        mutationFn: async (data: TransferPayload) => {
            const res = await defaultApi.post("/transfer", data);
            return res.data;
        },
    });
};
