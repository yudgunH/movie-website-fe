"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Movie {
    id: number
    title: string
    genre: string
    year: number
    episodes: number
    views: number
    rating: number
    summary: string
    poster: string | null
    trailer: string | null
    episodeList: Episode[]
}

interface Episode {
    id: number
    video: string | null
}

interface MovieFormProps {
    movie?: Omit<Movie, "episodeList">
    onSubmit: (movie: Omit<Movie, "id" | "episodeList">) => void
}

interface EpisodeManagerProps {
    movie: Movie
    onAddEpisode: (movieId: number, newEpisode: Omit<Episode, "id">) => void
    onDeleteEpisode: (movieId: number, episodeId: number) => void
}

export function MoviesManagement() {
    const [movies, setMovies] = React.useState<Movie[]>([])
    const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null)
    const [searchTerm, setSearchTerm] = React.useState("")

    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = async () => {
        try {
            const response = await fetch("/api/movies")
            if (!response.ok) {
                throw new Error("Failed to fetch movies")
            }
            const data = await response.json()
            setMovies(data)
        } catch (error) {
            console.error("Error fetching movies:", error)
        }
    }

    const handleAddMovie = async (newMovie: Omit<Movie, "id" | "episodeList">) => {
        try {
            const response = await fetch("/api/movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMovie),
            })
            if (!response.ok) {
                throw new Error("Failed to add movie")
            }
            const addedMovie = await response.json()
            setMovies([...movies, addedMovie])
        } catch (error) {
            console.error("Error adding movie:", error)
        }
    }

    const handleEditMovie = async (editedMovie: Omit<Movie, "id" | "episodeList">) => {
        try {
            const response = await fetch(`/api/movies/${selectedMovie?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedMovie),
            })
            if (!response.ok) {
                throw new Error("Failed to update movie")
            }
            const updatedMovie = await response.json()
            setMovies(movies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie)))
        } catch (error) {
            console.error("Error updating movie:", error)
        }
    }

    const handleDeleteMovie = async (id: number) => {
        try {
            const response = await fetch(`/api/movies/${id}`, {
                method: "DELETE",
            })
            if (!response.ok) {
                throw new Error("Failed to delete movie")
            }
            setMovies(movies.filter((movie) => movie.id !== id))
        } catch (error) {
            console.error("Error deleting movie:", error)
        }
    }

    const handleAddEpisode = async (movieId: number, newEpisode: Omit<Episode, "id">) => {
        try {
            const response = await fetch(`/api/movies/${movieId}/episodes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEpisode),
            })
            if (!response.ok) {
                throw new Error("Failed to add episode")
            }
            const updatedMovie = await response.json()
            setMovies(movies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie)))
        } catch (error) {
            console.error("Error adding episode:", error)
        }
    }

    const handleDeleteEpisode = async (movieId: number, episodeId: number) => {
        try {
            const response = await fetch(`/api/movies/${movieId}/episodes/${episodeId}`, {
                method: "DELETE",
            })
            if (!response.ok) {
                throw new Error("Failed to delete episode")
            }
            const updatedMovie = await response.json()
            setMovies(movies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie)))
        } catch (error) {
            console.error("Error deleting episode:", error)
        }
    }

    const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Manage Movies</h1>

            <div className="flex justify-between items-center">
                <div className="flex items-center pr-3">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Add New Movie</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>Add New Movie</DialogTitle>
                            </DialogHeader>
                            <MovieForm onSubmit={handleAddMovie} />
                        </DialogContent>
                    </Dialog>
                </div>

                <Input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Episodes</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredMovies.map((movie) => (
                        <TableRow key={movie.id}>
                            <TableCell>{movie.id}</TableCell>
                            <TableCell>{movie.title}</TableCell>
                            <TableCell>{movie.genre}</TableCell>
                            <TableCell>{movie.year}</TableCell>
                            <TableCell>{movie.episodes}</TableCell>
                            <TableCell>{movie.views.toLocaleString()}</TableCell>
                            <TableCell>{movie.rating}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedMovie(movie)}>
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                        <DialogHeader>
                                            <DialogTitle>Edit Movie</DialogTitle>
                                        </DialogHeader>
                                        {selectedMovie && <MovieForm movie={selectedMovie} onSubmit={handleEditMovie} />}
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className="ml-2">
                                            Episodes
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                        <DialogHeader>
                                            <DialogTitle>Manage Episodes</DialogTitle>
                                        </DialogHeader>
                                        <EpisodeManager
                                            movie={movie}
                                            onAddEpisode={handleAddEpisode}
                                            onDeleteEpisode={handleDeleteEpisode}
                                        />
                                    </DialogContent>
                                </Dialog>
                                <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDeleteMovie(movie.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function MovieForm({ movie, onSubmit }: MovieFormProps) {
    const [formData, setFormData] = React.useState<Omit<Movie, "id" | "episodeList">>(
        movie || {
            title: "",
            genre: "",
            year: new Date().getFullYear(),
            episodes: 1,
            views: 0,
            rating: 0,
            summary: "",
            poster: null,
            trailer: null,
        },
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: name === "year" || name === "episodes" || name === "views" || name === "rating" ? Number(value) : value,
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target
        if (files && files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setFormData({ ...formData, [name]: e.target?.result as string })
            }
            reader.readAsDataURL(files[0])
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="genre">Genre</Label>
                    <Input id="genre" name="genre" value={formData.genre} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" name="year" type="number" value={formData.year} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="episodes">Episodes</Label>
                    <Input
                        id="episodes"
                        name="episodes"
                        type="number"
                        value={formData.episodes}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea id="summary" name="summary" value={formData.summary} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="poster">Poster Image</Label>
                    <Input id="poster" name="poster" type="file" accept="image/*" onChange={handleFileChange} />
                    {formData.poster && (
                        <img
                            src={formData.poster || "/placeholder.svg"}
                            alt="Movie Poster"
                            className="mt-2 max-h-40 object-contain"
                        />
                    )}
                </div>
                <div>
                    <Label htmlFor="trailer">Trailer Video</Label>
                    <Input id="trailer" name="trailer" type="file" accept="video/*" onChange={handleFileChange} />
                    {formData.trailer && (
                        <video controls className="mt-2 max-h-40 w-full">
                            <source src={formData.trailer} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
            </div>
            <Button type="submit">{movie ? "Update Movie" : "Add Movie"}</Button>
        </form>
    )
}

function EpisodeManager({ movie, onAddEpisode, onDeleteEpisode }: EpisodeManagerProps) {
    const [newEpisode, setNewEpisode] = React.useState<Omit<Episode, "id">>({ video: null })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setNewEpisode({ video: e.target?.result as string })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newEpisode.video) {
            onAddEpisode(movie.id, newEpisode)
            setNewEpisode({ video: null })
        }
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="episodeVideo">Episode Video</Label>
                    <Input id="episodeVideo" name="video" type="file" accept="video/*" onChange={handleFileChange} required />
                </div>
                <Button type="submit">Add Episode</Button>
            </form>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="episodes">
                    <AccordionTrigger>Episode List</AccordionTrigger>
                    <AccordionContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Episode</TableHead>
                                    <TableHead>Video</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {movie.episodeList.map((episode, index) => (
                                    <TableRow key={episode.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            {episode.video && (
                                                <video controls className="max-h-20 w-full">
                                                    <source src={episode.video} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="destructive" size="sm" onClick={() => onDeleteEpisode(movie.id, episode.id)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

