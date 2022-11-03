import Image from "next/image"

import { IProvidersInfo } from "../types"
import styles from "../styles/ProvidersLogos.module.css"

export default function ProvidersLogos({
  providersInfo
}: {
  providersInfo: IProvidersInfo[]
}) {
  return (
    <>
      {providersInfo.map((prov) => (
        <span key={prov.provider_id} className={styles.logo}>
          <Image
            src={`${process.env.NEXT_PUBLIC_THEMOVIEDB_API_IMAGES_URL}/w45/${prov.logo_path}`}
            alt={`Logo de  de ${prov.provider_name}`}
            width={45}
            height={45}
          />
        </span>
      ))}
    </>
  )
}
