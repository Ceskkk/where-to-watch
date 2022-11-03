import { useState } from "react"

import ProvidersLogos from "./ProvidersLogos"
import { IProviders } from "../types"
import styles from "../styles/SingleFooter.module.css"

export default function SingleFooter({ providers }: { providers: IProviders }) {
  const [active, setActive] = useState<string>("Suscripcion")

  return (
    <footer>
      <div className={styles.container}>
        <h3
          onClick={() => setActive("Suscripcion")}
          className={active === "Suscripcion" ? styles.active : ""}
        >
          Suscripción
        </h3>
        <h3
          onClick={() => setActive("Alquiler")}
          className={active === "Alquiler" ? styles.active : ""}
        >
          Alquiler
        </h3>
        <h3
          onClick={() => setActive("Compra")}
          className={active === "Compra" ? styles.active : ""}
        >
          Compra
        </h3>

        <section>
          <div className={active === "Suscripcion" ? styles.active : ""}>
            {providers?.flatrate ? (
              <ProvidersLogos providersInfo={providers.flatrate} />
            ) : (
              "No hay"
            )}
          </div>
          <div className={active === "Alquiler" ? styles.active : ""}>
            {providers?.rent ? (
              <ProvidersLogos providersInfo={providers.rent} />
            ) : (
              "No hay"
            )}
          </div>

          <div className={active === "Compra" ? styles.active : ""}>
            {providers?.buy ? (
              <ProvidersLogos providersInfo={providers.buy} />
            ) : (
              "No hay"
            )}
          </div>
        </section>
      </div>
    </footer>
  )
}
