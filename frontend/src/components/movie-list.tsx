"use client"

import { useState, useEffect } from "react"
import MovieCard from "./movie-card"
import { Button } from "@/components/ui/button"

interface Movie {
  id: number
  title: string
  poster: string
  rating: number
  year: number
  genre: string
}

interface MovieListProps {
  title: string
  category: string
}

export default function MovieList({ title, category }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchMovies = async () => {
    setLoading(true)
    // Simulating API call with setTimeout
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate dummy data
    const newMovies = Array.from({ length: 10 }, (_, i) => ({
      id: (page - 1) * 10 + i + 1,
      title: `Movie ${(page - 1) * 10 + i + 1}`,
      poster: `/placeholder.svg?height=450&width=300&text=Movie+${(page - 1) * 10 + i + 1}`,
      rating: 4, // Fixed rating instead of random
      year: 2023, // Fixed year instead of random
      genre: "Action", // Fixed genre instead of random
    }))

    setMovies((prevMovies) => [...prevMovies, ...newMovies])
    setPage((prevPage) => prevPage + 1)
    setLoading(false)
  }

  useEffect(() => {
    fetchMovies()
  }, []) //Fixed: Added empty dependency array to useEffect

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {loading ? (
        <div className="text-center mt-4">Loading...</div>
      ) : (
        <div className="text-center mt-4">
          <Button onClick={fetchMovies}>Xem thêm</Button>
        </div>
      )}
    </section>
  )
}

