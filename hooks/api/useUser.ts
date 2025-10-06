import { api } from "@/api/mock";
import { useQuery } from "@tanstack/react-query";

export const useUser = (phone: string | undefined) => {
    return useQuery({
        queryKey: ["user", phone],
        queryFn: async () => {
            const res = await api.get(`/user/${phone}`);
            return res.data.user;
        },
        enabled: !!phone, // only run when phone exists
    });
};
