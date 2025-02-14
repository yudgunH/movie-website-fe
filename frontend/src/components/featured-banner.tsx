"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Define the type for our featured movie
type FeaturedMovie = {
    id: number
    title: string
    description: string
    imageUrl: string
}

// Sample data for featured movies
const featuredMovies: FeaturedMovie[] = [
    {
        id: 1,
        title: "Inception",
        description:
            "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        imageUrl: "/feature_banner.png?height=1080&width=1920&text=Inception",
    },
    {
        id: 2,
        title: "The Shawshank Redemption",
        description:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        imageUrl: "/phim3.jpg?height=1080&width=1920&text=The+Shawshank+Redemption",
    },
    {
        id: 3,
        title: "The Dark Knight",
        description:
            "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        imageUrl: "/phim2.jpg?height=1080&width=1920&text=The+Dark+Knight",
    },
]

export default function FeaturedBanner() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
    }

    return (
        <Slider {...settings}>
            {featuredMovies.map((movie) => (
                <div key={movie.id} className="relative h-[75vh] w-full">
                    <Image
                        src={movie.imageUrl || "/placeholder.svg"}
                        alt={movie.title}
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                        <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
                        <p className="text-lg mb-4 max-w-xl">{movie.description}</p>
                        <div className="space-x-4">
                            <Button>Xem ngay</Button>
                            <Button variant="outline">Xem trailer</Button>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    )
}

