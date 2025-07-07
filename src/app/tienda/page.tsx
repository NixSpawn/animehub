import { Suspense } from "react";
import TiendaPage from "./TiendaClient";

function Page() {
  return (
    <>
      <Suspense fallback={<div>Cargando tienda…</div>}>
        <TiendaPage />
      </Suspense>
    </>
  )
}

export default Page;
