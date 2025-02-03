"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Tạo ID duy nhất
import MovieCard from "./movie-card";
import { Button } from "@/components/ui/button";

interface Movie {
  id: string; // Thay number thành string để tương thích uuid
  title: string;
  poster: string;
  rating: number;
  year: number;
  genre: string;
}

interface MovieListProps {
  title: string;
  category: string;
}

export default function MovieList({ title, category }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    
    // Giả lập API với setTimeout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Tạo dữ liệu phim giả lập
    const newMovies = Array.from({ length: 10 }, () => ({
      id: uuidv4(), // Đảm bảo mỗi phim có một ID duy nhất
      title: `Movie ${Math.random().toString(36).substring(7)}`, // Tên ngẫu nhiên
      poster: `/placeholder.svg?height=450&width=300&text=Movie`, // Ảnh giả lập
      rating: 4, // Giá trị cố định
      year: 2023, // Giá trị cố định
      genre: "Action", // Giá trị cố định
    }));

    // Cập nhật danh sách phim, tránh trùng lặp ID
    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []); // Chạy một lần khi component mount

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
  );
}
