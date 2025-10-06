import { api } from "@/api/mock";
import { useQuery } from "@tanstack/react-query";

export const useContacts = (phone: string | undefined) => {
    return useQuery({
        queryKey: ["contacts", phone],
        queryFn: async () => {
            const res = await api.get(`/contacts/${phone}`);
            return res.data.contacts;
        },
        enabled: !!phone,
    });
};
