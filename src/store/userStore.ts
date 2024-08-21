import { Users } from "@/database/schema/users";
import getCurrentUser from "@/functions/getCurrentUser";
import { create } from "zustand";

type Store = {
  user: Users | null;
  setUser: (currentUser: Users | null) => void;
  resetUser: () => void;
  getUser: () => Promise<Users | null>;
};

const userStore = create<Store>()((set, get) => ({
  user: null,
  setUser: (curentUser) => set({ user: curentUser }),
  resetUser: () => set({ user: null }),
  getUser: async () => {
    if (get().user !== null) {
      return get().user;
    }
    const newUser = await getCurrentUser();
    get().setUser(newUser);
    return newUser;
  },
}));

export default userStore;
