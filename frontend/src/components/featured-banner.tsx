import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function FeaturedBanner() {
  return (
    <div className="relative h-[60vh] w-full">
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt="Featured Movie"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute bottom-0 left-0 p-8">
        <h2 className="text-4xl font-bold mb-2">Featured Movie Title</h2>
        <p className="text-lg mb-4 max-w-xl">A brief description of the featured movie to entice viewers.</p>
        <div className="space-x-4">
          <Button>Xem ngay</Button>
          <Button variant="outline">Xem trailer</Button>
        </div>
      </div>
    </div>
  )
}

