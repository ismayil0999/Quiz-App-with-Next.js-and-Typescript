"use client"
//Server komponentdə redux toolkit provider isitifadə edilməsi mümkün olmadığı üçün bütün child komponentlər burada Provider arasına alınır

import { Provider } from "react-redux";
import { store } from "./store";

export function StoreProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return <Provider store={store}>
        {children}
    </Provider>
}