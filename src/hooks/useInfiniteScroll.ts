import { Dispatch, SetStateAction, useEffect, useState } from "react"

export interface UseInfiniteScrollReturn {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  page: number
}

export default function useInfiniteScroll(
  callback: () => void
): UseInfiniteScrollReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(2)

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    )
      return
    setIsLoading(true)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isLoading) return
    callback()
    setPage((prevValue) => prevValue + 1)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return {
    isLoading,
    setIsLoading,
    page
  }
}
