"use client"

import Menu from "./components/Menu";
import { useAppContext } from "./context/AppContext";

export default function Home() {
  const { isStarted } = useAppContext();

  return (
    <div>
      {isStarted 
        ? <></>
        : <Menu />
      }
    </div>
  );
}
