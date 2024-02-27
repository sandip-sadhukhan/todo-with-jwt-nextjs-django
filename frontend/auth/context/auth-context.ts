import { createContext } from "react";
import { IContext } from "@/types/auth";

const AuthContext = createContext<IContext | null>(null);

export default AuthContext;
